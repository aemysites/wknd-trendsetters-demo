/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero38)'];

  // Get direct grid children
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');

  // --- Background image cell ---
  let bgImg = '';
  if (gridDivs.length > 0) {
    const img = gridDivs[0].querySelector('img');
    if (img) bgImg = img;
  }

  // --- Text block cell ---
  let textBlock = '';
  if (gridDivs.length > 1) {
    // Try to get grid or fallback to container div
    let textGrid = gridDivs[1].querySelector('.w-layout-grid');
    if (textGrid) {
      textBlock = textGrid;
    } else {
      textBlock = gridDivs[1];
    }
  }

  // Compose table
  const rows = [
    headerRow,
    [bgImg],
    [textBlock]
  ];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
