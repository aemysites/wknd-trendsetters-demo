/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout for columns
  const grid = element.querySelector('.w-layout-grid.grid-layout.desktop-3-column');
  if (!grid) return;

  // Get immediate child nodes of the grid (should be 4: name, tags, heading, description)
  const gridChildren = Array.from(grid.children);
  if (gridChildren.length < 4) return;

  // 1st column: Name (e.g., "Taylor Brooks")
  const nameElem = gridChildren[0];
  // 2nd column: Tags (vertical stack of .tag)
  const tagsElem = gridChildren[1];
  // 3rd column: Heading (h2)
  const headingElem = gridChildren[2];
  // 4th column: Description (rich-text)
  const descElem = gridChildren[3];

  // Build content for each cell as arrays, referencing live elements
  // Left cell: Name and Tags
  const leftCell = [];
  if (nameElem && nameElem.textContent.trim()) leftCell.push(nameElem);
  if (tagsElem && tagsElem.childElementCount > 0) leftCell.push(tagsElem);

  // Middle cell: Heading
  const middleCell = headingElem ? [headingElem] : [];

  // Right cell: Description
  const rightCell = descElem ? [descElem] : [];

  // Create the table using DOMUtils first
  const cells = [
    ['Columns (columns29)'],
    [leftCell, middleCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Fix the header row: set colspan to span all columns
  const headerRow = table.querySelector('tr');
  const headerTh = headerRow && headerRow.querySelector('th');
  if (headerTh) {
    headerTh.setAttribute('colspan', '3');
  }

  element.replaceWith(table);
}
