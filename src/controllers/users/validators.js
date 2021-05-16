const Joi = require ("@hapi/joi");

const signInSchema = Joi.object().keys({
	full_name: Joi.string()
		.required(),
  email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid Email" }),
  password: Joi.string().required()
 
});

const logInSchema = Joi.object().keys({

	email: Joi.string()
    .email()
    .required()
    .messages({ "string.email": "Please enter a valid Email" }),
  password: Joi.string().required()
 
});

const validateSignUpData = (req, res, next) => {
  const { body } = req;
  const { error } = signInSchema.validate(body);
  if (error) {
		console.log("VALIDATION ERROR ", error.message)
    return res.status(422).json({error: error	.message});
  }
	console.log("NO VALIDATION ERROR")
  return next();
};


const validateLogInData = (req, res, next) => {
  const { body } = req;
  const { error } = logInSchema.validate(body);
  if (error) {
		console.log("VALIDATION ERROR ", error.message)
    return res.status(422).json({error: error	.message});
  }
	console.log("NO VALIDATION ERROR")
  return next();
};

exports.validateSignUpData = validateSignUpData
exports.validateLogInData = validateLogInData
