const express = require('express');
const app = express();
const authRoute = require('./routes/routes');
const protectedRoutes = require('./routes/protectedRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./api-docs/swagger.json');

app.use(express.json());

app.use((req, res, next) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': '*',
  });
  next()
})

app.use('/docs/v1/swagger.json', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/user', authRoute);
app.use('/api/data', protectedRoutes);

app.listen(8765, () => console.log('server is Up and running\nlocalhost:8765'));