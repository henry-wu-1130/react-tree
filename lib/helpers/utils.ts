import { TreeRawData, TreeData } from '../types';

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
    Object.assign(d, { id: d.id + '', value: d.value + '', level });
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
  set: Set<string | number> = new Set(selectedIds)
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
