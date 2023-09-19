import moment from "moment";

const getDateFormat = (today) => {
  if (today) return moment(today).format("YYYY-MM-DD");

  return moment().format("YYYY-MM-DD");
};

export default getDateFormat;
