import { Router } from "express";
import { oilPriceController } from "../../controllers"
import { authenticationMiddleware } from "../../middlewares"

const oilPriceRouter = Router()

oilPriceRouter.post('/oil', authenticationMiddleware, oilPriceController.getOilQuote);

export default oilPriceRouter;