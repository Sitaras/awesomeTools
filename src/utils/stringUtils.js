const replaceAll = (text, value = "", replaceValue = "") => {
  return text ? text.split(value).join(replaceValue) : text;
};

const isEmptyString = (str) => {
  return !str || (typeof str === "string" && str.trim().length === 0);
};

const tableDataTransformer = (data) => {
  return data?.map((entry) => ({
    ...entry,
    fileName: entry?.fileName,
    extension: entry?.extension,
    canBeReverted: false,
    height: 350,
    width: 350,
  }));
};

const convertToLowerCase = (text) => {
  return text?.toLowerCase();
};

const replaceNewLineWithWhiteSpace = (text) => {
  return replaceAll(text, "\n", " ");
};

const trim = (text) => {
  return text?.trim();
}

export {
  replaceAll,
  isEmptyString,
  tableDataTransformer,
  convertToLowerCase,
  replaceNewLineWithWhiteSpace,
  trim,
};
