const express = require("express");
const { authController } = require("./routers/auth-controller");
const { resourceController } = require("./routers/resource-controller");
const dotenv = require("dotenv");
const { sqInst } = require("./sql-inst");
const bodyParser = require('body-parser');
const { User } = require("./model/user");
const { Resource } = require("./model/resource");
const fileUpload = require("express-fileupload");

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(fileUpload({
    createParentPath: true
}));
app.use(bodyParser.urlencoded({extended: true}));

const controllers = [authController, resourceController];
app.use("/api/", controllers);

const createReletionship = () => {
    Resource.belongsTo(User)
    User.hasMany(Resource)  
}

(async () => {
    try {
        createReletionship()
        await sqInst.sync({ force: false})
        app.listen(process.env.PORT, () => {
            console.log("Server started")
        })
    } catch(error) {
        console.log(error)
    }
})()