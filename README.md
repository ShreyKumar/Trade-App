# Trade API
This is a Dockerized Trade API where you are able to make trades on a specific Stock

## Quickstart
`git clone `

## Tech Stack
This API uses MongoDB as the Database to store `User` and `Trade` collections and Node.js to query data.

## Endpoints
* `GET /summary` - Returns a summary of all `Trade`s. Passing in the optional `userId`, `executionDate` and `executionType` parameters will return data with these options
* `GET /trades` - Returns a summary of all `Trade`s. Passing in the `id` parameter will return a Trade with `id`
* `POST /trades` - Creates a new Trade in the `Trade` collection based on all required parameters passed in for `Trade`
* `PUT /trades/:id` - Updates a Trade with `id`
* `DELETE /trades/:id` - Deletes a Trade with `id`
