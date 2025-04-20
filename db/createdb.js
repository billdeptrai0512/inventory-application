const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const { Client } = require("pg");

//CATEGORIES
//WE ARE SURE THAT IT WILL HAVE : 7 CATEGORIES
// TOP
// BOTTOM_SHORT => BOTTOM with 2 type
// BOTTOM_LONG
// SWEATER
// GAKURAN 
// BLAZER
// EXTRA

const categories = `
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  section TEXT NOT NULL,
  name VARCHAR ( 255 ),
  z_index INTEGER
);

INSERT INTO categories (type, section, name, z_index) 
VALUES
  ('top', 'short', 'Áo sơ mi - tay ngắn', 2),
  ('top', 'long', 'Áo sơ mi - tay dài', 2),
  ('bottom', 'short', 'Váy', 3),
  ('bottom', 'long', 'Quần', 1),
  ('sweater', 'sweater', 'Áo len', 4),
  ('jacket', 'gakuran', 'Gakuran', 5),
  ('jacket', 'blazer', 'Blazer', 5),
  ('extra', 'tie', 'Cà Vạt', 6),
  ('extra', 'bow', 'Nơ', 6),
  ('extra', 'bag', 'Cặp', 6);
`;

const items = `
CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  category_id INTEGER NOT NULL REFERENCES categories(id),
  image TEXT,
  demo_image TEXT,
  amount INTEGER,
  total INTEGER,
  sizes TEXT[]
);

INSERT INTO items (category_id, amount, total, image, demo_image, sizes)
VALUES
  ((SELECT id FROM categories WHERE type = 'top' AND section = 'long'), 10, 50000, 'somi', 'somidemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'top' AND section = 'short'), 10, 50000, 'somi', 'somidemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'bottom' AND section = 'short'), 10, 50000, 'chanvay', 'chanvaydemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'bottom' AND section = 'long'), 10, 50000, 'quandai', 'quandaidemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'sweater' AND section = 'sweater'), 10, 50000, 'aolen', 'aolendemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'jacket' AND section = 'gakuran'), 10, 50000, 'gakuran', 'gakurandemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'jacket' AND section = 'blazer'), 10, 50000, 'blazer', 'blazerdemo', ARRAY['S', 'M', 'L', 'XL']),
  ((SELECT id FROM categories WHERE type = 'extra' AND section = 'bow'), 10, 25000, 'bow1', 'bow1demo', NULL),
  ((SELECT id FROM categories WHERE type = 'extra' AND section = 'tie'), 10, 25000, 'cavat1', 'cavat1demo', NULL),
  ((SELECT id FROM categories WHERE type = 'extra' AND section = 'bag'), 10, 25000, 'bag1', 'bag1demo', NULL);
`

//Imagin the input
// SELECT TOP - short and it should know that we have the áo sơ mi tay ngắn + z_index = 1
// THEN input amount , size , price , demo_image, image

async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DB_URL,
    });
    await client.connect();
    await client.query(`SET client_encoding = 'UTF8';`);
    await client.query(items);
    await client.end();
    console.log("done");
  }
  
main();