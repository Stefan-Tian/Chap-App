const expect = require("expect");

const { Users } = require("./user");

describe("Users", () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: "1",
      name: "Mike",
      room: "Node Course"
    }, {
      id: "2",
      name: "Jane",
      room: "React Course"
    }, {
      id: "3",
      name: "Joe",
      room: "Node Course"
    }]
  });

  it("should add new user", () => {
    const users = new Users();
    const user = {
      id: "dd233",
      name: "Stefan",
      room: "Gangster"
    };
    const resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should remove and return a user", () => {
    const deletedUser = users.users[0];
    const result = users.removeUser("1");

    expect(users.users.length).toBe(2);
    expect(result).toEqual(deletedUser);
  });

  it("should not remove a user", () => {
    const result = users.removeUser("4");

    expect(result).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it("should find a user", () => {
    const result = users.getUser("2");

    expect(result).toEqual(users.users[1]);
  });

  it("should not find a user", () => {
    const result = users.getUser("4");

    expect(result).toNotExist();
  });

  it("should return names for node course", () => {
    const userList = users.getUserList("Node Course")

    expect(userList).toEqual(["Mike", "Joe"]);
  });
});
