import { Router } from "express";
import authRouter from "./auth"
import userRouter from "./user"
import oilPriceRouter from "./oil-price"
import oilHistoryRouter from "./quote-history"

const apiRouter = Router();

apiRouter.use('/auth', authRouter)
apiRouter.use('/user', userRouter)
apiRouter.use('/quote', oilPriceRouter )
apiRouter.use('/history', oilHistoryRouter)


export default apiRouter;