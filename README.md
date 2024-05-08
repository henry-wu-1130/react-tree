# React Tree Node

React Tree Node is a tree data structure UI library designed for easily building tree components.

<!-- [Demo](https://stackblitz.com/edit/react-beautiful-timeline?file=src%2FApp.tsx) -->

**Note: This project is for testing purposes only and is not intended for production use.**

## Features

<!-- - 🚥&nbsp; **Versatile Display**: Render timelines in both `Horizontal` and `Vertical` modes, providing flexibility in presentation.

- 📺&nbsp; **Auto Animation**: Enjoy the seamless experience of auto-starting animations when the timeline enters the viewport.

- 🔧&nbsp; **Easy Customization**: Effortlessly render custom content with straightforward customization options.

- 🎭&nbsp; **Component Flexibility**: Customize every component with ease, allowing you to tailor the appearance to your specific needs.

- 🖼️&nbsp; **Custom Icons**: Enhance visual appeal by using custom icons within the dots of the timeline.

- 💪&nbsp; **TypeScript Integration**: Benefit from the advantages of [Typescript](https://www.typescriptlang.org/) for enhanced code reliability.

- 🎨&nbsp; **TailwindCSS Styling**: Achieve a sleek and modern design with styling powered by [TailwindCSS](https://tailwindcss.com/). -->

- **Headless UI**: useTreeView hooks provide tree expanded & selected state for easily render tree component
- **Checkbox**: you can also handle checkbox state

## Installation

Using [npm](https://npmjs.com/)

1. Install the package:

```
  npm install @henliwu1491/react-tree-node
```

2. Import css:

```
import "
```

## Usage

Example:

### TreeView

```tsx
import { TreeView } from '@henliwu1491/react-tree-node';

export default function Tree() {
  const [expandedId, setExpandedId] = useState([]);

  return (
    <TreeView
      initialState={{ selectedId, expandedId }}
      data={data}
      idName="id"
      onExpand={(item) => {
        setExpandedId((prev) =>
          prev.length === 0
            ? [item.value]
            : prev.indexOf(item.value) === -1
              ? [...prev, item.value]
              : prev.filter((id) => id !== item.value)
        );
      }}
      icon={{
        expand: '👉',
        collapse: '👇',
        node: '🌲',
        leaf: '🍃',
      }}
    />
  );
}
```

### useTreeView

```tsx
import { useTreeView } from '@henliwu1491/react-tree-node';

function Tree() {
  const treeProps = useTreeView({
    initialState,
    data,
    idName,
    leafName,
    onExpand,
    onSelect,
    expandedId,
    selectedId,
  });

  const { state } = treeProps;

  const renderNodes = (nodes: TreeNode[]) => {
    return nodes.map((node, nodeIdx) => (
      <TreeNode key={nodeIdx} node={node} renderNodes={renderNodes} />
    ));
  };

  return (
    <TreeContext.Provider value={treeProps}>
      {renderNodes(state.nodes)}
    </TreeContext.Provider>
  );
}
```

## `<TreeView /> Props`

Below are the available configuration options for the component:

| Name           | Type       | Description                                                |
| -------------- | ---------- | ---------------------------------------------------------- |
| `data`         | `array`    | Raw data                                                   |
| `idName`       | `string`   | Custom id key for each tree node (default is `id`)         |
| `leafName`     | `string`   | Custom leaf key for each tree node (default is `leaf`)     |
| `onExpand`     | `function` | Callback function you can get node item from the parameter |
| `onSelect`     | `function` | Callback function you can get node item from the parameter |
| `initialState` | `object`   | default state provided at the first time.                  |

## `useTreeView`

### Options

| Name           | Type               | Description            |
| -------------- | ------------------ | ---------------------- |
| `initialState` | `TreeInitialState` | selectedId, expandedId |
| `data`         | `TreeRawData[]`    |                        |
| `idName`       | `string`           |                        |
| `leafName`     | `string`           |                        |
| `expandedId`   | `string[]`         |                        |
| `selectedId`   | `string[]`         |                        |
| `onExpand`     | `function`         |                        |
| `onSelect`     | `function`         |                        |

### Instance Properties

| Name       | Type                         | Description                                  |
| ---------- | ---------------------------- | -------------------------------------------- |
| `state`    | `TreeState`                  | selectedId, expandedId, nodes, flattenNodes  |
| `dispatch` | `React.Dispatch<TreeAction>` | Just a react dispatch function in useReducer |

## 🤝Contributing

We welcome contributions! If you find a bug or have an idea for improvement, please open an issue or submit a pull request on [Github](https://github.com/henry-wu-1130/react-tree-node).

1. [Fork it](https://github.com/mevlutcantuna/react-beautiful-timeline/fork)
2. Create your feature branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

## Author ✨

💻 &nbsp; Henry Wu(吳亨利)

<!-- - [LinkedIn](https://linkedin.com/in/mevlutcantuna) -->

- [Github](https://github.com/henry-wu-1130)

## Licence

This project is licensed under the MIT License.
