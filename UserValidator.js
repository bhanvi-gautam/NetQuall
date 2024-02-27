const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../helper/ApiError');
const decryptData = require('../helper/EncryDecryHelper');

class UserValidator {
    constructor() {
        this.DATAEncryptionKey = '6d090796-ecdf-11ea-adc1-0242ac112345'
    }
  
    async userCreateValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().valid(Joi.ref('password')).required(),
            first_name: Joi.string(),
            last_name: Joi.string(),
            address: Joi.string(),
            phone_number: Joi.number(),
            profile:[Joi.string().optional(), Joi.allow(null)],
            occupation:Joi.number()
            
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        // console.log("req.body==",req);
        // const decrypt=decryptData.decryptData(req.body,'6d090796-ecdf-11ea-adc1-0242ac112345')
        // console.log("decrypt==",decrypt);
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
    

    async userViewValidator(req,res,next){
        const schema = Joi.object({
            
        });
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }

    }


    async userLoginValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const decrypt=decryptData.decryptData(req.body,'6d090796-ecdf-11ea-adc1-0242ac112345')
        console.log("decrypt==",decrypt);
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    async checkEmailValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            email: Joi.string().email().required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        // const decrypt=decryptData.decryptData(req.body,'6d090796-ecdf-11ea-adc1-0242ac112345')
        // console.log("decrypt==",decrypt);
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    async changePasswordValidator(req, res, next) {
        // create schema object
        const schema = Joi.object({
            old_password: Joi.string().required(),
            password: Joi.string().min(6).required(),
            confirm_password: Joi.string().min(6).required(),
        });

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }

    async passwordValidator(req, res, next){
        const schema = Joi.object({
            userId:Joi.number(),
            email:Joi.string().email(),
            oldPassword: Joi.string().required(),
        });
         // schema options
         const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        };

        // validate request body against schema
        const { error, value } = schema.validate(req.body, options);

        if (error) {
            // on fail return comma separated errors
            const errorMessage = error.details
                .map((details) => {
                    return details.message;
                })
                .join(', ');
            next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            req.body = value;
            return next();
        }
    }
}

module.exports = UserValidator;
