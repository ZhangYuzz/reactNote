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