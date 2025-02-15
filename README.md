# Math Pyramid Angular

![Math Pyramid](https://github.com/tobias-gaenzler/math-pyramid-react/blob/main/public/help_start.jpg?raw=true)

The game is about solving a math pyramid, a pyramid of numbers where each number is the sum of the two numbers below it. 
The game is a fun way to train basic addition and subtraction.
You can play the game on your own or with a friend (simple multiplayer mode). 

There also exists an implementation in React and in Vaadin:
* [Math Pyramid React](https://github.com/tobias-gaenzler/math-pyramid-react)
* [Math Pyramid Vaadin](https://github.com/tobias-gaenzler/math-pyramid)

Additionally, there is a simple AI solver for the game: [Math Pyramid AI Solver](https://github.com/tobias-gaenzler/math-pyramid-ai-solver)

## Technical Information
This is the Angular version of the Math Pyramid game. 
Angular app can be found in *app* folder.
Node.js serverside code including websocket server is located in *server* folder.
Frontend (angular) and backend (node.js) are implemented in typescript.

### Local Development
- build frontend app: *cd app && npm install && npm run build*
- start frontend app: *cd app && npm run start*
- start backend server: *cd server && npm install && npm run dev*

### Deployment
Node.js server provides websocket server and statically serves the frontend.
During deployment the websocket connection for the frontend to connect to the backend needs to be set e.g. when the app is build:
```
ANGULAR_APP_WS_URL=wss://<IP>:<PORT> npm run build
```
e.g. for render.com:
```
cd app && npm install && REACT_APP_WS_URL=wss://math-pyramid.onrender.com npm run build && cd ../server && npm install && npm run build
```
The server is started with (in the *server* folder):
```
npm run start
```
