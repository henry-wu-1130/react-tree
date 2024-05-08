import { createContext, useEffect, useContext, useCallback } from 'react';
import cx from 'clsx';
import useTreeView from '../hooks/useTreeView';
import '../styles/index.css';

enum TreeActionTypes {
  EXPAND = 'EXPAND',
  SELECT_ID = 'SELECT_ID',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
}

const defaultInitialState = {
  expandedId: [],
  selectedId: [],
  flattenNodes: [],
  nodes: [],
};

export const TreeContext = createContext<ContextType>({
  state: defaultInitialState,
  idName: 'id',
  leafName: 'leaf',
  onExpand: () => {},
  onSelect: () => {},
  dispatch: () => {},
  icon: {
    expand: '🔽',
    collapse: '🔼',
    leaf: '🍃',
    node: '🌲',
    selected: '🔵',
    unSelected: '⚪',
  },
  getLabel: (node) => node.label,
});

const TreeNode = ({
  node,
  renderNodes,
}: {
  node: TreeNode;
  renderNodes: (nodes: TreeNode[]) => React.ReactNode;
}) => {
  const {
    state: { expandedId, selectedId },
    dispatch,
    idName,
    leafName,
    onExpand,
    onSelect,
    icon,
    getLabel,
  } = useContext(TreeContext);

  const id = idName ? node[idName as TreeNodeKey] : node.value + '';
  const isExpandedId = expandedId.indexOf(id) !== -1;

  const isRoot = node.level === 0;
  const isLeaf = leafName ? node.type === leafName : node.type === 'leaf';
  const isSelectedId = selectedId.includes(id);

  const shouldShowExpandContent =
    isExpandedId && !!node.children && node.children.length;
  const shouldShowExpand = !isLeaf;

  const handleExpand = useCallback(() => {
    dispatch({ type: TreeActionTypes.EXPAND, payload: [id] });
    if (typeof onExpand === 'function') {
      onExpand(node);
    }
  }, [dispatch, id, node, onExpand]);

  const handleSelectId = useCallback(() => {
    dispatch({ type: TreeActionTypes.SELECT_ID, payload: id });
    if (typeof onSelect === 'function') {
      onSelect(node);
    }
  }, [dispatch, id, node, onSelect]);

  return (
    <div id={id} className={cx('flex', 'flex-col', isRoot ? 'root' : 'node')}>
      <div
        className={cx(
          'flex',
          'align-items-center',
          'label-container',
          isSelectedId && 'label-container--unselected'
        )}
      >
        <div
          className={cx(
            'flex',
            'align-items-center',
            'justify-content-center',
            'icon-container',
            isLeaf && !icon?.leaf && 'none'
          )}
          onClick={handleExpand}
        >
          {shouldShowExpand
            ? isExpandedId
              ? icon?.expand
              : icon?.collapse
            : null}
          {node.type === 'leaf' && icon?.leaf && icon?.leaf}
        </div>
        <div
          className={cx('label')}
          title={node.label}
          onClick={(e) => {
            e.stopPropagation();
            handleSelectId();
          }}
        >
          {getLabel(node)}
        </div>
      </div>
      <div className={cx('flex', 'flex-col', 'node-children')}>
        {shouldShowExpandContent && renderNodes(node.children || [])}
      </div>
    </div>
  );
};

function Tree({
  initialState = defaultInitialState,
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

  const renderNodes = (nodes: TreeNode[] | []) => {
    return nodes.map((node, nodeIdx) => (
      <TreeNode key={nodeIdx} node={node} renderNodes={renderNodes} />
    ));
  };

  useEffect(() => {
    dispatch({
      type: TreeActionTypes.SET_INITIAL_STATE,
      payload: initialState,
    });
  }, [dispatch, initialState]);

  return (
    <TreeContext.Provider value={{ ...treeProps, icon, getLabel }}>
      {renderNodes(state.nodes)}
    </TreeContext.Provider>
  );
}

export default Tree;
