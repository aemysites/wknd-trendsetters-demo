/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing all the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct child columns in the grid
  const columnDivs = Array.from(grid.children);
  if (columnDivs.length === 0) return;

  // For each column, extract the most meaningful content (here: the image inside the inner aspect-ratio div)
  const columns = columnDivs.map(colDiv => {
    // The image is within a nested div inside each colDiv
    const aspectDiv = colDiv.querySelector('.utility-aspect-2x3');
    if (aspectDiv) {
      const img = aspectDiv.querySelector('img');
      if (img) return img;
      // Fallback if no image is found
      return aspectDiv;
    }
    // Fallback if the structure is unusual
    const img = colDiv.querySelector('img');
    if (img) return img;
    return colDiv;
  });

  // Build the column block as per the example: header row is a single cell, content row has a cell for each column
  const cells = [
    ['Columns (columns30)'],
    columns
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}