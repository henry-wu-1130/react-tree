import { TreeRawData } from '../../types';

/**
 * Recursively flattens a tree structure into a single array
 * @param data - Array of tree nodes to flatten
 * @returns Flattened array of all nodes
 */
export function getFlattenNodes(data: TreeRawData[]): TreeRawData[] {
  const result: TreeRawData[] = [];
  
  function traverse(nodes: TreeRawData[]) {
    nodes.forEach(node => {
      result.push(node);
      if (node.children && node.children.length > 0) {
        traverse(node.children);
      }
    });
  }
  
  traverse(data);
  return result;
}
