import { Router } from "express";
import { BankController } from "../controllers/bankControllers";
import { PaymentController } from "../controllers/paymentControllers";

const router: Router = Router();

// Bank routes : examples : /bank/hdfc, /bank/axis, etc.
router.post("/:bank_name", BankController);

// For making the payment :
router.post("/payment/:bank_name", PaymentController);

export default router;
