class productManager {
    constructor(producto) {
      this.producto = [];
    }
  
    addProducto(title, description, price, thumbnail, code, stock) {
      const producto = {
        id: this.producto.length + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };
  
      if (title == undefined || description == undefined || price == undefined || thumbnail == undefined || code == undefined || stock == undefined) {
        console.log('Completar todos los campos del', title);
      } else {
        const productoFound = this.producto.some((item) => item.code == code);
        if (productoFound) {
          console.log('El producto ya existe');
        } else {
          this.producto.push(producto);
        }
      }
    }
  
    getProducto() {
      console.log(this.producto);
    }
  
    getProductoById(id) {
      const productoFound = this.producto.find((item) => item.id == id);
      if (productoFound) {
        console.log('El producto encontrado es ', productoFound);
      } else {
        console.log('No ha sido encontrado el Producto', id);
      }
    }
  }
  
  const productoTest = new productManager();

  
  productoTest.addProducto('producto A', 'Este es un producto A', 1000, 'Sin imagen', 'AAA123', 100);
  productoTest.addProducto('producto B', 'Este es un producto B', 1500, 'Sin imagen', 'BBB123', 150);
  productoTest.addProducto('producto C', 'Este es un producto C', 2000, 'Sin imagen', 'CCC123', 80);
  productoTest.addProducto('producto D', 'Este es un producto D', 2000, 'Sin imagen', 'CCC123'); // No va a mostrar esta linea porque no tiene el stock
  productoTest.getProducto(); // Muestra Producto A, B y C
  productoTest.getProductoById(1); // Muestra el producto A
  productoTest.getProductoById(5); // Muestra que no ha sido encontrado el producto