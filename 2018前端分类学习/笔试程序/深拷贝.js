结构化数据深拷贝;

function deepFunction(obj) {
  let temp = obj.constructor === "Array" ? [] : {};
  for (let val in obj) {
    temp[val] = typeof val === "object" ? deepCopy(val) : obj[val];
  }
  return obj;
}
