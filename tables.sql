use cs386_nkamm;

drop table if exists AdvisingSession;
drop table if exists AdvisingBlock;
drop table if exists Advisee;
drop table if exists Advisor;

create table Advisee (
	student_id int primary key,
    first_name varchar(20),
    last_name varchar(20),
    h_password varchar(32),
    email varchar(40) UNIQUE
);

create table Advisor (
	advisor_id int primary key,
	first_name varchar(20),
    last_name varchar(20),
    h_password varchar(32),
    email varchar(40) UNIQUE,
    lock_time int
);

create table AdvisingBlock (
	advisor_id int not null,
    is_deleted bool not null,
    start_day datetime not null,
    session_length int not null,
    num_sessions_in_day int not null,
    foreign key (advisor_id) references Advisor(advisor_id) on delete cascade
);

create table AdvisingSession (
	advisor_id int not null,
    student_id int null,
    duration int not null,
    comments varchar(256) null,
    missed bool default false,
    approved bool default false,
    booked bool default false,
    session_day datetime not null,
    start_time int not null,
    foreign key (advisor_id) references AdvisingBlock(advisor_id) on delete cascade
    /*foreign key (student_id) references Advisee(student_id) on delete cascade*/
    );
