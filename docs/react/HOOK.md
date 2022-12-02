# HOOK

HOOK使用介绍以及场景示范

## Callback Hook

我们模拟一个场景

```js
class Comp1 extends PureComponent {
  render() {
    console.log("Comp1 runder");
    return (
      <button onClick={this.props.setData}>val1++：{this.props.data}</button>
    );
  }
}

function Comp2(props) {
  console.log("Comp2 runder");
  return <button onClick={props.setData}>val2++: {props.data}</button>;
}

function App() {
  console.log("App runder");

  const [val1, setval1] = useState(0);
  const [val2, setval2] = useState(0);

  return (
    <>
      <Comp1 data={val1} setData={() => setval1(val1 + 1)}></Comp1>
      <Comp2 data={val2} setData={() => setval2(val2 + 1)}></Comp2>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

我们有三个组件，其中<code>App</code>中有两个子组件<code>Comp1</code>和<code>Comp2</code>并传入各自的数据<code>val1</code>和<code>val2</code>，两个子组件的逻辑是一样的，点击按钮更新自己的数据，唯一不同的是<code>Comp1</code>是纯组件

这时我们点击<code>Comp2</code>的按钮，会触发三个组件的重新渲染，纯组件不是会对比传入参数而选择是否渲染么，这里重新渲染就说明参数确实改变了

当<code>App</code>重新渲染的时，<code>setData={() => setval1(val1 + 1)}</code>每次都会赋值一个新的<code>() => setval1(val1 + 1)</code>函数，所以原来是这里变了

```js
function App() {
  console.log("App runder");

  const [val1, setval1] = useState(0);
  const [val2, setval2] = useState(0);

  const setval1Callback = useCallback(() => setval1(val1 + 1), [val1]);

  return (
    <>
      <Comp1 data={val1} setData={setval1Callback}></Comp1>
      <Comp2 data={val2} setData={() => setval2(val2 + 1)}></Comp2>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

我们可以使用<code>useCallback</code>来解决这个问题，<code>useCallback</code>会返回一个函数，并且当依赖属性没有变时永远会返回同一个函数，方法需要两个参数
- 需要执行的函数
- 依赖属性

## Memo Hook

和<code>useCallback</code>类似，但是使用的场景更多

 ```js
function App() {
  console.log("App runder");

  const [val1, setval1] = useState(0);
  const [val2, setval2] = useState(0);

  const setval1Callback = useMemo(() => {
    return () => setval1(val1 + 1);
  }, [val1]);

  return (
    <>
      <Comp1 data={val1} setData={setval1Callback}></Comp1>
      <Comp2 data={val2} setData={() => setval2(val2 + 1)}></Comp2>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
```

可以用<code>useMemo</code>实现和<code>useCallback</code>一样的效果

<code>useMemo</code>接收两个参数
- 函数
- 依赖项
触发<code>useMemo</code>时会将第一个参数也就是函数调用，将函数返回值返回并缓存，如果依赖项没有变化则将缓存返回，如果变化了会重新执行函数

对于<code>useCallback</code>的区别就是，<code>useMemo</code>是可以返回一些非函数的数据

## Reduce Hook

Reduce Hook类似于Redux中的概念

- 规定数据是单向流动
- 数据存储在一个数据仓库中，类似state
- action为改变数据的唯一原因，本质是一个对象
   - type操作类型
   - payload操作后附加信息
- reduce为改变数据的函数，必须为纯函数
   - 参数1：state改变前数据状态
   - 参数2：action改变数据原因
   - 返回：改变后数据状态
- dispatch为调用reduce的函数（reduce不能直接调用），函数参数如下
   - 参数1：action改变数据原因

```js
function nReduce(state, action) {
  switch (action.type) {
    case "plus":
      return state + 1;

    case "minus":
      if (state <= 0) return 0;
      return state - 1;

    default:
      return state;
  }
}

function Test() {
  const [n, dispatch] = useReducer(nReduce, 0, n => n + 1);

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "minus" });
        }}>
        -
      </button>

      <span>{n}</span>

      <button
        onClick={() => {
          dispatch({ type: "plus" });
        }}>
        +
      </button>
    </>
  );
}

function App() {
  return <Test />;
}

ReactDOM.render(<App />, document.getElementById("root"));
```

Reduce Hook三个参数分别是reducer函数、初始数据、初始数据计算函数

Reduce Hook实现了以上更新数据流程的模型，原理大致如下

```js
function useReducer(reducer, defaultVal, adornFn) {
  const [val, setVal] = useState(adornFn ? adornFn(defaultVal) : defaultVal);

  function dispatch(action) {
    const newVal = reducer(val, action);
    setVal(newVal);
  }

  return [val, dispatch];
}
```

## Ref Hook

Ref Hook可以用来在函数组件中使用ref，我们在函数组件间中会碰到几个问题

```js
function Comp(){
  const divRef = React.createRef()

  return <div ref={divRef}>Comp</div>
}
```

如果我们这么写ref则每次函数渲染都会创建一个新的<code>divRef</code>，非常消耗性能

```js
const divRef = React.createRef()
function Comp(){
  return <div ref={divRef}>Comp</div>
}
```

如果我们将<code>divRef</code>提到函数组件外部，那么多次使用组件时<code>divRef</code>就会污染

这时候我们可以使用<code>useRef</code>来解决上面问题

```js
function Comp(){
  const divRef = useRef()
  return <div ref={divRef}>Comp</div>
}
```

函数无论渲染多少次<code>divRef</code>始终是同一个

## ImperativeHandle Hook

在React我们有时候需要获取组件上的方法（不建议这么做）

```js
class CompClass extends Component {
  sayHello() {
    console.log("hello!");
  }
  render() {
    return <h1>CompClass</h1>;
  }
}

function App() {
  const ref = useRef();
  return (
    <>
      <CompClass ref={ref}  />
      <button
        onClick={() => {
          ref.current.sayHello();
          console.log(ref.current);
        }}>
        diaoyong
      </button>
    </>
  );
}
```

如果我们的组件是一个类组件，直接通过ref获取组件实例就可以调用方法了，那如果是函数组件呢

> 函数组件可以通过ref转发从而接收第二个参数ref，在[Ref章节](/nav.react/Ref.html)我们说过

```js
function CompFn(props, ref) {
  // 自定义暴露给父组件的值，当依赖项变化时再次触发函数更新返回值
  useImperativeHandle(
    ref,
    () => {
      return {
        a: 1,
        b: 2,
        sayHello() {
          console.log("Hello!");
        }
      };
    },
    []
  );

  return <h1>CompFn</h1>;
}

const NewCompFn = React.forwardRef(CompFn);

function App() {
  const ref = useRef();
  return (
    <>
      <NewCompFn ref={ref} />
      <button
        onClick={() => {
          ref.current.sayHello();
          console.log(ref.current);
        }}>
        diaoyong
      </button>
    </>
  );
}
```

我们通过<code>React.forwardRef(CompFn)</code>实现ref转发，这里函数组件<code>CompFn</code>中定义了<code>useImperativeHandle</code>Hook，这样在<code>App</code>组件中我们就可以访问函数组件中的属性和方法

<code>useImperativeHandle</code>Hook接收三个参数，通过转发传入的ref、一个函数、依赖项。第二个参数函数的返回值就会赋值给<code>ref.current</code>，在函数组件首次渲染时会调用，之后依赖更新会调用，如果没有传入依赖项则每次函数渲染都会触发