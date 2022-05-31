const express = require("express");
const { Router } = express;
const { User } = require("../model/user");
const { Resource } = require("../model/resource");
const { verifyToken } = require("../middleware/verify-token");
const { uploadResource } = require("../aws/upload-resource");
const resourceController = Router()

resourceController.post("/resource", verifyToken, async (req, res) => {
    if (!req.files) {
        return res.status(400).send({
            message: "Did not upload any files"
        })
    }

    try {
        const email = req.email;
        const user = await User.findOne({
            email
        });
        const file = req.files.file;
        const data = await uploadResource(file.name, file.data);
        const imageUrl = data.Location;
        const resource = Resource.build({
            resourceUrl: imageUrl,
            userId: user.id
        })

        await resource.validate();
        await resource.save();
        const response = JSON.parse(JSON.stringify(resource));
        return res.send(response)
    } catch(err) {
        return res.status(500).send(err)
    }
})

resourceController.get("/resource",verifyToken, async (req, res) => {
    const email = req.email;

    try {
        const user = await User.findOne({
            email
        });
        const resources = await Resource.findAll({
            userId: user.id
        });
        const response = JSON.parse(JSON.stringify(resources));
        return res.send(response)
    } catch(error) {
        res.status(500).send(error)
    }
})

exports.resourceController = resourceController