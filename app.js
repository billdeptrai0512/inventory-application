// app.js
require('dotenv').config()
const express = require("express");
const app = express();
const inventoryRouter = require("./routes/inventoryRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", inventoryRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));


//brainstrom

// Your Inventory app should have categories and items, 
// so when the user goes to the home-page they can choose a category to view, 
// and then get a list of every item in that category.
// CRUD : Create, Read, Update or Delete any Item or Category.


// Goal 
// allow user to see all the item / categories
// allow user to check each categories
// then allow user to create / update / delete item
// we gonna use a form for that
