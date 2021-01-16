import { Router, Request, Response } from "express";
import * as express from "express";
import userRouter from './user'
import branchRouter from "./branch";
import menuRouter from "./menu";
import categoryRouter from "./category";
import productRouter from "./product";
import loginRouter from './login'

const router = Router();
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ 
    user: '/user',
    branch: '/branch',
    menu: '/menu',
    category: '/category',
    product: '/product',
    login: '/login'
  });
});

router.use("/user", userRouter)
router.use("/branch", branchRouter)
router.use("/menu", menuRouter)
router.use("/category", categoryRouter)
router.use("/product", productRouter)
router.use("/login", loginRouter)


export default router