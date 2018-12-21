create database tripadvisor;
use tripadvisor;

create table hotel (id int, name varchar(50), primary key(id));

create table brokerage (id int, name varchar(50), primary key(id));

create table reservation(id int, hotel_id int, check_in_date int, check_out_date int, primary key(id, hotel_id), foreign key(hotel_id) references hotel(id));
create table hotel_room (hotel_id int, room_type_id int, name varchar(30),primary key(room_type_id, hotel_id), foreign key(hotel_id) references hotel(id));


create table availability (hotel_id int, room_type_id int, date int, brokerage_id int, reservation_id int, price int, primary key (hotel_id, room_type_id, date), foreign key(hotel_id) references hotel(id), foreign key (room_type_id) references hotel_room(room_type_id), foreign key (reservation_id) references reservation(id));

drop database tripadvisor;