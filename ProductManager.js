const fs = require('fs');

class ProductManager {
  id = 1;
  constructor(path) {
    this.path = path;
  }
  
  async addProduct(productoDato) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }

    const { title, description, price, thumbnail, code, stock } = productoDato;

    if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) {
      return console.log('Completar todos los campos del', title);
    } else {
      let producto = [];
    
      let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
      producto = JSON.parse(productoContenido);

      const productoEncontrado = producto.some((item) => item.code == code);
      if (productoEncontrado) {
        return console.log('El producto ya existe');
      } else {
        if (producto.length > 0) {
          this.id = producto[producto.length - 1].id + 1;
        }
        const product = { id: this.id, ...productoDato };
        producto.push(product);
        let productString = JSON.stringify(producto, null, 2);
        await fs.promises.writeFile(this.path, productString);
        return console.log('Producto adicionado');
      }
    }
  }

  async getProducts() {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];

    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);
    return producto;
  }

  
  async getProductById(id) {
    if (!fs.existsSync(this.path)) {
      await fs.promises.writeFile(this.path, '[]');
    }
    let producto = [];
    let productoContenido = await fs.promises.readFile(this.path, 'utf-8');
    producto = JSON.parse(productoContenido);

    const productoEncontrado = producto.find((item) => item.id == id);
    if (productoEncontrado) {
      console.log('El producto encontrado es ', productoEncontrado);
      return productoEncontrado;
    } else {
      console.log('No ha sido encontrado el Producto', id);
    }
  }
}

const product1 = {
  title: 'producto prueba',
  description: 'Este es un producto prueba',
  price: 10,
  thumbnail: 'Sin imagen',
  code: 'abc123',
  stock: 7,
};

const product2 = {
  title: 'producto prueba 2',
  description: 'Este es un producto prueba 2',
  price: 10,
  thumbnail: 'Sin imagen',
  code: 'abc124',
  stock: 15,
};

const productManager = new ProductManager('products.json');

productManager
  .addProduct(product1)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  });
productManager
  .addProduct(product2)
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log(error);
  }); 

productManager
  .getProducts()
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
 
productManager
  .getProductById(0)
  .then((result) => console.log(result))
  .catch((error) => console.log(error));