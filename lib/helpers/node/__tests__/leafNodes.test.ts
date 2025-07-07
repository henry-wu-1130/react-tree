import { describe, it, expect } from 'vitest';
import { getLeafNodes } from '../leafNodes';
import { TreeData } from '../../../types';

describe('getLeafNodes', () => {
  const mockData: TreeData[] = [
    {
      id: '1',
      value: '1',
      label: 'Node 1',
      type: 'folder',
      children: [
        {
          id: '1-1',
          value: '1-1',
          label: 'Node 1-1',
          type: 'file'
        }
      ]
    },
    {
      id: '2',
      value: '2',
      label: 'Node 2',
      type: 'file'
    }
  ];

  it('should mark leaf nodes with correct type', () => {
    const result = getLeafNodes(mockData, 'file');
    
    // Check parent node remains unchanged
    expect(result[0].type).toBe('folder');
    
    // Check child node is marked as leaf
    expect(result[0].children![0].type).toBe('file');
    
    // Check direct leaf node is marked
    expect(result[1].type).toBe('file');
  });

  it('should use default "leaf" type when leafKey is empty', () => {
    const result = getLeafNodes(mockData, '');
    expect(result[1].type).toBe('leaf');
  });

  it('should handle nodes without children', () => {
    const dataWithoutChildren: TreeData[] = [
      {
        id: '1',
        value: '1',
        label: 'Node 1',
        type: 'file'
      }
    ];

    const result = getLeafNodes(dataWithoutChildren, 'file');
    expect(result[0].type).toBe('file');
  });
});
