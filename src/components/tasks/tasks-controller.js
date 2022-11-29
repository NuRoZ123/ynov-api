import tasksModel from "#components/tasks/tasks-model.js";
import Joi from "joi";

export async function getAll(ctx) {
    try {
        ctx.body = await tasksModel.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getAllByListId(ctx) {
    try {
        if(!ctx.params.listId) throw new Error("No id supplied");
        const tasks = await tasksModel.findByListId(ctx.params.listId);
        ctx.ok(tasks);
    } catch (e) {
        ctx.badRequest({message: e.message});
    }
}

export async function getOne(ctx) {
    try {
        ctx.body = await tasksModel.find({_id: ctx.params.id});
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const tasksValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().max(255),
            list: Joi.string().required(),
            done: Joi.boolean().required()
        });

        const { error } = tasksValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        let tasksObj = ctx.request.body;

        await tasksModel.create(tasksObj);
        ctx.response.status = 201;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function edit(ctx) {
    try {
        const tasksValidationSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().max(255),
            list: Joi.string().required(),
            done: Joi.boolean().required()
        });

        const { error } = tasksValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);


        let tasksObj = ctx.request.body;

        await tasksModel.updateOne({_id: ctx.params.id}, {$set: tasksObj});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function remove(ctx) {
    try {
        await tasksModel.findOneAndRemove({_id: ctx.params.id});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}