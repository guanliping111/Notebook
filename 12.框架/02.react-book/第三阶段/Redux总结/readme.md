### Redux
Redux 的设计思想很简单
  - Web 应用是一个状态机，视图与状态是一一对应的。
  - 所有的状态，保存在一个对象里面。

1. state
  一个 State 对应一个 View。只要 State 相同，View 就相同。
  ```js
    import { createStore } from 'redux';
    const store = createStore(fn);
    const state = store.getState();
  ```
2. Action
    State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。
    所以，State 的变化必须是 View 导致的。
3. Action Creator
    View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。
    可以定义一个函数来生成 Action，这个函数就叫 Action Creator。
4. store.dispatch()
    store.dispatch()是 View 发出 Action 的唯一方法
5. Reducer
    - Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。 
    Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。
  ```js
    export default (state = 0, action) => {
    switch(action.type) {
      case 'INCREMENT':
          return state + 1 // 等着你执行加法操作
      case 'DECREMENT':
          return state - 1 // 等着你执行减法操作
      default:
          return state //初始状态
    }
  ```
  - store.dispatch 方法 会触发 Reducer 的自动执行。
    Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入createStore方法。
    ```js
      import { createStore } from 'redux';
      const store = createStore(reducer);
    ```
6. 纯函数
  - Reducer 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。
  - 由于 Reducer 是纯函数，就可以保证同样的State，必定得到同样的 View。但也正因为这一点，Reducer 函数里面不能改变 State，必须返回一个全新的对象

7. store.subscribe()
  Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
  ```js
    import { createStore } from 'redux';
    const store = createStore(reducer);

    store.subscribe(listener);
  ```
  store.subscribe方法返回一个函数，调用这个函数就可以解除监听。
  ```js
    let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
    );

    unsubscribe();
  ```

### Store 的实现
Store 提供了三个方法。
   - store.getState()
   - store.dispatch()
   - store.subscribe()

### Reducer 的拆分
  - Reducer 函数负责生成 State。由于整个应用只有一个 State 对象，包含所有数据，对于大型应用来说，这个 State 必然十分庞大，导致 Reducer 函数也十分庞大
  - Redux 提供了一个combineReducers方法，用于 Reducer 的拆分。你只要定义各个子 Reducer 函数，然后用这个方法，将它们合成一个大的 Reducer。
  - combineReducers()做的就是产生一个整体的 Reducer 函数。该函数根据 State 的 key 去执行相应的子 Reducer，并将返回结果合并成一个大的 State 对象

### 工作流程
1. 首先，用户发出 Action
  store.dispatch(action);

2. 然后，Store 自动调用 Reducer，并且传入两个参数：当前 State 和收到的 Action。 
Reducer 会返回新的 State 。 
  let nextState = todoApp(previousState, action);

3. State 一旦有变化，Store 就会调用监听函数。
store.subscribe(listener); //设置监听函数

4. listener可以通过store.getState()得到当前状态。如果使用的是 React，这时可以触发重新渲染 View。
```js
   function listerner() {
   let newState = store.getState();
   component.setState(newState);   
}
```