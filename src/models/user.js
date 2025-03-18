class User {
    constructor(id, name, email, password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    static data = [
        new User(1, 'John Doe', 'local1@gmail.com', '123456'),
        new User(2, 'Jane Deo', 'local2@gmail.com', '123456'),
    ];
};

module.exports = User;