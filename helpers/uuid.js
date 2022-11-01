module.exports = () => 
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

// as written in class examples to generate a unique user id
