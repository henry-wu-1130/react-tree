import { describe, it, expect } from 'vitest';
import { getNormalizedNodes } from '../normalizeNodes';
import { TreeRawData } from '../../../types';

describe('getNormalizedNodes', () => {
  const mockData: TreeRawData[] = [
    {
      id: 1,
      value: 1,
      label: 'Node 1',
      children: [
        {
          id: 11,
          value: 11,
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

  it('should normalize node IDs and values to strings', () => {
    const result = getNormalizedNodes(mockData);
    
    expect(result[0].id).toBe('1');
    expect(result[0].value).toBe('1');
    expect(result[0].children![0].id).toBe('11');
    expect(result[0].children![0].value).toBe('11');
    expect(result[1].id).toBe('2');
    expect(result[1].value).toBe('2');
  });

  it('should add correct level information', () => {
    const result = getNormalizedNodes(mockData);
    
    expect(result[0].level).toBe(0);
    expect(result[0].children![0].level).toBe(1);
    expect(result[1].level).toBe(0);
  });

  it('should handle custom starting level', () => {
    const result = getNormalizedNodes(mockData, 2);
    
    expect(result[0].level).toBe(2);
    expect(result[0].children![0].level).toBe(3);
    expect(result[1].level).toBe(2);
  });

  it('should preserve other node properties', () => {
    const result = getNormalizedNodes(mockData);
    
    expect(result[0].label).toBe('Node 1');
    expect(result[0].children![0].label).toBe('Node 1-1');
    expect(result[1].label).toBe('Node 2');
  });
});
