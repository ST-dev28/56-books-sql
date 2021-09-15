const db = require('./db');
const Author = require('./Author');
const Books = require('./Books');

const app = {}

app.init = async () => {
    // prisijungti prie duomenu bazes
    const conn = await db.init({
        host: 'localhost',
        user: 'root',
        database: 'books',
    });

    // LOGIC BELOW


    const autorius1 = await Author.create(conn, 'Vardenis', 'Pavardenis');
    console.log(autorius1);
    const autorius2 = await Author.create(conn, 'Mike', 'Pukuotukas');
    console.log(autorius2);
    const autorius3 = await Author.create(conn, 'Jonas', 'Jonaitis');
    console.log(autorius3);
    const autorius4 = await Author.create(conn, 'Ona', 'Onyte');
    console.log(autorius4);
    const autorius5 = await Author.create(conn, 'Paula', 'Paulaviciute');
    console.log(autorius5);
    const autorius6 = await Author.create(conn, 'Zigmas', 'Zigmutis');
    console.log(autorius6);


    console.log('');
    const authors = await Author.listAll(conn);
    console.log(authors);

    console.log('');
    const authorById = await Author.findById(conn, 2);
    console.log(authorById);

    console.log('');
    const authorByName = await Author.findByFirstname(conn, 'Paula');
    console.log(authorByName);

    console.log('');
    const authorBySurname = await Author.findByLastname(conn, 'Jonaitis');
    console.log(authorBySurname);

    console.log('');
    const updateById = await Author.updatePropertyById(conn, 3, 'firstname', 'Onyte')
    console.log(updateById);

    console.log('');
    const deleteAuthor = await Author.delete(conn, 1);
    console.log(deleteAuthor);

    console.log('');
    const book1 = await Books.create(conn, 2, 'Audra', 1970);
    console.log(book1);
    const book2 = await Books.create(conn, 3, 'Tyla', 1980);
    console.log(book2);
    const book3 = await Books.create(conn, 4, 'Miskas', 1981);
    console.log(book3);
    const book4 = await Books.create(conn, 5, 'Pieva', 1991);
    console.log(book4);
    const book5 = await Books.create(conn, 2, 'Laukas', 1981);
    console.log(book5);

    console.log('');
    const listOfBooks = await Books.listAll(conn)
    console.log(listOfBooks);

    console.log('');
    const byBookName = await Books.findByName(conn, 'Tyla')
    console.log(byBookName);

    console.log('');
    const byBookYear = await Books.findByYear(conn, 1981)
    console.log(byBookYear);


}

app.init();

module.exports = app;