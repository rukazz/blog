## 1. Hooks

### 1.1 Hook 是什么

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。useState 得到的状态，对于组件来说是一种外部传入的数据，和 props、context 没有本质的区别。useState 声明的状态，实际由 React 内核进行维护，传递给函数式组件。hooks 时代的函数式组件依然是【外部数据=>view】的纯函数。

### 1.2 为什么要使用 Hook

- 在组件之间复用状态逻辑很难(redux 的 connect 方法)。Hook 使你在无需修改组件结构的情况下复用状态逻辑。
- 使函数式组件更加声明式。取代了生命周期函数，减少了 API，代码更加声明化。
- class 中 this 的问题。渲染旧状态的组件树时，useState 返回旧的状态值；渲染新状态的组件树时，useState 返回不同的状态值,而如果你用了 class 组件，就很容易出问题，因为“多个版本”的组件树，其中的 class 实例是共享的，你在某个组件树中修改了 this.A，其他组件树能够感知到。useRef 也是同理，ref 会造成组件树之间相互影响，它是 react 团队开的后门，建议谨慎使用。

### 1.3 Hooks 对应的生命周期

我们利用 useState、 useEffect() 和 useLayoutEffect() 来模拟实现生命周期。实现状态同步，而不是响应生命周期事件。  
`constructor() -> static getDerivedStateFromProps() ->render()->componentDidMount()`

- `constructor`, 函数组件不需要构造函数。通过调用`useState`来初始化 state
- `getDerivedStateFromProps` 在渲染时 安排一次更新
- shouldComponentUpdate：详见 下方 React.memo.
- render：这是函数组件体本身。
- componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些的组合。
- getSnapshotBeforeUpdate，componentDidCatch 以及 getDerivedStateFromError：目前还没有这些方法的 Hook 等价写法，但很快会被添加。

## useState 的实现原理

我们使用 useState 的时候，会返回反映此时变量的状态和用更新状态的函数。当状态被更新的时候，自动调用了 render 方法来触发视图更新。

```javascript
function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
}

let state: any;

function useState<T>(initialState: T): [T, (newState: T) => void] {
  state = state || initialState;

  function setState(newState: T) {
    state = newState;
    render();
  }

  return [state, setState];
}

render(); // 首次渲染
```

这是一个简单的 usetate，缺点是只有第一个 state 是生效的。

多个 state 是通过 Array 来实现的

```javascript
import React from "react";
import ReactDOM from "react-dom";

const states: any[] = [];
let cursor: number = 0;

function useState<T>(initialState: T): [T, (newState: T) => void] {
  const currenCursor = cursor;
  states[currenCursor] = states[currenCursor] || initialState; // 检查是否渲染过

  function setState(newState: T) {
    states[currenCursor] = newState;
    render();
  }

  ++cursor; // update: cursor
  return [states[currenCursor], setState];
}
```

| 变量名 | cursor |
| ------ | ------ |
| var1   | 0      |
| var2   | 1      |
| var3   | 2      |

因为 Hooks 需要确保 Hook 在每一次渲染中按照同样的顺序被调用。因为 memoizedState 是按 Hooks 定义的顺序来放置数据的，如果 Hooks 的顺序变化，memoizedState 并不会感知到。也解释了为什么不能在循环、判断内部使用 Hook。

## useEffect 的实现原理

useEffect 的依赖数组，可以数组中的元素是否变化来避免多余的 render。

```javascript
const allDeps: any[][] = [];
let effectCursor: number = 0;

function useEffect(callback: () => void, deps: any[]) {
  if (!allDeps[effectCursor]) {
    // 初次渲染：赋值 + 调用回调函数
    allDeps[effectCursor] = deps;
    ++effectCursor;
    callback();
    return;
  }

  const currenEffectCursor = effectCursor;
  const rawDeps = allDeps[currenEffectCursor];
  // 检测依赖项是否发生变化，发生变化需要重新render
  const isChanged = rawDeps.some(
    (dep: any, index: number) => dep !== deps[index]
  );
  if (isChanged) {
    callback();
    allDeps[effectCursor] = deps; // 感谢 juejin@carlzzz 的指正
  }
  ++effectCursor;
}

function render() {
  ReactDOM.render(<App />, document.getElementById("root"));
  effectCursor = 0; // 注意将 effectCursor 重置为0
}
```

useEffect 第一个回调函数可以返回一个用于销毁副作用的函数

缺点: 容易发生内存泄漏

## useReducer

useState 的替代方案，接收一个(action, state) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法

```javascript
const [state, dispatch] = useReducer(reducer, initialArg, init);
```

## 出题：

1. The catch: The filter happens only when a user explicitly clicks a button; not already when the user types into the input field:

```javascript
import React from "react";

const users = [
  { id: "a", name: "Robin" },
  { id: "b", name: "Dennis" },
];

const App = () => {
  const [text, setText] = React.useState("");
  const [search, setSearch] = React.useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  const filteredUsers = users.filter((user) => {
    console.log("Filter function is running ...");
    return user.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>

      <List list={filteredUsers} />
    </div>
  );
};

const List = ({ list }) => {
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

const ListItem = ({ item }) => {
  return <li>{item.name}</li>;
};

export default App;
```

2. we want to prevent every component from re-rendering when a user types into the input field. Typing into the input field for adding an item to the list should only trigger a re-render for the App component,

```javascript
import React from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  console.log("Render: App");

  const [users, setUsers] = React.useState([
    { id: "a", name: "Robin" },
    { id: "b", name: "Dennis" },
  ]);

  const [text, setText] = React.useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };

  const handleRemove = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>

      <List list={users} onRemove={handleRemove} />
    </div>
  );
};

const List = ({ list, onRemove }) => {
  console.log("Render: List");

  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
};

const ListItem = ({ item, onRemove }) => {
  console.log("Render: ListItem");

  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
};

export default App;
```

- Note: Don't mistake React's useMemo Hook with React's memo API. While useMemo is used to memoize values, React memo is used to wrap React components to prevent re-renderings.

- Note: Don't mistake React's useMemo Hook with React's useCallback Hook. While useMemo is used to memoize values, useCallback is used to memoize functions.
