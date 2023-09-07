const countContentLength = (value) => {
  if (value === 0) return 0;
  return value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length;
};

export default countContentLength;
