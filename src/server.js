require('dotenv').config();
const app = require('./app');
const {
  createCategory,
  getAllCategories,
} = require('./controllers/category.controller');
const { login } = require('./controllers/login.controller');
const {
  createPost,
  getPosts,
  getPostById,
  changePostById,
  deletePost,
  searchByTerm,
} = require('./controllers/post.controller');
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
} = require('./controllers/user.controller');
const { nameValidation } = require('./middlewares/categoryValidation');
const { loginValidation } = require('./middlewares/loginValidation');
const {
  postFieldsValidation,
  updatedPostFieldsValidation,
  deletePostValidation,
} = require('./middlewares/postValidation');
const { tokenValidation } = require('./middlewares/tokenValidation');
const {
  displayNameValidation,
  emailValidation,
  passwordValidation,
} = require('./middlewares/userValidation');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.get('/post/search', tokenValidation, searchByTerm);

app.post('/login', loginValidation, login);

app.post('/user',
displayNameValidation,
emailValidation,
passwordValidation,
createUser);

app.get('/user', tokenValidation, getAllUsers);

app.get('/user/:id', tokenValidation, getUserById);

app.post('/categories', tokenValidation, nameValidation, createCategory);

app.get('/categories', tokenValidation, getAllCategories);

app.post('/post', tokenValidation, postFieldsValidation, createPost);

app.get('/post', tokenValidation, getPosts);

app.get('/post/:id', tokenValidation, getPostById);

app.put('/post/:id', tokenValidation, updatedPostFieldsValidation, changePostById);

app.delete('/post/:id', tokenValidation, deletePostValidation, deletePost);

app.delete('/user/me', tokenValidation, deleteUser);

app.listen(port, () => console.log('ouvindo porta', port));
