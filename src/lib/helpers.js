const bcrypt = require('bcryptjs');

const helper = {};

helper.encryptPassword = async(pass) =>{
    const salt = await bcrypt.genSalt(10);
    const hash= await bcrypt.hash(pass, salt);
    return hash;

};

helper.matchPassword = async (pass, savedPassword) => {
    try {
      return await bcrypt.compare(pass, savedPassword);
    } catch (e) {
      console.log(e)
    }
  };

module.exports = helper;