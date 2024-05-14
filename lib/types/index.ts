/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TreeActionTypes {
  EXPAND_WITH_ID = 'EXPAND_WITH_ID',
  SELECT_WITH_ID = 'SELECT_WITH_ID',
  SET_SELECTED = 'SET_SELECTED',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
}

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

export type TreeHookReturnProps = TreeHookProps & {
  state: TreeState;
  dispatch: React.Dispatch<TreeAction>;
};

export type TreeProps = TreeHookProps & {
  icon?: IconConfig;
  getLabel?: (node: TreeData) => React.ReactNode;
  value?: TreeInitialState;
};

type IconConfig = {
  expand?: React.ReactNode;
  collapse?: React.ReactNode;
  node?: React.ReactNode;
  leaf?: React.ReactNode;
  checked?: React.ReactNode;
  unchecked?: React.ReactNode;
  indeterminate?: React.ReactNode;
};

export type TreeContextType = {
  state: TreeState;
  dispatch: React.Dispatch<TreeAction>;
  idName?: StringTreeNodeKey;
  leafName?: string;
  onExpand?: (node: TreeData) => void;
  onSelect?: (node: TreeData) => void;
  icon?: IconConfig;
  getLabel: (node: TreeData) => React.ReactNode;
};

export type TreeInitialState = {
  expandedId: string[];
  selectedId: string[];
};

export type TreeState = TreeInitialState & {
  nodes: TreeNode[];
  flattenNodes: TreeRawData[];
};

export type TreeAction =
  | {
      type: TreeActionTypes.EXPAND_WITH_ID;
      payload: TreeData['value'];
    }
  | {
      type: TreeActionTypes.SELECT_WITH_ID;
      payload: TreeData['value'];
    }
  | {
      type: TreeActionTypes.SET_SELECTED;
      payload: TreeData['value'];
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
  id: string;
  label: string;
  value: string;
  children?: TreeRawData[];
  isChecked?: boolean;
  isExpanded?: boolean;
  [key: string]: any;
};

export type TreeData = TreeRawData & {
  type?: string;
  level?: number;
};

export type TreeNode = {
  id: string;
  label: string;
  value: string;
  type?: string;
  level?: number;
  idName?: StringTreeNodeKey;
  leafName?: string;
  children?: TreeNode[];
  isChecked?: boolean;
  isExpanded?: boolean;
  [key: string]: any;
};

export type TreeNodeKey = keyof TreeNode;

type StringKey<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

type StringTreeNodeKey = StringKey<TreeNode>;
