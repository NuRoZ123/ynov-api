import listeModel from "#components/list/listes-model.js";
import Joi from "joi";
import tasksModel from "#components/tasks/tasks-model.js";

export async function getAll(ctx) {
    try {
        ctx.body = await listeModel.find()
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function getOne(ctx) {
    try {
        let liste = await listeModel.findById(ctx.params.id).lean();
        liste.tasks = await tasksModel.findByListId(ctx.params.id);

        ctx.body = liste;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function create(ctx) {
    try {
        const listeValidationSchema = Joi.object({
            title: Joi.string().required()
        });

        const { error } = listeValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);

        let listeObj = ctx.request.body;

        await listeModel.create(listeObj);
        ctx.response.status = 201;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function edit(ctx) {
    try {
        const listeValidationSchema = Joi.object({
            title: Joi.string(),
        });

        const { error } = listeValidationSchema.validate(ctx.request.body);
        if(error) throw new Error(error);


        let exempleObj = ctx.request.body;

        await listeModel.updateOne({_id: ctx.params.id}, {$set: exempleObj});
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}

export async function remove(ctx) {
    try {
        await listeModel.findOneAndRemove({_id: ctx.params.id});
        await tasksModel.deleteMany()
        ctx.response.status = 200;
    } catch (e) {
        ctx.badRequest({message: e.message})
    }
}