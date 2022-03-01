# Welcome to your CDK TypeScript project!

This is a blank project for TypeScript development with CDK.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

Original Post:
https://www.luminis.eu/blog/cloud-en/continuous-delivery-with-aws-cdk-pipelines/

STEPS:

    1. Create an empty repo in code commit
    2. Generated iam credentials for that user for codecommit access
    3. Git clone code commit to local
    4. Initial CDK project
    Cdk init --language typescript
    5. Create|update /lib/<pipeline>-stack.ts with basic stages
    	a. Config codecommit repo
    	b. Artifact actions
    	c. Basic npm install and test command
    6. Update /bin/<>-stack.ts to point to the new <pipeline>-stack.ts
    7. Run cdk bootstrap
    env CDK_NEW_BOOTSTRAP=1 npx cdk bootstrap \
    --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
    aws://[ACCOUNT_ID]/[REGION]

    8. Run cdk deploy for the first time
    Cdk deploy
    9. Cdk pipeline should have complete successfully
    10. Create a application code /code/src/app.ts
    11. Create a new stack in /lib    e.g. lambda stack   /lib/<lambda>-stack.ts
    12. Create a new stage in /lib/<pipeline>-stack.ts

Add the new stage to pipeline
