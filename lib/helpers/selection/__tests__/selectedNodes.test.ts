import { describe, it, expect } from 'vitest';
import { getSelectedNodes, getSelectedIdWithChildren } from '../selectedNodes';
import { TreeData } from '../../../types';

describe('getSelectedNodes', () => {
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
      label: 'Node 2'
    }
  ];

  it('should mark nodes as selected based on selectedId array', () => {
    const selectedId = ['1', '2'];
    const result = getSelectedNodes(mockData, selectedId);
    
    expect(result[0].isChecked).toBe(true);
    expect(result[0].children![0].isChecked).toBe(false);
    expect(result[1].isChecked).toBe(true);
  });

  it('should handle empty selectedId array', () => {
    const result = getSelectedNodes(mockData, []);
    
    expect(result[0].isChecked).toBe(false);
    expect(result[0].children![0].isChecked).toBe(false);
    expect(result[1].isChecked).toBe(false);
  });

  it('should preserve other node properties', () => {
    const result = getSelectedNodes(mockData, ['1']);
    
    expect(result[0].id).toBe('1');
    expect(result[0].label).toBe('Node 1');
    expect(result[0].children).toBeDefined();
  });
});

describe('getSelectedIdWithChildren', () => {
  const mockData: TreeData[] = [
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

  it('should select all children when parent is selected', () => {
    const result = getSelectedIdWithChildren(mockData, [], '1');
    
    expect(result).toContain('1');
    expect(result).toContain('1-1');
    expect(result).toContain('1-1-1');
    expect(result).toContain('1-2');
    expect(result).not.toContain('2');
  });

  it('should deselect all children when parent is deselected', () => {
    const initialSelection = ['1', '1-1', '1-1-1', '1-2', '2'];
    const result = getSelectedIdWithChildren(mockData, initialSelection, '1');
    
    expect(result).not.toContain('1');
    expect(result).not.toContain('1-1');
    expect(result).not.toContain('1-1-1');
    expect(result).not.toContain('1-2');
    expect(result).toContain('2');
  });

  it('should handle selection of leaf nodes', () => {
    const result = getSelectedIdWithChildren(mockData, [], '1-1-1');
    
    expect(result).toContain('1-1-1');
    expect(result).not.toContain('1-1');
    expect(result).not.toContain('1');
  });

  it('should preserve unrelated selections', () => {
    const initialSelection = ['2'];
    const result = getSelectedIdWithChildren(mockData, initialSelection, '1');
    
    expect(result).toContain('1');
    expect(result).toContain('1-1');
    expect(result).toContain('1-1-1');
    expect(result).toContain('1-2');
    expect(result).toContain('2');
  });
});
