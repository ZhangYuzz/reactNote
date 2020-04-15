# Day One

- react创建元素
- 渲染元素
```javascript
// react创建元素
React.createElement('标签', '属性', '子元素');

// 渲染元素
ReactDom.render('渲染的元素', '挂载点');
```
#### 使用脚手架创建react项目
npx create-react-app my-app

---
## JSX

js表达式写在 {} 中，对象和if之类的语句不能出现在花括号中

```javascript
const test = 'a';
<div> { test } </div>
```

条件渲染
if else，三元运算符，&&运算符

列表渲染
使用map方法 唯一根元素上加上key属性 map中return

样式处理

1. 行内样式
2. className

---
## 组件

#### 函数组件
1. 函数名首字母大写
2. 必须有返回值
```javascript
function Hello () {
  return (
    <div></div>
  )
}
```

#### 类组件
1. 类名首字母大写
2. 继承自React.Component
3. 有render方法
4. render方法有返回值
```javascript
class Hello extends React.Component {
  render () {
    return <div></div>
  }
}
```

## 事件

#### 绑定事件

类组件
```javascript
class Hello extends React.Component {
  render () {
    return <div onClick={this.click}></div>
  }
}
```

函数组件
```javascript
function App () {
  function hello() {
    cosnole.log('hello');
  }

  return (
    <div onClick={hello}>click</div>
  )
}
```
## 有状态组件和无状态组件

函数组件是无状态组件 可以使用hooks  

类组件是有状态组件

## 处理this指向问题

1. 使用箭头函数调用
2. 在constructor中bind(this)
3. 用箭头函数改写方法


# Day Two

## 表单处理

### 受控组件

emmmm...就是表单中的数据用state中的值

### 非受控组件

借助ref获取元素

```javascript
this.textRef = React.createRef();

<input ref={this.textRef}></input>

console.log(this.textRef.current.value);
```

## 组件

组件传递，接收参数

```javascript
// 函数组件 通过参数
hello (props) => {
  console.log(props);
}
// 类组件 通过this.props
class hello extends React.Component {
  render() {
    return (
      <div>{this.props}</div>
    )
  }
}
```
组件数据传递：

父->子：
通过子组件的属性传递，子组件通过props接收

子->父：
通过子组件属性传递一个函数给子组件，子组件在props中调用这个函数，将数据作为参数传递给父组件

兄弟<->兄弟：
就在共同的一个父组件中实现 子->父 和 父->子的操作

多级组件传递数据：

使用context
```javascript
const {Provider, Consumer} = React.creatContext()  

<Provider value={data}>
  <div></div>
</Provider>

<Consumer>
  {
    data => <div>{data}</div>
  }
</Consumer>
```

props.children属性，是组件的子节点

props校验 prop-types包

```javascript
hello.PropTypes = {
  colors: PropTypes.array,
  fn: PropTypes.fn.isRequired,
  obj: PropTypes.shape({
    red: PropTypes.string
  })
}
```
props默认值
```javascript
hello.defaultProps = {
  color: 'red'
}
```

# 组件的生命周期

## 1. 挂载阶段

- constructor：
  处理this指向，初始化state
- render：
  每次组件渲染，渲染ui
- componentDidMount：
  发送网络请求，DOM操作

## 2. 更新阶段
this.forceUpdate();
setState
更新props
- render：
  每次组件渲染，渲染ui
- componentDidUpdate：
  发送网络请求，DOM操作
  如果要setDate必须要放在if条件中，因为直接调用会导致递归更新。  

  componentDidUpdate(pre)  
  pre是上次的props，this.props是当前props

## 3. 卸载阶段

- componentWillUnmount  
清除定时器，清除监听函数


# render props 和 高阶组件

#### 复用组件
```javascript
// 父组件中
<Mouse>
  {
    params => {
      return (
        <p>params.xxx</p>
      )
    }
  }
</Mouse>

// 子组件中
render() {
  return this.props.children(state)
}
```
#### 高阶组件
其实就是在函数中创建一个类组件，在这个类组件中做一些数据处理然后把这些数据状态传递到其他组件中

要设置displayName  

类组件名称.displayName = `xxxx${xxxx}`

要传递props，不然会在类组件中丢失掉


# react原理

### setState是异步的

推荐写法
```javascript
// params state props 是最新状态的
this.setstate((state, props) => {
  return {
    count: state.count + 1
  }
})
```
setstate的第二个参数是完成更新的回调函数

### jsx的转化过程

jsx是createElement的语法糖
通过babel/preset-react编译成createElement的方法 
createElement会转换成js对象

### 组件更新机制

组件更新时，只会更新他自己和他的后代组件

### 组件性能优化
1. state只存储组件渲染相关的值，不做渲染的数据不应该放在state中，直接放在this中
2. 避免不需要的重新渲染使用钩子函数（shouldComponentUpdate(nextProps, nextState)）根据函数return值来判断，函数中的参数都是即将更新后的状态，通过this.state可以拿到更新前的状态

### 纯组件
通过对比了props和state的值，来决定是否渲染
class hello extend React.PureComponent {}

实际是shallow compare

如果是引用类型shallow compare不能直接修改原始对象
const newObj = this.state.obj  (no)
const newObj = {...this.state.obj, name: xxx} (yes)

### 虚拟DOM和Diff算法

虚拟DOM是一个js对象

# react路由
class First extends React.Component {}
<Link to="/first"></Link>
<Route path="/first" component="First"></Route>

1. link组件修改url地址
2. React路由监听url变化
3. React路由遍历内部组件匹配pathName
4. 匹配成功显示该组件

### 编程式导航
通过props.history.push()
通过props.history.go()

### 默认路由

<Route path="/" component="First"></Route>

匹配模式
path="/"
已"/"开头的路由都会匹配成功

精确匹配
在route组件上增加exact属性