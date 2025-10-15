-- === USERS ===
INSERT INTO ecommerce.users (id, username, email, password, phone, role)
VALUES
  (1, 'admin', 'admin@shop.com', 'admin123', '+212600000001', 'ROLE_ADMIN'),
  (2, 'john', 'john.doe@example.com', 'password', '+212600000002', 'ROLE_CUSTOMER'),
  (3, 'sara', 'sara.smith@example.com', 'password', '+212600000003', 'ROLE_CUSTOMER');

-- === ADDRESSES ===
INSERT INTO ecommerce.addresses (id, street, city, postal_code, country, user_id)
VALUES
  (1, '123 Main St', 'Casablanca', '20000', 'Morocco', 1),
  (2, '45 Ocean Ave', 'Rabat', '10000', 'Morocco', 2),
  (3, '78 Palm Rd', 'Marrakech', '40000', 'Morocco', 3);

-- === CATEGORIES ===
INSERT INTO ecommerce.categories (id, name, description)
VALUES
  (1, 'Electronics', 'Devices, gadgets, and accessories'),
  (2, 'Clothing', 'Men and women fashion'),
  (3, 'Books', 'All genres of books and novels'),
  (4, 'Home', 'Furniture and home improvement');

-- === PRODUCTS ===
INSERT INTO ecommerce.products (id, name, description, price, stock, category_id)
VALUES
  (1, 'Laptop', 'High-performance laptop for work and gaming', 1200.00, 10, 1),
  (2, 'Smartphone', 'Latest Android smartphone', 850.00, 25, 1),
  (3, 'T-shirt', 'Comfortable cotton T-shirt', 20.00, 100, 2),
  (4, 'Sneakers', 'Stylish running shoes', 75.00, 50, 2),
  (5, 'Novel: The Alchemist', 'Bestselling inspirational book', 15.00, 30, 3),
  (6, 'Desk Lamp', 'LED desk lamp for study or work', 35.00, 20, 4);

-- === CARTS ===
INSERT INTO ecommerce.carts (id, total_price, user_id)
VALUES
  (1, 1870.00, 2),
  (2, 95.00, 3);

-- === CART ITEMS ===
INSERT INTO ecommerce.cart_items (id, quantity, cart_id, product_id)
VALUES
  (1, 1, 1, 1),  -- John’s Laptop
  (2, 1, 1, 2),  -- John’s Smartphone
  (3, 2, 2, 3);  -- Sara’s T-shirts

-- === PAYMENTS ===
INSERT INTO ecommerce.payments (id, amount, method, payment_date, status, user_id)
VALUES (1, 1870.00, 'CREDIT_CARD', NOW(), 'COMPLETED', 2),
       (2, 95.00, 'PAYPAL', NOW(), 'COMPLETED', 3);

-- === ORDERS ===
INSERT INTO ecommerce.orders (id, order_date, status, total_amount, payment_id, user_id)
VALUES
  (1, NOW(), 'COMPLETED', 1870.00, 1, 2),
  (2, NOW(), 'COMPLETED', 95.00, 2, 3);

-- === ORDER ITEMS ===
INSERT INTO ecommerce.order_items (id, price, quantity, order_id, product_id)
VALUES
  (1, 1200.00, 1, 1, 1),
  (2, 850.00, 1, 1, 2),
  (3, 20.00, 2, 3, 3),
  (4, 75.00, 1, 2, 4);
