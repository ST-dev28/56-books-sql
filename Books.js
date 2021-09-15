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
 * @returns {Promise<string>} Tekstas su knygos duomenimis..
 */
Books.findByName = async (connection, bookName) => {
    sql = 'SELECT * FROM `books` WHERE `title` = "' + bookName + '"';
    [rows] = await connection.execute(sql);
    const byTitle = `Book "${bookName}" is written by author_Id ${rows[0].authorId}, released in year ${rows[0].releaseYear}.`;
    return byTitle;
}
/**
 * Knygos paieska pagal metus.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.findByYear = async (connection, bookReleaseYear) => {
    sql = 'SELECT * FROM `books` WHERE `releaseYear` = "' + bookReleaseYear + '"\
    ORDER BY `authorId` ASC';
    [rows] = await connection.execute(sql);

    const booksListByYear = [];
    let i = 0;
    for (const book of rows) {
        booksListByYear.push(`${++i}. Author_Id ${book.authorId}, "${book.title}", year ${book.releaseYear}.`);
    }
    return `Books released in year ${bookReleaseYear}: \n` + booksListByYear.join('\n');
}
/**
 * Knygos paieska pagal ID ir kita uzduota parametra.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns {Promise<Object[]>} Sarasas su knygu objektais.
 */
Books.updateById = async (connection, bookId, propertyName, propertyValue) => {
    sql = 'UPDATE books SET ' + propertyName + ' = "' + propertyValue + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookByID = `Book with ID ${bookId} got ${propertyName} changed to "${propertyValue}."`
    return updatedBookByID;
}
/**
 * Knygos atnaujinimas pagal pavadinima.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {string} bookName Atnaujinamos savybes pavadinimas.
 *  @returns {Promise<string>} Tekstas su knygos duomenimis.
 */
Books.updateNameById = async (connection, bookId, bookName) => {
    sql = 'UPDATE books SET title = "' + bookName + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedTitleById = `Book with ID ${bookId} has a new title now as "${bookName}."`
    return updatedTitleById;
}
/**
 * Knygos atnaujinimas pagal metus.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 * @param {number} bookReleaseYear Knygos isleidimo metai.
 *  @returns {Promise<string>} Tekstas su knygos duomenimis.
 */
Books.updateYearById = async (connection, bookId, bookReleaseYear) => {
    sql = 'UPDATE books SET releaseYear = "' + bookReleaseYear + '" WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const updatedBookYearByID = `Book with ID ${bookId} has a new release year ${bookReleaseYear} now."`
    return updatedBookYearByID;
}
/**
 * Knygos istrynimas pagal ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} bookId Knygos ID.
 *  @returns {Promise<string>} Tekstas su knygos duomenimis.
 */
Books.delete = async (connection, bookId) => {
    sql = 'DELETE FROM books WHERE books.id =' + bookId;
    [rows] = await connection.execute(sql);
    const deletedBook = `Book with ID ${bookId} has been removed from books list!`
    return deletedBook;
}
/**
 * Visu knygu istrynimas pagal autoriaus ID.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 *  @returns {Promise<string>} Tekstas su knygos duomenimis.
 */
Books.deleteAllByAuthorId = async (connection, authorId) => {
    sql = 'DELETE FROM books WHERE authorId =' + authorId;
    [rows] = await connection.execute(sql);
    const deletedBookByAuthorId = `All books of author ID ${authorId} have been deleted from books list.`
    return deletedBookByAuthorId;
}

module.exports = Books;