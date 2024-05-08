/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  export type TreeHookProps = {
    initialState?: TreeInitialState;
    data: TreeRawData[];
    idName?: StringTreeNodeKey | 'id';
    leafName?: StringTreeNodeKey | 'leaf';
    // controlled state
    expandedId?: string[];
    selectedId?: string[];
    onExpand?: (node: TreeData) => void;
    onSelect?: (node: TreeData) => void;
    //
  };

  export type TreeProps = TreeHookProps & {
    icon?: IconConfig;
    shouldShowNodeCount: boolean;
    getLabel: (node: TreeData) => React.ReactNode;
  };

  export type TreeHookReturnProps = TreeHookProps & {
    state: TreeState;
    dispatch: React.Dispatch<TreeAction>;
  };

  type IconConfig = {
    expand?: React.ReactNode;
    collapse?: React.ReactNode;
    node?: React.ReactNode;
    leaf?: React.ReactNode;
    selected?: React.ReactNode;
    unSelected?: React.ReactNode;
  };

  export type ContextType = {
    state: TreeState;
    dispatch: React.Dispatch<TreeAction>;
    idName?: StringTreeNodeKey;
    leafName?: string;
    onExpand?: (node: TreeData) => void;
    onSelect?: (node: TreeData) => void;
    icon?: IconConfig;
    shouldShowNodeCount: boolean;
    getLabel: (node: TreeData) => React.ReactNode;
  };

  enum TreeActionTypes {
    EXPAND = 'EXPAND',
    SELECT_ID = 'SELECT_ID',
    SET_INITIAL_STATE = 'SET_INITIAL_STATE',
  }

  export type TreeInitialState = {
    expandedId: string[];
    selectedId: string[];
  };

  export type TreeState = TreeInitialState & {
    nodes: TreeNode[];
    flattenNodes: TreeFlattenNode[];
  };

  export type TreeAction =
    | {
        type: TreeActionTypes.EXPAND;
        payload: string[] | [];
      }
    | {
        type: TreeActionTypes.SELECT_ID;
        payload: string[] | [];
      }
    | {
        type: TreeActionTypes.SET_INITIAL_STATE;
        payload: TreeInitialState;
      }
    | {
        type: string;
        payload: string;
      };

  export type TreeRawData = {
    label: string;
    value: string;
    id: number;
    type?: string;
    count?: number;
    children?: TreeRawData[];
    [key: string]: any;
  };

  export type TreeData = TreeRawData & {
    level?: number;
  };

  export type TreeNode = {
    id: number;
    label: string;
    value: string;
    type?: string;
    idName?: StringTreeNodeKey;
    leafName?: string;
    level?: number;
    count?: number;
    children?: TreeNode[];
    [key: string]: any;
  };

  export type TreeFlattenNode = TreeRawData;

  export type TreeNodeKey = keyof TreeNode;

  type StringKey<T> = {
    [K in keyof T]: T[K] extends string ? K : never;
  }[keyof T];

  type StringTreeNodeKey = StringKey<TreeNode>;
}
