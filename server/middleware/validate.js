import Joi from 'joi'

const validate = (schema, req, res, next) => {
    const options = {
        abortEarly: true,
        stripUnknown: true
    }
    const {error, value} = schema.validate(req.body, options)
    
    let message = ''

    if(error) {
        switch(error.details[0].path[0]) {
            case 'first_name':
                message = 'Wrong first name'
                break
            case 'last_name': 
                message = 'Wrong last name'
                break
            case 'email': 
                message = 'Wrong e-mail'
                break
            case 'password':
                message = 'Wrong password'
                break
            case 'title':
                message = 'Field cannot be empty'
                break
            default:
                message = 'Incorrectly filled fields'
                break
        }

        return res.status(500).send(message)
    }

    req.body = value
    next()
}



export const registerValidator = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(50).required(),
        last_name: Joi.string().min(2).max(50).required(),
        email: Joi.string().email().required(), 
        password: Joi.string().min(6).max(12).required(),
        photo: Joi.string().allow()
    })

    validate(schema, req, res, next)
}

export const userValidator = (req, res, next) => {
	const schema = Joi.object({
		full_name: Joi.string().min(1).max(255).required(),
		user_name: Joi.string().min(1).max(255).required(),
		photo: Joi.string().allow(''),
		bio: Joi.string().allow(''),
		id: Joi.number().required()
	});
	validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(12).required()
    })

    validate(schema, req, res, next)
}

export const postValidator = (req, res, next) => {
	const schema = Joi.object({
		post_caption: Joi.string().required(),
		post_photo: Joi.string().allow('')
	});
	validate(schema, req, res, next);
};

export const commentsValidator = (req, res, next) => {
    const schema = Joi.object({
        comment: Joi.string().min(5).required(),
        userId: Joi.number().required()
    })

    validate(schema, req, res, next)
}

export const likeValidator = (req, res, next) => {
	const schema = Joi.object({
		like: Joi.boolean().required(),
		userId: Joi.number().required()
	});
	validate(schema, req, res, next);
};

export default validate