import { TreeRawData } from '../../types';

/**
 * Recursively normalizes node IDs and values to strings and adds level information
 * @param data - Array of raw tree nodes to normalize
 * @param level - Current level in the tree hierarchy (default: 0)
 * @returns Normalized tree nodes
 */
export function getNormalizedNodes(data: TreeRawData[], level = 0): TreeRawData[] {
  return data.map(node => {
    const normalizedNode = {
      ...node,
      id: String(node.id),
      value: String(node.value),
      level
    };

    if (node.children && node.children.length > 0) {
      normalizedNode.children = getNormalizedNodes(node.children, level + 1);
    }

    return normalizedNode;
  });
}
