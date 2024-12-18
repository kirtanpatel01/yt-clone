import mongoose, { Schema, model } from "mongoose";

const likeSchema = new Schema(
    {
        videos: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        comments: {
            type: Schema.Types.ObjectId,
            ref: "Commnet",
        },
        tweets: {
            type: Schema.Types.ObjectId,
            ref: "Tweet",
        },
        likedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    },
    {
        timestamps: true,
    },
);

export const Like = model("Like", likeSchema);
