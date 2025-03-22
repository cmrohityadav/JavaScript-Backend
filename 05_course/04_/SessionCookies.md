# npm install cookie-parser
- A cookie parser is a middleware or library that extracts cookies from the HTTP request headers and converts them into a readable JavaScript object. 
- This allows a web server to easily access, manage, and modify cookies for user sessions and authentication

```bash
npm install cookie-parser

```

- A cookie is a small piece of data stored on a user's browser by a website. It helps websites remember information like logins, preferences, and shopping cart items.

# Session
- Tar kab tak jude rahega

# app.use(express.json())
- app.use(express.json()) is middleware in Express.js that parses incoming JSON data from HTTP requests and makes it available in req.body
- Allows Express to understand JSON data in POST and PUT requests.
- Converts raw JSON from the request body into a JavaScript object.
- Essential for APIs that receive JSON payloads (e.g., user registration, login).

- If you don’t use express.json(), req.body will be undefined when receiving JSON data


# app.use(express.urlencoded({extended:true}))
- This middleware in Express.js parses incoming form data (application/x-www-form-urlencoded) from HTML forms and makes it available in req.body.
- Reads form input (e.g., login forms, contact forms).
- Converts URL-encoded data into a JavaScript object.
- Allows nested objects when { extended: true } is used


