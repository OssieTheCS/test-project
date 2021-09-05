# Splinterlands Developer Evaluation Project

## Setup

1. Fork and clone the GitHub repo
2. Open a terminal
3. Run `cd server`
4. Run `npm install`
5. Run `node index.js` to start the server (api)
6. Open another terminal
7. run `cd client`
8. run `npm install`
9. run `npm start` to start the client (react-based web application)

If installed and run successfully, the application will log to the console a live stream of the Hive blockchain transactions related to the Splinterlands game.
It will also serve this data as an API for the client to use. 

## Solution
![alt text](https://i.imgur.com/vzsdFvI.gif)


The solution satifies the following requirements:

1. Show a list of each type of operation (ex. "sm_find_match") and the total number of times that operation was seen in the stream
2. Show a list of each player account name that submitted one or more operations and the total number of operations submitted by each player
3. Provide the ability to refresh the list of operations and player accounts mentioned above
4. Provide the ability to search for a specific player and view a detailed list of the operations submitted by that player, including the type of operation, timestamp, block number, and transaction ID

The way it's accomplished is by storing the hive-stream into a javascript object, using it as storage. In a real application this object would be replaced by external persistent storage such as a json file or an sql database. But for the purposes of this test, appending to a javascript object suffices. However, keep in mind that the object grows bigger and bigger every three seconds.

When the user hits the "refresh" button on the UI, an API request is made to fetch the entire javascript object from the server. Again, better care would be made designing this for a production application. Furthermore, when the user types a character in the player search inputfield, the application is fetching all the data and filtering through it with no regard to performance or network- and database-traffic. If performance and high-availability was of importance, either caching data directly in the client-application or on a side-cache, such as Redis Cache should be considered. 

A simple improvement would be to store already-fetched data locally client-side and when the user searches for a different player, to use that same data even if it might be outdated. A "refresh" button could be added to fetch new data only when the user wants to be certain that he's looking at newest data.
