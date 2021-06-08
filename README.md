# qrveyTest

Overall setup:

1. Install & configura AWS CLI
2. Install AWS SAM
3. Install Node & Typescript
4. Install dependencies
5. Execute shell "pack" to prepare the SAM Package and the shell "depl" to deploy the lambda package to AWS cloud.
6. Upload default prescription template.
7. Validate the deployment with a Postman collection.

## How to Use
Please run this comands in your comand line
0. ``npm createBucket  only if the bucket dont exist``
1. ``npm install``
2. ``npm run packDB only if the database tables dont exist or are update``
3. ``npm run deplDB only if the database tables dont exist or are update``
4. ``npm run pack`` 
5. ``npm run depl``
6. ``npm run test:coverage to see the coverage of the test``
---
1. Install & configura AWS CLI

    1.1 Install AWS CLI
    $ curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip"
    $ unzip awscli-bundle.zip
    $ sudo ./awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws

    1.2 Configura AWS CLI
    $ aws configure
    AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
    AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
    Default region name [None]: us-east-1
    Default output format [None]: json

2. Install AWS SAM
    2.1 See the following website:
    https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-mac.html

3. Install Node & Typescript
    3.1 Install nodejs
        brew install node 
    3.2 Install Typescript
        sudo npm install -g typescript
    3.3 Install istanbuljs for coverage reports
        npm i -D nyc source-map-support ts-node @istanbuljs/nyc-config-typescript    

4. Install dependencies
    on the project directory:
    $ npm install

5. Execute shell "pack" to prepare the SAM Package
    5.1 Go to the "database" directory and execute "pack" and "depl" shell which will create the dynamodb tables of the application on the cloud.
    5.2 go back to the "app" directory and execute the shell "pack" to compile the .ts files under "src" folder and generate the .js files on "dist" folder. This shell will generate and upload the .zip file containing the application logic, then execute "depl" shell to deploy the artifact already in the cloud.


6. You can test if the lambda functions were well deployed using the follow PostMan collection "https://www.getpostman.com/collections/fea6c4c749a90e47664b".