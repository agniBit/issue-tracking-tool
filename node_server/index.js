const express = require('express');
const app = express();
const authRoute = require('./routes/routes');
const protectedRoutes = require('./routes/protectedRoutes')
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./api-docs/swagger.json');

app.use(express.json());

app.use('/docs/v1/swagger.json', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/api/user', authRoute);
app.use('/api/getdata', protectedRoutes);

app.listen(8989, () => console.log('server is Up and running\nlocalhost:8989'));