drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
product_price decimal(10,4),
stock_quantity int(10),
primary key(item_id)
);

insert into products(product_name,product_price,stock_quantity)
values
("shampoo","5.5","1000"),
("conditioner","6.5","1000"),
("soap","1.5","1000"),
("brush","0.5","1000"),
("cheese","4.0","1000"),
("bread","2.5","1000"),
("beef","20.0","1000"),
("chicken","15.5","1000"),
("milk","3.0","1000"),
("eggs","5.0","1000")
;
select * from products;