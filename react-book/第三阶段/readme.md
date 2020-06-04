## 2020-6-2
http://huziketang.mangojuice.top/books/react/lesson28
### 高阶组件
1. 什么是高阶组件
  - 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件。
  ```js
    const NewComponent = higherOrderComponent(OldComponent)
  ```
  - componentWillMount 生命周期  =>  调用 LocalStorage 加载数据
  - 高阶组件其实就是为了组件之间的代码复用。
    组件可能有着某些相同的逻辑，把这些逻辑抽离出来，放到高阶组件中进行复用。
    高阶组件内部的包装组件和被包装组件之间通过 props 传递数据。
2. 多层高阶组件（https://huzidaha.github.io/static/assets/img/posts/8F6C1E91-B365-4919-84C3-2252223621F8.png）
3. 高阶组件有助于提高我们代码的灵活性，逻辑的复用性

### React.js 的 context
1. 一个组件可以通过 getChildContext 方法返回一个对象，这个对象就是子树的 context，提供 context 的组件必须提供 childContextTypes 作为 context 的声明和验证。

2. 如果一个组件设置了 context，那么它的子组件都可以直接访问到里面的内容，它就像这个组件为根的子树的全局变量。任意深度的子组件都可以通过 contextTypes 来声明你想要的 context 里面的哪些状态，然后可以通过 this.context 访问到那些状态。

3. context 打破了组件和组件之间通过 props 传递数据的规范，极大地增强了组件之间的耦合性。而且，就如全局变量一样，context 里面的数据能被随意接触就能被随意修改，每个组件都能够改 context 里面的内容会导致程序的运行不可预料。

4. 一些第三方的前端应用状态管理的库（例如 Redux）就是充分地利用了这种机制给我们提供便利的状态管理服务。但我们一般不需要手动写 context，也不要用它，只需要用好这些第三方的应用状态管理库就行了。

### 动手实现 Redux（一）：优雅地修改共享状态
1. Redux 和 React-redux 并不是同一个东西。
  Redux 是一种架构模式（Flux 架构的一种变种），它不关注你到底用什么库，你可以把它应用到 React 和 Vue，甚至跟 jQuery 结合都没有问题。
  而 React-redux 就是把 Redux 这种架构模式和 React.js 结合起来的一个库，就是 Redux 架构在 React.js 中的体现。
2. 我们定义一个函数，叫 dispatch，它专门负责数据的修改
  所有对数据的操作必须通过 dispatch 函数

### 动手实现 Redux（二）：抽离 store 和监控数据变化
1. 抽离出 store
   构建createStore函数，用来专门生产这种 state 和 dispatch 的集合
2. 监控数据变化
   观察者模式
3. 总结
   现在我们有了一个比较通用的 createStore，它可以产生一种我们新定义的数据类型 store，通过 store.getState 我们获取共享状态，而且我们约定只能通过 store.dispatch 修改共享状态。store 也允许我们通过 store.subscribe 监听数据数据状态被修改了，并且进行后续的例如重新渲染页面的操作。

