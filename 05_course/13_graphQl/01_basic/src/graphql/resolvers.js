import { products } from '../data/products.js';
const resolvers={
    Query:{
        products:()=> products,
        product:(_,{id})=>products.find((item)=>item.id===id)
    }
};

export {resolvers}