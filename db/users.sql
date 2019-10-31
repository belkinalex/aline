CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    date DATE,
    author TEXT,
    description TEXT,
    image TEXT
);

INSERT INTO books
    (title, date, author, description, image)
VALUES
    ('First book', '2019-01-01', 'Author of first book', 'My first book', 'first_book.jpg'),
    ('Second book', '2019-02-02', 'Author of second book', 'My second book', 'second_book.jpg'),
    ('Third book', '2019-03-03', 'Author of third book', 'My third book', 'third_book.jpg');