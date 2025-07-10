/* global WebImporter */
export default function parse(element, { document }) {
  // Get the grid with columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The table must have a single header cell spanning all columns
  // So, first row = [ 'Columns (columns14)' ]
  // Content row = one cell per column
  const cells = [
    ['Columns (columns14)'],
    columns.map(col => col)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
