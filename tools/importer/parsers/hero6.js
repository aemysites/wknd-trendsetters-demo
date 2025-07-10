/* global WebImporter */
export default function parse(element, { document }) {
  // Get immediate children of the main grid (should be 2: one with background, one with content)
  const grid = element.querySelector(':scope > .w-layout-grid');
  if (!grid) return;
  const gridDivs = Array.from(grid.children);

  // 1. Header row with block name
  const headerRow = ['Hero (hero6)'];

  // 2. Background Image row: look for img.cover-image.utility-position-absolute
  let backgroundImg = null;
  for (const div of gridDivs) {
    const img = div.querySelector('img.cover-image.utility-position-absolute');
    if (img) {
      backgroundImg = img;
      break;
    }
  }
  const imageRow = [backgroundImg ? backgroundImg : ''];

  // 3. Content row: look for the container with .card
  let contentBlock = null;
  for (const div of gridDivs) {
    if (div.querySelector('.card')) {
      contentBlock = div;
      break;
    }
  }
  const contentRow = [contentBlock ? contentBlock : ''];

  // Only build table if at least one content is present (header always present)
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
