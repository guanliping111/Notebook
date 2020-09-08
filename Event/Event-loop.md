## **Event-loop 事件循环**

### JavaScript的执行原理

#### JavaScript代码是按顺序执行的吗？

宏任务：
	script整体代码
    setTimeout
    setInterval
    I/O
    UI render
微任务：
	process.nextTick
	Async/Await

事件循环：
	1.先执行整体代码，这属于宏任务；
	2.中途遇到宏任务，加入宏任务队列，遇到微任务加入微任务队列
	3.整体代码执行到底的时候，再读取本轮的微任务全部执行完，在读取宏任务进行下一轮执行
	
JS是单线程的，一个时间点做一个事情，为了防止执行阻塞，有了同步任务异步任务，