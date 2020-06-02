# 2020-5-28
# react.js小书
  http://huziketang.mangojuice.top/books/react
## 第一 阶段
### 使用JSX描述UI的信息
   - 只要你要写 React.js 组件，那么就必须要引入React, Component（组件父类） 组件
   ```js
   import React, { Component } from 'react'
   import ReactDOM from 'react-dom' //ReactDOM 可以帮助我们把 React 组件渲染到页面
   ```
   - JSX 原理
    1. DOM 元素包含的信息只有三个：标签名，属性，子元素

    2. 编译的过程会把类似 HTML 的 JSX 结构转换成 JavaScript 的对象结构。
    
   **所谓的 JSX 其实就是 JavaScript 对象**
   
     ReactDOM.render 功能就是把组件渲染并且构造 DOM 树，然后插入到页面上某个特定的元素上（在这里是 id 为 root 的 div 元素）。
     - 总结一下从 JSX 到页面到底经过了什么样的过程：
     1. JSX   => Babel编译 + React.js构造 
     2. Javascript   => ReactDOM.render 
     3. DOM元素 
     4. 插入页面

    - 总结
      JSX 是 JavaScript 语言的一种语法扩展，长得像 HTML，但并不是 HTML。
      React.js 可以用 JSX 来描述你的组件长什么样的。
      JSX 在编译的时候会变成相应的 JavaScript 对象描述。
      react-dom 负责把这个用来描述 UI 信息的 JavaScript 对象变成 DOM 元素，并且渲染到页面上。

### 组件的render方法
 1. 一个组件类必须要实现一个 render 方法，且必须要返回一个 JSX 元素。
 但这里要注意的是，必须要用一个外层的 JSX 元素把所有内容包裹起来。

 2. 表达式插入
  - 在 JSX 当中你可以插入 JavaScript 的表达式，表达式返回的结果会相应地渲染到页面上。表达式用 {} 包裹。
  - {} 内可以放任何 JavaScript 的代码，包括变量、表达式计算、函数执行等等.
  - 表达式插入不仅仅可以用在标签内部，也可以用在标签的属性上
   React.js 中定义了 className 来帮助我们给元素添加类名。

 3. 条件返回
  - 我们可以在 render 函数内部根据不同条件返回不同的 JSX。
    isGoodWord 变量为 true  => 页面上是显示 React 小书 is good
    把 isGoodWord 改成 false  => 页面上就会显示 React 小书 is not good
  - 如果你在表达式插入里面返回 null,那么 React.js 会什么都不显示，相当于忽略了该表达式插入。
    结合条件返回的话，我们就做到显示或者隐藏某些元素：

 4. JSX 元素变量
   JSX 元素可以像 JavaScript 对象那样自由地赋值给变量，或者作为函数参数传递、或者作为函数的返回值。

### 组件的组合、嵌套和组件树
   1. 自定义的组件都必须要用大写字母开头，普通的 HTML 标签都用小写字母开头。
   2. 假设页面是由 Header 、Main 、Footer 几个部分组成，由一个 Index 把它们组合起来。
   3. 组件可以和组件组合在一起，组件内部可以使用别的组件。就像普通的 HTML 标签一样使用就可以。这样的组合嵌套，最后构成一个所谓的组件树，就正如上面的例子那样，Index 用了 Header、Main、Footer，Header 又使用了 Title 

### 事件监听
 1. 在 React.js 里面监听事件是很容易的事情，你只需要给需要监听事件的元素加上属性类似于 onClick、onKeyDown 这样的属性
 2. 在 React.js 不需要手动调用浏览器原生的 addEventListener 进行事件监听。React.js 帮我们封装好了一系列的 on* 的属性，当你需要为某个元素监听某个事件的时候，只需要简单地给它加上 on* 就可以了。而且你不需要考虑不同浏览器兼容性的问题，React.js 都帮我们封装好这些细节了
 3. 这些 on* 的事件监听只能用在普通的 HTML 的标签上，而不能用在组件标签上。
 #### event 对象
  React.js 中的 event 对象并不是浏览器提供的，而是它自己内部所构建的。React.js 将浏览器原生的 event 对象封装了一下，对外提供统一的 API 和属性，这样你就不用考虑不同浏览器的兼容性问题。这个 event 对象是符合 W3C 标准（ W3C UI Events ）的，它具有类似于event.stopPropagation、event.preventDefault 这种常用的方法。

#### 关于事件中的 this
   1. 在handleClickOnTitle 中把 this 打印出来，是 null 或者 undefined。
   2. 这是因为 React.js 调用你所传给它的方法的时候，并不是通过对象方法的方式调用（this.handleClickOnTitle），而是直接通过函数调用 （handleClickOnTitle），所以事件监听函数内并不能通过 this 获取到实例。
   3. 如果你想在事件函数当中使用当前的实例，你需要手动地将实例方法 bind 到当前实例上再传入给 React.js。
   ```js
   <h1 onClick={this.handleClickOnTitle.bind(this)}>React 小书</h1>
   ```

#### 总结
   1. 为 React 的组件添加事件监听是很简单的事情，你只需要使用 React.js 提供了一系列的 on* 方法即可。
   2. React.js 会给每个事件监听传入一个 event 对象，这个对象提供的功能和浏览器提供的功能一致，而且它是兼容所有浏览器的。
   3. React.js 的事件监听方法需要手动 bind 到当前实例，这种模式在 React.js 中非常常用。

### 组件的 state 和 setState
   1. state
     - 用来存储状态的变化   
      如点赞按钮，可以有“已点赞”和“未点赞”状态，并且可以在这两种状态之间进行切换
   2. setState 接受对象参数
     - setState 方法由父类 Component 所提供
     - 当我们调用这个函数的时候，React.js 会更新组件的状态 state ，
       并且重新调用render方法，然后再把render方法所渲染的最新的内容显示到页面上。
     - 修改了组件的状态, 不能直接用 this.state = xxx
       一定要使用 React.js 提供的 setState 方法，它接受一个对象或者函数作为参数。
     - setState 可以接受一个函数作为参数
         1. 当你调用 setState 的时候，React.js 并不会马上修改 state。而是把这个对象放到一个更新队列里面，稍后才会从队列当中把新的状态提取出来合并到 state 当中，然后再触发组件更新。
         2. React.js 会把上一个 setState 的结果传入这个函数，你就可以使用该结果进行运算、操作，然后返回一个对象作为更新 state 的对象：
     - setState 合并
         1. React.js 内部会把 JavaScript 事件循环中的消息队列的同一个消息中的 setState 都进行合并以后再重新渲染组件。
         2. 在使用 React.js 的时候，并不需要担心多次进行 setState 会带来性能问题。

###  配置组件的 props
 1. 怎么把 props 传进去
   在使用一个组件的时候，可以把参数放在标签的属性当中，所有的属性都会作为 props 对象的键值：
 2. 默认配置 defaultProps
 3. props 不可变
   不能改变一个组件被渲染的时候传进来的 props。
   组件的使用者可以主动地通过重新渲染的方式把新的 props 传入组件当中，这样这个组件中由 props 决定的显示形态也会得到相应的改变。
 4. 总结
   - 为了使得组件的可定制性更强，在使用组件的时候，可以在标签上加属性来传入配置参数。
   - 组件可以在内部通过 this.props 获取到配置参数，组件可以根据 props 的不同来确定自己的显示形态，达到可配置的效果。
   - 可以通过给组件添加类属性 defaultProps 来配置默认参数。
   - props 一旦传入，你就不可以在组件内部对它进行修改。但是你可以通过父组件主动重新渲染的方式来传入新的 props，从而达到更新的效果。

### state vs props
   - state 
     主要作用：用于组件保存、控制、修改自己的可变状态
     在组件内部初始化，可被组件自身修改，外部不可访问也不可修改
     状态更新：this.setState => 组件重新渲染
   - props
     主要作用: 让使用该组件的父组件可以传入参数来配置该组件
     外部传入，组件内部无法控制也无法修改
   - 两者关系
    state 是让组件控制自己的状态，props 是让外部对组件自己进行配置。
    尽量少地用 state，尽量多地用 props。React.js 非常鼓励无状态组件

### 渲染列表数据
  如果你往 {} 放一个数组，React.js 会帮你把数组里面一个个元素罗列并且渲染出来
  - 使用 map 渲染列表数据
    对于用表达式套数组罗列到页面上的元素，都要为每个元素加上 key 属性，这个 key 必须是每个元素唯一的标识。
    一般来说，key 的值可以直接后台数据返回的 id，因为后台的 id 都是唯一的。