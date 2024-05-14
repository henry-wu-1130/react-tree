// TODO: Hash className
// TODO: Optimize with useRef
import {
  useState,
  useEffect,
  useContext,
  useCallback,
  createContext,
} from 'react';
import useTreeView from '../hooks/useTreeView';
import {
  TreeNode,
  TreeContextType,
  TreeNodeKey,
  TreeActionTypes,
  TreeProps,
} from '../types';
import cx from 'clsx';

const defaultInitialState = {
  expandedId: [],
  selectedId: [],
  flattenNodes: [],
  nodes: [],
};

export const TreeContext = createContext<TreeContextType | null>(null);

const TreeNode = ({
  node,
  renderNodes,
}: {
  node: TreeNode;
  renderNodes: (nodes: TreeNode[]) => React.ReactNode;
}) => {
  const {
    state: { expandedId, selectedId, flattenNodes },
    dispatch,
    idName,
    leafName,
    onExpand,
    onSelect,
    icon,
    getLabel,
  } = useContext(TreeContext as React.Context<TreeContextType>);

  const id = idName ? node[idName as TreeNodeKey] : node.value + '';

  const isRoot = node.level === 0;
  const isLeaf = leafName ? node.type === leafName : node.type === 'leaf';
  const isExpandedId = expandedId.indexOf(id) !== -1;
  const isSelectedId = selectedId.includes(id);

  const shouldShowExpand = !isLeaf;
  const shouldShowExpandContent =
    isExpandedId && !!node.children && node.children.length;
  const shouldShowSelectIcon =
    icon?.checked || icon?.unchecked || icon?.indeterminate;

  const [
    isIndeterminate,
    // setIsIndeterminate
  ] = useState(false);
  const [
    isAllChecked,
    //setIsAllChecked
  ] = useState(false);

  const handleExpand = useCallback(() => {
    dispatch({
      type: TreeActionTypes.EXPAND_WITH_ID,
      payload: node.value + '',
    });
    if (typeof onExpand === 'function') {
      onExpand(node);
    }
  }, [dispatch, node, onExpand]);

  const handleSelect = useCallback(() => {
    dispatch({
      type: TreeActionTypes.SELECT_WITH_ID,
      payload: node.value + '',
    });
    if (typeof onSelect === 'function') {
      onSelect(node);
    }
  }, [dispatch, node, onSelect]);

  useEffect(() => {
    if (flattenNodes.length) {
      const children = flattenNodes.filter(
        (n) =>
          (n.value + '').startsWith(node.value + '') &&
          n.value + '' !== node.value + ''
      );
      const childrenSelected = children.filter((n) => n.isChecked);

      if (
        !!children.length &&
        !node.isChecked &&
        childrenSelected.length === children.length
      ) {
        dispatch({
          type: TreeActionTypes.SET_SELECTED,
          payload: node.value + '',
        });
      }
    }
  }, [dispatch, flattenNodes, node.isChecked, node.value]);

  return (
    <div
      id={id}
      className={cx(
        'flex',
        'flex-col',
        isRoot ? 'react-tree-node--root' : 'react-tree-node'
      )}
    >
      <div className={cx('flex', 'items-center', 'react-tree-label-container')}>
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
            {node.type === 'leaf' && icon?.leaf && icon?.leaf}
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
            {isAllChecked
              ? icon?.checked
              : isIndeterminate
                ? icon?.indeterminate
                : isSelectedId
                  ? icon?.checked
                  : icon?.unchecked}
          </div>
        )}
        <div
          className={cx('react-tree-label')}
          title={node.label}
          onClick={(e) => {
            e.stopPropagation();
            handleSelect();
          }}
        >
          {getLabel(node)}
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
  idName,
  leafName,
  // controlled state
  expandedId = [],
  selectedId = [],
  onExpand,
  onSelect,
  //
  icon,
  getLabel = (node) => node.label,
}: TreeProps): React.ReactNode {
  const treeProps = useTreeView({
    initialState,
    data,
    idName,
    leafName,
    expandedId,
    selectedId,
    onExpand,
    onSelect,
  });

  const { state, dispatch } = treeProps;

  const renderNodes = useCallback((nodes: TreeNode[] | []) => {
    return nodes.map((node, nodeIdx) => (
      <TreeNode key={nodeIdx} node={node} renderNodes={renderNodes} />
    ));
  }, []);

  useEffect(() => {
    if (value) {
      dispatch({
        type: TreeActionTypes.SET_INITIAL_STATE,
        payload: value,
      });
    }
  }, [dispatch, value]);

  return (
    <TreeContext.Provider value={{ ...treeProps, icon, getLabel }}>
      {renderNodes(state.nodes)}
    </TreeContext.Provider>
  );
}

export default Tree;
