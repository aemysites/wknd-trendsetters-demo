/* global WebImporter */
export default function parse(element, { document }) {
  // Block name and variant
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Find all tab panels (each contains cards)
  const panes = element.querySelectorAll(':scope > div');
  panes.forEach((pane) => {
    const grid = pane.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each card is an <a> inside the grid
    const cards = grid.querySelectorAll(':scope > a');
    cards.forEach((card) => {
      // Find the image for the card, if any
      let imageCell;
      const imageDiv = card.querySelector('div[class*="utility-aspect-3x2"]');
      if (imageDiv && imageDiv.querySelector('img')) {
        imageCell = imageDiv.querySelector('img');
      } else {
        // If no image, create an empty span for layout consistency
        imageCell = document.createElement('span');
      }
      // Find heading (h3, h4, h2, h1 in order)
      let heading = card.querySelector('h3, h4, h2, h1');
      // Find description (paragraph-sm)
      let desc = card.querySelector('.paragraph-sm');

      // Compose the text content cell (referencing existing elements only)
      const textContent = [];
      if (heading) textContent.push(heading);
      if (desc) textContent.push(desc);
      // If no heading or description, add an empty span
      if (!heading && !desc) textContent.push(document.createElement('span'));

      rows.push([imageCell, textContent]);
    });
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
