import express, { Router } from 'express';
import { getProducts } from '../controllers/productsController.js'
const routerProducts = Router();

routerProducts.get('/',getProducts)


export default routerProducts;

