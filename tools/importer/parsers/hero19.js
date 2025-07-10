/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero19)'];

  // 1. Background images: extract all images from the hero image grid (if present)
  let bgDiv = null;
  const grid = element.querySelector('.grid-layout.desktop-3-column');
  if (grid) {
    const gridImages = Array.from(grid.querySelectorAll('img'));
    if (gridImages.length > 0) {
      bgDiv = document.createElement('div');
      gridImages.forEach(img => {
        bgDiv.appendChild(img);
      });
    } else {
      // fallback: empty div if no images (should not happen with this structure)
      bgDiv = document.createElement('div');
    }
  } else {
    // fallback: empty div if grid not found
    bgDiv = document.createElement('div');
  }

  // 2. Hero text/content (h1, subheading, and button group)
  // Find the content section
  const contentSection = element.querySelector('.ix-hero-scale-3x-to-1x-content');
  const contentNodes = [];
  if (contentSection) {
    // Headline
    const h1 = contentSection.querySelector('h1');
    if (h1) contentNodes.push(h1);
    // Subheading
    const p = contentSection.querySelector('p');
    if (p) contentNodes.push(p);
    // Button group (for CTAs)
    const btns = contentSection.querySelector('.button-group');
    if (btns) contentNodes.push(btns);
  }

  // Content cell: always provide an array, but fallback to empty div if nothing found
  const contentCell = contentNodes.length ? contentNodes : [document.createElement('div')];

  // Compose table
  const cells = [
    headerRow,
    [bgDiv],
    [contentCell]
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
