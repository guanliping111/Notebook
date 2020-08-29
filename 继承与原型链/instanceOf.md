## instanceOf

instanceof 运算符用于检测构造函数的 prototype 属性，是否出现在某个实例对象的原型链上。

instanceof 谁是谁的实例 谁继承谁

instanceof 原理：obj instanceof Constuctor

  就是判断 左边这个对象(obj) 它的原型链上面 有没有出现过 Constuctor.prototype 这个对象， 查找左边这个对象的原型链，看原型链有没有出现过 Constuctor.prototype这个对象 ，如果出现了 返回 true，如果找到原型链的顶端还没找到 返回false。

```javascript
// 如果用 instanceof 那么 他俩就成了鸡和蛋的问题
console.log(Object instanceof Function)   // true
// 原因是因为：查找Object的原型链可以找到 Function.prototype
console.log(Function instanceof Object)   // true
// 原因是因为：查找Function的原型链可以找到 Object.prototype
```



```javascript
// 模拟 instanceof
function instanceOf (L, R) {
    //L 表示左表达式，R 表示右表达式
    let O = R.prototype; //取R的显示原型
    L = L.__proto__; //取L的隐式原型
    while(true){
    if(L === null) return false;
    if(L === O) return true;
       L = L.__proto__;//没找到 继续查找上一层
     }
  }
  console.log(String instanceof Function, instanceOf(String,Function));
```

