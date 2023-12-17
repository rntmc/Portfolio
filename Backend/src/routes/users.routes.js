const {Router} = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const UsersController = require("../controllers/UsersController");
const UserAvatarController = require("../controllers/UserAvatarController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();
const upload = multer(uploadConfig.MULTER); //para podermos utilizar outra lib dentro do upload.js

const usersController = new UsersController() // usersController possui classe igual UsersController
const userAvatarController = new UserAvatarController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", ensureAuthenticated, usersController.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update) // chama rota avatar, passa pelo middleware de autenticacao, faz upload da img e entao cadastra ela

module.exports = usersRoutes; //exportando o arquivo