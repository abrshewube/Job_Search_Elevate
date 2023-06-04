# Elevate

Dashboard for tracking job applications. Visual representation of data with [recharts](https://recharts.org/). CRUD functionality for Jobs, search function, user profile, database for jobs and users. Security packages used: helmet, cors, xss, rate-limiter & mongoSanitize

_Technologies applied: React, Node, Express, mongoDB, styled components, Sass_

### ES6 Syntax in Node.js

package.json: "type" : "module" at the top

Imports require the .js extension

```sh
import file.js from "./file.js"
```

### Concurrently (setup in server package.json)

```sh
"scripts": {
"server": "nodemon server --ignore client",
"client": "npm start --prefix client",
"start": "concurrently --kill-others-on-fail \"npm run server\" \" npm run client\""
},
```

### Proxy setup

Only for development

package.json in client

```sh
"proxy":"http://localhost:5000"
```

Conveniently, this avoids CORS issues and error messages in development

### Login/Register routes in Postman

In tests

```sh
const jsonData = pm.response.json()
pm.globals.set("token",jsonData.token);
```

Authorization

```sh
{{token}}
```

### SVGO

Minify SVGs and fix Namespace issue

```sh
svgo logo.svg -o logo.min.svg
```

### Mockaroo

Generate mock data

[Mockaroo](https://www.mockaroo.com/)

### Recharts

Awesome library for charts

[Recharts](https://recharts.org)

### populate mongoDb with data

```sh
node populate
```

### Aggregation Pipeline with mongoDB

```sh
import mongoose from 'mongoose'

const showStatistics = async (req, res) => {
  let statistics = await MySchema.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ])

  res.status(StatusCodes.OK).json({ statistics })
}
```

### Production setup

```sh
package.json
"scripts": {
    "build-client": "cd client && npm run build",
    "server": "nodemon server.js --ignore client",
    "client": "cd client && npm run start",
    "start": "concurrently --kill-others-on-fail \"npm run server\" \"npm run client\""

  },
```

### Testing with cypress

`npx cypress open`

in CLIENT `package.json` add

```sh
  "scripts": {
    "test": "cypress open",
  },
  "eslintConfig": {
    "extends": [
        # Omits eslint from marking cy. as not defined
      "plugin:cypress/recommended"
    ]
  },
```

`npm test` to open cypress
