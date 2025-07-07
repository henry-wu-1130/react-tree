/* eslint-disable react-refresh/only-export-components */
import {
  useEffect,
  useContext,
  useCallback,
  useRef,
  createContext,
} from 'react';
import useTreeView from '../hooks/useTreeView';
import { type TreeNode, TreeContextType, TreeProps } from '../types';
import cx from 'clsx';

const defaultInitialState = {
  expandedId: [],
  selectedId: [],
  flattenNodes: [],
  nodes: [],
};

const TreeContext = createContext<TreeContextType | null>(null);

export const TreeProvider = ({
  children,
  ...props
}: {
  children: React.ReactNode;
} & TreeContextType) => (
  <TreeContext.Provider value={props}>{children}</TreeContext.Provider>
);

export const useTreeContext = () => {
  const context = useContext(TreeContext);
  if (!context) {
    throw new Error('useTreeContext must be used within a TreeProvider');
  }
  return context;
};

const TreeNode = ({
  node,
  renderNodes,
}: {
  node: TreeNode;
  renderNodes: (nodes: TreeNode[]) => React.ReactNode;
}) => {
  const {
    expandedId,
    selectedId,
    flattenNodes,
    onExpand,
    onSelect,
    icon,
    getLabel,
    leafKey,
    setExpand,
    checkNodeAndChildren,
    checkSingleNode,
    showSelectIcon,
  } = useContext(TreeContext as React.Context<TreeContextType>);

  const isRoot = node.level === 0;
  const isLeaf = leafKey ? node.type === leafKey : node.type === 'leaf';
  const isExpandedId = expandedId.indexOf(node.value + '') !== -1;
  const isSelectedId = selectedId.includes(node.value + '');

  const shouldShowExpand = !isLeaf;
  const shouldShowExpandContent =
    isExpandedId && !!node.children && !!node.children.length;

  let shouldShowSelectIcon;
  if (
    typeof showSelectIcon === 'boolean' ||
    typeof showSelectIcon === 'function'
  ) {
    shouldShowSelectIcon =
      typeof showSelectIcon === 'function'
        ? showSelectIcon(node)
        : showSelectIcon;
  } else {
    shouldShowSelectIcon =
      icon?.checked || icon?.unchecked || icon?.indeterminate;
  }

  const handleExpand = useCallback(() => {
    setExpand(node.value + '');
    if (typeof onExpand === 'function') {
      onExpand(node);
    }
  }, [node, onExpand, setExpand]);

  const handleSelect = useCallback(() => {
    checkNodeAndChildren(node.value + '');
    if (typeof onSelect === 'function') {
      onSelect(node);
    }
  }, [node, onSelect, checkNodeAndChildren]);

  useEffect(() => {
    if (flattenNodes.length) {
      const children = flattenNodes.filter(
        (n) =>
          (n.value + '').startsWith(node.value + '') &&
          n.value + '' !== node.value + ''
      );
      const childrenSelected = children.filter((n) => n.isChecked);
      if (children.length > 0) {
        if (
          (!node.isChecked && childrenSelected.length === children.length) ||
          (node.isChecked && childrenSelected.length === 0)
        ) {
          checkSingleNode(node.value + '');
        }
      }
    }
  }, [flattenNodes, node.isChecked, node.value, checkSingleNode]);

  return (
    <div
      id={node.value + ''}
      className={cx(
        'flex',
        'flex-col',
        isRoot ? 'react-tree-node--root' : 'react-tree-node'
      )}
    >
      <div
        className={cx(
          'flex',
          'items-center',
          'react-tree-label-container',
          isLeaf ? 'react-tree-label-container--leaf' : '',
          isSelectedId ? 'react-tree-label-container--leaf--active' : ''
        )}
      >
        {(!isLeaf || (isLeaf && !!icon?.leaf)) && (
          <div
            className={cx(
              'flex',
              'items-center',
              'justify-center',
              'react-tree-icon-container'
            )}
            onClick={!isLeaf ? handleExpand : () => null}
          >
            {shouldShowExpand
              ? isExpandedId
                ? icon?.expand
                : icon?.collapse
              : null}
            {isLeaf && icon?.leaf}
          </div>
        )}
        {shouldShowSelectIcon && (
          <div
            className={cx(
              'flex',
              'items-center',
              'justify-center',
              'react-tree-icon-container'
            )}
            onClick={handleSelect}
          >
            {icon?.checked
              ? isSelectedId
                ? icon?.checked
                : icon?.unchecked
              : ''}
          </div>
        )}
        <div
          className={cx('react-tree-label w-full', 'cursor-pointer')}
          title={node.label}
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
        >
          {typeof getLabel === 'function' && getLabel(node)}
        </div>
      </div>
      <div className={cx('flex', 'flex-col', 'react-tree-node--children')}>
        {shouldShowExpandContent && renderNodes(node.children || [])}
      </div>
    </div>
  );
};

function Tree({
  initialState = defaultInitialState,
  value,
  data,
  onExpand,
  onSelect,
  icon,
  showSelectIcon,
  getLabel = (node) => node.label,
  leafKey,
}: TreeProps): React.ReactNode {
  const previousValue = useRef(value);
  const treeMethods = useTreeView({
    initialState,
    data,
    onExpand,
    onSelect,
    leafKey: leafKey ? leafKey : 'leaf',
  });

  const { nodes, setInitialState } = treeMethods;

  const renderNodes = useCallback((nodes: TreeNode[] | []) => {
    return nodes.map((node, nodeIdx) => (
      <TreeNode key={nodeIdx} node={node} renderNodes={renderNodes} />
    ));
  }, []);

  useEffect(() => {
    if (!!value && previousValue.current !== value) {
      setInitialState({
        expandedId: value.expandedId,
        selectedId: value.selectedId,
      });
      previousValue.current = value;
    }
  }, [setInitialState, value]);

  return (
    <TreeProvider
      {...treeMethods}
      icon={icon}
      getLabel={getLabel}
      leafKey={leafKey}
      showSelectIcon={showSelectIcon}
    >
      {renderNodes(nodes)}
    </TreeProvider>
  );
}

export default Tree;
