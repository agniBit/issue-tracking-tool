const express = require('express');
const app = express();
const authRoute = require('./routes/routes');
const protectedRoutes = require('./routes/protectedRoutes')
// const protectedRoutes = re

app.use(express.json());




app.use('/api/user', authRoute);
app.use('/api/getdata', protectedRoutes);

app.listen(8989, () => console.log('server is Up and running\nlocalhost:8989'));