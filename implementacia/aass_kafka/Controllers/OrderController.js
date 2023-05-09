import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { pool } from "../config";

const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// CREATE NEW ORDER
const createOrder = (request, response) => {
  console.log(request.body);
  const {
    address,
    city,
    postal_code,
    phone_number,
    total_price,
    products,
    quantity,
  } = request.body;

  // osetrenie povinnych poli v body
  if (!address) {
    response.status(400).json({ message: "Field 'address' is required." });
    return;
  }
  if (!city) {
    response.status(400).json({ message: "Field 'city' is required." });
    return;
  }
  if (!postal_code) {
    response.status(400).json({ message: "Field 'postal_code' is required." });
    return;
  }
  if (!phone_number) {
    response.status(400).json({ message: "Field 'phone_number' is required." });
    return;
  }
  if (!total_price) {
    response.status(400).json({ message: "Field 'total_price' is required." });
    return;
  }
  if (!products) {
    response.status(400).json({ message: "Field 'products' is required." });
    return;
  }
  if (!quantity) {
    response.status(400).json({ message: "Field 'quantity' is required." });
    return;
  }

  // overenie PSC, mesto -> iba znaky, cisla nepovolene
  let pc_test = /^[0-9]{3}\s?[0-9]{2}$/.test(postal_code);
  let city_test = /^([^0-9]*)$/.test(city);

  if (!pc_test) {
    response
      .status(400)
      .json({ message: "Field 'postal_code' has wrong format." });
    return;
  }
  if (!city_test) {
    console.log("zly format mesta");
    response.status(400).json({ message: "Field 'city' has wrong format." });
    return;
  }

  if (products.length === 0) {
    response.status(400).json({ message: "Array of products is empty." });
    return;
  }
  if (quantity.length === 0) {
    response.status(400).json({ message: "Array of quatities is empty." });
    return;
  }
  if (products.length !== quantity.length) {
    response
      .status(400)
      .json({
        message:
          "Array of products need to have same length as array of quantities.",
      });
    return;
  }

  //get token from request header
  const authHeader = request.headers["authorization"];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const access_token = authHeader.split(" ")[1];

  pool.query(
    "SELECT * FROM users WHERE access_token = $1;",
    [String(access_token)],
    async (error, results) => {
      if (results.rows.length === 0) {
        response.status(404).json({ message: "Access token is invalid." });
        return;
      }

      const user_id = results.rows[0].id;

      pool.query(
        "INSERT INTO orders (address, city, postal_code, phone_number, total_price, user_id, state) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id;",
        [
          address,
          city,
          postal_code,
          phone_number,
          total_price,
          user_id,
          "vytvorená",
        ],
        async (error, results) => {
          if (error) {
            throw error;
          }
          // query vrati id pridanej objednavky
          order_id = results.rows[0].id;

          let i = 0;
          // list id-ciek produktov -> tie treba pridat do DB tabulka order_items
          await Promise.all(
            products.map(async (product) => {
              await pool.query(
                "INSERT INTO order_items (order_id, product_id, quantity) VALUES ($1, $2, $3);",
                [order_id, product, quantity[i]]
              );
              i += 1;
            })
          );

          response.status(201).json({ message: "Order created." });
        }
      );
    }
  );
};

// CHANGE ORDER STATUS
const changeOrderStatus = (request, response) => {
  const { order_id } = request.params;
  const { new_state } = request.body;

  if (!order_id) {
    response.status(400).json({ message: "Order id is required." });
    return;
  }

  if (!new_state) {
    response.status(400).json({ message: "Field new_state is required." });
    return;
  }

  const states = ["vytvorená", "v preprave", "doručená"];
  if (!states.includes(new_state)) {
    // test noveho stavu
    response.status(400).json({ message: "State is not valid." });
    return;
  }

  pool.query(
    "SELECT state FROM orders WHERE id = $1;",
    [order_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      if (results.rows.length === 0) {
        response
          .status(400)
          .json({ message: "Order with given id does not exists." });
        return;
      }
      if (results.rows[0].state === new_state) {
        response.status(400).json({ message: "Order already has this state." });
        return;
      }
      pool.query(
        "UPDATE orders SET state = $1 WHERE id = $2",
        [new_state, order_id],
        (error) => {
          if (error) {
            throw error;
          }
          response.status(200).json({ message: "Order status changed." });
        }
      );
    }
  );
};

// GET ALL ORDERS
const getAllOrders = async (request, response) => {
  pool.query("SELECT * FROM orders;", async (error, results) => {
    if (error) {
      throw error;
    }

    let parsedResult = [];
    await Promise.all(
      results.rows.map(async (order) => {
        let order_id = order.id;
        let res = await pool.query(
          "SELECT name, quantity FROM order_items JOIN products ON products.id = order_items.product_id WHERE order_id = $1;",
          [order_id]
        );
        // do vysledneho objektu objednavky prida list produktov a ich quantity

        let prod = [];
        let quan = [];

        res.rows.map((product) => {
          prod.push(product.name);
          quan.push(product.quantity);
        });

        let order_format = {
          // vysledny format json pre jednu objednavku
          id: order.id,
          address: order.address,
          city: order.city,
          postal_code: order.postal_code,
          phone_number: order.phone_number,
          total_price: order.total_price,
          user_id: order.user_id,
          state: order.state,
          products: prod,
          quantity: quan,
          created_at: order.created_at,
        };

        parsedResult.push(order_format); // kazdu objednavku prida do konecneho listu v spravnom formate
      })
    );

    response.status(200).json(parsedResult); // vrati json objednavok
  });
};

// GET MY ORDERS
const getMyOrders = async (request, response) => {
  //get token from request header
  const authHeader = request.headers["authorization"];
  //the request header contains the token "Bearer <token>", split the string and use the second value in the split array.
  const access_token = authHeader.split(" ")[1];

  pool.query(
    "SELECT * FROM users WHERE access_token = $1;",
    [String(access_token)],
    async (error, results) => {
      if (results.rows.length === 0) {
        response.status(404).json({ message: "Access token is invalid." });
        return;
      }

      const user_id = results.rows[0].id;
      pool.query(
        "SELECT * FROM orders WHERE user_id = $1;",
        [user_id],
        async (error, results) => {
          if (error) {
            throw error;
          }

          let parsedResult = [];
          await Promise.all(
            results.rows.map(async (order) => {
              let order_id = order.id;
              let res = await pool.query(
                "SELECT name, quantity FROM order_items JOIN products ON products.id = order_items.product_id WHERE order_id = $1;",
                [order_id]
              );
              // do vysledneho objektu objednavky prida list produktov

              let prod = [];
              let quan = [];

              res.rows.map((product) => {
                prod.push(product.name);
                quan.push(product.quantity);
              });

              let order_format = {
                // vysledny format json pre jednu objednavku
                id: order.id,
                address: order.address,
                city: order.city,
                postal_code: order.postal_code,
                phone_number: order.phone_number,
                total_price: order.total_price,
                user_id: order.user_id,
                state: order.state,
                products: prod,
                quantity: quan,
                created_at: order.created_at,
              };

              parsedResult.push(order_format); // kazdu objednavku prida do konecneho listu v spravnom formate
            })
          );

          response.status(200).json(parsedResult);
        }
      );
    }
  );
};

export default {
  createOrder,
  changeOrderStatus,
  getAllOrders,
  getMyOrders,
};
