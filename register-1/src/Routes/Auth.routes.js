import express from "express";
import { login, register } from "../Controllers/Auth.controller.js";
const router = express.Router()

router.post('/', register)
router.post('/login', login)


export default router