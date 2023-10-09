--liquibase formatted sql

-- changeset s.galanov:create_quiz_table
create table quiz (
    id SERIAL PRIMARY KEY,
    type varchar(100) not null UNIQUE
)
go

-- changeset s.galanov:create_question_table
create table question (
    id SERIAL PRIMARY KEY,
    text varchar(300) not null,
    quiz_id int not null,
    constraint fk__question__quiz foreign key (quiz_id) references quiz (id)
)
go

-- changeset s.galanov:create_answer_table
create table answer (
    id SERIAL PRIMARY KEY,
    text varchar(300),
    correct BOOLEAN not null,
    question_id int not null,
    constraint fk__answer__question foreign key (question_id) references question (id)
)
go