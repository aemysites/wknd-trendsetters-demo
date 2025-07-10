/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container that holds the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get immediate children of the grid (these are the columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // The first column is the main content, the second is the image
  const leftCol = cols[0];
  const rightCol = cols[1];

  // Use the block name exactly as in the instructions
  const headerRow = ['Columns (columns26)'];
  const contentRow = [leftCol, rightCol];

  const block = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(block);
}
