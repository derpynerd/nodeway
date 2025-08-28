import urlSchema from "../schemas/urlSchema.js";

export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = urlSchema.validate(req.body, { abortEarly: false }); 

        if (error) {
            const messages = error.details.map(detail => detail.message);
            return res.status(422).json({ message: 'Validation failed', errors: messages });
        }

        next(); // Validation passed
    };
};

export default validateRequest;