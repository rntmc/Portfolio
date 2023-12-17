const sqliteConnection = require("../database/sqlite")

class UserRepository {
  async findByEmail(email) {
    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //indica que queremos substituir o ? por email (para nao ter repetido)
    
    return user;
  }

  async create(name, email, password) {
    const database = await sqliteConnection();

    const userId = await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)", 
      [name, email, password]
    );
    
    return {id: userId};
  }
}

module.exports = UserRepository;