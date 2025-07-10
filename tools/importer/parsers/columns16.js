/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one single cell only
  const headerRow = ['Columns (columns16)'];

  // Find the main text/image grid (first grid, two columns)
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let leftCol = null, rightCol = null;
  if (mainGrid && mainGrid.children.length >= 2) {
    leftCol = mainGrid.children[0];
    rightCol = mainGrid.children[1];
  } else {
    leftCol = document.createElement('div');
    rightCol = document.createElement('div');
  }
  const contentRow1 = [leftCol, rightCol];

  // Second grid of two images
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let img1 = null, img2 = null;
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll(':scope > div');
    img1 = imgDivs[0] || document.createElement('div');
    img2 = imgDivs[1] || document.createElement('div');
  } else {
    img1 = document.createElement('div');
    img2 = document.createElement('div');
  }
  const contentRow2 = [img1, img2];

  // The block: header row (single column), then two rows (each with two columns)
  const cells = [
    headerRow,
    contentRow1,
    contentRow2
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
