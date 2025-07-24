

// const urlVersioning = (version) =>{
//     return (req,res,next)=>{
//         if(req.path.startsWith(`/api/${version}`)){
//             next()
//         }else{
//             res.status(404).json({
//                 success:false,
//                 error:'API version is not supported'
//             })
//         }
//     }
// }

const urlVersioning=(version)=> (req,res,next)=>{
    if(req.path.startsWith(`/api/${version}`)){
            next()
        }else{
            res.status(404).json({
                success:false,
                error:'API version is not supported'
            })
        }
}

const headerVersioning=(version)=> (req,res,next)=>{
    if(req.get('Accept-Version')==version){
            next();
        }else{
            res.status(404).json({
                success:false,
                error:'API version is not supported'
            });
        }
}

const contentTypeVersion=(version)=>(req,res,next)=>{
    const contentType=req.get('Content-Type');

    if(contentType && contentType.includes(`application/vnd.api.${version}+json`)){
        next();
    }else{
        res.status(404).json({
                success:false,
                error:'API version is not supported'
            });
    }
}


module.exports={contentTypeVersion,headerVersioning,urlVersioning};