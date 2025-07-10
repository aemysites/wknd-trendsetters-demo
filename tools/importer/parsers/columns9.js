/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid columns container
  const grid = element.querySelector('.container > .w-layout-grid');
  if (!grid) return;

  // Each immediate child of grid is a column
  const columnEls = Array.from(grid.children);
  if (columnEls.length === 0) return;

  // The header row must be a single cell (not matching the number of content columns)
  const headerRow = ['Columns (columns9)'];
  const dataRow = columnEls;

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}
