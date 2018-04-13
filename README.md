# Recruitment task for Brainhub (https://brainhub.eu/)

Create a small application form for an event. The form should contain fields listed below:
- First name (required)
- Last name (required)
- Email (required, valid email address)
- Event date (required, simple date picker)
- UI is not important

Requirements:
- Frontend should be written in React (using Redux will be very appreciated)
- Data from form should be saved in DB (we suggest MongoDB)
- Data from form should be validated before saving
- Errors should be handled and displayed for the user
- App should be tested (It's your decision what kind of tests are necessary)

## Frontend built with

* [React](https://reactjs.org/) - A JavaScript library for building user interfaces
* [Redux](https://redux.js.org/) - A predictable state container for JavaScript apps
* [React Router](https://reacttraining.com/react-router/) - Router for React apps
* [Sass](https://sass-lang.com/) - Sass is the most mature, stable, and powerful professional grade CSS extension language in the world

## Backend built with

* [Express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [MongoDB](https://www.mongodb.com/) - NoSQL Database
* [Mongoose](http://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js

## Tested with

* [Jest](https://facebook.github.io/jest/) - Delightful Javascript Testing
* [Enzyme](http://airbnb.io/enzyme/) - Testing utility for React
* [SuperAgent](http://visionmedia.github.io/superagent/) - API Testing

## Installation & Setup

1. Clone this repository and install its dependencies.

  > git clone git://github.com/Raudos/Brainhub.git BrainhubTask'

  > cd BrainhubTask

  > npm install

2. Start the MongoDB daemon.

  > mongod

3. From within the BrainhubTask directory, start the server.

  > npm run start-backend

4. From within the BrainhubTask directory, un a separate shell start the frontend server.

  > npm run start-frontend

5. Open a browser window and navigate to: [http://localhost:8080](http://localhost:8080)

## List of scripts

  > npm run start-frontend - Starts frontend server

  > npm run start-backend - Starts backend server

  > npm run start-backend-watch - Starts backend server with nodemon

  > npm run test-backend - Runs tests for backend server

  > npm run test-frontend - Runs tests for frontend application
