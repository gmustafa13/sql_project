/** @format */

const User = require("../schema/user");
const base64 = require("base-64");

module.exports = {
  saveData: async (data) => {
    let password = base64.encode(data.password);
    data.password = password;
    let userData = await User.sync().then(() => {
      return User.create(data);
    });
    return userData;
  },
  getOne: async (data) => {
    return await User.findOne({
      where: {
        email: data.email,
      },
    });
  },
  updateOne: async (data) => {
    return await User.update(
      data,
      {
        where: {
          email: data.email,
        },
      }
    );
  },
  getAll : async ()=>{
    return await User.findAll();
  }
};
