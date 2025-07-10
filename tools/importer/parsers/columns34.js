/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid-layout, which contains the columns
  const grid = element.querySelector('.grid-layout');
  let columns = [];

  if (grid) {
    // Get all immediate children of the grid (columns)
    const colEls = Array.from(grid.children);
    colEls.forEach((col) => {
      // Reference the existing DOM elements directly
      columns.push(col);
    });
  } else {
    // Fallback: if grid not found, use all children of element
    columns.push(element);
  }

  // Table header row must match the given block name exactly
  // It must always be a single column (cell)
  const headerRow = ['Columns (columns34)'];

  // The second row contains the columns as cells
  const columnsRow = columns;

  // Build the table: headerRow (single cell), then columnsRow (N cells)
  const table = WebImporter.DOMUtils.createTable(
    [headerRow, columnsRow],
    document
  );

  // Replace the original element with the new table block
  element.replaceWith(table);
}
