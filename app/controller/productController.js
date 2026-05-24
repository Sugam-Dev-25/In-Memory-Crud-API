const products = require("../data/products");

class ProductController {


  static getProducts(req, res) {

    res.status(200).json({
      success: true,
      total: products.length,
      products,
    });

  }



  static getSingleProduct(req, res) {

    const product = products.find(
      (p) => p.id === req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });

  }


 
  static createProduct(req, res) {

    const { name, price, category } = req.body;

    // Validation
    if (!name || !price || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = {
      id: Date.now().toString(),
      name,
      price,
      category,
    };

    products.push(newProduct);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });

  }



  static updateProduct(req, res) {

    const product = products.find(
      (p) => p.id === req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const { name, price, category } = req.body;

    product.name = name || product.name;
    product.price = price || product.price;
    product.category = category || product.category;

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product,
    });

  }



  static deleteProduct(req, res) {

    const productIndex = products.findIndex(
      (p) => p.id === req.params.id
    );

    if (productIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const deletedProduct = products.splice(productIndex, 1);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deletedProduct,
    });

  }

}

module.exports = ProductController;