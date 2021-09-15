/**
 * Kaip rasyti JSDOc'sus?
 * Link: https://jsdoc.app
 */

const Books = {};

/**
 * Autoriaus isleistos knygos irasymas i duombaze.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} bookName Knygos pavadinimas.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<string>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.create = async (connection, authorId, bookName, bookReleaseYear) => {
    sql = 'INSERT INTO books (authorId,title, releaseYear)\
    VALUES ("'+ authorId + '", "' + bookName + '", "' + bookReleaseYear + '")';
    [rows] = await connection.execute(sql);
    const createBook = `Was added to the book list: author with ID ${authorId}, book title "${bookName}", release year ${bookReleaseYear}.`
    return createBook;
}

/**
 * Visu autoriu isleistu knygu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas, apibudinantis, koks autorius ir kurias metais isleido knyga.
 */
Books.listAll = async (connection) => {
    sql = 'SELECT * FROM books';
    [rows] = await connection.execute(sql);
    const booksList = [];
    let i = 0;
    for (const book of rows) {
        booksList.push(`${++i}. Author_Id ${book.authorId}, "${book.title}", year ${book.releaseYear}.`);
    }
    const firstLine = 'List of books: \n';
    return firstLine + booksList.join('\n');
}

/**
 * Knygos paieska pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} bookName Knygos pavadinimas.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByName = async (connection, bookName) => {
    sql = 'SELECT * FROM `books` WHERE `title` = "' + bookName + '"';
    [rows] = await connection.execute(sql);
    const byTitle = `Book "${bookName}" is written by author_Id ${rows[0].authorId}, released in year ${rows[0].releaseYear}.`;
    return byTitle;
}

Books.findByYear = async (connection, bookReleaseYear) => {
    sql = 'SELECT * FROM `books` WHERE `releaseYear` = "' + bookReleaseYear + '"\
    ORDER BY `authorId` ASC';

    [rows] = await connection.execute(sql);
    //const bookByYear = `Book details by the year ${bookReleaseYear}: Author ID: ${rows[0].authorId}, book name "${rows[0].title}".`;
    //return bookByYear;

    const booksListByYear = [];
    let i = 0;
    //const firstLine = `Books released in year ${bookReleaseYear}: \n`;
    for (const book of rows) {
        booksListByYear.push(`${++i}. Author_Id ${book.authorId}, "${book.title}", year ${book.releaseYear}.`);
    }
    return `Books released in year ${bookReleaseYear}: \n` + booksListByYear.join('\n');
}

Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
}

Books.updateNameById = async (connection, bookId, bookName) => {
}

Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
}

Books.delete = async (connection, bookId) => {
}

Books.deleteAllByAuthorId = async (connection, authorId) => {
}

module.exports = Books;