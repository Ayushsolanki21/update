const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Product = require('./db/Product');
const User = require('./db/User');
require('./db/confi');
const cookieparser = require('cookie-parser');
const fs = require('fs');
const app = express();
const port = 5001;
const jwtKey = 'ayush';
app.use(cookieparser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Invalid User" });
  }
  try {
    const decoded = Jwt.verify(token, jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

// Add product endpoint with image upload


app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    let user = new User({ name, email, password });
    user = await user.save();

    const token = Jwt.sign({ id: user._id }, jwtKey, { expiresIn: "1h" });
     
    res.cookie("token", token, {httpOnly: true,secure: true}).json({ user, message: "Registration successful" });
  }
   catch (e) {
    res.status(500).json({ message: 'Error registering user', error: e.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({ email, password });
      if (user) {
        const token = Jwt.sign({ id: user._id }, jwtKey, { expiresIn: "1h" });
        res.cookie("token", token, {
          httpOnly: true,
          secure: true
        }).json({ success: true, user, message: "Login successful" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error });
    }
  } else {
    res.status(400).json({ message: "Email and password are required" });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});

app.delete('/delete/:id',  async (req, res) => {
  try {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
});

app.get('/product/:id',  async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
});

app.put('/update/:id', async (req, res) => {
  try {
    const result = await Product.updateOne(
      { _id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
});

app.post('/addproduct', upload.single('image'), async (req, res) => {
  const { name, price, category, company } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !category || !company || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = new Product({ name, price, category, company, image: `/uploads/${image}` });
    const result = await product.save();
    res.status(201).json({ message: 'Product added successfully!', product: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});



app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
