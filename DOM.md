# DOM

## Nodes

### Attr:这个类型像对象  一样展示 dom 节点属性，在大量的 dom 方法中，你可以直接获取属性，（eg:Element.getAttribute()),但是也包含函数（Element.getAttributeNode()）

    EventTarget<--Node <-- Attr

#### 属性

> Attr.localName：节点中有资格的名称，比如 id
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
> Node 是  从一些 Dom api 类型  中继承来的接口。它允许这些不同的类型被一样对待。比如继承同一系列的方法或者用同样的方式测试。

> 以下的接口都继承自 Node 的属性和方法：
> <font color='#4ddbac'>Document, Element, CharacterData (which Text, Comment, and CDATASection inherit), ProcessingInstruction, DocumentFragment, DocumentType, Notation(obsolete), Entity(obsolete), EntityReference(obsolete)</font>

### Properties

<font color='#4ddbac'>Node.baseURI</font>:ddd

### Methods
