CREATE TABLE city
(
    city_id INT NOT NULL ,
    city_name VARCHAR (255) NOT NULL,
    country VARCHAR (255) NOT NULL,
    state VARCHAR (255) NOT NULL,
    zip INT NOT NULL,
    PRIMARY KEY (city_id)
);


CREATE TABLE restaurant
(
    restaurant_id INT NOT NULL,
    restaurant_name VARCHAR(255) NOT NULL,
    restaurant_address VARCHAR(255) NOT NULL,
    city_id INT,
    PRIMARY KEY (restaurant_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE users
(
    user_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    user_mobile VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE orders
(
    order_id INT NOT NULL,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    order_price decimal(12,2) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);








insert into  city values
(
    1 ,
    "Delhi",
    "India",
    "Delhi",
    "887766"
);


insert into  restaurant values
(
    1,
    "test",
    "testlksaksd",
    1
);

insert into users values
(
    "test",
    1,
    "9999999999",
    1,
    "user_email VARCHAR(255) NOT NULL",
    "user_address VARCHAR(255) NOT NULL"

);

insert into orders values
(
    2,
    1,
   1,
    now(),
    10

);



//based on restaurant then pass restaurant id  if city pass city id if user pass user id

SELECT restaurant.city_id
FROM restaurant,orders
WHERE  restaurant.restaurant_id =orders.restaurant_id


compare different city pass city id

last few months then pass the time limit and







insert into orders values
(
    14,
    1,
   1,
    now(),
    88

);insert into orders values
(
    46,
    1,
   1,
    now(),
    63

);insert into orders values
(
    61,
    1,
   1,
    now(),
    23

);insert into orders values
(
    68,
    1,
   1,
    now(),
    58

);insert into orders values
(
    57,
    1,
   1,
    now(),
    39

);insert into orders values
(
    95,
    1,
   1,
    now(),
    39

);insert into orders values
(
    99,
    1,
   1,
    now(),
    99

);insert into orders values
(
    50,
    1,
   1,
    now(),
    43

);insert into orders values
(
    90,
    1,
   1,
    now(),
    62

);insert into orders values
(
    76,
    1,
   1,
    now(),
    23

);insert into orders values
(
    84,
    1,
   1,
    now(),
    47

);insert into orders values
(
    69,
    1,
   1,
    now(),
    79

);insert into orders values
(
    53,
    1,
   1,
    now(),
    73

);insert into orders values
(
    96,
    1,
   1,
    now(),
    15

);insert into orders values
(
    98,
    1,
   1,
    now(),
    93

);insert into orders values
(
    76,
    1,
   1,
    now(),
    98

);insert into orders values
(
    98,
    1,
   1,
    now(),
    63

);insert into orders values
(
    48,
    1,
   1,
    now(),
    16

);insert into orders values
(
    56,
    1,
   1,
    now(),
    52

);insert into orders values
(
    35,
    1,
   1,
    now(),
    10

);insert into orders values
(
    42,
    1,
   1,
    now(),
    58

);insert into orders values
(
    28,
    1,
   1,
    now(),
    59

);insert into orders values
(
    41,
    1,
   1,
    now(),
    10

);insert into orders values
(
    67,
    1,
   1,
    now(),
    59

);insert into orders values
(
    98,
    1,
   1,
    now(),
    46

);insert into orders values
(
    42,
    1,
   1,
    now(),
    24

);insert into orders values
(
    31,
    1,
   1,
    now(),
    21

);insert into orders values
(
    16,
    1,
   1,
    now(),
    42

);insert into orders values
(
    74,
    1,
   1,
    now(),
    57

);insert into orders values
(
    86,
    1,
   1,
    now(),
    89

);