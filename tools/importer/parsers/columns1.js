/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the expected structure
  const container = element.querySelector('.container');
  if (!container) return;
  const grid = container.querySelector('.w-layout-grid');
  if (!grid) return;
  // Identify columns: image and content side
  const columns = Array.from(grid.children);

  // Find the image column (should be img)
  const imgCol = columns.find(el => el.tagName === 'IMG');
  // Find the content column (should be the div with heading, paragraph, buttons)
  const contentCol = columns.find(el => el !== imgCol);

  // Defensive: If one column is missing, fallback to empty cell
  const leftCell = imgCol || '';
  const rightCell = contentCol || '';

  // Table header matches example EXACTLY
  const cells = [
    ['Columns (columns1)'],
    [leftCell, rightCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
