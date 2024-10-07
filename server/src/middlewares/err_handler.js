import { AppError } from "../utils/errors.js";

export const errHandler = (err, req, res, next) => {

    if(err.name === 'ZodError'){
        return res.status(400).json({
            type: "Validation error",
            success: false,
            message: err.issues.map(issue => issue.message)
        });
    }
    
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            type: err.name,
            success: false,
            message: err.message
        });
    }
    
    return res.status(500).json({
        success: false,
        message: 'Something go wrong, please try later.'
    });
}