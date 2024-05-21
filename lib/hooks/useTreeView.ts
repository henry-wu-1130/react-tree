// BUG checkbox, expand 用 id or value？
// BUG Raw id type should be string | number
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import {
  getExpandedNodes,
  getFlattenNodes,
  getLeafNodes,
  getNormalizedNodes,
  getSelectedNodes,
  getSelectedIdWithChildren,
} from '../helpers/utils';
import {
  TreeAction,
  TreeActionTypes,
  TreeHookProps,
  TreeHookReturnProps,
  TreeInitialState,
  TreeState,
  TreeRawData,
} from '../types';

const defaultInitialState = {
  expandedId: [],
  selectedId: [],
  nodes: [],
  flattenNodes: [],
};

const reducer = (state: TreeState, action: TreeAction): TreeState => {
  switch (action.type) {
    case TreeActionTypes.EXPAND_WITH_ID: {
      const nodes = getExpandedNodes(
        state.nodes,
        state.expandedId.indexOf(action.payload + '') !== -1
          ? state.expandedId.filter((id) => id !== action.payload + '')
          : [...state.expandedId, action.payload + '']
      );
      const flattenNodes = getFlattenNodes(nodes);

      return {
        ...state,
        nodes,
        flattenNodes,
        expandedId: flattenNodes
          .filter((node) => node.isExpanded)
          .map((node) => node.value + ''),
      };
    }
    case TreeActionTypes.CHECK_NODE_AND_CHILDREN: {
      const nodeHasChildren = !!state.flattenNodes.find(
        (n) => n.value + '' === action.payload + ''
      )?.children?.length;

      const nodes = getSelectedNodes(
        state.nodes,
        nodeHasChildren
          ? getSelectedIdWithChildren(
              state.flattenNodes,
              state.selectedId,
              action.payload + ''
            )
          : state.selectedId.indexOf(action.payload + '') !== -1
            ? state.selectedId.filter((id) => id !== action.payload + '')
            : [...state.selectedId, action.payload + '']
      );
      const flattenNodes = getFlattenNodes(nodes);
      return {
        ...state,
        nodes,
        flattenNodes,
        selectedId: flattenNodes
          .filter((node) => node.isChecked)
          .map((node) => node.value + ''),
      };
    }
    case TreeActionTypes.CHECK_SINGLE_NODE: {
      const nodes = getSelectedNodes(
        state.nodes,
        state.selectedId.indexOf(action.payload + '') !== -1
          ? state.selectedId.filter((id) => id !== action.payload + '')
          : [...state.selectedId, action.payload + '']
      );
      const flattenNodes = getFlattenNodes(nodes);
      return {
        ...state,
        nodes,
        flattenNodes,
        selectedId: flattenNodes
          .filter((node) => node.isChecked)
          .map((node) => node.value + ''),
      };
    }
    case TreeActionTypes.SET_INITIAL_STATE:
      return {
        ...state,
        expandedId: (action.payload as TreeInitialState).expandedId,
        selectedId: (action.payload as TreeInitialState).selectedId,
      };
    default:
      throw new Error(`None exist action type: ${action.type}`);
  }
};

const getDefaultState = ({
  initialState,
  data,
}: {
  initialState: TreeInitialState;
  data: TreeRawData[];
}): TreeState => {
  const nodes = getSelectedNodes(
    getExpandedNodes(
      getLeafNodes(getNormalizedNodes(JSON.parse(JSON.stringify(data)))),
      initialState.expandedId || []
    ),
    initialState.selectedId || []
  );
  const flattenNodes = getFlattenNodes(nodes);

  return Object.assign(
    {},
    {
      expandedId: initialState.expandedId || [],
      selectedId: initialState.selectedId || [],
      nodes,
      flattenNodes,
    }
  );
};

const useTreeView = ({
  initialState = defaultInitialState,
  data,
  idName = 'id',
  leafName = 'leaf',
  onExpand,
  onSelect,
}: TreeHookProps): TreeHookReturnProps => {
  const [state, dispatch] = useReducer(
    reducer,
    getDefaultState({ initialState, data })
  );

  return {
    ...state,
    initialState,
    data,
    idName,
    leafName,
    onExpand,
    onSelect,
    setExpand: (id: string) => {
      dispatch({ type: TreeActionTypes.EXPAND_WITH_ID, payload: id });
    },
    checkNodeAndChildren: (id: string) => {
      dispatch({ type: TreeActionTypes.CHECK_NODE_AND_CHILDREN, payload: id });
    },
    checkSingleNode: (id: string) => {
      dispatch({ type: TreeActionTypes.CHECK_SINGLE_NODE, payload: id });
    },
    setInitialState: (initialState: TreeInitialState) => {
      dispatch({
        type: TreeActionTypes.SET_INITIAL_STATE,
        payload: initialState,
      });
    },
  };
};

export default useTreeView;
