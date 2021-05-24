const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const userRoute = require('./routes/userRoutes');
const authRoute = require('./routes/authRoutes');
const postRoute = require('./routes/postRoutes');

const app = express();

dotenv.config();

const PORT = 7000;

// Database
mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  () => {
    console.log('Connected to MongoDB');
  }
);

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// middlewares
app.use(express.json({ extended: false }));

app.use(helmet());

app.use(morgan('common'));

app.use('/api/users', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/posts', postRoute);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
