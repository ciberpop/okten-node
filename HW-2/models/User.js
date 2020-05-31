const users = [];

module.exports = class User {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }

    save() {
        const user = User.findUser(this.email, this.password)
        if (!user) {
            users.push(this)
            return true
        } else {
            return false
        }
    }

    static findUser(email, password) {
        return users.find(user => user.email === email && user.password === password)
    }

    static getAll() {
        return users;
    }
};