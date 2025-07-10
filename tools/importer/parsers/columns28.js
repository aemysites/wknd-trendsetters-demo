/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate children of the grid block (these are the column wrappers)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, use its first child (aspect-ratio container) if present
  const columnCells = columns.map((col) => {
    if (col.children.length === 1) {
      return col.firstElementChild;
    }
    return col;
  });

  // Build the cells array: header row is a single cell, then a row with columns
  const cells = [
    ['Columns (columns28)'],
    columnCells
  ];

  // Create the table block and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
