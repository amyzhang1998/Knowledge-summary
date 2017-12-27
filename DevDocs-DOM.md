# DOM

## experimental technology

1. Ambient Light
2. Animation
3. Budget
4. Credential Management
5. Custom Element
6. Device Orientation
7. Encoding
8. Encryted Media
9. Intersection Observer
10. Network Information
11. Payments
12. Push
13. Selection
14. ServiceWorker
15. Speech
16. WebVR
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

### ParentNode :有 children 的节点。它从 Element,Document,DocumentFragment 对象中实现。

#### Properties

<font color='#4ddbac'>ParentNode.children</font><br/>
<font color='#4ddbac'>ParentNode.firstElementChild</font><br/>
<font color='#4ddbac'>ParentNode.lastElementChild</font><br/>
<font color='#4ddbac'>ParentNode.childElementCount</font><br/>

#### Methods

<font color='#4ddbac'>ParentNode.append()</font><br/>
<font color='#4ddbac'>ParentNode.prepend()</font><br/>
<font color='#4ddbac'>ParentNode.querySelector()</font>:return the first<br/>
<font color='#4ddbac'>ParentNode.querySelectorAll()</font><br/>

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

## TreeWalker: stronger than NodeIterator

> this object represents the nodes of a document subtree and a postion within them.
> A TreeWalker can be created using the Document.createTreeWalker() method.

#### Properties

<font color='#d64444'>TreeWalker.root</font><br/>
<font color='#d64444'>TreeWalker.whatRoShow</font><br/>
<font color='#d64444'>TreeWalker.filter</font><br/>
<font color='#d64444'>TreeWalker.expandEntityReferences</font><br/>
<font color='#d64444'>TreeWalker.currentNode</font><br/>

#### Methods

<font color='#d64444'>TreeWalker.parentNode()</font><br/>
<font color='#d64444'>TreeWalker.firstChild()</font><br/>
<font color='#d64444'>TreeWalker.lastChild()</font><br/>
<font color='#d64444'>TreeWalker.previousSibling()</font><br/>
<font color='#d64444'>TreeWalker.nextSibling()</font><br/>
<font color='#d64444'>TreeWalker.previousNode()</font><br/>
<font color='#d64444'>TreeWalker.nextNode()</font><br/>

## 对象

### NodeList:节点的结合,静态结合：eg:Node.childNodes , document.querySelectorAll(),

it is possible to iterate on it using forEach().Several older browsers have not implemented this method yet;

#### Properties

<font color='#48a750'>NodeList.length</font><br/>

#### Methods

<font color='#48a750'>NodeList.item()</font><br/>
<font color='#48a750'>NodeList.entries()</font><br/>
<font color='#48a750'>NodeList.forEach()</font><br/>
<font color='#48a750'>NodeList.keys()</font><br/>
<font color='#48a750'>NodeList.values()</font><br/>

### RadioNodeList:represents a collection of elements in a **form** or a **fieldset** element。

> The RadioNodeList interface inherits the properties and methods of NodeList

#### Properties

<font color='#48a750'>RadioNodeList.value</font>:if the underlying element collection containes radio buttons,the value property represents the checked radio button.

```
var form = document.forms[0];
var radios = form.elements['myRadio];
console.log(radios.value);
radios.value = 'Mr.';
```

### Text

> represents the textural content of Element or Attr.

    EventTarget<--Node <-- CharacterData <-- Text

#### Constructor

<font color='#7378b1d9'>Text()</font>

> inherits properties from its parent,CharaterData

#### Properties

<font color='#7378b1d9'>Text.isElementContentWhitespace</font>:Returns a Boolean flag indicating whether or not the text node contains only whitespace;
<font color='#7378b1d9'>Text.wholeText</font><br/>
<font color='#7378b1d9'>Text.assignedSlot</font><br/>

#### Methods

<font color='#7378b1d9'>Text.replaceWholeText()</font><br/>
<font color='#7378b1d9'>Text.splitText()</font><br/>

## Document

> experimental technology same as [ET]

### Properties

<font color='#e3e75e'> **document.activeElement**</font>:returns the currently focused element,the element that will get keystroke events if the user types any<br/>
<font color='#e3e75e'> **document.body**</font>:<br/>
<font color='#e3e75e'> **document.characterSet**</font>: character encoding<br/>
<font color='#e3e75e'> **document.compatMode**</font>:Indicates whether the document is rendered in Quirks mode or Standards mode.<br/>
<font color='#e3e75e'> **document.cookie**</font>:can get & set<br/>
<font color='#e3e75e'> **document.currentScript**</font>:<br/>
<font color='#e3e75e'> **document.defaultView**</font>:<br/>
<font color='#e3e75e'> **document.designMode**</font>:<br/>
<font color='#e3e75e'> **document.dir**</font>:<br/>
<font color='#e3e75e'> **document.doctype**</font>:<br/>
<font color='#e3e75e'> **document.documentElement**</font>:root element<br/>
<font color='#e3e75e'> **document.documentURI**</font>:<br/>
<font color='#e3e75e'> **document.domain**</font>:<br/>
<font color='#e3e75e'> **document.embeds**</font>:<br/>
<font color='#e3e75e'> **document.forms**</font>:<br/>
<font color='#e3e75e'> **document.fullscreenElement**</font>:<br/>
<font color='#e3e75e'> **document.fullscreenEnabled**</font>:<br/>
<font color='#e3e75e'> **document.head**</font>:<br/>
<font color='#e3e75e'> **document.hidden**</font>:<br/>
<font color='#e3e75e'> **document.implementation**</font>:return DOMImplementation object<br/>
<font color='#e3e75e'> **document.images**</font>:<br/>
<font color='#e3e75e'> **document.lastModified**</font>:<br/>
<font color='#e3e75e'> **document.lastStyleSheetSet**</font>:<br/>
<font color='#e3e75e'> **document.links**</font>:<br/>
<font color='#e3e75e'> **document.location**</font>:return Location object<br/>
<font color='#e3e75e'> **document.origin**</font>:[ET]<br/>
<font color='#e3e75e'> **document.plugins**</font>:<br/>
<font color='#e3e75e'> **document.pointerLockElement**</font>:<br/>
<font color='#e3e75e'> **document.preferredStyleSheetSet**</font>:<br/>
<font color='#e3e75e'> **document.readyState**</font>:<br/>
<font color='#e3e75e'> **document.referrer**</font>:<br/>
<font color='#e3e75e'> **document.scripts**</font>:<br/>
<font color='#e3e75e'> **document.scrollingElement**</font>:<br/>
<font color='#e3e75e'> **document.selectedStyleSheetSet**</font>:<br/>
<font color='#e3e75e'> **document.styleSheets**</font>:<br/>
<font color='#e3e75e'> **document.styleSheetSets**</font>:<br/>
<font color='#e3e75e'> **document.timeline**</font>:【ET】<br/>
<font color='#e3e75e'> **document.title**</font>:<br/>
<font color='#e3e75e'> **document.URL**</font>:<br/>
<font color='#e3e75e'> **document.visibilityState**</font>:<br/>

### Methods

<font color='#e3e75e'> **Document.adoptNode(externalNode)**</font>:<br/>
<font color='#e3e75e'> **Document.importNode(externalNode,deep)**</font>:creates a new **copy** from another document<br/>
<font color='#e3e75e'> **Document.caretPositionFromPoint(float x,float y)**</font>:[ET]<br/>
<font color='#e3e75e'> **document.close()**</font>:finishes writing to a document<br/>
<font color='#e3e75e'> **document.open()**</font>:<br/>
<font color='#e3e75e'> **document.createAttribute(name)**</font>:<br/>
<font color='#e3e75e'> **document.createCDATASection(data)**</font>:<br/>
<font color='#e3e75e'> **document.createComment(data)**</font>:<br/>
<font color='#e3e75e'> **document.createDocumentFragment()**</font>:<br/>
<font color='#e3e75e'> **document.createElement(tagName[,options])**</font>:<br/>
<font color='#e3e75e'> **document.createEvent(type)**</font>:<br/>
<font color='#e3e75e'> **document.createExpression(xpathText, namespaceURLMapper)**</font>:<br/>
<font color='#e3e75e'> **document.createNodeIterator(root, whatToShow, filter)**</font>:return NodeIterator object<br/>
<font color='#e3e75e'> **document.createRange()**</font>:return Range object<br/>
<font color='#e3e75e'> **document.createTextNode(data)**</font>:<br/>
<font color='#e3e75e'> **document.createTreeWalker(root, whatToShow, filter, entityReferenceExpansion)**</font>:return TreeWalker object<br/>
<font color='#e3e75e'> **document.elementFromPoint(x,y)**</font>:<br/>
<font color='#e3e75e'> **document.elementsFromPoint(x,y)**</font>:[ET]<br/>
<font color='#e3e75e'> **document.enableStyleSheetsForSet(name)**</font>:<br/>
<font color='#e3e75e'> **document.evaluate**</font>:

```
var xpathResult = document.evaluate(
xpathExpression,
contextNode,
namespaceResolver,
resultType,
result
);
```

<br/>
<font color='#e3e75e'> **document.execCommand(aCommandName, aShowDefaultUI, aValueArgument)**</font>:<br/>
<font color='#e3e75e'> **document.exitFullscreen()**</font>:<br/>
<font color='#e3e75e'> **document.exitPointerLock()**</font>:[ET]<br/>
<font color='#e3e75e'> **document.getAnimations()**</font>:[ET]<br/>
<font color='#e3e75e'> **document.getElementById(id)**</font>:<br/>
<font color='#e3e75e'> **document.getElementsByClassName(names)**</font>:<br/>
<font color='#e3e75e'> **document.getElementsByName(name)**</font>:<br/>
<font color='#e3e75e'> **document.getElementsByTagName(name)**</font>:<br/>
<font color='#e3e75e'> **document.getSelection()**</font>:<br/>
<font color='#e3e75e'> **document.hasFocus()**</font>:<br/>
<font color='#e3e75e'> **document.exitFullscreen()**</font>:<br/>
<font color='#e3e75e'> **document.onfullscreenchangeproperty**</font>:Event handler<br/>
<font color='#e3e75e'> **document.onfullscreenerror**</font>:Event handler<br/>
<font color='#e3e75e'> **document.onoffline**</font>:Event handler<br/>
<font color='#e3e75e'> **document.ononline**</font>:Event handler<br/>
<font color='#e3e75e'> **document.onselectionchange**</font>:[ET]Event handler<br/>
<font color='#e3e75e'> **document.onvisibilitychange**</font>:[ET]Event handler<br/>
<font color='#e3e75e'> **document.queryCommandEnabled(command)**</font>:<br/>
<font color='#e3e75e'> **document.queryCommandState(string command)**</font>:<br/>
<font color='#e3e75e'> **document.queryCommandSupported(command)**</font>:<br/>
<font color='#e3e75e'> **document.querySelector(selectors)**</font>:<br/>
<font color='#e3e75e'> **document.document.querySelectorAll(selectors)**</font>:<br/>
<font color='#e3e75e'> **document.queryCommandEnabled(command)**</font>:<br/>
<font color='#e3e75e'> **document.releaseCapture()**</font>:<br/>
<font color='#e3e75e'> **document.write(markup)**</font>:<br/>
<font color='#e3e75e'> **document.writeln(ln)**</font>:<br/>

## DocumentFragment

## Element

## Event

## Window

## XMLHTTPRequest

## SVG

## History

## Location

## Drag & Drop

## Fetch

## File

## Touch Events

## Storage

## Screen

## Elements

## Events

## Navigator

## Web Sockets

## Dom

## Media

## Media Session

## Media Streams

## Css

## Broadcast Channel:This feature is available in Web Workers.

## Notification:This feature is available in Web Workers.

## URL:This feature is available in Web Workers.

## Web Worker

## Channel Messaging

## Canvas

## Pointer Events

## Presentation

## Console

## Range

## Scheduling

## Cryptography

## Performance

## Audio

## GolbalEventHandles

## IndexedDB

## Miscellaneous

## Server-Sent Events

## Shadow Dom

## WebGL

## WebRTC

## Geolocation:only be available in https
