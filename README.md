# SuperMEAN - API
SuperMEAN-API is framework for fast API development in NodeJS, ExpressJS and MongoDB.

Usually used with [Supermean-SPA](https://github.com/smikodanic/supermean-spa) (Single Page App) framework.

More information on [www.supermean.org](http://www.supermean.org) .



## INSTALLATION
```bash
$ git clone git@github.com:smikodanic/supermean-api.git
$ cd supermean-api-ts
$ rm -rf .git
$ npm install
```



## PORT
Deafult dev port is 9011 and 9010 for prod env.

GET [localhost:9011/apiinfo](http://localhost:9011/apiinfo)

```json
API RESPONSE:
"api": {
        "name": "SuperMEAN API",
        "version": "v1",
        "url": "http://api-dev.supermean.org",
        "environment": "dev",
        "server": {
            "virtualHost": false,
            "domain": "api-dev.supermean.org",
            "port": 9011
        }
    },
    "nodejs": {
        "version": "v9.6.1",
        "platform": "linux",
        "uptime": 85.514,
        "uptime_human": "0 days 0 hours 1 minutes 25.513999999999996 seconds"
    },
    "mongoose": {
        "version": "5.1.3"
    },
    "socket_io": {
        "version": "2.1.1"
    },
    "client": {
        "ip": "::1",
        "headers": {
            "host": "localhost:9011",
            "connection": "keep-alive",
            "cache-control": "no-cache",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
            "postman-token": "ddfe72a9-7f09-410c-3474-2bb85c72e9de",
            "accept": "*/*",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9,hr;q=0.8"
        },
        "body": {},
        "params": {},
        "query": {}
    }
}
```



## GULP DEVELOPMENT
```
export NODE_ENV=dev
gulp default (watches for file changes)
```

## INTEGRATED FEATURES
- npm
- expressjs
- pasportjs auth strategies
- bluebird promises
- gulp
- nodemon or pm2
- mongoose
- error and access logger
- mongoDB rebuild indexes
- virtual host with vhost npm (optional)


## AUTHENTICATION & AUTHORIZATION (Built inside)
Basic and integrated authentiaction is JWT.


## ENVIRONMENTS
* development: *$export NODE_ENV=dev*
* production: *$export NODE_ENV=prod*


## ENVIRONMENT VARIABLES
- export NODE_RIND=true (will rebuild all mongo indexes)
- export NODE_LOG_ERRORS=true (will log all errors to 'log_errors' mongo collection)
- export NODE_LOG_ACCESS=true (will log all API access to 'log_access' mongo collection)


## ERROR LEVELS
'error', 'warning', 'info', 'debug'



## MongoDB
API requires MongoDB database which is configured in

**/server/app/config/env/dev.js**
or
**/server/app/config/env/prod.js**



Start mongo server:

*rm /var/lib/mongodb/mongod.lock*

*mongod --config /etc/mongod.conf*



## EXAMPLE ENDPOINTS
User registration, login and get logged user info. JWT Passport authentication is used.
Two user roles: admin and customer.
```
POST /users/register
{
    "first_name": "Marko",
    "last_name": "Marković",
    "address": "Radića 23",
    "city": "Osijek",
    "country": "Croatia",

    "phone": "+385-93-2111-222",
    "email": "test@uniapi.com",
    "website": "www.uniapi.org",

    "username": "admin",
    "password": "test123",

    "role": "admin"
}

POST /users/login
{
	"username": "admin",
	"password": "test123"
}

GET /users/loggedinfo (Authorization: JWT ...)
GET /admin/test (Authorization: JWT ...)
GET /customer/test (Authorization: JWT ...)
```




### Licence
MIT

*Freely you received, freely give. , Mt10:8*

