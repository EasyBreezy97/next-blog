-- TABLE FOR WITHOUT AMP
create table post
(
    id          bigserial    not null,
    heading     varchar(255) not null UNIQUE,
    content     text         not null,
    description varchar(255) not null,
    status      smallint     not null,
    created_at  timestamp default now(),
    updated_at  timestamp default now()
);


-- TABLE FOR WITH AMP
create table post
(
    id          bigserial    not null,
    heading     varchar(255) not null,
    content     text         not null,
    description varchar(255) not null,
    status      smallint     not null,
    created_at  timestamp default now(),
    updated_at  timestamp default now(),
    image       text         not null
);