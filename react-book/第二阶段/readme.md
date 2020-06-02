# 2020-5-30
# react.js小书
## 第二阶段
### 前端应用状态管理 —— 状态提升
 1. 将这种组件之间共享的状态交给组件最近的公共父节点保管
 2. 状态提升：如果把 comments 交给父组件 CommentApp ，那么 CommentList 和 CommentList2 都可以通过 props 获取到 comments。
 3. 当某个状态被多个组件依赖或者影响的时候，就把该状态提升到这些组件的最近公共父组件中去管理，用 props 传递数据或者函数来管理这种依赖或着影响的行为。
### 挂载阶段的组件生命周期（一）
1. 组件挂载：React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程
2. 组件的方法调用过程
    ```js
        -> constructor()
        -> render()
        // 然后构造 DOM 元素插入页面
    ```
    挂载过程：
    ```js
        -> constructor()
        -> componentWillMount()  //render 之前调用
        -> render()
        -> componentDidMount()  //DOM 元素塞入页面后调用
        -> componentWillUnmount()  //从页面中删除
    ```
3. 总结
React.js 将组件渲染，并且构造 DOM 元素然后塞入页面的过程称为组件的挂载。这一节我们学习了 React.js 控制组件在页面上挂载和删除过程里面几个方法：
- componentWillMount：组件挂载开始之前，也就是在组件调用 render 方法之前调用。
- componentDidMount：组件挂载完成以后，也就是 DOM 元素已经插入页面后调用。
- componentWillUnmount：组件对应的 DOM 元素从页面中删除之前调用。

### 挂载阶段的组件生命周期（二）
我们一般会把组件的 state 的初始化工作放在 constructor 里面去做；在 componentWillMount 进行组件的启动工作，例如 Ajax 数据拉取、定时器的启动；组件从页面上销毁的时候，有时候需要一些数据的清理，例如定时器的清理，就会放在 componentWillUnmount 里面去做。`
```js
    componentWillUnmount () {
    clearInterval(this.timer)
    }
```

### 更新阶段的组件生命周期
1. shouldComponentUpdate(nextProps, nextState)：你可以通过这个方法控制组件是否重新渲染。如果返回 false 组件就不会重新渲染。这个生命周期在 React.js 性能优化上非常有用。
2. componentWillReceiveProps(nextProps)：组件从父组件接收到新的 props 之前调用。
3. componentWillUpdate()：组件开始重新渲染之前调用。
4. componentDidUpdate()：组件重新渲染并且把更改变更到真实的 DOM 以后调用。

### ref 和 React.js 中的 DOM 操作
1. ref 属性: 取已经挂载的元素的 DOM 节点
 能不用 ref 就不用

### props.children 和容器类组件
1. props.children  获取所有嵌套在组件中的 JSX 结构
  React.js 就是把我们嵌套的 JSX 元素一个个都放到数组当中，然后通过 props.children 传给了 Card。
2. 总结
  使用自定义组件的时候，可以在其中嵌套 JSX 结构。嵌套的结构在组件内部都可以通过 props.children 获取到，这种组件编写方式在编写容器类型的组件当中非常有用。

### dangerouslySetHTML 和 style 属性
1. dangerouslySetInnerHTML  动态设置元素的 innerHTML
2. style  动态设置元素的样式
   我们可以用 props 或者 state 中的数据生成样式对象再传给元素，然后用 setState 就可以修改样式
   ```js
     <h1 style={{fontSize: '12px', color: this.state.color}}>React.js 小书</h1>
   ```

### PropTypes 和组件参数验证
安装一个 React 提供的第三方库 prop-types：npm install --save prop-types
 验证 props 的参数类型 yarn add prop-types