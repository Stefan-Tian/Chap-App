class Users {
  constructor () {
    this.users =[];
  }

  addUser (id, name, room) {
    const user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    // return user that was removed
    const deletedUser = this.users.filter((user) => user.id === id);

    if (deletedUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return deletedUser[0];
  }

  getUser (id) {
    return this.users.filter((user) => user.id === id)[0];
  }

  getUserList (room) {
    const users = this.users.filter((user) => user.room === room);
    const namesArray = users.map((user) => user.name);

    return namesArray;
  }
}

module.exports = { Users };
