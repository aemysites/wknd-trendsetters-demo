/* global WebImporter */
export default function parse(element, { document }) {
  // The header row: exactly one cell with block name
  const headerRow = ['Columns (columns5)'];

  // Get all immediate child divs, each is a column block (with a 1x1 aspect div inside)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, capture the entire content (not just the image)
  // This is important in case columns contain more than just an image in the future
  const colCells = columns.map(col => col); // each cell is the full column div

  // Compose rows: header row (single cell), then one row with N columns (column cells)
  const rows = [
    headerRow,
    colCells
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}