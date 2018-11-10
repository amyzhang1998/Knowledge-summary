function toTreeData(x, y, z) {
  //   i :每一级下的节点数，j:每集节点树立有j个节点，k,树的层级数

  let font = 0;
  for (let i = 0; i++; i < z) {
    {
    }
  }
}
toTreeData(3, 3, 3);

//   [
//       {
//           id:0,
//           children:[{
//               id:'0-0',
//               children:[{
//                   id:'0-0-0'
//               }]
//           }]
//       }
//   ]

function findPathBFS(source, goal) {
  var datasource = JSON.parse(Json.stringfy(source));
  var res = [];
  res.push(...datasource);
  for (var i = 0; i < res.length; i++) {
    var curData = res[i];
    if (curData.value === goal) {
      var result = [];
      return (function findParent(data) {
        result.unshift(data.key);
        if (data.parent) return findParent(data.parent);
        return result;
      })(curData);
    }
    if (curData.children) {
      res.push(
        ...curData.children.map(d => {
          d.parent = curData;
          return d;
        })
      );
    }
  }
  return [];
}
