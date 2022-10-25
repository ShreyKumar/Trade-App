# Trade API
This is a Dockerized Trade API where you are able to make trades on a specific Stock

## Quickstart
* `git clone git@github.com:ShreyKumar/Trade-App.git` or `git clone https://github.com/ShreyKumar/Trade-App.git`
* Ensure you have Mongo installed, start your localhost Mongo Server either through Mongo Compass or the CLI
* Import the `Trade` and `User` collections via their JSON dumps located in the `db` subdirectory
* `cd Trade-App && yarn` to install dependencies
* `yarn dev` - This will start the server on `http://localhost:3001`

## Tech Stack
This API uses MongoDB as the Database to store `User` and `Trade` collections and Node.js to query data. JSON DB dumps containing test data is located under the `db` subdirectory

## Link to DB schema
https://dbdiagram.io/d/630e30c30911f91ba5fab2e4 

## Endpoints
* `GET /summary` - Returns a summary of all `Trade`s. Passing in the optional `userId`, `executionDate` and `executionType` parameters will return data with these options
* `GET /trades` - Returns a summary of all `Trade`s. Passing in the `id` parameter will return a Trade with `id`
* `POST /trades` - Creates a new Trade in the `Trade` collection based on all required parameters passed in for `Trade`
* `PUT /trades/:id` - Updates a Trade with `id`
* `DELETE /trades/:id` - Deletes a Trade with `id`
