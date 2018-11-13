function WrapImportDeclaration(context, reg) {
  return function ImportDeclaration(node) {
    const { value } = node.source;
    if (!reg.test(value)) return;
    const { raw } = node.source;
    let specifiers = node.specifiers
      .map(specifier => {
        const entityName = specifier.local.name;
        const alias = (specifier.imported || {}).name;
        if (specifier.type === "ImportDefaultSpecifier") return entityName;
        if (
          specifier.type === "ImportSpecifier" &&
          alias &&
          alias !== entityName
        ) {
          return `{ ${alias} as ${entityName} }`;
        }
        if (specifier.type === "ImportSpecifier") {
          return `{ ${entityName} }`;
        }
        if (specifier.type === "ImportNamespaceSpecifier") {
          return `* as ${entityName}`;
        }
      })
      .join(", ");
    if (specifiers) specifiers = `${specifiers} from `;
    context.report({
      node: node,
      messageId: "avoid",
      data: {
        specifiers,
        raw
      }
    });
  };
}
module.exports = {
  meta: {
    docs: {
      // 描述
      description: "disallow the relative path of more than two",
      // 类型
      category: "Possible Errors",
      // 是否推荐
      recommended: true,
      url: "https://eslint.org/docs/rules/no-relative"
    },
    fixable: "whitespace", // enum ['whitespace', 'code']
    schema: [], // no options
    messages: {
      avoid:
        "导入模块 import {{ specifiers }}{{ raw }} 不能使用两级以上的相对路径"
    }
  },
  create: function(context) {
    const reg = context.options[0] || /\/?\.\.\//;
    return {
      ImportDeclaration: WrapImportDeclaration(context, reg)
    };
  }
};

架构图:
cli 获得命令行接口参数
cliEngine 接受命令行参数，读取配置文件和源码文件预加载rules
eslint core 接受源码 和配置对象使用espresso生成ast ,然后运行每个rules
rules 接受ast ,运行插件业务代码
规则和插件什么区别
一个插件是一个npm模块 需要用eslint-plugin-xxxx 进行命名 一个插件内部包含一组规则
插件 ，可以调试
https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj
