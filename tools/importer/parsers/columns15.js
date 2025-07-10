/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the main columns content
  const grid = element.querySelector('.w-layout-grid.grid-layout');

  // Defensive: fallback to all children if not found
  let col1Content = null, col2Content = null;
  if (grid) {
    // Find all direct children of the grid
    const children = Array.from(grid.children);
    // Assume only two columns: left is non-image, right is image (robust for most variations)
    // If there are multiple divs (e.g., for left content), combine them
    let nonImgNodes = children.filter((el) => el.tagName !== 'IMG');
    let imgNodes = children.filter((el) => el.tagName === 'IMG');

    // Build left column
    if (nonImgNodes.length === 1) {
      col1Content = nonImgNodes[0];
    } else if (nonImgNodes.length > 1) {
      // Wrap multiple nodes in a div
      const leftDiv = document.createElement('div');
      nonImgNodes.forEach(n => leftDiv.appendChild(n));
      col1Content = leftDiv;
    }
    // Build right column
    if (imgNodes.length === 1) {
      col2Content = imgNodes[0];
    } else if (imgNodes.length > 1) {
      const rightDiv = document.createElement('div');
      imgNodes.forEach(n => rightDiv.appendChild(n));
      col2Content = rightDiv;
    }
  } else {
    // Fallback: use first and second child if present
    const kids = Array.from(element.children);
    col1Content = kids[0] || '';
    col2Content = kids[1] || '';
  }

  // If for any reason a column is not found, put an empty string to avoid empty cell errors
  if (!col1Content) col1Content = '';
  if (!col2Content) col2Content = '';

  // Build header row (must match example exactly: single cell)
  const headerRow = ['Columns (columns15)'];
  // Build table rows
  const row1 = [col1Content, col2Content];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
  ], document);

  // Replace original element in-place
  element.replaceWith(table);
}
