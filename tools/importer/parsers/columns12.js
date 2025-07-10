/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get cell content, preserving images and text content
  function getColumnContent(card) {
    // Find the main image in the card
    const img = card.querySelector('img');
    // Check for text overlay/content
    const text = card.querySelector('.utility-padding-all-2rem');
    if (img && text) {
      const frag = document.createDocumentFragment();
      frag.appendChild(img);
      frag.appendChild(text);
      return frag;
    }
    if (img) return img;
    if (text) return text;
    if (card.children.length > 0) {
      const frag = document.createDocumentFragment();
      Array.from(card.children).forEach(child => frag.appendChild(child));
      return frag.childNodes.length ? frag : '';
    }
    return '';
  }

  // Get all immediate children of the grid (columns)
  const columns = Array.from(element.children);
  // Compose content row: each cell is one column
  const contentRow = columns.map(getColumnContent);

  // The header row must be a single cell array
  const tableCells = [
    ['Columns (columns12)'],
    contentRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
