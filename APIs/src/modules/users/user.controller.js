import { Router } from "express"
import * as userServices from "./user.service.js"


const router = Router()

router.post("/createuser", userServices.createUser)

router.put("/user/:id", userServices.createORUpdateUser);

router.get("/findUserByEmail", userServices.findUserByEmail);

router.get("/findUserByID/:id", userServices.findUserByID);



export default router