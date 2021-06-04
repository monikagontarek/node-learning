const express = require('express')
const path = require('path')
const gameRoutes = require('./routes/game');


const app = express();
app.listen(3000, () => {
    console.log("zadziałała aplikacja")
})

app.use(express.static(path.join(__dirname, 'public'),));

gameRoutes(app);

