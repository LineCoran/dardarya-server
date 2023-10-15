import express from "express";
import { createOrder, getOrders, getOrder, deleteOrder } from "../controllers/order.js";

const orderRouter =  express.Router();

orderRouter.post('/order', createOrder);
orderRouter.get('/orders', getOrders);
orderRouter.get('/order/:id', getOrder);
orderRouter.delete('/order/:id', deleteOrder);


export default orderRouter;
