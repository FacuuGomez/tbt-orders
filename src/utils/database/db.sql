-- CREATE TYPE product_type AS ENUM ('drink', 'burger');

-- CREATE TABLE IF NOT EXISTS products(
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     description VARCHAR(300) NOT NULL,
--     price INTEGER NOT NULL,
--     product product_type NOT NULL
-- );

-- CREATE TYPE payment_method AS ENUM ('cash', 'transfer');
-- CREATE TYPE delivery_type AS ENUM ('yes', 'no');

-- CREATE TABLE IF NOT EXISTS orders(
--     id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
--     name VARCHAR(100) NOT NULL,
--     order products[] NOT NULL,
--     amount NUMERIC(10, 2) NOT NULL,
--     payment payment_method NOT NULL,
--     delivery delivery_type NOT NULL,
--     address VARCHAR(200) NULL,
--     created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
-- );

-- Cambié 'order' por 'order_items'

CREATE TYPE product_type AS ENUM ('drink', 'burger');

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    price INTEGER NOT NULL,
    product product_type NOT NULL,  
    image VARCHAR(300) NOT NULL      
);

CREATE TYPE payment_method AS ENUM ('cash', 'transfer');
CREATE TYPE delivery_type AS ENUM ('yes', 'no');

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(100) NOT NULL,
    order_items products[] NOT NULL,  
    amount NUMERIC(10, 2) NOT NULL,
    payment payment_method NOT NULL,
    delivery delivery_type NOT NULL,
    address VARCHAR(200) NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;

DROP TYPE IF EXISTS product_type CASCADE;
DROP TYPE IF EXISTS payment_method CASCADE;
DROP TYPE IF EXISTS delivery_type CASCADE;


CREATE TYPE product_type AS ENUM ('drink', 'burger');
CREATE TYPE payment_method AS ENUM ('cash', 'transfer');
CREATE TYPE delivery_type AS ENUM ('yes', 'no');

CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300) NOT NULL,
    price INTEGER NOT NULL,
    product product_type NOT NULL,  
    image VARCHAR(300) NOT NULL,
    width VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    name VARCHAR(100) NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    payment payment_method NOT NULL,
    delivery delivery_type NOT NULL,
    address VARCHAR(200) NULL,
    created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL
);
