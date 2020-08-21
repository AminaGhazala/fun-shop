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

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
     where "products"."newArrival" = true
      `;

  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/populars', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
     where "products"."mostPopular" = true
      `;

  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const id = parseInt(req.params.productId);
  if (isNaN(id) || id < 0) {
    return res.status(400).json({ error: 'Your requested productId is invalid.' });
  }

  const paramDb = [id];
  const sql = `
    select *
      from "products"
     where "productId" = $1
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        return next(new ClientError('Requested productId may not exist in the database. Check your data agin.', 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.json([]);
  } else {
    const paramDb = [req.session.cartId];
    const sql = `
      select "p"."productId",
             count("p"."productId") as "itemCount",
             "c"."price" as "unitPrice",
             "c"."price" * count("p"."productId") as "subTotal",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "products" as "p"
        join "cartItems" as "c" using ("productId")
       where "c"."cartId" = $1
       group by "p"."productId", "c"."price"
    `;

    db.query(sql, paramDb)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (isNaN(productId) || productId < 0) {
    return res.status(400).json({ error: 'Your requested productId is invalid.' });
  }

  const paramDb = [productId];
  const sql = `
    select "price"
      from "products"
     where "productId" = $1
  `;

  db.query(sql, paramDb)
    .then(result => {
      if (result.rows[0] === undefined) {
        throw (new ClientError('Requested productId may not exist in the database. Check your data agin.', 400));
      } else {
        const price = result.rows[0].price;

        if (!req.session.cartId) {
          const sql = `
            insert into "carts" ("cartId", "createdAt")
                 values (default, default)
              returning "cartId"
          `;
          return db.query(sql)
            .then(result2 => {
              const cartId = result2.rows[0].cartId;
              return { cartId, price };
            });
        } else {
          const cartId = req.session.cartId;
          return { cartId, price };
        }
      }
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const paramDb = [result.cartId, productId, result.price];
      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
             values ($1, $2, $3)
          returning "cartItemId"
      `;

      return db.query(sql, paramDb);
    })
    .then(result => {
      const paramDb = [result.rows[0].cartItemId];
      const sql = `
        select "c"."cartItemId",
                "c"."price",
                "p"."productId",
                "p"."image",
                "p"."name",
                "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
          where "c"."cartItemId" = $1
      `;

      return db.query(sql, paramDb);
    })
    .then(result => {
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/orders', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(400).json({ error: 'Sorry, we are unable to process your order.' });
  }
  const { firstName, lastName, address, address2, zipcode, city, state, phone, cardNumber, cardSecurityCode, cardExpMonth, cardExpYear } = req.body;

  if (!firstName || !lastName || !address || !zipcode || !city || !state || !cardNumber || !cardSecurityCode || !cardExpMonth || !cardExpYear) {
    return res.status(400).json({ error: 'Sorry, your order information is incomplete.' });
  }

  const paramDb = [req.session.cartId, firstName, lastName, address, address2, zipcode, city, state, phone, cardSecurityCode, cardExpMonth, cardExpYear];
  const sql = `
        insert into "orders" ("cartId", "firstName", "lastName", "address", "address2", "zipcode", "city", "state", "phone", "cardSecurityCode", "cardExpMonth", "cardExpYear")
             values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          returning *
      `;

  db.query(sql, paramDb)
    .then(result => {
      req.session.cartId = null;
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

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
