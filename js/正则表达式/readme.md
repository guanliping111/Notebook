## 正则表达式 (regular expression)
### 语法
   正则表达式是用于匹配字符串中字符组合的模式。
   在 JavaScript中，正则表达式也是对象。
   这些模式被用于 RegExp 的 exec 和 test 方法, 
   以及 String 的 match、matchAll、replace、search 和 split 方法。

 - 创建一个正则表达式
   ```js
        var re = /ab+c/;
        //调用RegExp对象的构造函数
        var re = new RegExp("ab+c");
   ```