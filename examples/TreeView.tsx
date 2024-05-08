import React from 'react';
import TreeView from '../lib/components/TreeView';
import './index.css';

const data = [
  {
    label: 'Pet',
    value: '1',
    count: 8,
    id: 1,
    children: [
      {
        id: 11,
        method: 'GET',
        label: '/api/v1/pet',
        value: '11',
      },
      {
        id: 11,
        method: 'PUT',
        label: '/api/v1/pet',
        value: '11',
      },
    ],
  },
  {
    label: 'Store',
    value: '2',
    count: 4,
    id: 2,
    children: [
      {
        id: 21,
        method: 'GET',
        label: '/api/v1/store',
        value: '21',
      },
      {
        id: 21,
        method: 'DELETE',
        label: '/api/v1/store',
        value: '21',
      },
    ],
  },
];

export default function Tree() {
  const [selectedId] = React.useState([]);
  const [expandedId, setExpandedId] = React.useState(['2', '21']);

  return (
    <TreeView
      initialState={{ selectedId, expandedId }}
      data={data}
      idName="value"
      getLabel={(item) => {
        if (item.type === 'leaf') {
          return (
            <div className="flex align-items-center">
              <div style={{ width: '80px', border: '1px solid pink' }}>
                {item.method}
              </div>
              <div>{item.label}</div>
            </div>
          );
        }
        return item.label;
      }}
      onExpand={(item) => {
        setExpandedId((prev) =>
          prev.length === 0
            ? [item.value]
            : prev.indexOf(item.value) === -1
              ? [...prev, item.value]
              : prev.filter((id) => id !== item.value)
        );
      }}
      shouldShowNodeCount
      icon={{
        expand: '👉',
        collapse: '👇',
      }}
    />
  );
}
