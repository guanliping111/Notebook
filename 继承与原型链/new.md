## new运算符

**`new` 运算符**：创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。

### 手写 new

#### 函数原则

1. 函数是一等对象

2. 对象属性或方法需要查找 : 对象属性 -> 原型对象 -> 原型链 -> Object -> null

3.  new 一个构造函数，对象是自动返回的，不需要return。但是有返回值呢？ 如果是简单数据类型，忽略， 如果是对象，则遵守函数返回值原则

4. 构造函数是可以被new, 几个步骤

   ```markdown
   - 模拟 new 的行为 
   1. 创建一个 继承自 构造函数Constructor.prototype 的对象
   2. 这个对象 作为构造函数运行时的 this, 完成自身属性的添加
   3. new 结果：
       如果构造函数返回一个对象了，new 结果就是这个对象
       如果构造函数没有返回一个对象了，new 结果就是我们刚才创建的这个对象
   ```

   ```javascript
   //模拟 new 的行为 
   function myNew(Constructor) {
       let obj = {};
       obj.__proto__ = Constructor.prototype;
       let res = Constructor.apply(obj);
       return typeof res === 'object' ? res : obj;
    }
   ```

   

5. 对象属性的设置延申

6. 对象在es6上的新方法

7. **`new`** 关键字会进行如下的操作：

   1. 创建一个空的简单JavaScript对象（即	`{}`	）；
   2. 链接该对象（即设置该对象的构造函数）到另一个对象 ；
   3. 将步骤1新创建的对象作为`this`的上下文 ；
   4. 如果该函数没有返回对象，则返回`this`。

```javascript
//手写new  使用Object.create API
function myNew(fn, ...args) {
     let obj = Object.create(fn.prototype);
     let res = fn.apply(obj, args);
     return res instanceof Object ?res : obj
}
```

### new的应用

```javascript
	function Animal(name, age) {
          this.name = name;
          this.age = age;
          // 往 this 上面 添加 name age 的属性
	};
    // 每个函数都一个 prototype 属性，他是对象，有一个 constructor
    // Animal.prototype 是一个对象 添加一个 superName 的 key
    Animal.prototype.say = function() {
      console.log(this.name )
    }
    let obj = {}; 
    let ani = new Animal('cat', 18);
    ani.__proto__.superName = 'superName';
    let ani1 = new Animal('dog', 19);
    console.log(ani, ani1);
  
    Object.prototype.ax = 'axxxxx';
    console.log(obj.ax)
    console.log(ani.ax)
```

结果如下：ani  ani1都是通过new构造出来的对象，同时继承Animal的属性 name、age.这时，this 指向 new 创建完的对象ani 和ani1。

![](C:\Users\Lenovo\Desktop\new.png)

### 讨论原型的指向的关系 

如果该方法存在于一个对象的原型链上，那么 `this` 指向的是调用这个方法的对象，就像该方法就在这个对象上一样。

this的指向：看函数在哪里调用？

1. new: this 指向 new 创建完的对象
2. call / apply 和 bind: this 指向 第一个参数
3. obj. : this 指向这个对象
4. 默认 : this 指向 window，严格模式(`'use strict';`): this 指向 undefined