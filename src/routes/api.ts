import { Router } from "express";

import * as ApiController from "../controllers/apiController";

const router = Router();

router.post("/register", ApiController.register);
router.post("/login", ApiController.login);
router.get("/list", ApiController.list);
router.delete("/delete/:Useremail", ApiController.deleteUser);

export default router;
