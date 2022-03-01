import {AssetCode, Function, Runtime} from '@aws-cdk/aws-lambda';
import {CfnOutput, Duration, Stack, StackProps} from '@aws-cdk/core';
import {Construct} from '@aws-cdk/core/lib/construct-compat';
import {LambdaIntegration, RestApi} from '@aws-cdk/aws-apigateway';

export class AwsBlogLambdaStack extends Stack {
    public readonly urlOutput: CfnOutput;

    constructor(app: Construct, id: string, props?: StackProps) {
        super(app, id, props);

        //construct lambda
        const lambdaFunc = new Function(this, 'BlogLambda', {
            code: new AssetCode(`./code/src`),
            handler: 'greeting.handler',
            runtime: Runtime.NODEJS_12_X,
            memorySize: 256,
            timeout: Duration.seconds(10),
            environment: {
                DEPLOY_TIME: new Date().toISOString()
            },
        });

        //construct APIGW
        const api = new RestApi(this, 'blog-greeting-api',{
            restApiName: 'Greeting Service'
        });

        //Integration with lambda on GET method
        api.root.addMethod('GET',new LambdaIntegration(lambdaFunc));

        //make the url part of output

        this.urlOutput = new CfnOutput(this,'Url', { value: api.url,});
    }
}