import { Router } from "express";
import { oilPriceController } from "../../controllers"
import { authenticationMiddleware } from "../../middlewares"

const oilPriceRouter = Router()

oilPriceRouter.get('/oil', authenticationMiddleware, oilPriceController.getOilQuote);

export default oilPriceRouter;