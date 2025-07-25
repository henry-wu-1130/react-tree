# React Tree

[![npm](https://img.shields.io/npm/v/@henliwu1491/react-tree.svg?style=flat-square)](https://www.npmjs.com/package/@henliwu1491/react-tree)
[![Build Status](https://img.shields.io/github/actions/workflow/status/henry-wu-1130/react-tree/main.yml?branch=main&style=flat-square)](https://github.com/henry-wu-1130/react-tree/actions/workflows/main.yml)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/henliwu1491/react-tree/main/LICENSE.txt)
![minzipped size](https://badgen.net/bundlephobia/minzip/@henliwu1491/react-tree@0.0.10)
[![Coverage Status](https://coveralls.io/repos/github/henry-wu-1130/react-tree/badge.svg?branch=main)](https://coveralls.io/github/henry-wu-1130/react-tree?branch=main)

React Tree is a tree data structure ui library designed for easily building tree components.

### Live Demo

Check out our [interactive demo](https://stackblitz.com/edit/vitejs-vite-x4q3p7?file=index.html,src%2FApp.tsx,package.json,src%2Fmain.tsx,package-lock.json&terminal=dev) showcasing basic usage, custom icons, and state management examples.

**Note: This project is for testing purposes only and is not intended for production use.**

## Features

- 🪝&nbsp; **Hook provided**: useTreeView hooks provide tree expanded & selected state for easily render tree component

- 🖼️&nbsp; **Custom Icons**: Supports custom icons using React nodes for enhanced visual appeal

- 🎯&nbsp; **Flexible Selection**: Support both single and multiple node selection

- 🎨&nbsp; **Customizable Labels**: Easily customize node labels with your own render function

- 🌲&nbsp; **Nested Data**: Handle deeply nested tree structures with ease

## Installation

```bash
# Using npm
npm install @henliwu1491/react-tree

# Using yarn
yarn add @henliwu1491/react-tree

# Using pnpm
pnpm add @henliwu1491/react-tree
```

## Include CSS

```
import "@henliwu1491/react-tree/dist/style.css"
```

## Usage

Example:

### `<TreeView />`

<details open>
  <summary>Basic usage</summary>

```jsx
import { TreeView } from '@henliwu1491/react-tree';

export default function Tree() {
  const [selectedId] = React.useState(['12']);
  const [expandedId] = React.useState(['2', '21', '221']);

  return <TreeView initialState={{ selectedId, expandedId }} data={data} />;
}
```

</details>

<details>
  <summary>With custom label</summary>

```jsx
import { TreeView } from '@henliwu1491/react-tree';

export default function Tree() {
  const [selectedId] = React.useState(['12']);
  const [expandedId] = React.useState(['2', '21', '221']);

  return (
    <TreeView
      initialState={{ selectedId, expandedId }}
      data={data}
      getLabel={(item) => {
        if (item.type === 'leaf') {
          return (
            <div className="flex">
              <div>Leaf: {item.label}</div>
            </div>
          );
        }
        return item.label;
      }}
    />
  );
}
```

</details>

<details>
  <summary>With custom icon</summary>

```jsx
import { TreeView } from '@henliwu1491/react-tree';

export default function Tree() {
  const [selectedId] = React.useState(['12']);
  const [expandedId] = React.useState(['2', '21', '221']);

  return (
    <TreeView
      initialState={{ selectedId, expandedId }}
      data={data}
      icon={{
        expand: '▲',
        collapse: '▼',
        leaf: '🌱',
        checked: '☑',
        unchecked: '☐',
        indeterminate: '-', // Or <span>your custom React component</span>
      }}
    />
  );
}
```

</details>

<details>
  <summary>With controlled state</summary>

```jsx
export default function Tree() {
  const [selectedId, setSelectedId] = React.useState(['12']);
  const [expandedId, setExpandedId] = React.useState(['2', '21', '221']);

  return (
    <TreeView
      value={{ selectedId, expandedId }}
      data={data}
      onExpand={(item) => {
        setExpandedId((prev) =>
          prev.length === 0
            ? [item.value]
            : prev.indexOf(item.value) === -1
              ? [...prev, item.value]
              : prev.filter((id) => id !== item.value)
        );
      }}
      onSelect={(item) => {
        setSelectedId((prev) =>
          prev.length === 0
            ? [item.value]
            : prev.indexOf(item.value) === -1
              ? [...prev, item.value]
              : prev.filter((id) => id !== item.value)
        );
      }}
    />
  );
}
```

</details>

## useTreeView Props

### Options

Below are the available configuration options for the hook:

| Name           | Type               | Description                                                                          | Default |
| -------------- | ------------------ | ------------------------------------------------------------------------------------ | ------- |
| `initialState` | `TreeInitialState` | Optional.                                                                            |         |
| `data`         | `TreeRawData[]`    | Required. Your raw tree structure data. (must contain `id`, `label` and `value` key) |         |
| `onExpand`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `onSelect`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `leafKey`      | `string`           | Optional. Customized leaf node.                                                      | 'leaf'  |

### Instance

| Name                   | Type                         | Description                                 | Default |
| ---------------------- | ---------------------------- | ------------------------------------------- | ------- |
| `expandedId`           | `string[]`                   | Array of expanded node IDs                  | `[]`    |
| `selectedId`           | `string[]`                   | Array of selected node IDs                  | `[]`    |
| `data`                 | `TreeRawData[]`              | Processed tree data structure               | `[]`    |
| `onExpand`             | `function`                   | Callback when node is expanded/collapsed    | -       |
| `onSelect`             | `function`                   | Callback when node is selected/deselected   | -       |
| `setExpand`            | `(string) => void`           | Function to expand/collapse a node          | -       |
| `checkNodeAndChildren` | `(string) => void`           | Select a node and all its children          | -       |
| `checkSingleNode`      | `(string) => void`           | Select only the specified node              | -       |
| `setInitialState`      | `(TreeInitialState) => void` | Set the initial expanded and selected state | -       |

## `<TreeView />` Props

### Options

Below are the available configuration options for the component:

| Name           | Type               | Description                                                                          | Default |
| -------------- | ------------------ | ------------------------------------------------------------------------------------ | ------- |
| `initialState` | `TreeInitialState` | Optional.                                                                            |         |
| `data`         | `TreeRawData[]`    | Required. Your raw tree structure data. (must contain `id`, `label` and `value` key) |         |
| `onExpand`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `onSelect`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `value`        | `TreeInitialState` | Optional. Control your own state.                                                    |         |
| `icon`         | `IconConfig`       | Optional. Provide your custom icon, React.ReactNode only.                            |         |
| `getLabel`     | `function`         | Optional. Your own label render function.                                            |         |
| `leafKey`      | `string`           | Optional. Customized leaf node.                                                      | 'leaf'  |

### initialState

```ts
export type TreeInitialState = {
  expandedId: string[];
  selectedId: string[];
};
```

### data

**`id`, `label`, `value` are required. And if nested data is provided, `children` is also required.**

```ts
export type TreeRawData = {
  id: string;
  label: string;
  value: string;
  children?: TreeRawData[];
  [key: string]: any;
};
```

## Helper functions

| Name                        | Type       | Description                                                                                                                               | Default |
| --------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `getLeafNodes`              | `function` | `(data: TreeData[], leafkey?: string) => TreeData[]`                                                                                      |         |
| `getNormalizedNodes`        | `function` | `(data: TreeRawData[], level = 0) => TreeRawData[]`                                                                                       |         |
| `getFlattenNodes`           | `function` | `(data: TreeRawData[]) => TreeRawData[]`                                                                                                  |         |
| `getExpandedNodes`          | `function` | `(nodes: TreeData[], expandedId: TreeData['value'][]) => TreeData[]`                                                                      |         |
| `getSelectedNodes`          | `function` | `(nodes: TreeData[], selectedId: TreeData['value'][]) => TreeData[]`                                                                      |         |
| `getSelectedIdWithChildren` | `function` | `(nodes: TreeData[], selectedIds: TreeData['value'][], checkId: string, set: Set<string or number> = new Set(selectedIds)) => TreeData[]` |         |

## 🤝Contributing

We welcome contributions! If you find a bug or have an idea for improvement, please open an issue or submit a pull request on [Github](https://github.com/henry-wu-1130/react-tree).

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
