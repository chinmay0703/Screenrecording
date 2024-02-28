
import { forgotpassotp } from '../controller/verifycontroller/checkotpForgotpassController.js';

import { hello } from '../controller/vercelconnectcontroller/helloController.js';

import { updatepass } from '../controller/verifycontroller/updatepassController.js';
import { validateemail } from '../controller/verifycontroller/validateemailController.js';
import { validatetoken } from '../controller/verifycontroller/validatetokenController.js';


import { signup } from '../controller/usercontroller/signupController.js'
import { login } from '../controller/usercontroller/signinController.js'
import { deleteall } from '../controller/usercontroller/deleteController.js'
import { deletee } from '../controller/usercontroller/deleteAlluserController.js'

import express from 'express';

const router = express.Router();



router.post("/postdata", signup);
router.get("/", hello);
router.post("/deeleteall", deletee);
router.post("/auntheticatelogin", login);
router.post("/deleteallusers", deleteall);
router.post("/updatepass", updatepass);
router.post("/checkotp", forgotpassotp);
router.post("/validateemail", validateemail);
router.post("/validateToken", validatetoken);

export default router;
