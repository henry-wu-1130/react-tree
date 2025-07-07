import { describe, it, expect } from 'vitest';
import { getFlattenNodes } from '../flattenNodes';
import { TreeRawData } from '../../../types';

describe('getFlattenNodes', () => {
  const mockData: TreeRawData[] = [
    {
      id: '1',
      value: '1',
      label: 'Node 1',
      children: [
        {
          id: '1-1',
          value: '1-1',
          label: 'Node 1-1',
          children: [
            {
              id: '1-1-1',
              value: '1-1-1',
              label: 'Node 1-1-1'
            }
          ]
        },
        {
          id: '1-2',
          value: '1-2',
          label: 'Node 1-2'
        }
      ]
    },
    {
      id: '2',
      value: '2',
      label: 'Node 2'
    }
  ];

  it('should flatten nested tree structure', () => {
    const result = getFlattenNodes(mockData);
    
    expect(result).toHaveLength(5);
    expect(result.map(node => node.id)).toEqual(['1', '1-1', '1-1-1', '1-2', '2']);
  });

  it('should preserve node properties', () => {
    const result = getFlattenNodes(mockData);
    
    expect(result[0]).toEqual(mockData[0]);
    expect(result[4]).toEqual(mockData[1]);
  });

  it('should handle empty array', () => {
    const result = getFlattenNodes([]);
    expect(result).toHaveLength(0);
  });

  it('should handle flat array without children', () => {
    const flatData: TreeRawData[] = [
      { id: '1', value: '1', label: 'Node 1' },
      { id: '2', value: '2', label: 'Node 2' }
    ];

    const result = getFlattenNodes(flatData);
    expect(result).toHaveLength(2);
    expect(result).toEqual(flatData);
  });
});
