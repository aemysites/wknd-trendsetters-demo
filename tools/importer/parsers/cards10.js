/* global WebImporter */
export default function parse(element, { document }) {
  // Table header (block name)
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Select each card in the grid
  const cards = element.querySelectorAll(':scope > a.card-link');

  cards.forEach(card => {
    // First column: card image
    let img = '';
    const imgWrapper = card.querySelector('.utility-aspect-3x2');
    if (imgWrapper) {
      const possibleImg = imgWrapper.querySelector('img');
      if (possibleImg) {
        img = possibleImg;
      }
    }

    // Second column: tags, heading, and description
    const textContainer = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];
    if (textContainer) {
      // Tag (optional, keep as is for resilience)
      const tagGroup = textContainer.querySelector('.tag-group');
      if (tagGroup) cellContent.push(tagGroup);
      // Heading (should be h3 or .h4-heading)
      const heading = textContainer.querySelector('h3, .h4-heading');
      if (heading) cellContent.push(heading);
      // Description/paragraph
      const desc = textContainer.querySelector('p');
      if (desc) cellContent.push(desc);
    }
    rows.push([img, cellContent]);
  });

  // Build and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
