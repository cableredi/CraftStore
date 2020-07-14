CREATE TABLE shipping (
  shipping_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  shipping_user_id INTEGER REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
  shipping_name TEXT NOT NULL,
  shipping_address1 TEXT NOT NULL,
  shipping_address2 TEXT,
  shipping_city TEXT NOT NULL,
  shipping_state TEXT NOT NULL,
  shipping_zip TEXT NOT NULL
);