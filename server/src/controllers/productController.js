import { Product } from '../models/Product.js';

//-----Add a new product
export const createProduct = async (req, res) => {
  try {
    const { Title, description, price, images, category, brand, stock } = req.body;

    const product = new Product({
      Title,
      description,
      price,
      images,
      category,
      brand,
      stock,
    });

    const createdProduct = await product.save();
    res.status(201).json({product:createdProduct,message:"Product created successfully"});  
  } catch (error) {
    console.error('Error creating product:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

//-----products listing
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};


//-----product details
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.status(200).json(product);
    } else {
      return res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};