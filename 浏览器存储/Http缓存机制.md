## Http缓存机制

- Web缓存大致分为：数据库缓存、服务器端缓存、浏览器缓存。

- 缓存命中率：从缓存中得到数据的请求数与所有请求数的比率。理想状态是越高越好。

- 浏览器缓存分为：强缓存和协商缓存

  强缓存：由Expires或者Cache-Control控制

  协商缓存：Last-Modified与if-Modified-Since 、Etag与If-None-Match

- 浏览器加载一个页面的简单流程

1. 浏览器先根据http头信息来判断是否命中强缓存，如果命中，直接加载缓存中的资源，并不会将请求发送到服务器。
2. 如果未命中强缓存，则浏览器会将请求发送到服务器请求加载。服务器判断浏览器的本地缓存是否失效。若可以使用，服务器并不会返回资源信息，浏览器从本地缓存中加载资源。
3. 如果未命中协商缓存，服务器会将完整的资源返回给浏览器，浏览器加载新资源，并更新缓存。

### 1.  Cache-Control（强缓存）

命中强缓存时，浏览器并不会将请求发送给服务器。在Chrome的开发者工具中看到http的返回码是200，但是在Size列会显示为(from cache)。

**Cache-Control** : 通用消息头字段，被用于在http请求和响应中，通过指定指令来实现缓存机制。缓存指令是单向的，这意味着在请求中设置的指令，不一定被包含在响应中。

**使用方法：**``` res.setHeader('Cache-Control', 'max-age=20')```

- Cache-Control  强缓存  相对时间

  强缓存是利用http的返回头中的Expires或者Cache-Control两个字段来控制的，用来表示资源的缓存时间。

  返回码是200

  cache-control的优先级更高。

- Expires 具体时间 在这之前是有效的 之后无效

  缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。

  也就是说，Expires=max-age + 请求时间，需要和Last-modified结合使用。

  Expires是Web服务器响应消息头字段，

  在响应http请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求

### 2.  Last-Modified与if-Modified-Since （协商缓存）

 **Last-Modified **：响应头，资源最后修改时间，由**服务器告诉浏览器**。
 **if-Modified-Since**：请求头，资源最新修改时间，由**浏览器告诉服务器**(其实就是上次服务器给的Last-Modified，请求又还给服务器对比)，和Last-Modified是一对，它两会在服务器端进行对比。

### 请求过程

- **第一次请求数据**：

  **浏览器**：服务器服务器，我现在需要一个a.txt 的文件，你找到了给我，顺便给我文件修改时间！

  **服务器**：行，文件修改时间我给你，到时候文件过期了咱两核对文件修改时间，对得上我就不找了，返回a.txt+Last-Modified。

  

- **第二次请求数据**：
  
  **浏览器**：服务器服务器，我还需要一个a.txt 的文件，我把这个文件上次修改时间发你if-Modified-Since，你对比一下文件最近有不有修改！
  

**服务器**：ok，我帮你找一下。服务器将if-Modified-Since与Last-Modified做了个对比。

if-Modified-Since 与Last-Modified不相等，服务器查找了最新的a.txt，同时再次返回全新的Last-Modified。

if-Modified-Since 与Last-Modified相等即命中缓存，服务器返回状态码304，文件没修改过，你还是用你的本地缓存。

1.  浏览器第一次请求一个资源的时候，服务器返回的header中会加上Last-Modify，Last-modify是一个时间标识该资源的最后修改时间。
2. 浏览器再次请求该资源时，发送的请求头中会包含If-Modify-Since，该值为缓存之前返回的Last-Modify。
3. 服务器收到If-Modify-Since后，根据资源的最后修改时间判断是否命中缓存。如果命中缓存，则返回http304，并且不会返回资源内容，并且不会返回Last-Modify。
4. 由于对比的服务端时间，所以客户端与服务端时间差距不会导致问题。但是有时候通过最后修改时间来判断资源是否修改还是不太准确（资源变化了最后修改时间也可以一致）。于是出现了ETag/If-None-Match。

### 3.  Etag与If-None-Match（协商缓存）

 	**Etag**：响应头，由服务器设置告诉浏览器。

​	 **if-None-Match**：请求头，由浏览器告诉服务器(其实就是上次服务器给的Etag)，和Etag是一对，它两也会在服务器端进行对比。

​	与Last-Modify/If-Modify-Since不同的是，Etag/If-None-Match返回的是一个校验码（ETag: entity tag）。

​    ETag可以保证每一个资源是唯一的，资源变化都会导致ETag变化。

​	ETag值的变更则说明资源状态已经被修改。服务器根据浏览器上发送的If-None-Match值来判断是否命中缓存。

- Etag：根据文件内容通过MD5加密生成一个hash值

   客户端请求一个页面（A）。 服务器返回页面A，并在给A加上一个ETag。 客户端展现该页面，并将页面连同ETag一起缓存。 客户再次请求页面A，并将上次请求时服务器返回的ETag一起传递给服务器。 服务器检查该ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304（未修改——Not Modified）和一个空的响应体。

  ```javascript
  // 散列 / 哈希 MD5 加密
  const md5 = require('md5');
  
  //同样的输入同样的输出
  console.log(md5('abc'))
  console.log(md5('abcdkhj'))
  //如果两次的MD5的结果一样  =>  说明 两次原始未加密内容也是一样的
  //两次md5(big.js) 对比一下
  //协商：缓存 新的内容
  //服务器判断 是否可以缓存 要先知道内容有没有发生变化
  ```

  

#### 请求过程

- **第一次请求数据s**

  **浏览器**：服务器服务器，我现在需要一个users.json的文件，你找到了给我！

  **服务器**：你又来了，文件我找给你，我给你一个Etag(文件版本号)，到时候你再来找这个资源的时候把这个带上，省的我再找给你，返回a.txt+Etag。

- **第二次请求数据**
  **浏览器**：服务器服务器，我又需要users.json文件了，我把你发给我的Etag放在If-None-Match里面了，你对比一下最近这个文件有不有修改！

  **服务器**：ok，我帮你找一下。服务器将Etag与If-None-Match做了个对比。

  Etag与If-None-Match不相等，服务器查找了最新的users.json，同时再次返回全新的Etag(文件版本号)。

  Etag与If-None-Match相等，服务器返回状态码304，文件没修改过，你还是用你的本地缓存。
  
  
  
  ##### 浏览器第一次请求
  
  ![浏览器第一次请求](E:\workspace\gitwork\Learn-bm\js\cache\浏览器第一次请求.jpg)
  
  ##### 浏览器再次请求
  
  ![浏览器再次请求](E:\workspace\gitwork\Learn-bm\js\cache\浏览器再次请求.jpg)

- 

### 4. 模拟服务器接收与发送

```javascript
const express = require('express')

const app = express()
// Get 路由
app.get('/big.js',(req, res)=>{
    console.log('here');
    const fs = require('fs')
    const jsContent = fs.readFileSync('./big.js', 'utf-8');
    //Content-Type 
    //强缓存 (Cache-Control)：200 请求不会到达服务器 表示资源的缓存时间。
    res.setHeader('Cache-Control', 'max-age=20');

    //协商缓存 请求会到达服务器
    //20s之后 请求(会携带一个 If-None-Match的字段) 到达服务器
    //If-None-Match: 浏览器发现 上一次请求 服务器有Etag设置 浏览器自动发送一个
    //Etag生成：MD5 被请求变量的实体值
    //if-modified-since: 文件修改了文件的最后修改会发生变化
    //服务器 对比前后；两次文件有没有发生变化 从时间考虑 
    const Etag = md5(jsContent);
    const oldEtag = req.headers['If-None-Match'];
    if(Etag === oldEtag) {
        //文件没有变
        //服务器检查该ETag，并判断出该页面自上次客户端请求之后还未被修改，直接返回响应304
        //从缓存里面读取304 (未修改——Not Modified)
        res.sendStatus(304).end('');
        return ;
    }
    res.setHeader('Etag','abcdefg');
    res.end(jsContent)
})

app.listen(9090, ()=> {
    console.log('在9090端口启动成功')
})

```

### 5. 缓存的优点

1. 减少了冗余的数据传递，节省宽带流量
2. 减少了服务器的负担，大大提高了网站性能
3. 加快了客户端加载网页的速度 这也正是HTTP缓存属于客户端缓存的原因。

总结：

- 我们知道HTTP的缓存属于客户端缓存，后面会提到为什么属于客户端缓存。所以我们认为浏览器存在一个缓存数据库，用于储存一些不经常变化的静态文件（图片、css、js等）。我们将缓存分为强制缓存和协商缓存。

- 两类缓存机制可以同时存在，强制缓存的优先级高于协商缓存，当执行强制缓存时，如若缓存命中，则直接使用缓存数据库数据，不在进行缓存协商。

  

- 当浏览器再次访问一个已经访问过的资源时，它会这样做：

  1.看看是否命中强缓存，如果命中，就直接使用缓存了。

  2.如果没有命中强缓存，就发请求到服务器检查是否命中协商缓存。

  3.如果命中协商缓存，服务器会返回 304 告诉浏览器使用本地缓存。

  4.否则，返回最新的资源。

## 参考文章

https://www.cnblogs.com/ranyonsue/p/8918908.html

https://juejin.im/post/6844903764566999054#heading-18