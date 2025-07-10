/* global WebImporter */
export default function parse(element, { document }) {
  // Each .divider in the parent element is a table row with two columns: question and answer
  const rows = [];
  const dividers = element.querySelectorAll(':scope > .divider');
  dividers.forEach(divider => {
    // Within each .divider is a grid with two children: heading (question) and rich-text (answer)
    const grid = divider.querySelector('.w-layout-grid');
    if (grid) {
      // Find first child with class 'h4-heading' (the question)
      const question = grid.querySelector('.h4-heading');
      // Find first child with class 'rich-text' (the answer)
      const answer = grid.querySelector('.rich-text');
      // Only add the row if at least one cell is present
      if (question || answer) {
        rows.push([question || '', answer || '']);
      }
    }
  });

  // Calculate the max number of columns for the content rows
  let maxColumns = 0;
  rows.forEach(row => {
    if (row.length > maxColumns) maxColumns = row.length;
  });
  if (maxColumns < 1) maxColumns = 1;

  // Create a header row with a single cell spanning all columns
  const headerCell = document.createElement('th');
  headerCell.textContent = 'Table (no header)';
  if (maxColumns > 1) headerCell.colSpan = maxColumns;
  const headerRow = [headerCell];

  // Compose the table data
  const cells = [headerRow, ...rows];

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
