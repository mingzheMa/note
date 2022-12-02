# Ref

Ref的作用是帮助我们获取真实Dom或ReactDom

> 函数组件不能使用ref，因为函数组件获得的是一个函数，其属性都在函数内部实现，外部无法访问（<code>\<函数组件 ref="xxx" /\></code>）

## 简单使用

```js
export default class Ref extends Component {
  // 挂载后调用
  componentDidMount() {
    this.refs.input.focus()
    // 可以访问组件Comp上的属性以及方法
    this.refs.comp.xxx()
  }

  render() {
    return (
      <div>
        {/* 聚焦输入框 */}
        <input ref="input" ></input>
        <Comp ref="comp" ></Comp>
      </div>
    );
  }
}
```

我们可以通过传入字符串的方式给<code>input</code>元素添加<code>ref</code>属性，通过<code>this.refs.input.focus()</code>实现对<code>input</code>元素聚焦

<code>ref</code>属性并不会传递到组件内部，这里<code>Comp</code>组件内部是没有<code>ref</code>属性的

> 需要注意的是添加<code>ref</code>属性的字符串形式已经不建议使用，因为存在性能问题，未来可能废弃

新的方式分两种添加ref形式，对象、函数

## 对象

```js
export default class Ref extends Component {
  inputRef = React.createRef();
  compRef = {
    current: null
  };

  // 挂载后调用
  componentDidMount() {
    this.input.current.focus()
    // 可以访问组件Comp上的属性以及方法
    this.comp.current.xxx()
  }

  render() {
    return (
      <div>
        {/* 聚焦输入框 */}
        <input ref={this.inputRef} ></input>
        <Comp ref={this.compRef} ></Comp>
      </div>
    );
  }
}
```

我们通过调用<code>React.createRef()</code>获取<code>inputRef</code>，通过<code>inputRef.current</code>属性获取元素

<code>React.createRef()</code>的本质就是返回一个<code>{ current: null }</code>，在元素渲染之后会赋值<code>current</code>，当然你也可以自己写一个对象

## 函数

```js
export default class Ref extends Component {
  inputRef = null;
  compRef = null;

  // 挂载后调用
  componentDidMount() {
    this.input.focus()
    // 可以访问组件Comp上的属性以及方法
    this.comp.xxx()
  }

  getInputRef(el) {
    this.inputRef = el
  }

  render() {
    return (
      <div>
        {/* 聚焦输入框 */}
        <input ref={this.getInputRef} ></input>
        <Comp ref={(el) => this.compRef = el} ></Comp>
      </div>
    );
  }
}
``` 

ref可以传入函数作为参数，在调用函数的时候会将元素or组件传入函数

这里需要注意函数的调用时机
- 挂载完毕后会触发，这也就是我们可以在<code>componentDidMount</code>中获取元素
- 更新渲染的时候如果ref值改变，也就是函数改变，则调用旧函数传入null，再调用新函数传入元素
- 如果组件被卸载会调用函数

> 例子中更新渲染<code>this.getInputRef</code>是没变的所以只会调用一次，而<code>(el) => this.compRef = el</code>在每次渲染的时候都会重新创建新函数，所以这个函数每次更新渲染都会触发两次

## Ref转发

我们之前说过函数组件是不能使用ref的，因为没有意义，如果我们有一个场景，我们需要获取函数组件内部某个元素，这时候就需要ref转发

```js
function BoxFn(props, ref) {
  const name = "BoxFn";
  return <div ref={ref}>我是函数组件{name}</div>;
}

const BoxFnForward = React.forwardRef(BoxFn);

class Ref extends Component {
  boxRef = React.createRef();

  componentDidMount() {
    console.log(this.boxRef.current); // <div>我是函数组件BoxFn</div>
  }

  render() {
    return (
      <div>
        <BoxFnForward ref={this.boxRef} />
      </div>
    );
  }
}
```

我们需要<code>React.forwardRef</code>方法生成一个新组件<code>BoxFnForward</code>，该方法只能传入函数组件，函数组件<code>BoxFn</code>会接收到第二个参数<code>ref</code>，你需要将这个参数配置到某个元素的ref上

> <code>React.forwardRef</code>方法可以理解是一个高阶函数，接收ref参数透传给函数组件

<code>React.forwardRef</code>方法是无法对类组件使用的，除非曲线救国

```js
class Box extends Component {
  render() {
    return <div ref={this.props.myRef}>我是函数组件</div>
  }
}

const BoxForward = React.forwardRef((props, ref) => <Box {...props} myRef={ref} />);

class Ref extends Component {
  boxRef = React.createRef();

  componentDidMount() {
    console.log(this.boxRef.current); // <div>我是函数组件BoxFn</div>
  }

  render() {
    return (
      <div>
        <BoxForward ref={this.boxRef} />
      </div>
    );
  }
}
```

我们对组件<code>Box</code>进行封装即可

## 高阶函数中Ref问题

例如我有一个高阶函数，需要在每个组件挂载的时候做一些事情

```js
function DidMountHOC(Comp) {
  class DidMount extends Component {
    componentDidMount() {
      console.log(`组件${Comp.name}挂载`);
    }

    render() {
      return <Comp {...this.props.props} />;
    }
  }

  return <DidMount {...props} />
}

class B extends Component{
    render() {
        return <div>我是B组件</div>
    }
}

const NewB = DidMountHOC(B)

class A extends Component{
    const bRef = React.createRef()

    componentDidMount(){
        console.log(this.bRef.current)
    }

    render() {
        return <div>
            <NewB ref={this.bRef} />
        </div>
    }
}
```

<code>A</code>组件中调用了<code>B</code>组件，我使用ref获取<code>B</code>组件实例，但是这里获取到的却是<code>DidMount</code>组件实例，原因在于<code>NewB</code>组件实际上就是<code>DidMount</code>组件，这并不是我们想要的结果，我们需要对<code>DidMountHOC</code>函数进行一些调整

```js
function DidMountHOC(Comp) {
  class DidMount extends Component {
    componentDidMount() {
      console.log(`组件${Comp.name}挂载`);
    }

    render() {
      const {didMountForwardRef, ...props} = this.props
      return <Comp ref={didMountForwardRef} {...props} />;
    }
  }

  return React.forwardRef((props, ref) => <DidMount  {...props} didMountForwardRef={ref} />)
}
```

我们通过<code>React.forwardRef</code>函数做一层转发，传入一个函数组件，获取ref值，在通过属性的形式传入<code>DidMount</code>组件，在<code>DidMount</code>组件渲染的时候再该属性传递给<code>Comp</code>组件的ref属性
