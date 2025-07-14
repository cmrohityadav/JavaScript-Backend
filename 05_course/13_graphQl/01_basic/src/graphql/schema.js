import gql from 'graphql-tag';
// String
// Int
// Float
// Boolean
// ID -> an unique identifier


//ID! => Ye unique ID hai, ! matlab yeh field required hai.

// type Product => Ek product ka structure define karta hai like schema in mongoose

//  type Query => like controllers
// type Query => Ye batata hai ki client kya kya query kar sakta hai
// Bilkul Express ke route/controller jaisa
// products => Express mein GET /products
// product(id:ID!) => Express mein GET /product/:id

const typeDefs = gql`
type Product {
    id:ID!
    title:String! 
    category:String! 
    price:Float! 
    inStock:Boolean! 
}
type Query{
    products:[Product!]!
    product(id:ID!):Product
}

type Mutation{
    createProduct(
        title:String! 
        category:String! 
        price:Float! 
        inStock: Boolean! 
        
    ):Product
}

`;

export {typeDefs}