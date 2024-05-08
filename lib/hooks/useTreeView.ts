import { useReducer } from 'react';

export enum TreeActionTypes {
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

const reducer = (state: TreeState, action: TreeAction): TreeState => {
  switch (action.type) {
    case TreeActionTypes.EXPAND:
      return {
        ...state,
        expandedId: action.payload.length
          ? Array.isArray(action.payload) &&
            state.expandedId.find((id: string) =>
              (action.payload as string[]).includes(id)
            )
            ? state.expandedId.filter(
                (id: string) => !(action.payload as string[]).includes(id)
              )
            : [...state.expandedId, ...action.payload]
          : [],
      };
    case TreeActionTypes.SELECT_ID:
      return {
        ...state,
        selectedId: Array.isArray(action.payload) ? action.payload : [],
      };
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
  idName: keyof TreeRawData;
}): TreeState => {
  const flattenNodes = getFlattenNodes(data);
  return Object.assign(
    {},
    {
      expandedId: initialState.expandedId || flattenNodes.map((d) => d.value),
      selectedId: initialState.selectedId || [],
      flattenNodes,
      nodes: getLeafNodes(getNormalizedNodes(JSON.parse(JSON.stringify(data)))),
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

export const getFlattenNodes = (data: TreeFlattenNode[]): TreeFlattenNode[] => {
  let children: TreeRawData[] = [];
  const result = data.map((d) => {
    if (d.children && d.children.length) {
      children = [...children, ...d.children];
    }
    return d;
  });
  return result.concat(children.length ? getFlattenNodes(children) : children);
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
    getDefaultState({ initialState, data, idName })
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
