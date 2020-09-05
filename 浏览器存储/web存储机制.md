## web存储机制

- #### storage类型介绍

`storage`类型是来存储名值对儿，是保存在浏览器端的，存储为key-value形式的。

1. `key`:作为存储数据的标识（唯一且不可重复） 

2. `value`：存储数据的内容（number/string）

该类型的实例对象有关于存储的方法如下：

 **（1）**   `Storage.length `：返回一个整数，表示存储在 Storage 对象中的数据项数量。这个是 Storage 对象的一个属性，而且是一个 只读 属性

 **（2）** `key(index)`:获取index位置处的值的名字（key）。

 **（3）** `getItem()`:根据指定的名字（key）获取对应的值。

 **（4）**  `setItem(name,value)`: 为指定的name 设置一个对应的值。

 **（5）**`removeItem()`:删除由name指定的名值对儿。

 **（6）** `clear()`：删除所有值。

- #### storage特性

   该类型只能**存储字符串**,非字符串的数据会在存储之前转换成字符串。

### localStorage对象

**localStorage**也是web Stroage存储机制的一种，**localStorage**对象是根据**glocalStorage**对象设计出来的简化，glocalStorage的使用是要指定哪些域名可以访问该数据，是通过方括号标记使用该属性来实现的：

``` javascript
//存数据
glocalStorage["baidu.com"].name="刘德华"
//取数据
var name=glocalStorage["baidu.com"].name
```

听网上说是为了安全性然后在HTML5的规范中用localStorage取代了glocalStorage不能自己设置域名，值使用localStorage对象时就将当前域名加入。规则设计出来就是方便我们的使用的，显然localStorage比之前的使用起来更简单了。

我自己的理解根据该用户不删除数据，数据将会一直保存在磁盘里的属性，可以设置收藏列表，用户爱好等等。

``` javascript
//存数据
glocalStorage.setItem('content', '刘德华');
//取数据
glocalStorage.getItem('content');
```

### sessionStorage对象

- `sessionStorage`对象存储是**web storage**机制的一种，该对象会给每一个给定的源维持一个**独立的存储区域**，该区域在页面会话期间可用（即只要浏览器处于打开状态，包括页面重新加载和恢复）
- `sessionStorage`对象是绑定在服务器会话的，所以当文件在本地运行的时候是**不能跨页面访问**的，使用服务器地址访问时才能多页面访问。

![](https://user-gold-cdn.xitu.io/2020/5/19/1722abf9c09d6630?w=1259&h=834&f=png&s=88928)

**在另一个页面打开是找不到这个值的：**

![](https://user-gold-cdn.xitu.io/2020/5/19/1722ac025f323eee?w=1259&h=834&f=png&s=86314)

**开启服务器访问：**

![](https://user-gold-cdn.xitu.io/2020/5/19/1722aab01f5bd8ff?w=980&h=803&f=png&s=76888)

**再次使用服务器地址访问的时候：**

![](https://user-gold-cdn.xitu.io/2020/5/19/1722ac31cf81bbce?w=1162&h=834&f=png&s=81781)

### 两者的比较

#### 不同点

##### 数据存储时长

sessionStorage: 当页面关闭时，数据将会被清除。

localStorage：用户不删除数据，数据将会一直保存在磁盘里，数据可以长期保存。

##### 访问规则不同

 localStorage：只要在相同的协议、相同的主机名、相同的端口下，就能读取和修改到同一份 localStorage 存储的数据。

 sessionStorage：除了协议、主机名、端口外，还要求在同一窗口下。

#### 相同点

存储大小都不能超过5M。