const Author = {};

/**
 * Autoriaus itrukimas i duombaze.
 * @param {Object} connection   Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname  autoriaus vardas.
 * @param {string} authorLastname  autoriaus pavarde.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */

Author.create = async (connection, authorFirstname, authorLastname) => {
    //console.log(authorFirstname, authorLastname);
    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "' + authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    return `${authorFirstname} ${authorLastname} buvo sekmingai itrauktas i sarasa!`;
}

const infoList = [];
Author.listAll = async (connection) => {
    const sql = 'SELECT * FROM `authors`';
    const [rows] = await connection.execute(sql);
    let i = 0;
    for (let { firstname, lastname } of rows) {
        infoList.push(`${++i}. ${firstname} ${lastname}`);

    }
    const firstLine = 'Autoriu sarasas: \n';
    return firstLine + infoList.join('\n');
    //console.log(title + infoList.join('\n'));
}

Author.findById = async (connection, authorId) => {
    const sql = 'SELECT * FROM `authors` WHERE `id` = ' + authorId;
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const firstLine = 'Pasirinktas autorius pagal ID: \n';
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return firstLine + author;
    }
}

Author.findByFirstname = async (connection, authorFirstname) => {
    const sql = 'SELECT * FROM `authors` WHERE `firstname` LIKE "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const firstLine = 'Pasirinktas autorius pagal varda: \n';
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return firstLine + author;
    }
}

Author.findByLastname = async (connection, authorLastname) => {
    const sql = 'SELECT * FROM `authors` WHERE `lastname` LIKE "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const firstLine = 'Pasirinktas autorius pagal pavarde: \n';
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return firstLine + author;
    }
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
}

Author.delete = async (connection, authorId) => {
}

module.exports = Author;