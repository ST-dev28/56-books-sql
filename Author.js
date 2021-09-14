const Author = {};

/**
 * Autoriaus itrukimas i duombaze.
 * @param {Object} connection   Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname  autoriaus vardas
 * @param {string} authorLastname  autoriaus pavarde
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */

Author.create = async (connection, authorFirstname, authorLastname) => {
    //console.log(authorFirstname, authorLastname);
    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "' + authorFirstname + '", "' + authorLastname + '")';
    const [rows] = await connection.execute(sql);
    const resp = `${authorFirstname} ${authorLastname} buvo sekmingai itrauktas i sarasa!`
    //console.log(resp);
    return resp;
}

Author.listAll = async (connection) => {
}

Author.findById = async (connection, authorId) => {
}

Author.findByFirstname = async (connection, authorFirstname) => {
}

Author.findByLastname = async (connection, authorLastname) => {
}

Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
}

Author.delete = async (connection, authorId) => {
}

module.exports = Author;