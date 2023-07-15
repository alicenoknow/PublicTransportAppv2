## Visualization of public transport traffic

## 💻 Prerequisites
- Node.js 
- npm
- vs code (preferable as all setup is for this IDE)

## 🧱 Steps:
1. Install all tools mentioned above 
2. Clone this repo
3. Run `cd PublicTransportAppV2`
4. Run `npm install`
5. Tap _Extensions_ in vs code, type "@recommended" and install all from section "Workspace recommendations"
6. Run `npm start` and everything should be ready to start 🚀

If you have any issues with setting up the project, feel free to reach out me [@alicenoknow](https://github.com/alicenoknow)

## 📚 Useful resources
- [React docs](https://en.reactjs.org/docs/getting-started.html)
- [React Boostrap](https://react-bootstrap.github.io/getting-started/introduction)
- [Jest - for testing](https://jestjs.io/docs/getting-started)
- [Prettier - code formatter we use](https://prettier.io/docs/en/index.html)
- [Eslint - linter we use](https://eslint.org/docs/about/)
- [Redux - we will probably use it](https://react-redux.js.org/)
- [React Router - we will probably use it](https://reactrouter.com/docs/en/v6)

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8000](http://localhost:8000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## 🛠 Technology
React 17.0.2 

## Production build with Docker
`docker build . -t website:latest`

`docker run -it --rm -d -p 8000:80/tcp --name app1 website`

## App

![r1](https://github.com/alicenoknow/PublicTransportAppv2/assets/56412617/843c3a12-5f04-4b73-b382-10c809e60f29)
