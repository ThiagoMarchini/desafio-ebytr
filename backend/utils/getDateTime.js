const getDateTime = () => {
  const currentDate = new Date(); 
  const date = `${currentDate.getDate()}-${
    (currentDate.getMonth() + 1)}-${currentDate.getFullYear()} ${currentDate.getHours()}:${
      (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes()
        }:${(currentDate.getSeconds() < 10 ? '0' : '') + currentDate.getSeconds()
  }`;
  return date;
};

module.exports = {
  getDateTime,
};