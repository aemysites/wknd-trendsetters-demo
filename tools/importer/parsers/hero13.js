/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name
  const headerRow = ['Hero (hero13)'];

  // 2. Background Image (optional)
  let bgImg = null;
  // The background image is inside .ix-parallax-scale-out-hero img
  const imgDiv = element.querySelector('.ix-parallax-scale-out-hero');
  if (imgDiv) {
    const img = imgDiv.querySelector('img');
    if (img) bgImg = img;
  }

  // 3. Heading, subheading, CTA (content)
  // This is inside the second grid cell (main text)
  let contentCell = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    const gridChildren = grid.querySelectorAll(':scope > div');
    if (gridChildren.length > 1) {
      // The text content is in the second cell
      const contentDiv = gridChildren[1];
      // Get the main container for text (usually .utility-margin-bottom-6rem)
      const marginDiv = contentDiv.querySelector('.utility-margin-bottom-6rem');
      if (marginDiv) {
        contentCell = marginDiv;
      } else {
        // Fallback: use contentDiv directly if inner wrapper is missing
        contentCell = contentDiv;
      }
    }
  }

  // If nothing found, fallback to empty for robustness
  const rows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell ? contentCell : '']
  ];

  // 4. Create block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
