# npm install cookie-parser
- A cookie parser is a middleware or library that extracts cookies from the HTTP request headers and converts them into a readable JavaScript object. 
- This allows a web server to easily access, manage, and modify cookies for user sessions and authentication

```bash
npm install cookie-parser

```

- A cookie is a small piece of data stored on a user's browser by a website. It helps websites remember information like logins, preferences, and shopping cart items.
- cookie-parser ek middleware hai jo client ke browser se aayi cookies ko parse karta hai, aur req.cookies object me store karta hai — taaki aap unhe easily access kar sako.


# Session
- Tar kab tak jude rahega

# app.use(express.json())
- app.use(express.json()) is middleware in Express.js that parses incoming JSON data from HTTP requests and makes it available in req.body
- Allows Express to understand JSON data in POST and PUT requests.
- Converts raw JSON from the request body into a JavaScript object.
- Essential for APIs that receive JSON payloads (e.g., user registration, login).

- If you don’t use express.json(), req.body will be undefined when receiving JSON data


-express.json() ek middleware hai jo incoming request body ko automatically JSON format me parse kar deta hai.

Matlab:

Jab client (browser, Postman, frontend app) server ko koi JSON data bhejta hai (jaise POST, PUT requests me),

Toh yeh middleware use data ko JavaScript object me convert kar deta hai,

Taaki aap usko req.body ke through easily access kar sako.


💡 Real-Life Example:
Suppose client se aisi POST request aayi:
```json
{
  "name": "Amit",
  "age": 25
}
```
Agar express.json() use nahi kiya, toh:


console.log(req.body); // ❌ undefined
Agar express.json() use kiya, toh:

console.log(req.body); // ✅ { name: 'Amit', age: 25 }



# app.use(express.urlencoded({extended:true}))
- This middleware in Express.js parses incoming form data (application/x-www-form-urlencoded) from HTML forms and makes it available in req.body.
- Reads form input (e.g., login forms, contact forms).
- Converts URL-encoded data into a JavaScript object.
- Allows nested objects when { extended: true } is used


- express.urlencoded() ek middleware hai jo HTML form data ko parse karta hai (i.e., application/x-www-form-urlencoded data).

💡 Use hota hai jab:
Aap frontend se HTML form submit karte ho using POST method.

Data URL-encoded format me server pe aata hai (jaise: name=Rahul&age=25).

🔍 Real-World Example:
HTML form:
```html
<form action="/submit" method="POST">
  <input name="name" />
  <input name="age" />
  <button type="submit">Send</button>
</form>
```
Jab user submit karega, data server ko aise milega:

```js
name=Rahul&age=25
```
⚠️ Agar aap express.urlencoded() use nahi karoge:
```js
console.log(req.body); // ❌ undefined
```
But agar aap use karte ho:

```js
app.use(express.urlencoded({ extended: true }));
console.log(req.body); // ✅ { name: 'Rahul', age: '25' }
```
🔧 Syntax:
```js
express.urlencoded({ extended: true })
🧠 extended: true vs extended: false kya hota hai?
```

Option	Meaning
extended: false	Simple data only (key=value style), uses querystring module
extended: true	Nested object ya arrays bhi parse ho jate hain, uses qs module
⚙️ Example:
extended: true
js
Copy
Edit
name=Rahul&skills[]=JS&skills[]=C++
↓
{ name: 'Rahul', skills: ['JS', 'C++'] }
extended: false
Wahi data properly parse nahi hota – skills[] ko string hi samjhta hai.

✅ When to use express.urlencoded()?
Jab aap HTML forms se data le rahe ho.

Jab content-type ho: application/x-www-form-urlencoded

Jab POST/PUT requests me form-data bheja jata hai.





