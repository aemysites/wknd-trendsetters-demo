/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main container and content grid
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const mainChildren = Array.from(mainGrid.children);

  // EXTRACT COLUMNS: Find all grids INSIDE the main grid (actual columns rows)
  // Usually, only one is present for these blocks
  const columnsGrid = mainChildren.find(e => (
    e.classList && e.classList.contains('grid-layout') && e !== mainGrid
  ));
  if (!columnsGrid) return;

  // The columnar content is often arranged visually in two columns:
  // Left column: heading, list, button (or avatar, paragraph, etc.)
  // Right column: image, or SVG logo, or quote, etc.

  // 1. LEFT COLUMN content: Try to gather all non-image, non-svg, non-divider (horizontal rule) blocks
  //    before the SVG/logo (if present), or until a clear split in the HTML.
  // 2. RIGHT COLUMN content: Gather images, SVGs, or any other visually-dominant block.
  const colChildren = Array.from(columnsGrid.children).filter(x => x.nodeType === 1);

  let leftColEls = [];
  let rightColEls = [];
  // Simple heuristic: left = non-SVG, non-img, non-divider, right = SVG/logo (or, if present, images)
  for (const child of colChildren) {
    if (
      child.querySelector('svg') ||
      child.querySelector('img') ||
      child.tagName.toLowerCase() === 'img' ||
      (child.classList && child.classList.contains('utility-display-inline-block'))
    ) {
      rightColEls.push(child);
    } else if (child.classList && child.classList.contains('divider')) {
      // ignore divider
    } else {
      leftColEls.push(child);
    }
  }

  // Get heading and paragraph above the columns grid (if they exist)
  const heading = mainChildren.find(e => e.classList && e.classList.contains('h2-heading'));
  const quote = mainChildren.find(e => e.classList && e.classList.contains('paragraph-lg'));
  if (heading) leftColEls.unshift(heading);
  if (quote) leftColEls.push(quote);

  // PREPARE THE HEADER ROW
  const headerRow = ['Columns (columns25)'];
  // PREPARE CONTENT ROW: two columns, left and right, each an array of real DOM nodes
  const contentRow = [leftColEls.filter(Boolean), rightColEls.filter(Boolean)];

  // Build and replace
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  element.replaceWith(block);
}
