/* global WebImporter */
export default function parse(element, { document }) {
  // Critical review: 
  // - The table header must exactly match: 'Columns (columns18)'.
  // - The structure is a single table: header row, then a row with as many columns as the source block has
  // - Each column should reference the existing child element as a cell
  // - No markdown, no hardcoded values, no extra blocks, no hr or section metadata needed

  // Header row matches exactly
  const headerRow = ['Columns (columns18)'];

  // Get all immediate direct children
  const columnEls = Array.from(element.querySelectorAll(':scope > div'));

  // Edge case: if there are zero columns, create a single empty cell
  const contentRow = columnEls.length > 0 ? columnEls : [''];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);
  element.replaceWith(table);
}
