import React from 'react';
import useTreeView from '../lib/hooks/useTreeView';
import { TreeProvider, useTreeContext } from '../lib/components/TreeView';
import { type TreeNode } from '../lib/types';

function TreeNode({
  node,
  renderNodes,
}: {
  node: TreeNode;
  renderNodes: (nodes: TreeNode[]) => React.ReactNode;
}) {
  const { setExpand } = useTreeContext();

  return (
    <div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <div onClick={() => setExpand(node.value + '')}>
          {node.children ? (node.isExpanded ? '^' : 'v') : null}
        </div>
        <div>{node.label}</div>
      </div>
      <div
        style={{
          marginLeft: '12px',
          paddingLeft: '12px',
          borderLeft: '1px solid #000',
        }}
      >
        {!!node.children && node.isExpanded && renderNodes(node.children)}
      </div>
    </div>
  );
}

export default function TreeWithHook() {
  const treeMethods = useTreeView({
    initialState: {
      expandedId: [],
      selectedId: [],
    },
    data: [
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
                  {
                    id: '2232',
                    method: 'DELETE',
                    label: '2232',
                    value: '2232',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });

  const renderNodes = React.useCallback((nodes: TreeNode[] | []) => {
    return nodes.map((node, nodeIdx) => (
      <TreeNode key={nodeIdx} node={node} renderNodes={renderNodes} />
    ));
  }, []);

  return (
    <TreeProvider {...treeMethods}>
      {renderNodes(treeMethods.state.nodes)}
    </TreeProvider>
  );
}
