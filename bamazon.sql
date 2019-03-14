drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
product_price decimal(10,4),
stock_quantity int(10),
product_sales decimal(10,4),
primary key(item_id)
);

create table departments(
department_id int not null auto_increment,
departemnt_name varchar(45) null,
over_head_costs int(10) ,
primary key (department_id)
);
insert into products(product_name,product_price,stock_quantity,product_sales)
values
("shampoo","5.5","1000","0.0"),
("conditioner","6.5","1000","0.0"),
("soap","1.5","1000","0.0"),
("brush","0.5","1000","0.0"),
("cheese","4.0","1000","0.0"),
("bread","2.5","1000","0.0"),
("beef","20.0","1000","0.0"),
("chicken","15.5","1000","0.0"),
("milk","3.0","1000","0.0"),
("eggs","5.0","1000","0.0")
;
select * from products;