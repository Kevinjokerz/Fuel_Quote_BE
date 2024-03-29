import { Router } from "express";
import { quoteHistoryContoller } from "../../controllers"
import { authenticationMiddleware } from "../../middlewares"

const oilHistoryRouter = Router()

oilHistoryRouter.get('/oil', authenticationMiddleware, quoteHistoryContoller.viewQuoteHistoryByUsername)

export default oilHistoryRouter;