const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM categories");
  return rows;
}

async function getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}

async function getCategories(id) {
    const { rows } = await pool.query("SELECT * FROM categories WHERE id = ($1)", [id]);
    return rows[0]
}

async function getItem(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE id = ($1)", [id]);
    return rows[0]
}

async function getItemByCategoriesID(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE category_id = ($1)", [id]);
    return rows;
}

async function getCategoriesID(type, section) {
    const { rows } = await pool.query("SELECT id FROM categories WHERE type = ($1) AND section = ($2)", [type, section]);
    return rows[0].id
}

//(category_id, 10, 50000, 'somi', 'somidemo', ARRAY['S', 'M', 'L', 'XL']),
async function insertNewItem(item) {
  await pool.query("INSERT INTO items (category_id, image, demo_image, amount, total, sizes) VALUES ($1, $2, $3, $4, $5, $6)", 
    [item.category_id, item.image, item.demo_image, item.amount, item.total, item.size]);
}

async function updateItem(item) {
    await pool.query(
      `UPDATE items 
       SET category_id = $1, 
           image = $2, 
           demo_image = $3, 
           amount = $4, 
           total = $5, 
           sizes = $6
       WHERE id = $7`,
      [item.category_id, item.image, item.demo_image, item.amount, item.total, item.size, item.id]
    );

    console.log(item)
}

async function deleteItem(id) {
    await pool.query('DELETE FROM items WHERE id = ($1)', [id])
}

async function findMessage(id) {
    const { rows } = await pool.query(`SELECT * FROM messages WHERE id = ($1)`, [id])
    return rows[0]
}



async function deleteAllMessage(id) {
    await pool.query('DELETE FROM messages')
}

module.exports = {
    getAllCategories,
    getAllItems,
    getCategories,
    getItem,
    getItemByCategoriesID,
    getCategoriesID,
    insertNewItem,
    deleteItem,
    updateItem,
    deleteAllMessage
};