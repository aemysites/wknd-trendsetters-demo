/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid that contains the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (these are the columns)
  const gridChildren = Array.from(grid.children);

  // Find the text/info column - usually first
  let infoCol = null;
  // Find the ul with contacts
  let contactsCol = null;
  // Find the image
  let imageCol = null;

  // Look for elements by their distinguishing features
  gridChildren.forEach(child => {
    if (!infoCol && (child.querySelector('h2') || child.querySelector('h3') || child.querySelector('p'))) {
      infoCol = child;
    } else if (!contactsCol && (child.tagName === 'UL' || child.querySelector('ul'))) {
      contactsCol = child;
    } else if (!imageCol && (child.tagName === 'IMG' || child.querySelector('img'))) {
      imageCol = child;
    }
  });

  // Fallback: search grid for image if not found
  if (!imageCol) {
    const img = grid.querySelector('img');
    if (img) imageCol = img;
  }

  // Compose left cell: infoCol + contactsCol
  const leftCell = document.createElement('div');
  if (infoCol) leftCell.appendChild(infoCol);
  if (contactsCol) leftCell.appendChild(contactsCol);

  // Right cell: imageCol (may be an IMG or a container holding it)
  let rightCell = null;
  if (imageCol) {
    if (imageCol.tagName === 'IMG') {
      rightCell = imageCol;
    } else if (imageCol.querySelector && imageCol.querySelector('img')) {
      rightCell = imageCol.querySelector('img');
    } else {
      rightCell = imageCol;
    }
  }

  // Build the header row with a single cell (spanning both columns)
  const headerRow = [document.createElement('span')];
  headerRow[0].textContent = 'Columns (columns17)';

  // The createTable helper will not do colspan automatically, so we must patch the table after creation
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftCell, rightCell]
  ], document);

  // Patch the header row to have colspan=2 if more than one column in the second row
  const headerTh = table.querySelector('th');
  if (headerTh && table.rows[1] && table.rows[1].cells.length > 1) {
    headerTh.setAttribute('colspan', table.rows[1].cells.length);
  }
  // Remove any extra th's in the header row (should only be one)
  while (headerTh && headerTh.nextSibling) {
    headerTh.parentNode.removeChild(headerTh.nextSibling);
  }

  element.replaceWith(table);
}
