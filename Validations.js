class Validation {

    static isUpperCase(letter) {
        return letter === letter.toUpperCase();
    }

    static isValidName(name) {
        if (name === undefined ||
            typeof name !== 'string' ||
            name.length < 2 ||
            !Validation.isUpperCase(name[0])) {
            return false;
        }
        return true;
    }

    static isValidFirstName(firstName) {
        return Validation.isValidName(firstName)
    }


    static isValidLastName(lastName) {
        return Validation.isValidName(lastName)
    }

    static IDisValid = (param) => {

        if (typeof param !== 'number' ||
            !isFinite(param) ||
            param < 1 ||
            param % 1 !== 0) {
            return false
        }
        return true
    }

    static isYearValid = (param) => {

        if (typeof param !== 'number' ||
            !isFinite(param) ||
            param < 1 ||
            param > 2021 ||
            param % 1 !== 0 ||
            param.toString(10).length !== 4) {
            return false
        }
        return true
    }

    static isText = (param) => {

        if (typeof param !== 'string' ||
            param === '') {
            return false
        }
        return true
    }

}

module.exports = Validation;