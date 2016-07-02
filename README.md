# Simple Expressjs app + Redis

This Node app is a simple collection app, designed to utilize Redis to make data persistent with an option to add/remove recorords and load item details, using EJS templates.

Clone this repo and run this command:

```bash
npm install
```

Start Redis locally:

```bash
redis-server
```

Once complete, run the app and serve it to localhost:

```bash
npm start
```



## Redis

In order to insall Redis locally, run:

```bash
brew install redis
```

To start Redis, run:

```bash
redis-server
```




## Tests

To run tests, use the following command:

```bash
npm test
```

Libraries used for tests - `supertest`, `mocha`


