import { AWSConfig, TitanTextModelConfig } from "../config";
import { BedrockRuntime } from "./BedrockRuntime";
import { FoundationModel } from "./FoundationModels";
import { InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import { Restaurant } from '../restaurants/entities/Restaurant'
import { FaissStore } from "@langchain/community/vectorstores/faiss";
import { BedrockEmbeddings } from "./BedrockEmbeddings";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { formatDocumentsAsString } from "langchain/util/document";
// import {
//   RunnablePassthrough,
//   RunnableSequence,
// } from "@langchain/core/runnables";
// import { StringOutputParser } from "@langchain/core/output_parsers";
// import {
//   ChatPromptTemplate,
//   HumanMessagePromptTemplate,
//   SystemMessagePromptTemplate,
// } from "@langchain/core/prompts";
// import { Bedrock } from "@langchain/community/llms/bedrock";

export class TitanTextG1LiteService {
    constructor(private readonly bedrockRuntime: BedrockRuntime, private readonly titanTextModelConfig: TitanTextModelConfig, private readonly bedrockEmbeddings: BedrockEmbeddings){}
    
    async invokeModel (prompt: string) {
        const payload = {
            inputText: prompt,
            textGenerationConfig: this.titanTextModelConfig,
        }

        const command = new InvokeModelCommand({
            body: JSON.stringify(payload),
            contentType: 'application/json',
            accept: 'application/json',
            modelId: FoundationModel.TITAN_TEXT_G1_LITE,
        })

        try {
            const response = await this.bedrockRuntime.client.send(command);
            const decodedResponseBody = new TextDecoder().decode(response.body);
    
            const responseBody = JSON.parse(decodedResponseBody);
            return responseBody.results
    
        } catch (err) {
            console.error(err);
        }
    }
    
    async suggestRestaurant(restaurants: Restaurant[], searchTerms: string){
        const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
        const docs = await textSplitter.createDocuments(restaurants.map((restaurant) => JSON.stringify(restaurant)));

        const vectorStore = await FaissStore.fromDocuments(
            docs,
            this.bedrockEmbeddings.client
        );
        
        // const vectorStoreRetriever = vectorStore.asRetriever();

        // // Create a system & human prompt for the chat model
        // const SYSTEM_TEMPLATE = `Use the following pieces of context to answer the question at the end.
        // If you don't know the answer, just say that you don't know, don't try to make up an answer.
        // ----------------
        // {context}`;
        // const messages = [
        // SystemMessagePromptTemplate.fromTemplate(SYSTEM_TEMPLATE),
        // HumanMessagePromptTemplate.fromTemplate("{question}"),
        // ];
        // const prompt = ChatPromptTemplate.fromMessages(messages);

        // const model = new Bedrock({
        //     model: FoundationModel.TITAN_TEXT_G1_LITE,
        //     ...AWSConfig as any
        //   });
        
        // const chain = RunnableSequence.from([
        //     {
        //       context: vectorStoreRetriever.pipe(formatDocumentsAsString),
        //       question: new RunnablePassthrough(),
        //     },
        //     prompt,
        //     model,
        //     new StringOutputParser(),
        //   ]);

        // const answer = await chain.invoke(
        // `Given the following comma separated search terms, suggest the best restaurant.
        // Search terms: ${searchTerms}

        // Return the restaurant in valid JSON format. The response should be of the following type:

        // type Restaurant = {
        //     id: string,
        //     alias: string,
        //     name: string, 
        //     imageUrl: string,
        //     isClosed: boolean,
        //     url: string,
        //     reviewCount: number,
        //     categories: object[],
        //     rating: number,
        //     coordinates: {
        //         latitude: number,
        //         longitude: number,
        //     },
        //     transactions: string[],
        //     price: string,
        //     location: object,
        //     phone: string,
        //     displayPhone: string,
        //     distance: number,
        // }
        // `
        // );

        const [{pageContent}] = await vectorStore.similaritySearch(searchTerms, 1);
        const restaurant = Restaurant.restore(JSON.parse(pageContent))
        return restaurant
    }
}