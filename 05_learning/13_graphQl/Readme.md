# GraphQL
- GraphQL ek query language hai — jaise SQL hoti hai relational database ke liye, GraphQL API ke liye hoti hai
- Iska istemal client aur server ke beech data exchange ke liye hota hai
- Isse tum exact wahi data maang sakte ho jo chahiye — na jyada, na kam

## GraphQL vs REST API
- REST API: Fixed endpoints hote hain. Jaise /users, /users/123/posts. Har endpoint ek fixed data structure deta hai
- GraphQL: Sirf ek endpoint hota hai — /graphql. Tum apni query mein specify karte ho kaunsa data chahiye, aur kaise chahiye

## Kyu use karte hain?
✅ Over-fetching nahi hota: Sirf wahi data aata hai jo maanga hai.
✅ Under-fetching nahi hota: Tum ek hi request mein multiple cheezein laa sakte ho.
✅ Flexible hota hai: Frontend developer decide karta hai kya data chahiye.
✅ Strongly typed: Tumhe pata hota hai kya aayega

## MongoDB + GraphQL
- Agar tum MongoDB istemal kar rahe ho toh GraphQL ka backend mein use hota hai — GraphQL queries ka data tum MongoDB se fetch karke return karte ho.

- SQL mein tum queries likhte ho

- MongoDB mein tum queries likhte ho

- GraphQL mein tum API ko queries bhejte ho, aur woh backend (MongoDB ya SQL) se data laake deta hai.
