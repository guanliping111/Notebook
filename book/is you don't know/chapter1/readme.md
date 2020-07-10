## 作用域是什么

- react mvvm state setState 状态机制
  变量 程序的状态 声明空间 (闭包 作用域 变量查找 变量提升) 存储值  值修改
  
- 赋值过程  解析/语法分析
  var a = 1; 它是怎么运行的  声明 => 询问作用域 => 查找赋值
  var 关键字 
  a  Identifier 标识符 
  = 运算符  
  2 value 
  1. 高级语言
  

## 编译原理
  语言执行的底层
  操作系统 ->  编译原理
  引擎 v8 编译器 解释器
  1. 分词/词法分析 阶段
  [var, a, =, 2]
  token分词  语法错误
  最后成为二进制文件
  2. 解析/语法分析 阶段
  抽象语法树 (AST)
  数据结构 + 算法
  编译器也是一段代码
  HTML <div></div> DOM树
  AST （Abstract Syntax Tree)
  3. 代码生成
  JS 运行时编译
  Java C++ 预编译
  编译器 Compiler
  解释器 Interpreter
  JIT 即时编译器
