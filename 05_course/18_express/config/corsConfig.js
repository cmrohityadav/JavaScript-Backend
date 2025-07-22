const cors =require('cors');
const configureCors=()=>{

    return cors({
        // origin -> this will tell that which origins you want user can access your api
        origin:(origin,callback)=>{
                const allowedOrigin=[
                    'http://localhost:3000',
                    'https://mywebsite.com'
                ]

                if(!origin || allowedOrigin.indexOf(origin)!==-1){
                    callback(null,true) //giving permission so that req can be allowed
                }else{
                    callback(new Error('Not allowed by cors'))
                }
        },
        methods:['POST','PUT','DELETE','GET'],
        allowedHeaders:[
            'Content-Type',
            'Authorization',
            'Accept-Version'
        ],
        exposedHeaders:[
            'X-Total-Count',
            'Content-Range',
        ],
        credentials:true, //enable support for cookies


    })
}


module.exports={configureCors};