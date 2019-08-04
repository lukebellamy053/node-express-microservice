# Node-JS Express Microservice
![Logo](./assets/img/logo.png)

This is a framework for building a microservice with express JS

[![CircleCI](https://circleci.com/gh/lukebellamy053/node-express-microservice/tree/master.svg?style=shield)](https://circleci.com/gh/lukebellamy053/node-express-microservice/tree/master)
[![Maintainability](https://api.codeclimate.com/v1/badges/8f19766e87bd425fb5b6/maintainability)](https://codeclimate.com/github/lukebellamy053/node-express-microservice/maintainability)
[![Coverage](https://api.codeclimate.com/v1/badges/8f19766e87bd425fb5b6/test_coverage)](https://codeclimate.com/github/lukebellamy053/node-express-microservice/test_coverage)
[![Known Vulnerabilities](https://snyk.io//test/github/lukebellamy053/node-express-microservice/badge.svg?targetFile=package.json)](https://snyk.io//test/github/lukebellamy053/node-express-microservice?targetFile=package.json)
[![Dependencies](https://david-dm.org/lukebellamy053/node-express-microservice.svg)](https://david-dm.org/lukebellamy053/node-express-microservice)
[![NPM Version](https://img.shields.io/npm/v/node-express-microservice.svg?style=flat)](https://www.npmjs.org/package/node-express-microservice)
[![Downloads](https://img.shields.io/npm/dw/node-express-microservice)](https://www.npmjs.org/package/node-express-microservice)


## Installation
Newer versions of NPM save the package to your package.json by default
```sh
$ npm i node-express-microservice
```

## Usage
This package sets up a basic express server that can connect to MongoDB and map methods in controllers to your routes. The aim of this package is to speed up API development by allowing the developer to spend less time writing infrastructure and more time writing code.

### Extend The ExpressServer Class
In order to create a new server, you need to create a server that extends the ExpressServer class and imports any controllers you want to use.

```
import { ExpressServer, PathHandler } from 'express-microservice';
import { TestController } from '../controllers/GatewayController';

/**
 * A sample server class
 */
export class GatewayServer extends ExpressServer {
    /**
     * Register the URL paths
     */
    paths() {
        // The controllers needs to be registers before they can be created
        super.paths();
        // Import the controller and add it to the list
        PathHandler.addController({
            TestController: TestController
        });
        PathHandler.registerDefaults();
    }
} 
```
### Create the controller class
The following controller will listen for a GET reuest to /test and then return "Hello World" in a JSON Object
```
import { Controller, route, Method } from 'express-microservice';
/**
 * A sample controller class
 */
export class TestController extends Controller {

    @route({
        path: '/test',
        method: Method.GET,
        protected: false
    })
    public test() {
        this.success('Hello world');
    }
}
```
Navigating to localhost/test will yield
```
{
  "success": true,
  "data": "Hello world"
}
```

The success method can take any data format that can be parsed into JSON. So you can return other JSON objects, arrays, numbers, strings etc.

If you don't want to use the pre-defined response object, you can also use the this.send(data) method to send your own custom response back to the user.

### Protecting Paths

If a path is protected, the server will naturally look for a JWT in the bearer header. If one is found, it will be processed and checked to ensure it's valid. If the token is valid, the request will be allowed to proceed to the handler. Failed requests will see a message telling them they are unauthorised.

The controller has now been updated to include a protected method
```
import { Controller, route, Method } from 'express-microservice';

export class TestController extends Controller {

    @route({
        path: '/test',
        method: Method.GET,
        protected: false
    })
    public test() {
        this.success('Hello world');
    }

    @route({
        path: '/locked',
        method: Method.GET,
        protected: true
    })
    public locked() {
        this.success('Hello world');
    }

}
```

When trying to access this method from the brower, the user will see the following response:
```
{
  "success": false,
  "error": "Invalid auth token provided.",
  "version": "0.0.1",
  "build": 1,
  "service": "Gateway"
}
```
This response is designed to give the developer enough information to help debug any issues whilst informing the user that they don't have access to the requested resource.

### Starting a server
Once you have a server class and a controller set up, you'll want to create the server class to get everything working. The server class takes a JSON object containing environment variables that you want the server to know. Some of these variables will allow features such as MongoDB connectivity.

The following code will create a new Gateway Server and set the app version, build number, port to run on and the service name
```
import { GatewayServer } from './server/GatewayServer';
var pjson = require('../package.json');

/**
 * Create the gateway server
 */
new GatewayServer({
    APP_VERSION: pjson.version,
    APP_BUILD: pjson.build,
    PORT: process.env.PORT || 80,
    SERVICE_NAME: 'Gateway'
});
```

### Overriding methods

Most of the methods of the server and controllers can be overwritten to allow you to define your own logic as what works for one will not always work for everyone else.

The paths method of the ExpressServer class is an example of a method that should be overriden. This allows you to define your own routes or to create proxy routes rather than handlers. This is particularly useful if you are creating an API gateway.
```
export class GatewayServer extends ExpressServer {

    /**
    * Get the express app
    */
    public get serverApp() {
        return this.app;
    }

    // noinspection JSUnusedGlobalSymbols
    paths() {
        // The controllers needs to be registers before they can be created
        super.paths();

        PathHandler.addController({
            TestController: TestController
        });

        //sPathHandler.registerRouteArray(routes);
        PathHandler.registerDefaults();
    }
    
}
```
