drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NULL,
product_price decimal(10,4),
stock_quantity int(10),
product_sales decimal(10,4),
department_name VARCHAR(45) NOT NULL,
primary key(item_id)
);

create table departments(
department_id int not null auto_increment,
department_name varchar(45) null,
over_head_costs int(10) ,
primary key (department_id)
);
insert into products(product_name,product_price,stock_quantity,product_sales,department_name)
values
("shampoo","5.5","1000","0.0","hygeine"),
("conditioner","6.5","1000","0.0","hygeine"),
("soap","1.5","1000","0.0","hygeine"),
("brush","0.5","1000","0.0","hygeine"),
("cheese","4.0","1000","0.0","food"),
("bread","2.5","1000","0.0","food"),
("beef","20.0","1000","0.0","food"),
("chicken","15.5","1000","0.0","not food"),
("milk","3.0","1000","0.0","food"),
("eggs","5.0","1000","0.0","food")
;

insert into departments(department_name,over_head_costs)
values("hygeine","10000.0"),
("food","10000.0"),
("not food","10000.0");

select * from products;
select * from departments;

 select departments.department_id,
 departments.department_name,
 departments.over_head_costs,
 products.product_sales
 from departments
 left join products on
 departments.department_name = products.department_name
 GROUP BY  
       departments.department_id,
 departments.department_name,
 departments.over_head_costs;