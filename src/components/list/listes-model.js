import mongoose from "mongoose";

const { Schema } = mongoose;

const listesSchemas = new Schema({
    title: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

const Liste = mongoose.model('Liste', listesSchemas);

export default Liste;