/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 3) return;

  // Column 1: first grid child
  const leftCol = gridChildren[0];
  // Column 2: next two grid children - need to stack them vertically in a col
  const rightColTop = gridChildren[1];
  const rightColBottom = gridChildren[2];

  // For the right column, create a div that stacks the top and bottom vertically (to match example structure)
  const rightColDiv = document.createElement('div');
  rightColDiv.appendChild(rightColTop);
  rightColDiv.appendChild(rightColBottom);

  // Build the table rows
  const headerRow = ['Columns (columns2)'];
  const contentRow = [leftCol, rightColDiv];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
