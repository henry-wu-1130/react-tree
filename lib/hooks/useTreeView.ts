// BUG checkbox, expand 用 id or value？
// BUG Raw id type should be string | number
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import {
  TreeAction,
  TreeActionTypes,
  TreeHookProps,
  TreeHookReturnProps,
  TreeInitialState,
  TreeState,
  TreeRawData,
  TreeData,
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
    case TreeActionTypes.SELECT_WITH_ID: {
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
    case TreeActionTypes.SET_SELECTED: {
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

export const getLeafNodes = (data: TreeData[]) => {
  data.forEach((d) => {
    if (!d.children || !d.children.length) {
      Object.assign(d, { type: 'leaf' });
    } else {
      getLeafNodes(d.children);
    }
  });

  return data;
};

export const getNormalizedNodes = (data: TreeRawData[], level = 0) => {
  data.forEach((d) => {
    Object.assign(d, { level });
    if (d.children && !!d.children.length) {
      getNormalizedNodes(d.children, level + 1);
    }
  });
  return data;
};

export const getFlattenNodes = (data: TreeRawData[]): TreeRawData[] => {
  let children: TreeRawData[] = [];
  const result = data.map((d) => {
    if (d.children && d.children.length) {
      children = [...children, ...d.children];
    }
    return d;
  });
  return result.concat(children.length ? getFlattenNodes(children) : children);
};

export const getExpandedNodes = (
  nodes: TreeData[],
  expandedId: TreeData['value'][]
) => {
  nodes.forEach((d) => {
    Object.assign(d, {
      isExpanded: !!expandedId.includes(d.value + ''),
    });
    if (d.children && d.children.length) {
      getExpandedNodes(d.children, expandedId);
    }
  });
  return nodes;
};

export const getSelectedNodes = (
  nodes: TreeData[],
  selectedId: TreeData['value'][]
) => {
  nodes.forEach((d) => {
    Object.assign(d, {
      isChecked: !!selectedId.includes(d.value + ''),
    });
    if (d.children && d.children.length) {
      getSelectedNodes(d.children, selectedId);
    }
  });
  return nodes;
};

export const getSelectedIdWithChildren = (
  nodes: TreeData[],
  selectedIds: TreeData['value'][],
  id: string,
  set: Set<string> = new Set(selectedIds)
): TreeData['value'][] => {
  nodes.forEach((d) => {
    if ((d.value + '').startsWith(id)) {
      if (selectedIds.indexOf(id) === -1) {
        set.add(d.value + '');
      } else {
        set.delete(d.value + '');
      }
      if (d.children && d.children.length) {
        getSelectedIdWithChildren(d.children, selectedIds, id, set);
      }
    }
  });
  return set.size ? Array.from(set) : [];
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
    state,
    dispatch,
    initialState,
    data,
    idName,
    leafName,
    onExpand,
    onSelect,
  };
};

export default useTreeView;
