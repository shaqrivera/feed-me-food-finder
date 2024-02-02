import { AWSConfigType } from '../config';
import {BedrockRuntimeClient, BedrockRuntimeClientConfig} from "@aws-sdk/client-bedrock-runtime";

export class BedrockRuntime {
  client: BedrockRuntimeClient;
  constructor(private readonly awsConfig: AWSConfigType){
    this.client = new BedrockRuntimeClient(awsConfig as BedrockRuntimeClientConfig);
  }
}