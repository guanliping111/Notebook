### 1.React中的keys作用？

```
作用：Keys是React中用于追踪列表中元素的增、删、改时的辅助标识

具体：
	key是列表子元素的唯一标识符，新的组件可能对这个列表进行了
	增加，删除，重新排列子元素的操作，有了key的话，新旧组件对比
	到相同的key，就可以避免节点不必要的删除与创建操作，时节点的
	复用性提高，达到了提高性能的目的
	
	key 相同，但属性不同，只会更新属性；
	key不同，则会销毁组件，重新创建新组件
```

### 2.refs的作用

```
作用：安全访问某个元素或者某个组件实例的句柄
```

### 3.修改了state进行相关的操作

```
1.通过setState的第二个回调函数
2.通过生命周期函数
```

### 4.diff算法说一下

### Diff 的作用

React Diff 会帮助我们计算出 Virtual DOM 中*真正发生变化的部分*，并且只针对该部分进行实际的DOM操作，而不是对整个页面进行重新渲染

### 传统diff算法的问题

传统的diff算法是使用循环递归对节点进行依次对比，复杂度为O(n^3),效率低下。

### React diff算法策略

- 针对树结构(tree diff)：对UI层的DOM节点跨层级的操作进行忽略。（数量少）
- 针对组件结构(component diff)：拥有相同*类*的两个组件生成相似的树形结构，拥有不同*类*的两个组件会生成不同的属性结构。
- 针对元素结构(element-diff): 对于同一层级的一组节点，使用具有*唯一性*的id区分 (key属性)

### 5.setState什么时候是同步的，什么时候是异步的？

```
一.同步情况
	1.setTimeout里面是同步的
	2.原生DOM事件(addEventListener)是同步的

二、异步
	1.合成事件
	2.生命周期
```

### 6.哪里可以拿到最近的state值

```
1.生命周期函数componentDidUpdate

2.setState里面的第二个回调参数可以拿到最近的值
```

### 7.多个setState的合并

- 还是1
- 源码内部用了do while循环

```
  increment() {
    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });

    this.setState({
      counter: this.state.counter + 1
    });
  }
```

- 如果想要它累加呢？
- 将第一个参数设置为函数(prevState, props),拿到先前的state

```
increment() {
  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })

  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })

  this.setState((prevState, props) => {
    return {
      counter: prevState.counter + 1
    }
  })
  }
```

### 8.父子组件通信/兄弟组件通信

```
Context/eventBus
```

### 9.react渲染DOM的原理

```
JSX -> 虚拟DOM -> 真实DOM
```

### 10.React更新流程

```
props/state改变 -> render函数重新执行 -> 产生新的DOM树
-> 新旧DOM树进行diff -> 计算差异进行更新 -> 更新到真实的DOM
```



### 11.React和Vue的差异

```
1.创建组件的方式
	vue通过.vue文件就可以创建一个组件
	react通过js创建类组件(继承Component)和函数组件

2.更新状态不一样
	vue拿到data可以直接进行修改
	react通过setState修改，用新的state替换旧state

3.生命周期
	vue里面有beforeCreate，created ，react没有
	vue没有手动判断组件是否需要更新，react有shouldComponentUpdate

4.组件通信
	vue父传子props，子传父通过emit。react的props则是两者都可以
	跨组件vue用事件总线，react用context
	
5.书写方式
	vue封装了很多指令：v-bind，v-for；react更多的是用原生js，更加纯粹
```

### 12.jsx的本质/虚拟DOM的创建过程

```
jsx 仅仅只是 React.createElement(component, props, ...children) 函数的语法糖。
所有的jsx最终都会被转换成React.createElement的函数调用

首先依据 JSX 和基础数据创建出来虚拟 DOM，它反映了真实的 DOM 树的结构。然后由虚拟 DOM 树创建出真实 DOM 树，真实的 DOM 树生成完后，再触发渲染流水线往屏幕输出页面

React更新流程
props/state改变 -> render函数重新执行 -> 产生新的DOM树
-> 新旧DOM树进行diff -> 计算差异进行更新 -> 更新到真实的DOM

```

### 13.useSelector缺点？怎么解决

```
他会使本不该重新渲染的页面发生重新渲染，
第二个参数用shallowEqual，进行浅层比较
```

### 14.ImmutableJS

### 15.请求数据存到redux过程

```js
1.定义接口，定义常量
2.在reducer里面定义数组用于存储
3.在reducer里面case，并返回修改的数据
4.在actionCreators里面定义getXXXAction
5.在actionCreators里面定义changeXXXAction供getXXXAction使用
    const changeHotRecommendAction = (res) => ({
      type: actionTypes.CHANGE_HOT_RECOMMEND,
      hotRecommend: res.banners
    })

    export const getHotRecommendAction = () => {
      return dispatch => {
        getHotRecommend().then(res => {
          console.log(res)
          dispatch(changeHotRecommendAction(res))
        })
      }
    }
6.在相关页面使用useDispatch和useEffect请求
  const { hotRecommend } = useSelector(state => ({
    hotRecommend: state.getIn(['recommend',hotRecommend])
  }),shallowEqual)
  
  const dispatch = useDispatch();

  // 其他hooks
  useEffect(()=>{
    dispatch(getHotRecommendAction(limit))
  },[dispatch])
```

### 16.生命周期

```
常用：
1.Constructor：初始化内部state，绑定this
2.componentDidMount: 组件挂载到DOM上就会回调
	1.依赖DOM的操作
	2.发送网络请求
	3.添加订阅事件(在unmounted里面取消)
3.componentDidUpdate
	1.更新后立即调用
	2.如果需要与新旧props进行对比可以在这里
4.componentWillUnmount：组件即将被移除，回调
	1.清理操作
	2.订阅事件，timer，取消网络请求
5.shouldComponentUpdate	
	1.手动判断组件是否更新

不推荐使用：
	willMounted，willUpdate
	
```

### 17.useMemo和useCallback的区别

```
1.useMemo是让函数在依赖不改变的情况下，不对这个值进行重新运算	
1.useCallback是对函数进行缓存，用于子组件引用父组件的函数，父组重新渲染，避免函数的引用发生改变

2.useMemo优化的是函数进行运算的开销
2.useCallback优化的组件重新渲染的开销
```

###  18. ImmutableJs  

```
1.使用原因
	reducer里面很多数据，每次修改数据时就要重新浅拷贝(因为react不支持直接修改state)，返回新对象，开销大，浪	 费性能。

2.原理：修改了对象，就返回新的对象，但是旧的对象不发生改变；使用了持久化数据结构，他会尽可能利用之前的数据不会造成性能浪费，使得内存不会被浪费；是一个树结构；

3.使用：
	1.把对象变为Immutable对象，Map(对象),但是只会浅层，使用fromJS会深拷贝转换
	2.设值：info.set(属性，'值')
	3.取值：state.get('name') 或者 state.getIn('recommend','hotRecommend')
```

### 19.react-hooks

```
1.useState 定义数据
2.useEffect 模拟生命周期函数
	1.在里面做网络请求，订阅事件，取消订阅
	2.第一个参数相当于mounted，return那个就是unmounted
3.useContext
	1.可以做一些数据的共享
	2.使用createContext创建相应的context
	3.用Provider作为数据的提供者，将想要被使用数据的组件包裹起来；
	4.在使用数据的组件里面使用useContext，把创建的context传入，就可以拿到共享数据
4.useReducer
	1.不是reducer的替代，是useState的一中替代
	2.state处理的逻辑比较复杂，可以通过useReducer进行拆分

5.useCallback，对性能做优化
	1.对函数进行了缓存，防止子组件做不必要的渲染
	2.用在子组件使用了父组件的函数，如果父组件重新渲染，那么函数的引用就会变，造成子组件认为两次传进来的函数不		一样，从而进行渲染。
	3.可以使用依赖判断其是否需要更新

6.useMemo
	1.对函数是否运行做一些优化
	2.在开发中，组件经常用到一些需要经过计算的属性，但是有些时候这个属性没有发生变化的，但是还是会重新进行计算
	3.需要一个记忆值，将它缓存下来，依赖不变的情况下就不用做不必要的计算
```

### 20.redux-hooks

```
1.useDispatch
	1.一般都在useEffect里面
	2.派发相应的action，做一些reducer数据的修改；
2.useSelector
	1.获取redux里面的数据
	2.一般都会用一个浅层比较shallowEqual去
```

### 21.setState为什么异步?

