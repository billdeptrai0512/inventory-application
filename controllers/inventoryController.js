const db = require("../db/queries");

exports.HomePage = async (req, res) => {
    res.render('index')
};

exports.Categories = async (req, res) => {
    const categories = await db.getAllCategories()
    res.render('categories', {categories: categories})
};

exports.Items = async (req, res) => {
    const categories = await db.getAllCategories()
    const items = await db.getAllItems()
    res.render('Allitems', {categories: categories, items: items})
};

exports.getCategoriesID = async (req, res) => {
    const categoriesId = req.params.categoriesId
    const categories = await db.getCategories(categoriesId)
    const items = await db.getItemByCategoriesID(categoriesId)

    res.render('item', {categories: categories, items: items})
};

exports.getAllItemInCategory = async (req, res) => {
    const categoriesId = req.params.categoriesId
    const categories = await db.getAllCategories()
    const items = await db.getItemByCategoriesID(categoriesId)

    res.render('category', {categories: categories, items: items})
};

exports.GetNewItemForm = (req, res) => {
    res.render('createForm')
};

exports.PostNewItem = async (req, res) => {

    const type = req.body.type
    const section = req.body.section
    const categoryId = await db.getCategoriesID(type, section)

    const newItem = {
        category_id: categoryId,
        image: req.body.image,
        demo_image: req.body.demo_image,
        amount: req.body.amount,
        total: req.body.total,
        size: req.body.size,
    }

    await db.insertNewItem(newItem)

    res.redirect('/all-items')
};

exports.DeleteItem = async(req, res) => {

    const id = req.params.id

    await db.deleteItem(id)

    res.redirect('/all-items')

};

exports.DeleteItem = async(req, res) => {

    const id = req.params.id

    await db.deleteItem(id)

    res.redirect('/all-items')

};


exports.GetUpdateItemForm = async(req, res) => {

    const id = req.params.id

    const item = await db.getItem(id)
    const category_id = item.category_id
    const category = await db.getCategories(category_id)

    res.render('updateForm', {item: item, category: category})
};

exports.PostUpdateItemForm = async(req, res) => {
    const id = req.params.id
    const type = req.body.type
    const section = req.body.section
    console.log(type, section)
    const categoryId = await db.getCategoriesID(type, section)

    const newItem = {
        id: id,
        category_id: categoryId,
        image: req.body.image,
        demo_image: req.body.demo_image,
        amount: req.body.amount,
        total: req.body.total,
        size: req.body.size,
    }

    await db.updateItem(newItem)
    
    res.redirect('/all-items')
};

