import exemplesModel from "#components/exemples/exemples-model.js";
import Joi from "joi";

export async function getAll(ctx) {
    try {
        ctx.body = await exemplesModel.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getOne(ctx) {
    try {
        ctx.body = await exemplesModel.find({_id: ctx.params.id});
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const exempleValidationSchema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().max(255),
            colors: Joi.array().has(Joi.string().optional()).optional(),
            price: Joi.number().required()
        });

        const { error } = exempleValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        await exemplesModel.create(ctx.request.body);
        ctx.response.status = 201;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function edit(ctx) {
    try {
        const exempleValidationSchema = Joi.object({
            name: Joi.string(),
            description: Joi.string().max(255),
            colors: Joi.array().has(Joi.string().optional()),
            price: Joi.number()
        });

        const { error } = exempleValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        await exemplesModel.updateOne({_id: ctx.params.id}, {$set: ctx.request.body});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function remove(ctx) {
    try {
        await exemplesModel.findOneAndRemove({_id: ctx.params.id});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}