import express, { Router } from 'express';
import { getMessages,
        postMessages
    } from '../controllers/messagesController.js'
const routerMessages = Router();


routerMessages.get('/', getMessages)
routerMessages.post('/', postMessages);



export default routerMessages;