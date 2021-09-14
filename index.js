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

    await Author.listAll(conn);

    await Author.findById(conn, 1);


}

app.init();

module.exports = app;