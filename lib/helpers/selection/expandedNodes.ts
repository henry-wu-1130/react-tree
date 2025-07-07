import { TreeData } from '../../types';

/**
 * Updates the expanded state of nodes based on expandedId array
 * @param nodes - Array of tree nodes to update
 * @param expandedId - Array of node IDs that should be expanded
 * @returns Updated tree nodes with expansion state
 */
export function getExpandedNodes(
  nodes: TreeData[],
  expandedId: TreeData['value'][]
): TreeData[] {
  return nodes.map(node => {
    const updatedNode = {
      ...node,
      isExpanded: expandedId.includes(String(node.value))
    };

    if (node.children && node.children.length > 0) {
      updatedNode.children = getExpandedNodes(node.children, expandedId);
    }

    return updatedNode;
  });
}
