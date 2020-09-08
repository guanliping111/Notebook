# this、apply、call、bind

## 关于this

1. 学习`this`的第一步是明白：`this`既不指向函数自身也不指向函数的词法作用域。

2. `this`实际上是在函数被调用时发生的发生的绑定，它指向什么完全取决于函数在哪里被调用。

### `this`的指向：

`this `永远指向最后调用它的那个对象。

如果该方法存在于一个对象的原型链上，那么 `this` 指向的是调用这个方法的对象，就像该方法就在这个对象上一样。

1. new: this 指向 new 创建完的对象
2. call / apply 和 bind: this 指向 第一个参数
3. obj. : this 指向这个对象
4. 默认 : this 指向 window，严格模式(`'use strict';`): this 指向 undefined

### 怎么改变 `this `的指向

改变`this`的指向的几种方法：

- 使用ES6的**箭头函数**:	箭头函数的 this 始终指向函数定义时的 this，而非执行时
- 在函数内部使用 **`_this = this`**:将调用这个函数的对象保存在变量 `_this` 中，然后在函数中都使用这个 `_this`，这样 `_this` 就不会改变了
- 使用 **`apply`、`call`、`bind`**
- **new **实例化一个对象

## call、apply、bind 区别

- **`call()`**:

> **`call()` **方法使用一个指定的 `this` 值和单独给出的一个或多个参数来调用一个函数。
>
> 语法：function.call(thisArg, arg1, arg2, ...)  	其余传递给函数的参数逐个列出。

- **apply()**: 

> **`apply()`**方法调用一个具有给定`this`值的函数，以及作为一个数组（或[类似数组对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Indexed_collections#Working_with_array-like_objects)）提供的参数。
>
> 语法：func.apply(thisArg, [argsArray])   第二个是参数数组（可以是array的实例，或者arguments对象）。  

- **`bind()`**:

> **`bind()` **方法创建一个新的**函数**，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的**第一个参数**，而其余参数将作为新函数的参数，供调用时使用。
>
> 语法：function.bind(thisArg[, arg1[, arg2[, ...]]])

- 区别：

1. call()和apply()的作用是一样的，区别在于传入参数的不同；
2. 第一个参数都是，指定函数体内this的指向；
3. call()和apply的主要区别：第二个参数开始不同，`call()`方法接受的是**参数列表**，而`apply()`方法接受的是**一个参数数组**。
4. call比apply的性能要好，平常可以多用call, call传入参数的格式正是内部所需要的格式。

## 手写call和apply

这两个都是改变this指向，唯一区别就是传递参数不同

```javascript
//实现call
//模拟步骤：
//1. 将函数设为对象的属性
//2. 执行该函数 context.fn();
//3. 删除该函数  delete context.fn;
//4. this 参数可以传 null，当为 null 的时候，视为指向 window
Function.prototype.myCall = function(context) {
    let context = Object(context) || window;
    //1. 首先要获取调用call的函数，用this可以获取
    context.fn = this;
    
    let args = [];
    //2. 从 Arguments 对象中取值，取出第二个到最后一个参数，然后放到一个数组里。
    for(let i = 1; i < arguments.length; i ++){
        args.push(arguments[i]);
    }
    // 3. 将数组里的元素作为多个参数放进函数的形参里
    context.fn(...args);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}
```

```javascript
//实现apply
Function.prototype.myApply = function(context,arr) {
    let context = Object(context) || window;
    context.fn = this;
    
    let result;
    if(!arr) {
        result = context.fn();
    }else{
        let args = [];
        for(let i = 0; i < argument.length; i ++) {
            args.push('arr[' + i + ']');
        }
         result = evel('context.fn(' + args + ')');
    }
    delete context.fn;
    return result;
}
```



## 手写bind

bind它并不是立马执行函数，而是有一个延迟执行的操作，就是生成了一个新的函数，需要你去执行它.

```javascript
//实现bind
Function.prototype.myBind = function()
```

## 参考文章

JavaScript深入之call和apply的模拟实现 ：https://github.com/mqyqingfeng/Blog/issues/11

JavaScript深入之bind的模拟实现 :https://github.com/mqyqingfeng/Blog/issues/12

MDN:https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this

