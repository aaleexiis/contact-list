# Contact List

> Frontend job interview assignment

## Env Setup

The following tools are required to set up development environment:

- Node.js - v8.9.4 or higher
- npm - v5.6.0 or higher
- MongoDB database
```
npm install mongodb --save
```
- Mocha - v5.0.0 or higher (needed to run tests)
```bash
## you should install mocha globally
sudo npm i -g mocha
```
- IDE of your choice

## Development Setup
1. create project directory
2. clone project from [git repository](https://github.com/aaleexiis/contact-list.git)
3. stay in project root directory
4. install project dependencies
```
npm install
```

## Running project locally
1. start MongoDB
```
mongod -dbpath C:\location_to_MongoDB_folder
```

2. run frontend in first terminal (localhost:8080)
```
npm run dev
```
3. run backend in second terminal (localhost:3001)
```
node server.js
```
- test Contact List API with Postamn
- test Entropy app through browser: http://localhost:8080/#/

To run the back-end test suite, run the following command from the project root directory
```bash
npm test
```

## Staging / Production

Contact List is deployed on Heroku.

### Heroku
- Heroku app page: https://dashboard.heroku.com/apps/entropy-mgmt -TODO

### Deploying
- webpack is used as a module bundle
- /dist/ folder should be removed from .gitignore file

1. commit and push local changes to master
2. build for production (run from terminal positioned in project's root directory)
```
npm run build
```
3. once build has finished you can test build app locally
- run from terminal
```
npm start
```
- test in browser: http://localhost:3001/#/

4. if everything works as expected

- commit /dist/ folder
- push to master
- push to Heroku
```
git push heroku master
```
5. test app in browser

## Frontend
- Vue.js is used as a frontend framework
- UI components are implemented with Vuetify.js, Material Component Framework for Vue.js 2 https://vuetifyjs.com.