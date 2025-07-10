/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header exactly as required
  const headerRow = ['Cards (cards8)'];

  // 2. Get all card containers (each contains only image)
  const cards = element.querySelectorAll(':scope > div');

  // 3. Build each row: image in first cell, second cell empty (no text in src HTML)
  const rows = Array.from(cards).map(card => {
    // Get the image element directly
    const img = card.querySelector('img');
    return [img, ''];
  });

  // 4. Assemble table data
  const table = [headerRow, ...rows];

  // 5. Create block
  const block = WebImporter.DOMUtils.createTable(table, document);
  
  // 6. Replace original element
  element.replaceWith(block);
}
