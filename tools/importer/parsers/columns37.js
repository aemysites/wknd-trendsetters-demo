/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Grab all direct child divs (each is a column)
  const columnDivs = element.querySelectorAll(':scope > div');

  // 2. For each column, reference its main content. If only an image child, return the image; else, use the div.
  const columns = Array.from(columnDivs).map(col => {
    if (
      col.children.length === 1 &&
      col.firstElementChild &&
      col.firstElementChild.tagName === 'IMG'
    ) {
      return col.firstElementChild;
    }
    // fallback: use all children in an array if not just an image
    return Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim() !== ''));
  });

  // Edge case: If any column resolves to an empty array, replace with empty string for table integrity
  const normalizedColumns = columns.map(col => {
    if (Array.isArray(col)) {
      if (col.length === 0) return '';
      return col;
    }
    return col || '';
  });

  // 3. Build the table rows following the exact component header
  const tableRows = [
    ['Columns (columns37)'],
    normalizedColumns
  ];

  // 4. Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // 5. Replace the original element with the block
  element.replaceWith(block);
}
