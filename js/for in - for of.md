## for in 和 for of 的区别

### for-in  主要用于遍历对象

- 以顺序遍历一个对象的除 `symbol` 以外的可枚举属性

- 格式：`for(key in object)`

  `key` 是每一个键值对的键 ， `object`为循环对象

  当我们需要取到对象里面的值时 `object[key]`

### for-of 是遍历数据结构的统一方法

- 一个数据结构只要部署了symbol.iterator属性，就被视为具有iterator接口，
  就可以用for...of循环逸历它的成员。
- for. ..of循环内部调用的是数据结构的Symbol.iterator方法