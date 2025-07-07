/* eslint-disable @typescript-eslint/no-explicit-any */
export enum TreeActionTypes {
  EXPAND_WITH_ID = 'EXPAND_WITH_ID',
  CHECK_NODE_AND_CHILDREN = 'CHECK_NODE_AND_CHILDREN',
  CHECK_SINGLE_NODE = 'CHECK_SINGLE_NODE',
  SET_INITIAL_STATE = 'SET_INITIAL_STATE',
}

export type TreeHookProps = {
  initialState?: {
    selectedId?: string[] | undefined | null;
    expandedId?: string[] | undefined | null;
  };
  data: TreeRawData[];
  onExpand?: (node: TreeData) => void;
  onSelect?: (node: TreeData) => void;
  leafKey?: string;
};

export type TreeHookReturnProps = TreeHookProps &
  TreeState & {
    setExpand: (id: string) => void;
    checkNodeAndChildren: (id: string) => void;
    checkSingleNode: (id: string) => void;
    setInitialState: (initialState: {
      selectedId?: string[] | undefined | null;
      expandedId?: string[] | undefined | null;
    }) => void;
  };

export type TreeProps = TreeHookProps & {
  icon?: IconConfig;
  getLabel?: (node: TreeData) => React.ReactNode;
  leafKey?: string;
  value?: {
    selectedId?: string[] | undefined | null;
    expandedId?: string[] | undefined | null;
  };
  showSelectIcon?: boolean | ((node: TreeData) => boolean);
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
  onExpand?: (node: TreeData) => void;
  onSelect?: (node: TreeData) => void;
  icon?: IconConfig;
  getLabel?: (node: TreeData) => React.ReactNode;
  leafKey?: string;
  showSelectIcon?: boolean | ((node: TreeData) => boolean);
} & TreeHookReturnProps;

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
      type: TreeActionTypes.CHECK_NODE_AND_CHILDREN;
      payload: TreeData['value'];
    }
  | {
      type: TreeActionTypes.CHECK_SINGLE_NODE;
      payload: TreeData['value'];
    }
  | {
      type: TreeActionTypes.SET_INITIAL_STATE;
      payload: {
        selectedId?: string[] | undefined | null;
        expandedId?: string[] | undefined | null;
      };
    }
  | {
      type: string;
      payload: unknown;
    };

export type TreeRawData = {
  id: string | number;
  label: string;
  value: string | number;
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
  id: string | number;
  label: string;
  value: string | number;
  type?: string;
  level?: number;
  children?: TreeNode[];
  isChecked?: boolean;
  isExpanded?: boolean;
  [key: string]: any;
};

export type TreeNodeKey = keyof TreeNode;
