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

1. react 返回列表里面的 keys 有什么用？
   key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。
   并且是使用唯一的id作为key，因为使用index作为key时，每个列表项的index在变更前后都是一样的，
   这样diff算法就会认为这个结点前后并没有发生变化直接复用

对于渲染简单的无状态组件，可以不使用key，因为不带key时节点能够复用，省去了销毁/创建组件的开销，
同时只需要修改DOM文本内容而不是移除/添加节点，这就是文档中所说的“刻意依赖默认行为以获取性能上的提升”

对于大多数场景来说，列表组件都有自己的状态
举个例子：一个新闻列表，可点击列表项来将其标记为"已访问"，可通过tab切换“娱乐新闻”或是“社会新闻”。
不带key属性的情况下，在“娱乐新闻”下选中第二项然后切换到“社会新闻”，"社会新闻"里的第二项也会是被选中的状态，
因为这里复用了组件，保留了之前的状态。要解决这个问题，可以为列表项带上新闻id作为唯一key，那么每次渲染列表时都会完全替换所有组件，
使其拥有正确状态。



### 2.refs的作用

```
作用：安全访问某个元素或者某个组件实例的句柄
```

### 3.修改了state进行相关的操作

```
1.通过setState的第二个回调函数
2.通过生命周期函数
```

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

```

	
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

### 21.setState为什么异步?

