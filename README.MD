## 学习笔记
## 作用域链 AO对象
对于js来说，首先会有一个预编译期的过程，那么在家个预编译期中会发生什么？
预编译：有函数预编译AO，全局预编译GO
预编译是发生在函数执行的前一刻。
```js
    function foo(a,b) {
        console.log(a);// [Function: a]
        var c = 20;
        console.log(c); //20
        function a() { } // 函数声明 
        console.log(a); //[Function: a]
        var b = function c(){};//函数表达式
        console.log(b); // [Function: c]
    }
foo(2,3);
```
(函数)预编译分四个步骤：

1. 创建一个AO对象（activation object）,AO{}
2. 将函数内所有的形参和变量声明 储存到AO对象中，value为undifined
AO{
    a:undefined,
    b:undefined,
    c:undefined
}
3. 将形参和实参进行统一。
AO{
    a:2,
    b:3,
    c:undefined
}
4. 将所有的函数声明的函数名作为AO对象中的key,函数整体内容为value储存到AO对象中
AO{
    a:function a(){},
    b:3,
    c:undefined
}
最后执行函数的结果为：
    [Function: a]
    20
    [Function: a]
    [Function: c]