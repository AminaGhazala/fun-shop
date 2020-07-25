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

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select "productId",
           "name",
           "price",
           "image",
           "shortDescription"
      from "products"
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
        next(new ClientError('Requested productId may not exist in the database. Check your data agin.', 404));
      } else {
        res.json(result.rows[0]);
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    res.json([]);
  } else {
    const paramDb = [req.session.cartId];
    const sql = `
      select "c"."cartItemId",
             "c"."price",
             "p"."productId",
             "p"."image",
             "p"."name",
             "p"."shortDescription"
        from "cartItems" as "c"
        join "products" as "p" using ("productId")
       where "c"."cartId" = $1
    `;

    db.query(sql, paramDb)
      .then(result => res.json(result.rows))
      .catch(err => next(err));
  }
});

app.post('/api/cart', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  if (isNaN(req.body.productId) || productId < 0) {
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

        if (isNaN(req.session.cartId)) {
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
  if (isNaN(req.session.cartId)) {
    return res.status(400).json({ error: 'Sorry, we are unable to process your order.' });
  }

  if (!req.body.name || !req.body.creditCard || !req.body.shippingAddress) {
    return res.status(400).json({ error: 'Sorry, your order information is incomplete.' });
  }

  const paramDb = [req.session.cartId, req.body.name, req.body.creditCard, req.body.shippingAddress];
  const sql = `
        insert into "orders" ("cartId", "name", "creditCard", "shippingAddress")
             values ($1, $2, $3, $4)
          returning *
      `;

  db.query(sql, paramDb)
    .then(result => {
      req.session = null;
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
