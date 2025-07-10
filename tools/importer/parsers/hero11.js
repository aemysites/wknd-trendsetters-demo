/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row as per spec
  const headerRow = ['Hero (hero11)'];

  // Find the first image (background image)
  const img = element.querySelector('img');
  // If for some reason there is no image, fall back to an empty cell
  const imageRow = [img || ''];

  // There are no headlines, subheading or CTA in this HTML, so content row is empty
  const contentRow = [''];

  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  
  // Create the block table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}