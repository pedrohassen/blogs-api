require('dotenv').config();
const app = require('./app');
const { createCategory } = require('./controllers/category.controller');
const { login } = require('./controllers/login.controller');
const { createUser, getAllUsers, getUserById } = require('./controllers/user.controller');
const { nameValidation } = require('./middlewares/categoryValidation');
const { loginValidation } = require('./middlewares/loginValidation');
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

app.post('/login', loginValidation, login);

app.post('/user',
displayNameValidation,
emailValidation,
passwordValidation,
createUser);

app.get('/user', tokenValidation, getAllUsers);

app.get('/user/:id', tokenValidation, getUserById);

app.post('/categories', tokenValidation, nameValidation, createCategory);

app.listen(port, () => console.log('ouvindo porta', port));
