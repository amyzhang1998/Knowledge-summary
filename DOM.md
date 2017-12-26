# DOM

## Nodes

### Attr:这个类型像对象  一样展示 dom 节点属性，在大量的 dom 方法中，你可以直接获取属性，（eg:Element.getAttribute()),但是也包含函数（Element.getAttributeNode()）

    EventTarget<--Node <-- Attr

#### 属性

> Attr.localName：节点中有特性的名称，比如 id
> Attr.namespaceURL:命名空间
> Attr.prefix:前缀

## 接口

### CharacterData ：抽象接口

EventTarget<--Node <-- CharacterData

> 展现一个节点对象包含的属性，他的实现通过接口像，Text,Comment 等不抽象的接口

#### 属性

从父级节点继承属性，实现 ChildNode 和 NonDocumentTypeChildNode 接口

1. CharacterData.data
2. CharacterData.length
3. NonDocumentTypeChildNode.nextElementSibling
4. NonDocumentTypeChildNode.previousElementSibling

#### 方法

5. CharacterData.appendData()
6. CharacterData.deleteData()
7. CharacterData.insertData()
8. ChildNode.remove():移除对象从父级节点的孩子列表
9. CharacterData.replaceData()
10. CharacterData.substringData()

### ChildNode :含有针对那些有父节点的特殊节点的接口

#### 方法

11. ChildNode.remove()
12. ChildNode.before()
13. ChildNode.after()
14. ChildNode.replaceWith()

### Comment:注释接口

    EventTarget<--Node <-- CharacterData <-- Comment

### Comment.constructor

```
var comment = new Comment("test")
```

### DocumentType 接口

EventTarget<--Node <-- Document
从父节点**Node**继承属性，实现 childNOde 接口

#### 属性

1. DocumentType.entities:A **NamedNodeMap**(接口：类似 Attr 接口对象的集合，没有特殊的序号) of entities declared in the DTD. Every node in this map implements the **Entity**(absolete) interface.
2. DocumentType.internalSubset:A **DOMString**(接口：UTF-16 的字符串) of the internal subset, or null if there is none。
3. DocumentType.name:A DOMString
4. DocumentType.notations:A NamedNodeMap with notations(注解) declared in the DTD. Every node in this map implements the **Notation**（absolete） interface.
5. DocumentType.publicId:A DOMString
6. DocumentType.systemId:A DOMString

#### 方法

1. ChildNode.remove()

### NamedNodeMap:类似 Attr 接口对象的集合，没有特殊的序号.

this interface doesn't inherit any property;

#### 属性

1. <font color='pink'>NamedNodeMap.length</font>:returns the amount of objects in the map;

#### 方法

1. <font color='pink'>NamedNodeMap.getNamedItem()</font>:returns a **Attr**,corresponding to the given name;
2. <font color='pink'>NamedNodeMap.setNamedItem()</font>:Replaces,or adds,the **Attr** identified in the map by the given name;
3. <font color='pink'>NamedNodeMap.removeNamedItem()</font>:Removes the **Attr** identified by the map
4. <font color='pink'>NamedNodeMap.item()</font>:returns the **Attr** at the given index,or null if the index is higher or equal to the number of nodes;
5. <font color='pink'>NamedNodeMap.getNamedItemNS</font>:Returns a Attr identified by a namespace and related local name;
6. <font color='pink'>NamedNodeMap.setNamedItemNS</font>
7. <font color='pink'>NamedNodeMap.removeNamedItemNS</font>

### Node

    EventTarget<--Node

> description
> Node 是从一些 Dom api 类型 中继承来的接口。它允许这些不同的类型被一样对待。比如继承同一系列的方法或者用同样的方式测试。

> 以下的接口都继承自 Node 的属性和方法：
> <font color='#4ddbac'>Document, Element, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation(obsolete), Entity(obsolete), EntityReference(obsolete)</font>

从他的父级 EventTarget 继承属性和方法。

### Properties

<font color='#4ddbac'>Node.baseURI</font><br/>
<font color='#4ddbac'>Node.baseURIObject</font><br/>
<font color='#4ddbac'>Node.childNodes</font>:返回一个有生命的 NodeList<br/>
<font color='#4ddbac'>Node.firstChild</font><br/>
<font color='#4ddbac'>Node.lastChild</font><br/>
<font color='#4ddbac'>Node.nextSibling</font>:nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中.<br/>
<font color='#4ddbac'>Node.nodeName</font>：The structure of the name will differ with the node type;eg:"audio","#text"<br/>
<font color='#4ddbac'>Node.nodePrincipal</font><br/>
<font color='#4ddbac'>Node.nodeType</font>:

| Name                        | Value |
| --------------------------- | :---: |
| ELEMENT_NODE                |   1   |
| TEXT_NODE                   |   3   |
| PROCESSING_INSTRUCTION_NODE |   7   |
| COMMENT_NODE                |   8   |
| DOCUMENT_NODE               |   9   |
| DOCUMENT_TYPE_NODE          |  10   |
| DOCUMENT_FRAGMENT_NODE      |  11   |

以下不会用：2，4，5，6，12
| Name | Value |
| --------------------------- | :---: |
| NOTATION_NODE | 12 |
| ATTRIBUTE_NODE | 2 |
| CDATA_SECTION_NODE | 4 |
| ENTITY_REFERENCE_NODE | 5 |
| ENTITY_NODE | 6 |

<br/>
<font color='#4ddbac'>Node.nodeValue</font><br/>
<font color='#4ddbac'>Node.ownerDocument</font><br/>
<font color='#4ddbac'>Node.parentNode</font><br/>
<font color='#4ddbac'>Node.parentElement</font><br/>
<font color='#4ddbac'>Node.previousSibling</font><br/>
<font color='#4ddbac'>Node.textContent</font><br/>
### Methods

<font color='#4ddbac'>Node.appendChild()</font><br/>
<font color='#4ddbac'>Node.cloneNode</font><br/>
<font color='#4ddbac'>Node.compareDocumentPosition()</font><br/>
<font color='#4ddbac'>Node.contains()</font><br/>
<font color='#4ddbac'>Node.getRootNode()</font><br/>
<font color='#4ddbac'>Node.hasChildNodes()</font><br/>
<font color='#4ddbac'>Node.insertBefore()</font><br/>
<font color='#4ddbac'>Node.isDefaultNamespace()</font><br/>
<font color='#4ddbac'>Node.isEqualNode()</font><br/>
<font color='#4ddbac'>Node.isSameNode()</font><br/>
<font color='#4ddbac'>Node.lookupPrefix()</font><br/>
<font color='#4ddbac'>Node.lookupNamespaceURI()</font><br/>
<font color='#4ddbac'>Node.normalize()</font>:merge adjacent,remove empty<br/>
<font color='#4ddbac'>Node.removeChild()</font><br/>
<font color='#4ddbac'>Node.replaceChild()</font><br/>

### NodeFilter

一个对象被用来  在 NodeIterator 或 treeWalker 接口中过滤节点的接口。这个接口不继承也不实现任何属性。不继承任何方法。

#### Methods

<font color='#d64444'>NodeFilter.acceptNode()</font>:参数：FILTER_ACCEPT,FILTER_REJECT,FILTER_SKIP。

### NodeIterator

这个接口可以用这个方法创建：Document.createNodeIterator();

```
    var nodeIterator = document.createNodeIterator(root,whattoShow,filter);
    var nodeIterator = document.createNodeIterator(
  // Node to use as root
  document.getElementById('someId'),
  // Only consider nodes that are text nodes (nodeType 3)
  NodeFilter.SHOW_TEXT,
  // Object containing the function to use for the acceptNode method
  // of the NodeFilter
    { acceptNode: function(node) {
      // Logic to determine whether to accept, reject or skip node
      // In this case, only accept nodes that have content
      // other than whitespace
      if ( ! /^\s*$/.test(node.data) ) {
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  },
  false
);

// Show the content of every non-empty text node that is a child of root
var node;

while ((node = nodeIterator.nextNode())) {
  alert(node.data);
}
```

#### Properties:this interface doesn't inherit any property;

<font color='#d64444'>NodeIterator.root</font><br/>
<font color='#d64444'>NodeIterator.whatToShow</font><br/>
<font color='#d64444'>NodeIterator.filter</font><br/>
<font color='#d64444'>NodeIterator.expandEntityReferences</font><br/>
<font color='#d64444'>NodeIterator.referenceNode</font>(experimental)<br/>
<font color='#d64444'>NodeIterator.pointerBeforeReferenceNode</font>:(experimental)<br/>

#### Methods

<font color='#d64444'>NodeIterator.detach()</font>(obsolete)<br/>
<font color='#d64444'>NodeIterator.previousNode()</font><br/>
<font color='#d64444'>NodeIterator.nextNode()</font><br/>

```
var nodeIterator = document.createNodeIterator(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    { acceptNode: function(node) { return NodeFilter.FILTER_ACCEPT; } },
    false
);
nodeFilter = nodeIterator.filter;
root = nodeIterator.root;
currentNode = nodeIterator.nextNode();
previousNode = nodeIterator.previousNode();
```

## 对象

### NodeList:节点的结合,静态结合：eg:Node.childNodes , document.querySelectorAll(),

it is possible to iterate on it using forEach().Several older browsers have not implemented this method yet;

#### Properties

<font color='#48a750'>NodeList.lenth</font><br/>

#### Methods
