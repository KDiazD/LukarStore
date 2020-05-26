const helpers = {};

helpers.isSelected = (value, key)=>{
    console.log(value, key)
    return value === key ? "selected" : "";
};

module.exports = helpers;