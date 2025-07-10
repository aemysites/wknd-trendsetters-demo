/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid parent that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // The columns: First is image, second is content block
  const gridChildren = Array.from(grid.children);
  // Defensive: expect exactly 2 columns
  if (gridChildren.length < 2) return;

  // First column: the image element
  const col1 = gridChildren[0];
  // Second column: the content block (div)
  const col2 = gridChildren[1];

  // Compose table rows
  const headerRow = ['Columns (columns31)'];
  const bodyRow = [col1, col2];

  // Create the columns block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bodyRow
  ], document);

  // Replace the original section with the block
  element.replaceWith(table);
}
