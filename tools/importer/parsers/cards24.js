/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block
  const headerRow = ['Cards (cards24)'];

  // Each card is a direct <a> child of the main grid div
  const cardEls = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cardEls.map(card => {
    // Left cell: the image (inside a div)
    const imageDiv = card.querySelector('div.utility-aspect-2x3');
    let image = null;
    if (imageDiv) {
      // Use the div containing the image for aspect ratio preservation
      image = imageDiv;
    } else {
      // Fallback: try to use first img if div not found
      const img = card.querySelector('img');
      if (img) image = img;
    }

    // Right cell: text content (tag, date, and title)
    const content = [];
    // Meta info: tag and date
    const metaDiv = card.querySelector('.flex-horizontal');
    if (metaDiv) content.push(metaDiv);
    // Title
    const title = card.querySelector('h3');
    if (title) content.push(title);

    return [image, content];
  });

  // Compose the block table: first row header, subsequent rows as cards
  const cells = [headerRow, ...rows];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
