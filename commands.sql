postgres-# \c postgres
You are now connected to database "postgres" as user "postgres".
postgres=# CREATE TABLE IF NOT EXISTS blogs (
postgres(#     id SERIAL PRIMARY KEY,
postgres(#     author TEXT,
postgres(#     url TEXT NOT NULL,
postgres(#     title TEXT NOT NULL,
postgres(#     likes INTEGER DEFAULT 0
postgres(# );
CREATE TABLE
postgres=# \dt blogs
         List of relations
 Schema | Name  | Type  |  Owner
--------+-------+-------+----------
 public | blogs | table | postgres
(1 row)
postgres=# INSERT INTO blogs (author, url, title)
postgres-# VALUES ('John Doe', 'https://www.exampleblog.com', 'Posting Some Quality Literature');
INSERT 0 1
postgres=# SELECT * FROM blogs;
 id |  author  |             url             |              title              | likes
----+----------+-----------------------------+---------------------------------+-------
  1 | John Doe | https://www.exampleblog.com | Posting Some Quality Literature |     0
(1 row)
postgres=# INSERT INTO blogs (author, url, title)
postgres-# VALUES ('John Doe', 'https://www.exampleblog.com', 'First whales, now elephants?');
INSERT 0 1
postgres=# SELECT * FROM blogs;
 id |  author  |             url             |              title              | likes
----+----------+-----------------------------+---------------------------------+-------
  1 | John Doe | https://www.exampleblog.com | Posting Some Quality Literature |     0
  2 | John Doe | https://www.exampleblog.com | First whales, now elephants?    |     0
(2 rows)

