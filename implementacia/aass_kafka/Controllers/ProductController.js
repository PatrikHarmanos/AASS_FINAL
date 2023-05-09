import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { pool } from "../config";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
import { resolve, join } from "path";
import { profile } from "console";

// ADD NEW PRODUCT
const addNewProduct = (request, response) => {
  const { name, description, price, is_gluten_free, category_id } =
    request.body;
  if (!name) {
    response.status(400).json({ message: "name is required." });
    return;
  }
  if (!description) {
    response.status(400).json({ message: "description is required." });
    return;
  }
  if (!Number(price)) {
    response.status(400).json({ message: "price is required." });
    return;
  }
  if (!is_gluten_free) {
    response.status(400).json({ message: "is_gluten_free is required." });
    return;
  }
  if (!Number(category_id)) {
    response.status(400).json({ message: "category_id is required." });
    return;
  }
  const { filename, mimetype, size } = request.file;
  const filepath = request.file.path;
  pool.query(
    "SELECT * FROM product_categories WHERE id = $1",
    [Number(category_id)],
    (error, results) => {
      if (results.rows.length === 0) {
        response
          .status(404)
          .json({ message: "Category with given id does not exists." });
        return;
      }
      pool.query(
        "INSERT INTO products (name, price, description, is_gluten_free, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING id",
        [name, Number(price), description, is_gluten_free, Number(category_id)],
        (error, results) => {
          if (error) {
            throw error;
          }
          const product_id = results.rows[0].id;
          pool.query(
            "INSERT INTO product_photos (filename, filepath, mimetype, size, product_id) VALUES ($1, $2, $3, $4, $5)",
            [filename, filepath, mimetype, size, product_id],
            (error) => {
              if (error) {
                throw error;
              }
              response.status(201).json({ message: "Product added." });
            }
          );
        }
      );
    }
  );
};

const filter = async (results, products) => {
  let results_formatted = [];
  await results.rows.map((category) => {
    const item = {
      category_id: category.id,
      title: category.name,
      data: [],
    };
    results_formatted.push(item);
  });

  await products.rows.map((prod) => {
    let product = {
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      is_gluten_free: prod.is_gluten_free,
      category_id: prod.category_id,
    };
    results_formatted.map((item) => {
      if (item.category_id === prod.category_id) {
        item.data.push(product);
      }
    });
  });

  return results_formatted;
};

// GET ALL PRODUCTS
const getAllProducts = (request, response) => {
  pool.query("SELECT * FROM products", (error, results) => {
    if (error) {
      throw error;
    }

    let products = results;

    pool.query("SELECT * FROM product_categories", (error, results) => {
      if (error) {
        throw error;
      }

      filter(results, products).then((results_formatted) => {
        console.log(results_formatted);
        response.status(200).json(results_formatted);
      });
    });
  });
};

const getAllCategories = (request, response) => {
  pool.query("SELECT id, name FROM product_categories", (error, results) => {
    if (error) {
      throw error;
    }
    let arr = [];
    results.rows.map((category) => {
      arr.push({
        label: category.name,
        value: category.id,
      });
    });
    response.status(200).json(arr);
  });
};

// GET PRODUCT PHOTO
const getProductPhoto = (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ message: "id is required." });
    return;
  }
  pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
    if (results.rows.length === 0) {
      response
        .status(404)
        .json({ message: "Product with given id does not exists." });
      return;
    }
    pool.query(
      "SELECT * FROM product_photos WHERE product_id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        const dirname = resolve();
        const fullfilepath = join(dirname, results.rows[0].filepath);
        response.type(results.rows[0].mimetype).sendFile(fullfilepath);
      }
    );
  });
};

// DELETE PRODUCT
const deleteProduct = (request, response) => {
  const { id } = request.params;
  if (!id) {
    response.status(400).json({ message: "id is required." });
    return;
  }
  pool.query("SELECT * FROM products WHERE id = $1", [id], (error, results) => {
    if (results.rows.length === 0) {
      response
        .status(404)
        .json({ message: "Product with given id does not exists." });
      return;
    }
    pool.query(
      "DELETE FROM product_photos WHERE product_id = $1",
      [id],
      (error, results) => {
        if (error) {
          throw error;
        }
        pool.query(
          "DELETE FROM products WHERE id = $1",
          [id],
          (error, results) => {
            if (error) {
              throw error;
            }
            response.status(200).json({ message: "Product deleted." });
          }
        );
      }
    );
  });
};

// ADD PRODUCT TO FAVORITE PRODUCTS
const addTofavorites = (request, response) => {
  const { user_id, product_id } = request.body;
  if (!user_id) {
    response.status(400).json({ message: "user_id is required." });
    return;
  }
  if (!product_id) {
    response.status(400).json({ message: "product_id is required." });
    return;
  }
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [user_id],
    (error, results) => {
      if (results.rows.length === 0) {
        response
          .status(404)
          .json({ message: "User with given id does not exists." });
        return;
      }
      pool.query(
        "SELECT * FROM products WHERE id = $1",
        [product_id],
        (error, results) => {
          if (results.rows.length === 0) {
            response
              .status(404)
              .json({ message: "Product with given id does not exists." });
            return;
          }
          pool.query(
            "INSERT INTO favorite_products (user_id, product_id) VALUES ($1, $2)",
            [user_id, product_id],
            (error) => {
              if (error) {
                throw error;
              }
              response
                .status(201)
                .json({
                  status: "success",
                  message: "Product added to favorites.",
                });
            }
          );
        }
      );
    }
  );
};

// GET MY FAVORITE PRODUCTS
const getMyFavorites = async (request, response) => {
  const { user_id } = request.params;
  if (!user_id) {
    response.status(400).json({ message: "user_id is required." });
    return;
  }
  pool.query(
    "SELECT * FROM users WHERE id = $1",
    [user_id],
    async (error, results) => {
      if (results.rows.length === 0) {
        response
          .status(404)
          .json({ message: "User with given id does not exists." });
        return;
      }
      pool.query(
        "SELECT * FROM favorite_products WHERE user_id = $1",
        [user_id],
        async (error, results) => {
          if (results.rows.length === 0) {
            response
              .status(400)
              .json({ message: "User has no favorite products." });
            return;
          }

          let results_formatted = [];
          await Promise.all(
            results.rows.map(async (product) => {
              let results = await pool.query(
                "SELECT * FROM products WHERE id = $1",
                [product.product_id]
              );

              let results_formatted = [];
              results.rows.map((prod) => {
                product = {
                  name: prod.name,
                  description: prod.description,
                  price: prod.price,
                  is_gluten_free: prod.is_gluten_free,
                  category_id: prod.category_id,
                };
                results_formatted.push(product);
              });
            })
          );
          response.status(200).json(results_formatted);
        }
      );
    }
  );
};

export default {
  addNewProduct,
  getAllProducts,
  deleteProduct,
  addTofavorites,
  getMyFavorites,
  getProductPhoto,
  getAllCategories,
};
