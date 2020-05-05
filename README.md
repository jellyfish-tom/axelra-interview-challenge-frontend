# Axelra Challenge

![](https://files.axelra.com/logo.png)

## Why it s awesome

### Main building blocks:

#### Frontend:

- [React](https://reactjs.org) - for moduler, easy UI building
- [Redux](https://redux.js.org) - for easy to understand, stable state management
- [Styled-Component](https://styled-components.com/) - for styles encapsulation
- [Polished](https://www.npmjs.com/package/polished) - for lightweight styles functionalities

#### Backend:

- [NodeJS](https://expressjs.com/) - for Javascript server environment
- [Express](https://expressjs.com/) - for minimal and flexible support of web app features in Node.js
- [MongoDB](https://www.mongodb.com/) - for persistent data storage
- [Passport](http://www.passportjs.org/) - for full user-pass auth support

### Solution advantages:

- clean UI
- simple UX
- using only em unit in styles
  - consistent font sizes, paddings, margins, same spaces throught components
- full error handling
  - single place of error handling for whole app
  - generic error catching (not necessary to use custom redux action [possible though], error will be catched from any action)
  - validation of fields
  - success/warning/info handling
  - reporting backend responses
  - catching backend errors and showing them to user
  - react error boundaries in crucial points (API connected/interactive)
- initial design library as a corner stone for consistent UI
- highly extendable, clean code
- hidden scrolls
- awesome drag and drop
- example tests - unit / snapshot

## Task description

Implement a simple version of Trello with two simple boards.
One board should contain a list of "In Progress" tasks and the other one should have a list of "Done" tasks.
The main idea consists of having each list (and the corresponding elements) stored in the MongoDB. You will receive the connection string from Axelra directly.
On the front-end side you can use whatever libraries you need.

### User Stories

- As a user I want to be able to create a new task with its description and label ("In Progress" / "Done").
- As a user I want to be able to move a certain tasks into another list
- As a user I want to be able to remove a specific task from a specific list

## General notes

- Feel free to experiment within this stack and let your creativity run freely.
- Use Typescript and follow the style conventions (e.g. stick to `styled-components`).
- Feel free to ask questions at every time.

# Installation Guidelines

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## External Dependencies (in addition to create-react-app's default)

- Styled Components
- Colors
- React Router
- Redux and Redux Thunk and Redux Middleware extension
- gh-pages (for deployment)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Deployment

####!! You don't need to deploy your app in order to complete the challenge.
But in case you want..this React Template is meant to be deployed to Netlify.
Connect your GitHub app with netlify and allow continuous integration.

> Example: https://lucky-react-starter.netlify.com

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
