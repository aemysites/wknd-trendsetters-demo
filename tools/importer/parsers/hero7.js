/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Hero (hero7)'];

  // --- Background Image (row 2) ---
  // Spec: single cell, image element if present
  let bgImgCell = '';
  const img = element.querySelector('img');
  if (img) {
    bgImgCell = img;
  }

  // --- Content: Headline, Subheading, CTA (row 3) ---
  let contentCell = '';
  // Card contains headline, subheading, and CTA buttons
  const card = element.querySelector('.card');
  if (card) {
    // Reference the entire card element to preserve structure and semantics
    contentCell = card;
  } else {
    // Robust fallback: collect any h1-h6, p, and a (if structure changes)
    const nodeList = Array.from(element.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a'));
    if (nodeList.length) {
      contentCell = nodeList;
    }
  }

  const cells = [
    headerRow,
    [bgImgCell],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
