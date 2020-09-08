## 1. js的数据类型

- 基本数据类型 :直接存储在栈(stack)中，占据空间小，大小固定，属于被频繁使用的数据

1. **undefined** ： 已声明 未赋值 => 未定义
2.  **null**： 代表空对象 空指针 主要用于赋值给一些可能会返回对象的变量，作为初始化。
3. **boolean**
4. **number**
5. **string**
6. **symbol**(es6新增)：唯一值，symbol作为属性值的时候，他它不可被枚举,所以不能使用for...in ... 来循环这个数据的属性
7. **bigInt** (es10新增) ：bigint 是一种内置对象，它提供一种方法来存储大于Number存储的数值，它在数据后面加一个n，并且可以表示任意大的整数

- 引用数据类型：同时存储在**栈**（stack）和**堆**（heap）中，占据空间大、大小不固定。

  存储的是该对象在栈中引用，真实的数据存放在堆内存里

  引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址,当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。

  ![图片描述](https://segmentfault.com/img/bVbrl5N?w=459&h=347)

  
  
  object( function、Array、Date等)
  
  

## 2. JS中数据类型的判断

1. `typeof`:对于对象，除了function.都会显示出object,所有`typeof`并不能准确判断。可来判断一个对象的正确类型。

```javascript
console.log(typeof 2);               // number
console.log(typeof true);            // boolean
console.log(typeof 'str');           // string
console.log(typeof []);              // object     []数组的数据类型在 typeof 中被解释为 object
console.log(typeof function(){});    // function
console.log(typeof {});              // object
console.log(typeof undefined);       // undefined
console.log(typeof null);            // object     null 的数据类型被 typeof 解释为 object

```

2. `instanceof`: instanceof可以精准判断引用数据类型（Array，Function，Object），而基本数据类型不能被instanceof精准判断。
3. `constructor`
4. `Object.prototype.toString.call()`

##### 问：数据类型有哪些 ？类型判断有哪些 优缺点？

基本数据类型 Boolean Null Undefined Number String Symbol BigInt

引用数据类型 Object, 包含 Date function Array

- typeof 

  - 对于非 Object的基本数据类型，除了null，均可判断

  - 对于null 返回 object：

    null不是对象，尽管 typeof null = object 。

  ​       因为这是 js 一个久远的bug，js诞生以来便如此。在js最初实现时，值是由一个表示类型的标签和实际数据表示的，而对象的标签是 0。又因为null 代表的是空指针，标签也是0，所以 typeof null 是 'object'。因此 null 不是 对象。

  - 对于引用数据类型，除了function，都返回object
  - 对于function 返回 function
  - typeof(typeof a) 返回 string

- instanceof

  A instanceof B ：就是用来判断B的原型是否在A的原型链上

- Object.prototype.toString.call 最全面

- constructor

## 3. 介绍js有哪些内置对象？

Array数组对象、Math方法、String方法、date日期对象的方法。

## 4.Javascript 的作用域和作用域链

作用域链的本质上是一个指向变量对象的指针列表。

## 5. javascript 创建对象的几种方式？

new关键字 clone

##  6. 事件委托是什么？

**事件委托** 本质上是利用浏览器事件**冒泡**的机制，事件在在冒泡过程中会上传到**父节点**，父节点可通过事件对象获取到 **目标节点**，=>  把**子节点的监听事件定义在父节点上**，**由父节点的监听事件统一处理多个子元素的事件 **=>  称为 事件代理。

使用事件代理我们可以不必要为每一个子元素都绑定一个监听事件，这样减少了内存上的消耗。并且使用事件代理我们还可以实现事件的**动态绑定**，比如说新增了一个子节点，我们并不需要单独地为它添加一个监听事件，它所发生的事件会交给**父元素中的监听事件**来处理。

## 7. 什么是事件捕获？

![](C:\Users\Lenovo\Desktop\事件捕获.jpg)

捕获阶段：window----> document----> html----> body ---->目标元素

冒泡阶段：当前元素---->body ----> html---->document ---->window







