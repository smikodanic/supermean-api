#API - Application Programming Interface
This directory contains API files.  
According to http://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm


#Endpoints
GET /examples/auth  

POST /examples/auth/users1-insmulti  
{"userArr": [
    {
        "name": "John Deer",
        "username": "john",
        "pass": "test"
    },
     {
        "name": "Pero perić",
        "username": "pero",
        "pass": "test"
    },
     {
        "name": "Marko Marković",
        "username": "marko",
        "pass": "test2"
    }
]}  
GET /examples/auth/users1-getall  
DELETE /examples/auth/users1-delall  
{q: {}}  
  
POST /examples/auth/users2-insmulti  
{"userArr": [
        {
            "name": "John Deer",
            "username": "john",
            "pass": "test"
        },
         {
            "name": "Pero perić",
            "username": "pero",
            "pass": "test"
        },
         {
            "name": "Marko Marković",
            "username": "marko",
            "pass": "test2"
        }
]}  
GET /examples/auth/users2-getall  
DELETE /examples/auth/users1-delall  
{q: {}}  
  
GET /examples/auth/passport/  
GET /examples/auth/passport/badauth  
GET /examples/auth/passport/basicstrategy  
GET /examples/auth/passport/digeststrategy  
GET /examples/auth/passport/jwtstrategy-gettoken  (get token after successful login with username:pass)   
GET /examples/auth/passport/jwtstrategy 

