# SuperMEAN - API
SuperMEAN-API is framework for build API in NodeJS, Express and MongoDB.

Usually tied with [Supermean-SPA](https://github.com/smikodanic/supermean-spa) (Single Page App) framework.

More information on [www.supermean.org](http://www.supermean.org) .

&nbsp;

## INSTALLATION
```bash
npm install -g generator-supermean
yo supermean
gulp
```

&nbsp;

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



&nbsp;


## GULP DEVELOPMENT
```
export NODE_ENV=dev
gulp default (watches for file changes)
```


&nbsp;

## INTEGRATED FEATURES
- npm
- expressjs
- pasportjs auth strategies
- bluebird promises
- gulp
- nodemon or pm2
- mongoose
- virtual host with vhost npm (optional)

&nbsp;

## AUTHENTICATION & AUTHORIZATION (Built inside)
PassportJS strategies are applied:
- [Basic](http://passportjs.org/docs/basic-digest)
- [Digest](http://passportjs.org/docs/basic-digest)
- [Json Web Token  (JWT)](https://github.com/themikenicholson/passport-jwt)
- [HASH](https://github.com/yuri-karadzhov/passport-hash)

&nbsp;

## ENVIRONMENTS
* development: *$export NODE_ENV=dev*
* production: *$export NODE_ENV=prod*

&nbsp;

## MongoDB
API requires MongoDB database which is configured in

**/server/app/config/env/dev.js**
or
**/server/app/config/env/prod.js**

&nbsp;

Start mongo server:

*rm /var/lib/mongodb/mongod.lock*

*mongod --config /etc/mongod.conf*


&nbsp;
## EXAMPLE ENDPOINTS
If you want to play with examples this is the list of already prepared API endpoint to test Basic, Digest, JWT and HAsh authentication:
```
POST /examples/auth/users1-insmulti
POST /examples/auth/users2-insmulti
GET /examples/auth/users1-getall
GET /examples/auth/users2-getall
DELETE /examples/auth/users1-delete
DELETE /examples/auth/users2-delete


POST /examples/auth/passport/basicstrategy
GET /examples/auth/passport/basicstrategy/getsomedata

GET /examples/auth/passport/digeststrategy

POST /examples/auth/passport/jwtstrategy-gettoken
GET /examples/auth/passport/jwtstrategy
GET /examples/auth/passport/jwtstrategy/getsomedata

POST /examples/auth/passport/hashstrategy-gethash
GET /examples/auth/passport/hashstrategy/e7b1951a91718085f4382391c31ef175df72addddb
GET /examples/auth/passport/hashstrategy/getsomedata/e7b1951a91718085f4382391c31ef175df72addddb
```


&nbsp;

###Licence
MIT

**Freely you received, freely give. , Mt10:8**

&nbsp;

&nbsp;
