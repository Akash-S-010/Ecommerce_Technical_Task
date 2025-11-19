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

//-----add product review
export const addProductReview = async (req, res) => {
  try {
    const { userId } = req.user;
    const { id } = req.params;
    const { rating, title, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (!comment) {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === userId
    );

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed by this user' });
    }

    product.reviews.push({
      user: userId,
      product: product._id,
      rating: Number(rating),
      title,
      comment,
    });

    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((sum, review) => sum + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({
      message: 'Review added successfully',
      product,
    });
  } catch (error) {
    console.error('Error adding product review:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};