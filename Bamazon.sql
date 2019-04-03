DROP DATABASE IF EXISTS bamazon_db;

CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT(4) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT (10),
    PRIMARY KEY (item_id)
    
    );
    INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
    VALUES (1, "Tires", "Automotive", 145.99, 80),
    (2, "Tow Straps", "Recovery Gear", 55.99, 22),
    (3, "Roof Rack", "Accessories", 895.99, 9),
    (4, "Cooler", "Camping", 249.99, 15),
    (5, "Rooftop Tent", "Camping", 1539.99, 6),
    (6, "Hatchet", "Camping", 69.99, 12),
    (7, "Lantern", "Camping", 49.9, 14),
    (8, "Water Filter", "Accessories", 9.99, 23),
    (9, "Gas Can", "Automotive", 39.99, 18),
    (10, "5 Gallon Water Container", "Accessories", 39.99, 17);
    
    SELECT * FROM products;