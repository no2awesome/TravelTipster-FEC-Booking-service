create database tripadvisor;
use tripadvisor;

create table hotel (id int, name varchar(50), primary key(id));

create table brokerage (id int, name varchar(50), primary key(id));

create table reservation(id int, hotel_id int, check_in_date int, check_out_date int, primary key(id, hotel_id), foreign key(hotel_id) references hotel(id));
create table hotel_room (hotel_id int, room_type_id int, name varchar(30),primary key(room_type_id, hotel_id), foreign key(hotel_id) references hotel(id));