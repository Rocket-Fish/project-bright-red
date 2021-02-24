// eslint-disable-next-line
const convert = (input: any): any => {
  if (Array.isArray(input)) {
    // array case
    return input.map((i) => convert(i));
  }

  if (typeof input === "object" && input !== null) {
    // eslint-disable-next-line
    const newObject = {} as any;
    Object.entries(input).forEach(([key, value]) => {
      newObject[key.replace(/_([a-z])/g, (find) => find[1].toUpperCase())] = convert(value);
    });
    return newObject;
    // object case
  }

  // anything else
  return input;
};

export default convert;
