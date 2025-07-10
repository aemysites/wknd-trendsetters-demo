/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row, exactly as required
  const headerRow = ['Columns (columns23)'];

  // 2. Find the main 2-column grid inside the section
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');
  if (!mainGrid) return;
  // Defensive: filter out non-element nodes
  const gridChildren = Array.from(mainGrid.children).filter(el => el.nodeType === 1);

  // We expect two direct children: content (nested grid) and image
  // Find the left column (nested grid)
  const leftCol = gridChildren.find(child =>
    child.matches('div.w-layout-grid') && child.querySelector('h2, .rich-text, .button-group')
  );
  // Find the right column (image)
  const rightCol = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive: If missing, fallback to empty element
  const leftCell = leftCol || document.createElement('div');
  const rightCell = rightCol || document.createElement('div');

  // 3. Compose the table: header, then content row (two columns)
  const cells = [
    headerRow,
    [leftCell, rightCell],
  ];

  // 4. Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
