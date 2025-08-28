import urlSchema from "../schemas/urlSchema.js";

export const validateRequest = (schema) => {
    return (req, res, next) => {
        // Custom null/undefined check BEFORE calling Joi
        if (req.body == null || typeof req.body !== 'object') {
            return res.status(400).json({
                message: 'Request body is required and must be a valid JSON object'
            });
        }

        const { error } = urlSchema.validate(req.body, { 
            abortEarly: false,
            allowUnknown: false 
        }); 

        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(422).json({ 
                message: 'Validation failed', 
                errors: messages 
            });
        }

        next(); // Validation passed
    };
};

export default validateRequest;