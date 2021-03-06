require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

// making sure the server is running
app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

// gets all products, but no long description
app.get('/api/products', (req, res, next) => {
  const sql = `
    select "p"."productId",
    "p"."name",
    "p"."price",
    "p"."image",
    "p"."shortDescription"
      from "products" as "p"
  `;
  db.query(sql)
    .then(result => {
      const products = result.rows;
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

// gets a particular product info including longDescription
app.get('/api/products/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  const sql = `
    select *
    from "products" as "p"
    where "p"."productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (result.rowCount === 0) {
        return next(new ClientError(`cannot find product with id ${productId}`), 404);
      }
      const product = result.rows[0];
      res.json(product);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'An unexpected error occurred.'
      });
    });
});

// below is for /api/cart
// gets all cartItems in cart
app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  }
  const sql = `
    select "p"."productId",
          "p"."price",
          "c"."quantity",
          "p"."image",
          "p"."name",
          "p"."shortDescription"

    from "cartItems" as "c"
    join "products" as "p" using ("productId")
    where "cartId" = $1
  `;
  db.query(sql, [req.session.cartId])
    .then(result => {
      const products = result.rows;
      res.json(products);
    })
    .catch(err => next(err)
    );
});

// add a product to cart with productId of a certain quantity and return the cartItem with details
app.post('/api/cart/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }

  if (!req.body.quantity) {
    return res.status(400).json({
      error: 'request must have quantity field'
    });
  }
  var quantity = parseInt(req.body.quantity, 10);
  const sql = `
    select "p"."price"
    from "products" as "p"
    where "p"."productId" = $1
  `;
  const params = [productId];
  db.query(sql, params)
    .then(result => {
      if (!result.rows[0].price) {
        throw new ClientError(`cannot find price of productId ${productId}`);
      }

      const price = result.rows[0].price;

      if (req.session.cartId) {
        return { cartId: req.session.cartId, price: price };

      } else {
        return (
          db.query(`
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId"
        `)
            .then(result => {
              return { cartId: result.rows[0].cartId, price: price };
            })
        );
      }

    }).then(
      result => {
        req.session.cartId = result.cartId;
        var price = result.price;
        var cartId = result.cartId;

        var sqlStatement = `
        DO
        $$
        BEGIN
          IF EXISTS (SELECT FROM "cartItems" where "cartId"=${cartId} and "productId"=${productId}) THEN
              update "cartItems"
                      set "quantity"=${quantity}
                      where "cartId"=${cartId} and "productId"=${productId};

          ELSE
              INSERT INTO "cartItems" ("cartId","productId","price","quantity")
              VALUES (${cartId},${productId},${price},${quantity});
          END IF;
        END
        $$;
        `;
        return db.query(sqlStatement);
      }

    ).then(
      result => {
        return db.query(`
        select "p"."productId",
          "p"."price",
          "c"."quantity",
          "p"."image",
          "p"."name",
          "p"."shortDescription"

        from "cartItems" as "c"
        join "products" as "p" using ("productId")
        where "c"."cartId" = $1 and "p"."productId"=$2
        `, [req.session.cartId, productId]).then(result => {
          res.status(201).json(result.rows[0]);
        });
      }
    )
    .catch(err => next(err)
    );

});

// remove an item from cart
app.delete('/api/cart/:productId', (req, res, next) => {
  const productId = parseInt(req.params.productId, 10);
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({
      error: '"productId" must be a positive integer'
    });
  }
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'req.session has no cartId' });
  }
  const sql = `
  delete from "cartItems"
  where "cartId" = $1 and "productId" = $2
  `;
  db.query(sql, [req.session.cartId, productId]).then(() => {
    return res.sendStatus(200);
  });
});

// adds an order to the order sql table
app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'req.session has no cartId' });
  }
  if (!(req.body.name && req.body.creditCard && req.body.shippingAddress)) {
    return res.status(400).json({ error: 'req.body needs a valid name, credit card number, and shipping address' });
  }
  db.query(`
  insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
  values ($1, $2, $3, $4)
  returning *
  `, [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress])
    .then(result => {
      delete req.session.cartId;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

// catch errors
app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
