class APIError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
        this.name='APIError'//set the error type to API Error
        Error.captureStackTrace(this, this.constructor); //Mujhe stack trace banana hai, par is constructor ko chhodo — sirf wahi code dikhana jaha se throw hua

    }
}

/**
 * function asyncHandler(fn) {
    return function(req, res, next) {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}
 */
const aysncHandler=(fn)=>(req,res,next)=>{
    Promise.resolve(fn(req,res,next)).catch(next);
}

const globalErrorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err instanceof APIError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  if (process.env.NODE_ENV === 'production' && !(err instanceof APIError)) {
    message = 'Internal Server Error';
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};


module.exports={aysncHandler,APIError,globalErrorHandler}