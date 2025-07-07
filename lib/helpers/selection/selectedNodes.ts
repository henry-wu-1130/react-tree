import { TreeData } from '../../types';

/**
 * Updates the selected state of nodes based on selectedId array
 * @param nodes - Array of tree nodes to update
 * @param selectedId - Array of node IDs that should be selected
 * @returns Updated tree nodes with selection state
 */
export function getSelectedNodes(
  nodes: TreeData[],
  selectedId: TreeData['value'][]
): TreeData[] {
  return nodes.map(node => {
    const updatedNode = {
      ...node,
      isChecked: selectedId.includes(String(node.value))
    };

    if (node.children && node.children.length > 0) {
      updatedNode.children = getSelectedNodes(node.children, selectedId);
    }

    return updatedNode;
  });
}

/**
 * Gets all child node IDs when a parent node is selected/deselected
 * @param nodes - Array of tree nodes
 * @param selectedIds - Currently selected node IDs
 * @param checkId - ID of the node being toggled
 * @returns Updated array of selected node IDs
 */
export function getSelectedIdWithChildren(
  nodes: TreeData[],
  selectedIds: TreeData['value'][],
  checkId: string
): TreeData['value'][] {
  const isAdding = !selectedIds.includes(checkId);
  const result = new Set(selectedIds);
  
  function traverse(node: TreeData) {
    const nodeId = String(node.value);
    if (nodeId.startsWith(checkId)) {
      if (isAdding) {
        result.add(nodeId);
      } else {
        result.delete(nodeId);
      }
    }
    
    if (node.children) {
      node.children.forEach(traverse);
    }
  }
  
  nodes.forEach(traverse);
  return Array.from(result);
}
