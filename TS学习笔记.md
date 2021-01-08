## TS基础

```
1. 创建 react+ts 的文件
npx create-react-app my-app --template typescript
2. 安装插件 code-running 执行单独的文件，启动用 ts-node 文件路径
```

为什么要使用TS？

1. **第一次开发**的时候稍微多花一些时间去编写类型，后续维护、重构的时候就会发挥它的作用了，还是非常推荐**长期维护的项目**使用它的。

2. react 父子组件 prop-types，ts 语法解决这个问题

   ```
    { title: string, content: string }
     ts: 类型约束
   ```

   ```tsx
    {key: val, key2: val2}
    面向对象,面向接口(interface)的编程是设计模式基础
   ```

    typescript  关键字: interface 

   ```tsx
   export interface Props {
       userName:string;
   }
   ```

   ts的泛型：泛型就是解决类、接口、方法的复用性以及对不特定类型的数据的支持

   泛型是一种创建可复用代码组件的工具。这种组件不只能被一种类型使用，而是能被多种类型复用

### TypeScript 语言特性

1. typeScript 是 JavaScript 的超集，扩展了 JavaScript 的语法，因此现有的 JavaScript 代码可与 TypeScript 一起工作无需任何修改，TypeScript 通过类型注解提供编译时的静态类型检查。

2. TypeScript 可处理已有的 JavaScript 代码，并只对其中的 TypeScript 代码进行编译。

3.  增加的功能包括: 

    类型批注和编译时类型检查

    类型推断

    类型擦除

    接口

    枚举

    Mixin

    泛型编程

    名字空间

    元组

    Await

    类

    模块

    lambda 函数的箭头语法

    可选参数以及默认参数

4. 将 TypeScript 转换为 JavaScript 代码: tsc test.ts

   app.ts -> tsc app.ts -> app.js

   app.tsx -> tsc app.tsx -> app.jsx

5. ts和tsx区别 : tsx对应jsx语法，写组件代码。ts是没有react语法和ui代码，写类型接口interface、store和后端服务接口service

6. css和scss区别，scss预编译，方便代码书写，编译器会自动编译成css来执

#### readonly vs const

​        最简单判断该用readonly还是const的方法是看要把它做为变量使用还是做为一个属性。

​        做为变量使用的话用 const，若做为属性则使用readonly。

#### 范型

​        我们把这个版本的identity函数叫做泛型，因为它可以适用于多个类型。 不同于使用 any，它不会丢失信息，像第一个例子那像保持准确性，传入数值类型并返回数值类型。

​		使用范型变量 T: 使用泛型创建像identity这样的泛型函数时，编译器要求你在函数体必须正确的使用这个通用的类型。 换句话说，你必须把这些参数当做是任意或所有类型。

#### ts的一些属性使用

什么时候需要使用t s的类型监测，有很多个字断，需要单独将字段列出来， 如果有相同的字段名，可以使用pick.

1. extends 继承类型
2. Omit 忽略某些字段
3. Pick  选择某些字段
4. Required 设置全部字段为必需的，不带？
5. Partial 设置全部字段为可选属性，都不是必需的 ，带？

```tsx
				export interface IUserInfo {
            name: string,
            lastName: string,
        }
        export interface IStudent extends IUserInfo {
            grade: number;
            classNo: number;
        }

        type IStudentWithoutClassNo = Omit<IStudent, 'classNo'>
        type IUserWithGrade = IUserInfo & Pick<IStudent, 'grade'>
        type IRequiredAllUserInfo = Required<IUserInfo>;
        type IPartialUserInfo = Partial<IUserInfo>;

        const student1: IStudentWithoutClassNo;
        const student2: IUserWithGrade;
        const student3: IRequiredAllUserInfo = {
            lastName: '',
            name: '',
        };
```

#### type和interface的区别

1. type 可以声明基本类型别名，联合类型，元组等类型

   type 语句中还可以使用 typeof 获取实例的 类型进行赋值

2. interface 能够声明合并

#### 类型断言

类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。

1. 类型断言有两种形式。 其一是“尖括号”语法：(<string>someValue).length
2. 另一个为`as`语法：(someValue as string).length

