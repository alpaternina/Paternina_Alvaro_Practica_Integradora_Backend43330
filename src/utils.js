/*********************** Multer ***********************/
import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + '/public');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });

/***************************** __dirname *****************************/
// https://flaviocopes.com/fix-dirname-not-defined-es-module-scope/

import path from 'path';
import { fileURLToPath } from 'url';
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

/***************************** Connect to Mongo *****************************/
import { connect } from 'mongoose';
export async function connectMongo() {
  try {
    await connect('mongodb+srv://alpaternina:Mongo2023@cluster0.5txvpjp.mongodb.net/?retryWrites=true&w=majority');
    console.log('Plug to mongo!');
  } catch (error) {
    console.log(error);
    throw 'can not connect to the DB';
  }
}

/******************************* Socket *******************************/
import { Server } from 'socket.io';
import ProductManager from './DAO/fileSystem/productManager.js';
import { ChatModel } from './DAO/models/chat.model.js';

export function connectSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    console.log('Un cliente se ha conectado ' + socket.id);

    /*************** Add and Delete Products ***************/
    socket.on('new-product', async (newProduct) => {
      const data = new ProductManager('./src/data/products.json');
      await data.addProduct(newProduct);

      const products = await data.getProducts();
      console.log(products);
      socketServer.emit('products', products);
    });

    socket.on('delete-product', async (productId) => {
      const data = new ProductManager('./src/data/products.json');
      await data.deleteProduct(productId);

      const products = await data.getProducts();
      socketServer.emit('products', products);
    });

    /******************** Chat Message ********************/
    /* Back recibe */
    socket.on('msg_front_to_back', async (msg) => {
      const msgCreated = await ChatModel.create(msg);
      const msgs = await ChatModel.find({});
      socketServer.emit('msg_back_to_front', msgs);
    });
  });
}