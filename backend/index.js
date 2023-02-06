const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());
dotenv.config();
const port = process.env.PORT || 3001;
const userRoute = require('./routes/user')

app.use(userRoute)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})