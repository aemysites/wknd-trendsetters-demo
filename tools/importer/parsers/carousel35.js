/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel block requires: Header row, each slide (image + text for first, image only for others)

  // 1. Locate the relevant container grids
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;
  const gridColumns = mainGrid.querySelectorAll(':scope > div');
  if (gridColumns.length < 2) return;

  // Left column: text content
  const textCol = gridColumns[0];
  // Right column: image grid (contains all slides' images)
  let imagesGrid = null;
  const subGrids = gridColumns[1].querySelectorAll('.w-layout-grid');
  // Find grid with >1 img
  for (const g of subGrids) {
    if (g.querySelectorAll('img').length > 1) {
      imagesGrid = g;
      break;
    }
  }
  if (!imagesGrid) return;

  // Extract text content for first slide
  const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
  const description = textCol.querySelector('p');
  const buttons = textCol.querySelector('.button-group');
  const textCell = [];
  if (heading) textCell.push(heading);
  if (description) textCell.push(description);
  if (buttons) textCell.push(buttons);

  // Extract images for slides
  const imageEls = imagesGrid.querySelectorAll('img');

  // Build rows for the block table
  const rows = [['Carousel']];
  imageEls.forEach((img, idx) => {
    if (idx === 0) {
      // First slide: image, plus text content
      rows.push([img, textCell]);
    } else {
      // Other slides: image only, empty second cell
      rows.push([img, '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the element
  element.replaceWith(block);
}
