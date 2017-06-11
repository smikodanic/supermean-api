# SuperMEAN - API
SuperMEAN-API is framework for build API in NodeJS, Express and MongoDB.

Usually tied with [Supermean-SPA](https://github.com/smikodanic/supermean-spa) (Single Page App) framework.

More information on [www.supermean.org](http://www.supermean.org) .



## INSTALLATION
```bash
npm install -g generator-supermean
yo supermean
gulp
```



## PORT
Deafult port is 9005 for dev and 9001 for prod env.

GET [localhost:9005](http://localhost:9005)

```json
API RESPONSE:
{
	"api": {
		"name": "SuperMEAN API",
		"url": "http://api.dev.supermean.org",
		"environment": "dev",
		"server": {
			"virtualHost": false,
			"domain": "api.dev.supermean.loc",
			"port": 9005
		}
	},
	"nodejs": {
		"version": "v4.4.5",
		"platform": "linux",
		"uptime": 724.715,
		"uptime_human": "0 days 0 hours 12 minutes 4.715000000000032 seconds"
	},
	"mongoose": {
		"version": "4.5.7"
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
- virtual host with vhost npm (optional)



## AUTHENTICATION & AUTHORIZATION (Built inside)
PassportJS strategies are applied:
- [Basic](http://passportjs.org/docs/basic-digest)
- [Digest](http://passportjs.org/docs/basic-digest)
- [Json Web Token  (JWT)](https://github.com/themikenicholson/passport-jwt)
- [HASH](https://github.com/yuri-karadzhov/passport-hash)



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
```
POST /users/register
POST /users/login
GET /users/loggedinfo
```




### Licence
MIT

**Freely you received, freely give. , Mt10:8**

