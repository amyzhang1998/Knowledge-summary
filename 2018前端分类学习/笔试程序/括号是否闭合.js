// 问题1,：创建一个函数来判断给定的表达式中的大括号是否闭合，返回 True/False，对于空字串，返回 True

// var expression = "{{}}{}{}"
// var expressionFalse = "{}{{}";

// 方法1:正则表达式
function isBalanced(exp) {
  var reg = /\{\}/g,
    len;
  do {
    len = exp.length;
    console.log(len);
    exp = exp.replace(reg, "");
  } while (len != exp.length);
  return exp.length === 0;
}

// 好像也是可以的。但是问题点至少有二：

// 第一、此算法的最坏的时间复杂度是 O(n^2)级别的，对于长篇大论是不友好的。

// 第二、此算法的正则表达式普适性较差，对于表达式含有其他干扰字符时候需要频繁修改正则表达式。当正则表达式过于复杂时候，反过来又会影响到检索效率。
// let a = "{{}}";
// isBalanced(a);

// 方法二:使用栈结构 时间复杂度O(n)
function isBalanced(exp) {
  let info = exp.split("");
  let stack = [];
  for (let i = 0; i < info.length; i++) {
    let el = info[i];
    if (el === "{") {
      stack.push(el);
    } else if (el === "}") {
      if (stack === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}

// 问题：实现函数 isBalanced，用 true 或 false 表示给定的字符串的括号是否平衡（一一对应）。注意了是要支持三种类型的括号{}，[]，和()。带有交错括号的字符串应该返回 false
// isBalanced('(foo { bar (baz) [boo] })') // true
// isBalanced('foo { bar { baz }') // false
// isBalanced('foo { (bar [baz] } )') // false
// 思路：
// 过滤掉非括号的干扰字符。
// 每一种右括号有一种唯一的左括号与之对应。出现右括号时候，栈顶的左括号必须是和它匹配的。

const isBalanced = str => {
  const map = new Map([["{", "}"], ["[", "]"], ["(", ")"]]);
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    let node = str[i];
    if (map.has(node)) {
      stack.push(node);
    } else if ([...map.values()].includes(node)) {
      if (
        stack[stack.length - 1] !==
        [...map.entries()]
          .filter(el => el[1] === node)
          .pop()
          .shift()
      ) {
        return false;
      }
      stack.splice(stack.length - 1, 1);
    }
  }
  return stack.length === 0;
};

// 问题3:要求严格限制括号的顺序，即中括号外围只能是大括号，内部只能是小括号。也即：括号只能以大括号、中括号、小括号的顺序只能前面的包含后面的，不能后面的包含前面的，用代码来表示一下：
// isStrictBalanced('foo { bar (baz) [boo] }') // true
// isStrictBalanced('(foo { bar (baz) [boo] })') // false
// 入栈时候判断一下当前的优先级

const isStrictBalanced = str => {
  const map = new Map([["{", "}"], ["[", "]"], ["(", ")"]]);
  let stack = [],
    keys = [...map.keys()],
    values = [...map.values()];
  for (let i = 0; i < str.length; i++) {
    let node = str[i];
    if (map.has(node)) {
      if (stack.length) {
        let arr = [node, [...stack].pop()].map(el => keys.indexOf(el));
        if (arr[0] < arr[1]) {
          return false;
        }
      }
      stack.push(node);
    } else if (values.includes(node)) {
      let needKey = [...map.entries()]
        .filter(el => el[1] === node)
        .pop()
        .shift();
      if ([...stack].pop() !== needKey) {
        return false;
      }
      stack.pop();
    }
  }
  return stack.length === 0;
};
