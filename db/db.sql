begin;
create table users (
	empid text not null,
	password text default md5('acquire123#'),
	firstname text not null,
	lastname text not null,
	archived boolean default false,
	unique(empid)
);

create table calllogs (
	pk serial primary key,
	createdby text not null,
	datecreated timestamp with time zone default now(),
	foreign key (createdby) references users (empid)
);

alter table users owner to reception;
alter table calllog owner to reception;

grant all on table calllogs to reception;
commit;