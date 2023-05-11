import express from 'express';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';

const app = express ();

app.listen(8080, () => {
  console.log('Se esta escuchando 8080');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.get('*', (req, res) => {
  return res.status(404).json({ status: 'error', message: 'No fue encontrado' });
});