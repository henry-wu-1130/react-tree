import { useState } from 'react';
import TreeView from '../lib/components/TreeView';
import '../lib/index.css';
// import './custom.css';

const data = [
  {
    label: 'Pet',
    value: 1,
    id: 1,
    children: [
      {
        id: 11,
        method: 'GET',
        label: '11',
        value: 11,
      },
      {
        id: 12,
        method: 'PUT',
        label: '12',
        value: 12,
      },
    ],
  },
  {
    label: 'Store',
    value: 2,
    id: 2,
    children: [
      {
        id: 21,
        method: 'GET',
        label: '21',
        value: 21,
      },
      {
        id: 22,
        method: 'DELETE',
        label: '22',
        value: 22,
        children: [
          {
            id: 221,
            method: 'DELETE',
            label: '221',
            value: 221,
          },
          {
            id: 222,
            method: 'DELETE',
            label: '222',
            value: 222,
          },
          {
            id: 223,
            method: 'DELETE',
            label: '223',
            value: 223,
            children: [
              {
                id: 2231,
                method: 'DELETE',
                label: '2231',
                value: 2231,
              },
            ],
          },
        ],
      },
    ],
  },
];

export default function Tree() {
  const [selectedId, setSelectedId] = useState('');

  return (
    <TreeView
      value={{ selectedId: selectedId ? [selectedId] : [] }}
      data={data}
      getLabel={(item) => {
        if (item.type === 'leaf') {
          return (
            <div
              className="flex"
              onClick={() => setSelectedId(item.value + '')}
              style={{
                width: '100%',
                backgroundColor:
                  selectedId === item.value + '' ? 'lightblue' : 'white',
              }}
            >
              <div>Leaf: {item.label}</div>
            </div>
          );
        }
        return item.label;
      }}
      icon={{
        expand: '▲',
        collapse: '▼',
        // leaf: '🌱',
        // checked: '☑',
        // unchecked: '☐',
        // indeterminate: '-',
      }}
    />
  );
}
