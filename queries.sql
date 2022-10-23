select * from empsessions;

desc empsessions;

insert into employees values(1, "admin", "adminName", "adminPassword", "admin@thenewabacus.com");





create table employees (empid int primary key, empname varchar(15), name varchar(35), password varchar(16), email varchar(30));
create table empsessions(sessionid varchar(256),empid int);