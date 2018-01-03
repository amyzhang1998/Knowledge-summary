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
## Element

    EventTarget<--Node <-- Element

>  是从 Document 接口 继承来的最普通的基类。它含有对所有不同类型的元素最基本的属性和方法。更多指定的类继承自 Element。比如：HTMLElement 是 HTML 元素的基本接口，SVGElement 接口是所有 SVG 元素的基本。

### Properties

<font color='#d64444'> **Element.assignedSlot**</font>:<br/>
<font color='#d64444'> **Element.attributes**</font>:<br/>
<font color='#d64444'> **Element.classList**</font>:<br/>
<font color='#d64444'> **Element.className**</font>:<br/>
<font color='#d64444'> **Element.clientHeight**</font>:<br/>
<font color='#d64444'> **Element.computedName**</font>:<br/>
<font color='#d64444'> **Element.computedRole**</font>:<br/>
<font color='#d64444'> **Element.id**</font>:<br/>
<font color='#d64444'> **Element.innerHTML**</font>:<br/>
<font color='#d64444'> **Element.localName**</font>:<br/>
<font color='#d64444'> **Element.namespceURI**</font>:<br/>
<font color='#d64444'> **Element.outerHTML**</font>:<br/>
<font color='#d64444'> **Element. **</font>:<br/>
<font color='#d64444'> **Element.scrollHeight**</font>:<br/>
<font color='#d64444'> **Element.scrollLeftMax**</font>:<br/>
<font color='#d64444'> **Element.shadowRoot**</font>:<br/>
<font color='#d64444'> **Element.slot**</font>:<br/>
<font color='#d64444'> **Element.tabStop**</font>:<br/>
<font color='#d64444'> **Element.tagName**</font>:<br/>
<font color='#d64444'> **Element.undoMannager**</font>:<br/>
<font color='#d64444'> **Element.undoScope**</font>:<br/>

### Event Handler

<font color='#d64444'> **Element.ongotpointercapture**</font>:<br/>
<font color='#d64444'> **Element.onlostpointercapture**</font>:<br/>
<font color='#d64444'> **Element.onwheel**</font>:<br/>

### Methods

<font color='#d64444'> **Element.addEventListener()**</font>:<br/>
<font color='#d64444'> **Element.attachShadow()**</font>:<br/>
<font color='#d64444'> **Element.animate()**</font>:<br/>
<font color='#d64444'> **Element.closet()**</font>:<br/>
<font color='#d64444'> **Element.createShadowRoot()**</font>:<br/>
<font color='#d64444'> **Element.dispatchEvent()**</font>:<br/>
<font color='#d64444'> **Element.getAnimations()**</font>:<br/>
<font color='#d64444'> **Element.getAttribute()**</font>:<br/>
<font color='#d64444'> **Element.getAttributeNames()**</font>:<br/>
<font color='#d64444'> **Element.getAttributeNS()**</font>:<br/>
<font color='#d64444'> **Element.getAttributeNode()**</font>:<br/>
<font color='#d64444'> **Element.getAttributeNodeNS()**</font>:<br/>
<font color='#d64444'> **Element.getBoundingClientRect()**</font>:<br/>
<font color='#d64444'> **Element.getClientRects()**</font>:<br/>
<font color='#d64444'> **Element.getElementsByClassName()**</font>:<br/>
<font color='#d64444'> **Element.getElementsByTagName()**</font>:<br/>
<font color='#d64444'> **Element.getElementsByTagNameNS()**</font>:<br/>
<font color='#d64444'> **Element.hasAttribute()**</font>:<br/>
<font color='#d64444'> **Element.hasAttributeNS()**</font>:<br/>
<font color='#d64444'> **Element.hasAttributes()**</font>:<br/>
<font color='#d64444'> **Element.insetAdjacentElement()**</font>:<br/>
<font color='#d64444'> **Element.insetAdjacentHTML()**</font>:<br/>
<font color='#d64444'> **Element.insetAdjacentText()**</font>:<br/>
<font color='#d64444'> **Element.matches()**</font>:<br/>
<font color='#d64444'> **Element.querySelector()**</font>:<br/>
<font color='#d64444'> **Element.querySelectorAll()**</font>:<br/>
<font color='#d64444'> **Element.releasePointerCapture()**</font>:<br/>
<font color='#d64444'> **ChildNode.remove()**</font>:<br/>
<font color='#d64444'> **Element.removeAttribute()**</font>:<br/>
<font color='#d64444'> **Element.removeAttributeNS()**</font>:<br/>
<font color='#d64444'> **Element.removeAttributeNode()**</font>:<br/>
<font color='#d64444'> **Element.removeEventListener()**</font>:<br/>
<font color='#d64444'> **Element.requestFullscreen()**</font>:<br/>
<font color='#d64444'> **Element.requestPointerLock()**</font>:<br/>
<font color='#d64444'> **Element.scrollIntoVIew()**</font>:<br/>
<font color='#d64444'> **Element.setAttribute()**</font>:<br/>
<font color='#d64444'> **Element.setAttributeNS()**</font>:<br/>
<font color='#d64444'> **Element.setAttributeNode()**</font>:<br/>
<font color='#d64444'> **Element.setAttributeNodeNS()**</font>:<br/>
<font color='#d64444'> **Element.setCapture()**</font>:<br/>
<font color='#d64444'> **Element.setPointerCapture()**</font>:<br/>

## DocumentFragment

## Event

## Window

## XMLHTTPRequest

## SVG

### SVGFilterPrimitiveStandardAttributes

defines the set of DOM attributes that are common across the filter primitive interfaces.

#### Properties

<font color='#44e7bb'> **SVGFilterPrimitiveStandardAttributes.x**</font><br/>
<font color='#44e7bb'> **SVGFilterPrimitiveStandardAttributes.y**</font><br/>
<font color='#44e7bb'> **SVGFilterPrimitiveStandardAttributes.width**</font><br/>
<font color='#44e7bb'> **SVGFilterPrimitiveStandardAttributes.height**</font><br/>
<font color='#44e7bb'> **SVGFilterPrimitiveStandardAttributes.result**</font><br/>

### SVGElement

    EventTarget<--Node <-- Element <--SVGElement

> 所有的 SVG DOM 接口 （SVG 里的所有元素） 都起源于 SVGElement 接口。

#### Properties

<font color='#44e7bb'> **SVGElement.dataset**</font><br/>
<font color='#44e7bb'> **SVGElement.id**</font><br/>
<font color='#44e7bb'> **SVGElement.xmlbase**</font><br/>
<font color='#44e7bb'> **SVGElement.ownerSVGElement**</font><br/>
<font color='#44e7bb'> **SVGElement.viewportElement**</font><br/>

#### Methods

The SVGElement interface doesn't provide any additional methods, but inherits methods from its parent, Element.

### SVGAnimationElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGAnimationElement

> is the base interface for all of the animation element interfaces: SVGAnimateElement, SVGSetElement, SVGAnimateColorElement, SVGAnimateMotionElement and SVGAnimateTransformElement.

#### Properties

<font color='#44e7bb'> **SVGAnimationElement.targetElement**</font><br/>

#### Event Handler

<font color='#44e7bb'> **SVGAnimationElement.onbegin**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.onend**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.onrepeat**</font><br/>

#### Methods

<font color='#44e7bb'> **SVGAnimationElement.getStartTime()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.getCurrentTime()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.getSimpleDuration()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.beginElement()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.beginElementAt()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.endElement()**</font><br/>
<font color='#44e7bb'> **SVGAnimationElement.endElementAt()**</font><br/>

### SVGAnimateElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGAnimationElement <--SVGAnimateElement

> This interface has no properties and methods but inherits properties from its parent, SVGAnimationElement.

### SVGSetElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGAnimationElement <--SVGSetElement

> This interface doesn't implement any specific properties, but inherits properties from its parent interface, SVGAnimationElement.

### SVGAnimateMotionElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGAnimationElement <--SVGAnimateMotionElement

> This interface has no properties but inherits properties from its parent, SVGAnimationElement.

### SVGAnimateTransformElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGAnimationElement <--SVGAnimateTransformElement

> This interface has no properties but inherits properties from its parent, SVGAnimationElement.

### SVGFilterElement :==filter

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGFilterElement

#### Properties

<font color='#44e7bb'> **SVGFilterElement.filterUnits**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.primitiveUnits**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.x**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.y**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.width**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.height**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.filterResX**</font><br/>
<font color='#44e7bb'> **SVGFilterElement.filterResY**</font><br/>

#### Methods

<font color='#44e7bb'> **SVGFilterElement.setFilterRes()**</font><br/>

### SVGFEOffsetElement:==feOffset 元素

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGFEOffsetElement

This interface also inherits properties from its parent interface, SVGElement, and also implements properties of SVGFilterPrimitiveStandardAttributes.

#### Properties

<font color='#44e7bb'> **SVGFEOffsetElement.in1**</font><br/>
<font color='#44e7bb'> **SVGFEOffsetElement.dx**</font><br/>
<font color='#44e7bb'> **SVGFEOffsetElement.dy**</font><br/>

### SVGGraphicsElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement

> 展现那些主要目的是直接渲染图片到一个组中的元素。

#### Properties

<font color='#44e7bb'> **SVGGraphicsElement.transform**</font><br/>

#### Methods

<font color='#44e7bb'> **SVGGraphicsElement.getBBox()**</font><br/>
<font color='#44e7bb'> **SVGGraphicsElement.getCTM()**</font><br/>
<font color='#44e7bb'> **SVGGraphicsElement.getScrrenCTM()**</font><br/>

### SVGTextContentElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <--SVGTextContentElement

> The SVGTextContentElement interface is implemented by elements that support rendering child text content. It is inherited by various text-related interfaces, such as SVGTextElement, SVGTSpanElement, SVGTRefElement, SVGAltGlyphElement and SVGTextPathElement.

### SVGUseElement:==use

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <--SVGUseElement

#### Properties

<font color='#44e7bb'> **SVGUseElement.x**</font><br/>
<font color='#44e7bb'> **SVGUseElement.y**</font><br/>
<font color='#44e7bb'> **SVGUseElement.width**</font><br/>
<font color='#44e7bb'> **SVGUseElement.height**</font><br/>
<font color='#44e7bb'> **SVGUseElement.instanceRoot**</font><br/>
<font color='#44e7bb'> **SVGUseElement.animatedInstanceRoot**</font><br/>

### SVGGElement :==g

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <--SVGGElement

> This interface doesn't implement any specific methods, but inherits methods from its parent interface, SVGGraphicsElement.

### SVGGeometryElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <-- SVGGeometryElement

> 展示通过几何学定义的元素，这些元素可以被填充和描边。包括路径和基本图形。

#### Properties

<font color='#44e7bb'> **SVGGeometryElement.pathLength**</font><br/>

#### Methods

<font color='#44e7bb'> **SVGGeometryElement.isPointInFill()**</font><br/>
<font color='#44e7bb'> **SVGGeometryElement.isPointInStroke()**</font><br/>
<font color='#44e7bb'> **SVGGeometryElement.getTotalLength()**</font><br/>
<font color='#44e7bb'> **SVGGeometryElement.getPointAtlength()**</font><br/>

### SVGPathElement

    EventTarget<--Node <-- Element <--SVGElement <-- SVGGraphicsElement <-- SVGGeometryElement <--SVGPathElement

#### Properties

<font color='#44e7bb'> **SVGPathElement.pathLength**</font><br/>

#### Methods

<font color='#44e7bb'> **SVGPathElement.getTotalLength()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.getPointAtLength()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.getPathSegAtLength()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegClosePath()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegMovetoAbs()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegCurvetoCubicAbs()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegCurvetoQuadraticRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegArcAbs()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegArcRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoHorizontalAbs()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoHorizontalRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoVerticalAbs ()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoVerticalRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegCurvetoCubicSmoothAbs()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegCurvetoCubicSmoothRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoRel()**</font><br/>
<font color='#44e7bb'> **SVGPathElement.createSVGPathSegLinetoRel()**</font><br/>

### SVGPolygonElement:== polygon

    EventTarget<--Node <-- Element <--SVGElement <-- SVGGraphicsElement <-- SVGGeometryElement <--SVGPolygonElement

> This interface doesn't implement any specific properties, but inherits properties from its parent, SVGGeometryElement and also implements properties from SVGAnimatedPoints.

### SVGPolylineElement:== polyline

EventTarget<--Node <-- Element <--SVGElement <-- SVGGraphicsElement <-- SVGGeometryElement <--SVGPolylineElement

> This interface doesn't implement any specific properties, but inherits properties from its parent, SVGGeometryElement and also implements properties from SVGAnimatedPoints.

### SVGLineElement:==line

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <-- SVGGeometryElement <--SVGLineElement

#### Properties

<font color='#44e7bb'> **SVGLineElement.x1**</font><br/>
<font color='#44e7bb'> **SVGLineElement.y1**</font><br/>
<font color='#44e7bb'> **SVGLineElement.x2**</font><br/>
<font color='#44e7bb'> **SVGLineElement.y2**</font><br/>

### SVGCircleElement

    EventTarget<--Node <-- Element <--SVGElement  <--  SVGGraphicsElement <-- SVGGeometryElement <--SVGCircleElement

#### Properties

<font color='#44e7bb'> **SVGCircleElement.cx**</font><br/>
<font color='#44e7bb'> **SVGCircleElement.cy**</font><br/>
<font color='#44e7bb'> **SVGCircleElement.r**</font><br/>

#### Methods

This interface has no methods but inherits methods from its parent, SVGGeometryElement.

### SVGLength

#### Methods

1. void newValueSpecifiedUnits(in unsigned short unitType, in float valueInSpecifiedUnits)
2. void convertToSpecifiedUnits(in unsigned short unitType)

#### Constants

1. SVG_LENGTHTYPE_UNKNOWN = 0
2. SVG_LENGTHTYPE_NUMBER = 1
3. SVG_LENGTHTYPE_PERCENTAGE = 2
4. SVG_LENGTHTYPE_EMS = 3
5. SVG_LENGTHTYPE_EXS = 4
6. SVG_LENGTHTYPE_PX = 5
7. SVG_LENGTHTYPE_CM = 6
8. SVG_LENGTHTYPE_MM = 7
9. SVG_LENGTHTYPE_IN = 8
10. SVG_LENGTHTYPE_PT = 9
11. SVG_LENGTHTYPE_PC = 10

```
 var rect = document.getElementById("myRect");
  var val  = rect.x.baseVal;
   val.newValueSpecifiedUnits(SVGLength.SVG_LENGTHTYPE_PT, 20);
```

### SVGLengthList

#### Methods

1. void clear()
2. SVGLength initialize(in SVGLength newItem)
3. SVGLength getItem(in unsigned long index)
4. SVGLength insertItemBefore(in SVGLength newItem, in unsigned long index)
5. SVGLength replaceItem(in SVGLength newItem, in unsigned long index)
6. SVGLength removeItem(in unsigned long index)
7. SVGLength appendItem(in SVGLength newItem)

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
