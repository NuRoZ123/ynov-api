import UsersModel from "#components/users/users-model.js";
import Joi from "joi";
import argon2 from "argon2";
import {sendWelcomeMail} from "#services/mailing/welcome-email.js";

export async function register(ctx) {
    try {
        const registerValidationSchema = new Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            terms_and_conditions: Joi.boolean().valid(true).required(),
        });

        const params = ctx.request.body;
        const { error, value } = registerValidationSchema.validate(params);
        if(error) throw new Error(error);

        const hashPassword = await argon2.hash(value.password);
        const newUser = new UsersModel({
            ...value,
            password: hashPassword,
            settings: {
                terms_and_conditions: value.terms_and_conditions
            }
        });

        newUser.generateEmailVerificationToken();
        const user = await newUser.save();

        await sendWelcomeMail(user, user.settings.validation_mail_token);

        ctx.ok(user.generateJWT());
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function login (ctx) {

}