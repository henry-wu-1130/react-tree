import { describe, it, expect } from 'vitest';
import { getExpandedNodes } from '../expandedNodes';
import { TreeData } from '../../../types';

describe('getExpandedNodes', () => {
  const mockData: TreeData[] = [
    {
      id: '1',
      value: '1',
      label: 'Node 1',
      children: [
        {
          id: '1-1',
          value: '1-1',
          label: 'Node 1-1'
        }
      ]
    },
    {
      id: '2',
      value: '2',
      label: 'Node 2',
      children: [
        {
          id: '2-1',
          value: '2-1',
          label: 'Node 2-1'
        }
      ]
    }
  ];

  it('should mark nodes as expanded based on expandedId array', () => {
    const expandedId = ['1', '2-1'];
    const result = getExpandedNodes(mockData, expandedId);
    
    expect(result[0].isExpanded).toBe(true);
    expect(result[0].children![0].isExpanded).toBe(false);
    expect(result[1].isExpanded).toBe(false);
    expect(result[1].children![0].isExpanded).toBe(true);
  });

  it('should handle empty expandedId array', () => {
    const result = getExpandedNodes(mockData, []);
    
    expect(result[0].isExpanded).toBe(false);
    expect(result[0].children![0].isExpanded).toBe(false);
    expect(result[1].isExpanded).toBe(false);
    expect(result[1].children![0].isExpanded).toBe(false);
  });

  it('should preserve other node properties', () => {
    const result = getExpandedNodes(mockData, ['1']);
    
    expect(result[0].id).toBe('1');
    expect(result[0].label).toBe('Node 1');
    expect(result[0].children).toBeDefined();
    expect(result[0].children![0].label).toBe('Node 1-1');
  });

  it('should handle nodes without children', () => {
    const dataWithoutChildren: TreeData[] = [
      {
        id: '1',
        value: '1',
        label: 'Node 1'
      }
    ];

    const result = getExpandedNodes(dataWithoutChildren, ['1']);
    expect(result[0].isExpanded).toBe(true);
  });
});
