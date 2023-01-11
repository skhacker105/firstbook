
### Description

First Book is a simple single page application (SPA) that lets you maintain your daily client management. It helps you keep track of potential clients, your product rates and items for your current clients. It also maintains your transactional data if added any

### Tech

First Book uses a number of open source projects to work:
* [MongoDB](https://www.mongodb.com) - Free and open-source cross-platform document-oriented database
* [Mongoose](http://mongoosejs.com/index.html) - Elegant MongoDB object modeling for NodeJS
* [NodeJS](https://nodejs.org/en/) - Evented I/O for the backend
* [ExpressJS](https://expressjs.com) - Fast, unopinionated, minimalist web framework for NodeJS
* [JSONWebToken](https://jwt.io) - Used for authorization
* [Angular](https://angular.io) - Platform that makes it easy to build applications with the web

The goal of this project aims to maintain daily verbal and financial transactions of businessmen, vendors and clients. In this project I've used

* Wrapped each major feature into a module
* Lazy-loading for most of the modules so the app can start faster
* Preload lazy-loaded modules after the app starts so they can be ready for use as soon as possible
* Shared module for compoennts, directives and pipes that can be imported into any feature module
* Services for each major feature
* Guards to prevent unauthorized users to view routes that require authentication or admin rights
* Interceptors for attaching JWT token to the request headers, showing notifications from the server response and error handling
* Custom directives
* Custom pipes
* TypeScript models
* Reactive forms for handling user input

### Installation

Book Store requires 
* [MongoDB](https://www.mongodb.com/download-center#community) v6.0.1+
* [MongoDBCompass](https://www.mongodb.com/download-center#community) v1.34.2+
* [NodeJS](https://nodejs.org/en/) v18.13.0+
* [NPM](https://www.npmjs.com/package/angular) v9.2.0+
* [Angular CLI](https://www.npmjs.com/package/@angular/cli) v15.0.5+

To start the database (port: 27017): Install MongoDB, open new cmd window (in project root) and run

```sh
$ cd server
$ start-mongodb
```

To add initial seeding: (do this step once only the first time you start the app)
After you start MondoDB open new cmd window (in project root) and run

```sh
$ cd server
$ seedBooks
```

To start the server (port: 8000): open new cmd window (in project root) and run

```sh
$ cd server
$ npm install (if you havent already installed the dependencies)
$ npm start
```

To start the client (port: 4200): open new cmd window (in project root) and run

```sh
$ cd client
$ npm install (if you havent already installed the dependencies)
$ ng serve
```

### Features

- Anonymous users
    - Login/Register
    - Find Business Owners or Products
    - Contact business owners

- Authenticated users
    - Maintain Contacts
    - Add/Delete Events on One or more dates
    - Request for price details or other queries from Business Owners
    - Place purchase request for queries
    - Maintain purchase flow
    - Comment on products
    - View products of different businesses
    - View his own purchases history
    - Create favourite contact/product/vendor/client list
    - Can change his own avatar
    - Send / Schedule reminders for self or contacts

- Business Admin users
    - Add products to the store
    - Edit products
    - Delete products
    - Delete offensive user comments
    - Block/Unblock user from commenting
    - Communicate with user queries
    - Manage purchase workflows
    - Manage financial data
    - Create favourite contact/product/vendor/client list
    - Manage all work from dashboards
    - Send / Schedule reminders for self or contacts

### Authors

* [Saurabh Kumar](https://github.com/skhacker105)

### License
----

MIT