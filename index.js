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
    await Author.create(conn, 'Ona', 'Onaite');
    const paula = await Author.create(conn, 'Paula', 'Paulaviciute');
    console.log(autorius);

    const authors = await Author.listAll(conn);
    console.log(authors);

    const authorById = await Author.findById(conn, 2);
    console.log(authorById);

    await Author.findByFirstname(conn,);

}

app.init();

module.exports = app;