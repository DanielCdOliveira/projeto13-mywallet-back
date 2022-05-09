import joi from "joi";

const userSchema = joi.object({
    name: joi.string().min(1).required(),
    email: joi.string().min(1).required(),
    password: joi.string().min(1).required(),
    repPassword: joi.string().min(1).required(),
  });

async function registerValid(req,res, next){
    const user = req.body;
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
      res.status(422).send(error.details.map((detail) => detail.message));
    }
    if(user.password !== user.repPassword){
      res.sendStatus(422)
    }

next()
}

export default registerValid;