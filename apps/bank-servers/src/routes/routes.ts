import { Router } from "express";
import { BankController } from "../controllers/bankControllers";

const router: Router = Router();

// Bank routes : examples : /bank/hdfc, /bank/axis, etc.
router.post("/:bank_name", BankController);

export default router;
