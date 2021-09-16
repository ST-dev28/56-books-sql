const Validation = require('./Validations');
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
    //validation
    if (!Validation.isText(authorFirstname)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }
    if (!Validation.isText(authorLastname)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'INSERT INTO `authors`\
                (`id`, `firstname`, `lastname`)\
                VALUES (NULL, "' + authorFirstname + '", "' + authorLastname + '")';
    [rows] = await connection.execute(sql);
    return `${authorFirstname} ${authorLastname} buvo sekmingai itrauktas i sarasa!`;
}

/**
 * Visu autoriu sarasas.
 * @param {object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @returns {Promise<Object[]>} Tekstas nurodantis autoriu sarasa.
 */
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

/**
 * Autoriaus itrukimas i duombaze.
 * @param {Object} connection   Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */
Author.findById = async (connection, authorId) => {
    //validation
    if (!Validation.IDisValid(authorId)) {

        return `Autoriaus ID turi buti teigiamas sveikasis skaicius!`;
    }
    const sql = 'SELECT * FROM `authors` WHERE `id` = ' + authorId;
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return `Pasirinktas autorius pagal ID yra ${author}`;;
    }
}
/**
 * Autoriaus paieska pagal varda.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorFirstname Autoriaus vardas.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */
Author.findByFirstname = async (connection, authorFirstname) => {
    //VALIDATION:
    if (!Validation.isValidFirstName(authorFirstname)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'SELECT * FROM `authors` WHERE `firstname` LIKE "%' + authorFirstname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return `Pasirinktas autorius pagal VARDA yra ${author}`;
    }
}
/**
 * Autoriaus paieska pagal pavarde.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {string} authorLastname Autoriaus pavarde.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */
Author.findByLastname = async (connection, authorLastname) => {
    //VALIDATION:
    if (!Validation.isValidFirstName(authorLastname)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }

    const sql = 'SELECT * FROM `authors` WHERE `lastname` LIKE "%' + authorLastname + '%"';
    const [rows] = await connection.execute(sql);

    if (rows.length === 0) {
        return 'Tokio autoriaus nera!';
    } else {
        const name = rows[0].firstname;
        const surname = rows[0].lastname;
        const author = `${name} ${surname}`;
        return `Pasirinktas autorius pagal PAVARDE yra ${author}`;
    }
}
/**
 * Autoriaus paieska pagal id ir viena papildoma parametra. 
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @param {string} propertyName Atnaujinamos savybes pavadinimas.
 * @param {string} propertyValue Atnaujinamos savybes verte.
 * @returns { Promise < string >} Tekstas, skelbiantis kokia savybe, pagal duota ID, buvo atnaujinta i kokia verte.
 */
Author.updatePropertyById = async (connection, authorId, propertyName, propertyValue) => {
    if (!Validation.IDisValid(authorId)) {

        return `Autoriaus ID turi buti teigiamas sveikasis skaicius!`;
    }
    if (!Validation.isText(propertyName)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }
    if (!Validation.isText(propertyValue)) {

        return `Parametras turi buti ne tuscias tekstas!`;
    }

    /*if (typeof authorId !== 'number') {
       return `Autoriaus ID turi buti skaicius!`
   }
   if (typeof propertyName !== 'string' ||
       typeof propertyValue !== 'string') {
       return `Parametras turi buti tekstas!`
   }*/

    sql = 'UPDATE authors SET ' + propertyName + ' = "' + propertyValue + '" WHERE authors.id =' + authorId;
    [rows] = await connection.execute(sql);
    const updated = `Author, whose ID is ${authorId},  ${propertyName} was changed to ${propertyValue}.`
    return updated;
}

/**
 * Autoriaus paieska pagal pavarde.
 * @param {Object} connection Objektas, su kuriuo kvieciame duombazes mainpuliavimo metodus.
 * @param {number} authorId Autoriaus ID.
 * @returns {Promise<string>} Tekstas nurodo autoriaus duomenis.
 */
Author.delete = async (connection, authorId) => {
    //VALIDATION:
    if (!Validation.IDisValid(authorId)) {

        return `Autoriaus ID turi buti teigiamas sveikasis skaicius!`;
    }
    const sql = 'DELETE FROM `authors` WHERE `id` = ' + authorId;
    [rows] = await connection.execute(sql);
    const deletedAuthor = `Author with ID "${authorId}" has been removed from the list.`;
    return deletedAuthor;
}

module.exports = Author;