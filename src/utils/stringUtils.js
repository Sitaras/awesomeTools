const stripLeadingZeros = (str) => str.replace(new RegExp("^0+(?!$)", "g"), "");

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
  }));
};

export { replaceAll, isEmptyString, stripLeadingZeros, tableDataTransformer };
