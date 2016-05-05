create table user(
	id int not null primary key auto_increment,
	username varchar(255) unique not null
 )engine=innodb default charset=utf8;