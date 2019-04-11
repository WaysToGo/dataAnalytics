CREATE TABLE city
(
    city_id INT NOT NULL AUTO_INCREMENT,
    city_name VARCHAR (255) NOT NULL,
    country VARCHAR (255) NOT NULL,
    state VARCHAR (255) NOT NULL,
    zip VARCHAR(255) NOT NULL,
    PRIMARY KEY (city_id)
);


CREATE TABLE restaurant
(
    restaurant_id INT NOT NULL AUTO_INCREMENT,
    restaurant_name VARCHAR(255) NOT NULL,
    restaurant_address VARCHAR(255) NOT NULL,
    city_id INT,
    PRIMARY KEY (restaurant_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE users
(
    user_name VARCHAR(255) NOT NULL,
    user_id INT NOT NULL AUTO_INCREMENT,
    user_mobile VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_address VARCHAR(255) NOT NULL,
    PRIMARY KEY (user_id),
    FOREIGN KEY (city_id) REFERENCES city(city_id)
);

CREATE TABLE orders
(
    order_id INT NOT NULL AUTO_INCREMENT,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    order_date DATETIME NOT NULL,
    order_price decimal(12,2) NOT NULL,
    PRIMARY KEY (order_id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant(restaurant_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);



-- to generate random data using JavaScript
var a='';
for(let i=0;i<100;i++){

a+=`insert into  city (city_name,country,state,zip)values
(

    '${makeid(8)'},
    '${makeid(8)'},
    '${makeid(8)'},
    '${makenumid(6)'}
)`}



var a='';
for(let i=0;i<100;i++){

a+=`insert into  restaurant(restaurant_name ,
    restaurant_address ,
    city_id) values
(
    '${makeid(8)}',
    '${makeid(20)}',
    ${i+1}
);`}






var a='';
for(let i=0;i<100;i++){

a+=`insert into users ( user_name ,

    user_mobile ,
    city_id ,
    user_email ,
    user_address )values
(
    "${makeid(10)}",
    "${makenumid(10)}",
    ${i+1},
    "${makeid(10)}@zomato.com",
    "${makeid(20)}"

);`}





var a='';
for(let i=0;i<100;i++){

a+=`insert into orders (
    restaurant_id ,
    user_id ,
    order_date ,
    order_price ) values
(
    ${i+1},
   ${i+1},
    ${randomDate(new Date(2012, 0, 1), new Date())},
    ${makenumid(2)}

);`}


insert into orders (
    restaurant_id ,
    user_id ,
    order_date ,
    order_price ) values
(
    1,
   1,
    ${randomDate(new Date(2012, 0, 1), new Date()},
    10

);