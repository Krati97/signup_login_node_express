# Login and signup using NodeJs and ExpressJs.

## Steps for project setup:
```
npm install
touch .env
```
Add MONGODB_URI, PORT, JWT_SECRET_KEY with proper values in .env file created above.
### To run the server use: 
```
nodemon server.js
```

### API End Points:
POST
1. Register(Sign Up) : /user/register
 - name (mandatory)
 - email (mandatory)
 - password (mandatory)
 - confirmPassword (mandatory)
 - address
 - age
2. Login: /user/login
 - email (mandatory)
 - password (mandatory)

