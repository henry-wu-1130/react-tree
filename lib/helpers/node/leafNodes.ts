import { TreeData } from '../../types';

/**
 * Recursively marks nodes as leaf nodes based on the provided leaf key
 * @param data - Array of tree nodes to process
 * @param leafKey - Key to identify leaf nodes
 * @returns Processed tree nodes with leaf types marked
 */
export function getLeafNodes(data: TreeData[], leafKey: string): TreeData[] {
  return data.map(node => {
    const hasChildren = node.children && node.children.length > 0;
    
    if (!hasChildren) {
      if (!leafKey || node.type === leafKey) {
        return {
          ...node,
          type: leafKey || 'leaf'
        };
      }
    }
    
    if (hasChildren && node.children) {
      return {
        ...node,
        children: getLeafNodes(node.children, leafKey)
      };
    }
    
    return node;
  });
}
