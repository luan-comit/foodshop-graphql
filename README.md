### GraphQL API for Broken Rice Restaurant

VIET THANH LUAN, LE

This is GraphQL API built for Broken Rice dishes creation - a part of a Vietnamese cuisine restaurant recipe management app.
The frontend that uses this API is to date running at https://foodshop.luanle.online

## Getting Started

Clone this repo into your local computer then run the following commands:

1. Run `yarn install` to install dependencies
2. Run `docker-compose up` to start a local mongo database instance in a docker container
3. Run `yarn seed:database` to seed your local database
4. Run `yarn start` in the root folder, this will start the client and server at the same time

## Schema changes note

- Run `yarn generate:types` whenever you make a graphQL schema change
