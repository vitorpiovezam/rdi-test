# rdi-test

Tiny webapp for a restaurant menu. 
With a view categorized for the client and a backoffice view for the restaraunt update with new dishes.

**Tech Stack**
 - Angular 14 webapp
 - Serverless project running offline with NodeJS and DynamoDB

## Requirements

- Node JS >=18
- Java JRE

## How to Run

Install dependencies
```
npm i;
```

Set up local DynamoDB, inside /api folder
```
// To setup dynamodb you will have to install serverless globally
npm i -g serverless

cd /api
sls dynamodb install
sls dynamodb run
```

In case of webpack fail (If Node >=18)
```export NODE_OPTIONS=--openssl-legacy-provider```

Then hit ```npm run start``` 🔥

## Testing

This project have unit testing in both sides (front end and backend) and end to end testing.

```npm run test```