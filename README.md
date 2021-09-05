# Splinterlands Developer Evaluation Project

## Setup

1. Fork and clone the GitHub repo
2. Open a terminal
3. Run `cd server`
4. Run `npm install`
5. Run `node index.js` to start the server (api)
6. Open another terminal
7. run `cd client/splinter-explorer`
8. run `npm install`
9. run `npm start` to start the client (react-based web application)

If installed and run successfully, the application will log to the console a live stream of the Hive blockchain transactions related to the Splinterlands game.
It will also serve this data as an API for the client to use. 

## Solution

The solution satifies the following requirements:

1. Show a list of each type of operation (ex. "sm_find_match") and the total number of times that operation was seen in the stream
2. Show a list of each player account name that submitted one or more operations and the total number of operations submitted by each player
3. Provide the ability to refresh the list of operations and player accounts mentioned above
4. Provide the ability to search for a specific player and view a detailed list of the operations submitted by that player, including the type of operation, timestamp, block number, and transaction ID
