# React Tree

React Tree is a tree data structure ui library designed for easily building tree components.

<!-- [Demo](https://stackblitz.com/edit/react-beautiful-timeline?file=src%2FApp.tsx) -->

**Note: This project is for testing purposes only and is not intended for production use.**

## Features

- 🪝&nbsp; **Hook provided**: useTreeView hooks provide tree expanded & selected state for easily render tree component

- 🖼️&nbsp; **Custom Icons**: Supports custom icons using React nodes for enhanced visual appeal.

## Installation

Using npm, Yarn, or PNPM:

1. Install the package with npm:

```
npm install @henliwu1491/react-tree
```

2. Install the package with Yarn:

```
yarn add @henliwu1491/react-tree
```

3. Install the package with PNPM:

```
pnpm add @henliwu1491/react-tree
```

Choose the package manager that you prefer for installation.

## Include CSS

```
import @henliwu1491/react-tree/dist/style.css"
```

## Usage

Example:

### TreeView

```jsx
import { TreeView } from '@henliwu1491/react-tree';

export default function Tree() {
  const [selectedId] = React.useState(['12']);
  const [expandedId] = React.useState(['2', '21', '221']);

  return (
    <TreeView
      initialState={{ selectedId, expandedId }}
      data={data}
      idName="value"
      getLabel={(item) => {
        if (item.type === 'leaf') {
          return (
            <div className="flex ">
              <div>Leaf: {item.label}</div>
            </div>
          );
        }
        return item.label;
      }}
      icon={{
        expand: '▲',
        collapse: '▼',
        leaf: '🌱',
        checked: '☑',
        unchecked: '☐',
        indeterminate: '-',
      }}
    />
  );
}
```

## `<TreeView /> Props`

### Options

Below are the available configuration options for the component:

| Name           | Type               | Description                                                                          | Default |
| -------------- | ------------------ | ------------------------------------------------------------------------------------ | ------- |
| `initialState` | `TreeInitialState` | Optional.                                                                            |         |
| `data`         | `TreeRawData[]`    | Required. Your raw tree structure data. (must contain `id`, `label` and `value` key) |         |
| `idName`       | `string`           | Optional. Assign a custom id key if you have provided. (default is `id`)             |         |
| `onExpand`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `onSelect`     | `function`         | Optional. Callback function you can get node item from the parameter.                |         |
| `value`        | `TreeInitialState` | Optional. Control your own state.                                                    |         |
| `icon`         | `IconConfig`       | Optional. Provide your custom icon, React.ReactNode only.                            |         |
| `getLabel`     | `function`         | Optional. Your own label render function.                                            |         |

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
  count?: number;
  children?: TreeRawData[];
  [key: string]: any;
};
```

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
