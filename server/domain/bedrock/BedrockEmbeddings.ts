/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BedrockEmbeddings as AwsBedrockEmbeddings } from "@langchain/community/embeddings/bedrock";
import { AWSConfigType } from "../config"
import { FoundationModel } from "./FoundationModels";

export class BedrockEmbeddings {
    client: AwsBedrockEmbeddings
    constructor(awsConfig: AWSConfigType){
      this.client = new AwsBedrockEmbeddings({
        ...awsConfig as any,
        model: FoundationModel.TITAN_EMBEDDINGS_G1_TEXT,
      });
    }

    async embedQuery(document: string) {
      await this.client.embedQuery(document)
    }

    async embedDocuments(documents: string[]) {
      await this.client.embedDocuments(documents)
    }
}