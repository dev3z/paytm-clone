import exp from "constants";
import mongoose from "mongoose";
mongoose.connect("mongodb+srv://Dev3z:hfdUvYa8dq8YzMkO@cluster0.9ufxcdl.mongodb.net/");

import { number } from "zod";
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const accountSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
     balace: {
        type : number,
        required: true
    }
    }
);
const Account = mongoose.model("Account", accountSchema);
const User = mongoose.model("User", UserSchema);

module.exports ={
    User: User,
    Account

}