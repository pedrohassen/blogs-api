require('dotenv').config();
const app = require('./app');
const { login } = require('./controllers/login.controller');
const { loginValidation } = require('./middlewares/loginValidation');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', loginValidation, login);

app.listen(port, () => console.log('ouvindo porta', port));
