function circle(obj) {
  let hasCirCle = false;
  let cache = [];
  (function doSome(objs) {
    const keys = Object.keys(objs);
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i];
      let value = obj[key];
      if (typeof value === "object" && value !== null) {
        let has = cache.indexOf(value);
        if (has !== -1) {
          hasCirCle = true;
          break;
        } else {
          cache.push(value);
          doSome(value);
        }
      }
    }
  })(obj);
  return hasCirCle;
}

const obj = {
  foo: {
    name: "foo",
    bar: {
      name: "bar",
      baz: {
        name: "baz",
        aChild: null //待会让它指向obj.foo
      }
    }
  }
};
obj.foo.name = obj.foo;

const a = circle(obj.foo.name);
console.log(334, a);

// arr1.reduce((acc, val) => acc.concat(val), []);
var arr1 = [1, 2, 3, 4];
arr1.flatMap(x => [[x * 2]]);
console.log(99, arr1);

for (let i = 0; i < 3; ) {
  console.log(i);
}
