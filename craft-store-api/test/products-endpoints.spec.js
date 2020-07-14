const knex = require("knex");
const fixtures = require("./craftstore-fixtures");
const app = require("../src/app");

describe("Products Endpoints", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set("db", db);
    db.raw("TRUNCATE products RESTART IDENTITY CASCADE");
  });

  afterEach("cleanup", () =>
    db.raw("TRUNCATE products RESTART IDENTITY CASCADE")
  );

  after("disconnect from db", () => db.destroy());

  describe("GET /api/products", () => {
    context(`Given no products`, () => {
      it(`responds with 200 and an empty list`, () => {
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });

    context("Given there are products in the database", () => {
      const testProducts = fixtures.makeProductsArray();

      beforeEach("insert products", () => {
        return db.into("products").insert(testProducts);
      });

      it("gets the products from database", () => {
        return supertest(app)
          .get("/api/products")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, testProducts);
      });
    });
  });

  describe("GET /api/products/:product_id", () => {
    const testProducts = fixtures.makeProductsArray();

    beforeEach("insert products", () => {
      return db.into("products").insert(testProducts);
    });

    it("responds with 200 and the specified product", () => {
      const product_id = 1;
      const expectedProduct = fixtures.makeExpectedProduct();

      return supertest(app)
        .get(`/api/products/${product_id}`)
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .expect(200, expectedProduct);
    });
  });
});
