import TreeView from '../lib/components/TreeView';
import '../lib/index.css';
// import './custom.css';

const data = [
  {
    label: 'Pet',
    value: '1',
    id: '1',
    children: [
      {
        id: '11',
        method: 'GET',
        label: '11',
        value: '11',
      },
      {
        id: '12',
        method: 'PUT',
        label: '12',
        value: '12',
      },
    ],
  },
  {
    label: 'Store',
    value: '2',
    id: '2',
    children: [
      {
        id: '21',
        method: 'GET',
        label: '21',
        value: '21',
      },
      {
        id: '22',
        method: 'DELETE',
        label: '22',
        value: '22',
        children: [
          {
            id: '221',
            method: 'DELETE',
            label: '221',
            value: '221',
          },
          {
            id: '222',
            method: 'DELETE',
            label: '222',
            value: '222',
          },
          {
            id: '223',
            method: 'DELETE',
            label: '223',
            value: '223',
            children: [
              {
                id: '2231',
                method: 'DELETE',
                label: '2231',
                value: '2231',
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Tree() {
  return (
    <TreeView
      initialState={{ selectedId: ['12'], expandedId: ['2', '21', '221'] }}
      data={data}
      idName="value"
      // getLabel={(item) => {
      //   if (item.type === 'leaf') {
      //     return (
      //       <div className="flex">
      //         <div>Leaf: {item.label}</div>
      //       </div>
      //     );
      //   }
      //   return item.label;
      // }}
      // onExpand={(item) => {
      //   setExpandedId((prev) =>
      //     prev.length === 0
      //       ? [item.value]
      //       : prev.indexOf(item.value) === -1
      //         ? [...prev, item.value]
      //         : prev.filter((id) => id !== item.value)
      //   );
      // }}
      // onSelect={(item) => {
      //   setSelectedId((prev) =>
      //     prev.length === 0
      //       ? [item.value]
      //       : prev.indexOf(item.value) === -1
      //         ? [...prev, item.value]
      //         : prev.filter((id) => id !== item.value)
      //   );
      // }}
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
