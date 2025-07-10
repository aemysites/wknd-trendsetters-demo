/* global WebImporter */
export default function parse(element, { document }) {
  // Find top-level grid with cards (could be nested)
  let grid = element.querySelector('.container > .w-layout-grid, .w-layout-grid');
  if (!grid) {
    grid = element.querySelector('.w-layout-grid');
  }
  // Gather all card blocks, including nested ones
  let cardElements = Array.from(grid.querySelectorAll(':scope > .utility-link-content-block, :scope > a.utility-link-content-block'));
  // Add deeper nested (if any)
  grid.querySelectorAll(':scope > .w-layout-grid').forEach(nestedGrid => {
    cardElements = cardElements.concat(Array.from(nestedGrid.querySelectorAll(':scope > .utility-link-content-block, :scope > a.utility-link-content-block')));
  });

  // Helper: get image element (do NOT clone, reference original)
  function getImageEl(card) {
    // Prefer img in aspect container
    const aspect = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    if (aspect) {
      const img = aspect.querySelector('img');
      if (img) return img;
    }
    // fallback: any img
    const fallback = card.querySelector('img');
    if (fallback) return fallback;
    return '';
  }
  // Helper: assemble text content (reference elements)
  function getTextContent(card) {
    const nodes = [];
    // Find heading (h2, h3, h4)
    const heading = card.querySelector('h2, h3, h4');
    if (heading) nodes.push(heading);
    // Paragraph (description)
    const desc = card.querySelector('p');
    if (desc) nodes.push(desc);
    // CTA (button div, a.button, button)
    const cta = card.querySelector('.button, a.button, button');
    if (cta) nodes.push(cta);
    return nodes.length ? nodes : '';
  }

  // Build table rows
  const rows = [['Cards (cards36)']];
  cardElements.forEach(card => {
    const img = getImageEl(card);
    const text = getTextContent(card);
    rows.push([img || '', text || '']);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
