import React from 'react';
import cx from 'clsx';
import type { TreeNode, TreeData } from '../types';

export type TreeNodeBaseProps = {
  node: TreeNode;
  isExpanded: boolean;
  isSelected: boolean;
  isLeaf: boolean;
  onExpand?: () => void;
  onSelect?: () => void;
  icon?: {
    expand?: React.ReactNode;
    collapse?: React.ReactNode;
    leaf?: React.ReactNode;
    checked?: React.ReactNode;
    unchecked?: React.ReactNode;
    indeterminate?: React.ReactNode;
  };
  showSelectIcon?: boolean | ((node: TreeData) => boolean);
  getLabel?: (node: TreeData) => React.ReactNode;
  children?: React.ReactNode;
};

export function TreeNodeBase({
  node,
  isExpanded,
  isSelected,
  isLeaf,
  onExpand,
  onSelect,
  icon,
  showSelectIcon,
  getLabel = (node) => node.label,
  children,
}: TreeNodeBaseProps) {
  const isRoot = node.level === 0;
  const shouldShowExpand = !isLeaf;
  const shouldShowExpandContent = isExpanded && !!node.children?.length;

  let shouldShowSelectIcon;
  if (typeof showSelectIcon === 'boolean' || typeof showSelectIcon === 'function') {
    shouldShowSelectIcon = typeof showSelectIcon === 'function'
      ? showSelectIcon(node)
      : showSelectIcon;
  } else {
    shouldShowSelectIcon = icon?.checked || icon?.unchecked || icon?.indeterminate;
  }

  return (
    <div
      id={String(node.value)}
      className={cx(
        'flex',
        'flex-col',
        isRoot ? 'react-tree-node--root' : 'react-tree-node'
      )}
    >
      <div
        className={cx(
          'flex',
          'items-center',
          'react-tree-label-container',
          isLeaf ? 'react-tree-label-container--leaf' : '',
          isSelected ? 'react-tree-label-container--leaf--active' : ''
        )}
      >
        {(!isLeaf || (isLeaf && !!icon?.leaf)) && (
          <div
            className={cx(
              'flex',
              'items-center',
              'justify-center',
              'react-tree-icon-container'
            )}
            onClick={!isLeaf ? onExpand : undefined}
          >
            {shouldShowExpand
              ? isExpanded
                ? icon?.expand
                : icon?.collapse
              : null}
            {isLeaf && icon?.leaf}
          </div>
        )}

        {shouldShowSelectIcon && (
          <div
            className={cx(
              'flex',
              'items-center',
              'justify-center',
              'react-tree-checkbox-container'
            )}
            onClick={onSelect}
          >
            {node.isChecked
              ? icon?.checked
              : node.children?.some((child) => child.isChecked)
              ? icon?.indeterminate
              : icon?.unchecked}
          </div>
        )}

        <div
          className="react-tree-label"
          onClick={shouldShowSelectIcon ? onSelect : onExpand}
        >
          {getLabel(node)}
        </div>
      </div>

      {shouldShowExpandContent && children}
    </div>
  );
}

export default TreeNodeBase;
