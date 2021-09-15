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


    const autorius = await Author.create(conn, 'Vardenis', 'Pavardenis');
    await Author.create(conn, 'Mike', 'Pukuotukas');
    await Author.create(conn, 'Jonas', 'Jonaitis');
    await Author.create(conn, 'Ona', 'Onyte');
    const paula = await Author.create(conn, 'Paula', 'Paulaviciute');
    console.log(autorius);

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
    const book3 = await Books.create(conn, 4, 'Miskas', 1990);
    console.log(book3);
}

app.init();

module.exports = app;