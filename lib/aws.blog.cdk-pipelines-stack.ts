import * as cdk from '@aws-cdk/core';
import {Repository} from '@aws-cdk/aws-codecommit';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import { CdkPipeline, SimpleSynthAction } '@aws-cdk/pipelines';
import {CodeCommitSourceAction} from '@aws-cdk/aws-codepipeline-actions';
import { Construct, Stack, StackProps } from '@aws-cdk/core';


export class AwsBlogCdkPipelinesStack extends Stack {
  constructor(scope: cdk.Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const repoName = 'aws.blog.cdk-pipelines';
    const repo = Repository.fromRepositoryName(this, 'ImportedRepo', repoName);

    const sourceArtifact = new Artifact();
    const cloudAssemblyArtifact =  new Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      cloudAssemblyArtifact,

      //codeCommit
      sourceAction: new CodeCommitSourceAction({
        actionName: 'CodeCommit_Source',
        repository: repo,
        output: sourceArtifact
      }),

      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,

        //typescript compiler
        buildCommand: 'npm run build && npm run test',
      }),
    });
  }
}
