http :是超文本传输协议，是基于 tcp/ip 进行传递数据的。应用层的面向对象的协议。无连接：服务端处理完客户端的请求后，接收到客户端的回应就会断开连接，无状态：对于后续需要前面的相关信息就会需要重新传送。灵活：content-type.HTTP 使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。

#### 工作原理

。HTTP 协议采用了请求/响应模型。客户端向服务器发送一个请求报文，请求报文包含请求的方法、URL、协议版本、请求头部和请求数据。服务器以一个状态行作为响应，响应的内容包括协议的版本、成功或者错误代码、服务器信息、响应头部和响应数据。

### 响应头

#### Cache-Control: no-cache, no-store max-age

#### content-type:application/json;multipart/formdata;text/html;数据被编码为一条消息，页上的每个控件对应消息中的一个部分 text:plain;数据以纯文本形式(text/json/xml/html)进行编码.

content-encoding:gzip,compress,identity
date
etag
last-modifyed

### 请求头

#### connection

accept
accept-Encoding:gzip,compress,identity
accept-lanuage:
Origin
User-agent
host
referer
