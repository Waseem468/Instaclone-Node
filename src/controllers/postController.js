require("dotenv").config();
const Post = require("../models/post");
const {GridFSBucket, MongoClient} = require("mongodb");
const mongoClient = new MongoClient("mongodb+srv://Instaclone1234:insta1234@cluster0.jxvkywb.mongodb.net/?retryWrites=true&w=majority");

const controller = {};

controller.get = async (req, res) => {
    try {
        let posts = await Post.find();
        res.status(200).json({status : "Success", data : posts});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.post = async (req, res) => {
    try {
        let newPost = await new Post({
            ...req.body,
            PostImage : `images/${req.file.filename}`
        })
        newPost = await newPost.save();
        res.status(201).json({status : "Success", data : newPost});
    } catch (err) {
        res.status(400).json({status : "Failed", message : err.message});
    }
}

controller.download = async (req, res) => {
    
    try {
        await mongoClient.connect();
        const db = mongoClient.db("Test");
        const bucket = new GridFSBucket(db, {
            bucketName : "posts"
        });

        const image = bucket.openDownloadStreamByName(req.params.name);
        image.on("data", data => res.status(200).write(data));
        image.on("error", err => res.status(400).send({msg : err.message}));
        image.on("end", () => res.end());
    } catch(err) {
        res.status(500).send({msg : err.message});
    }
}
module.exports = controller;