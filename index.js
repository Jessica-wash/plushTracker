require('dotenv').config();
const Express = require('express');
const app = Express();

const dbConnection = require('./db');

app.use(Express.json());
const controllers = require('./src/components/controllers');

app.use('/test', (req, res) => {
    res.send('test message')
});

app.use(require('./src/components/middleware/headers'));

app.use('/user', controllers.userController);

app.use(require('./src/components/middleware/validateSession'));
// app.use('/user/delete', controllers.userController);
app.use('/plushController', controllers.plushController);
app.use('/wishList', controllers.wishListController );

dbConnection.authenticate()
    //.then(() => dbConnection.sync({force: true}))
    // run the above line one time, this will delete the table you have, then comment it out and use the below line
    .then(() => dbConnection.sync())
    .then(() =>{
        app.listen(process.env.PORT, ()=>{
            console.log(`[Server]: App is listening on ${process.env.PORT}.`);
        });
    })
    .catch((err) => {
        console.log(`[Server]: Server crashed. Error = ${err}`);
    });
