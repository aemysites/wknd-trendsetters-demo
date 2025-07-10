/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards20)'];

  // The card structure: .card-body > .h4-heading (title) + img (image)
  // Get the first .card-body (should only be one card in this block)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // If no card, nothing to do
    return;
  }

  // Find the image in the card
  const img = cardBody.querySelector('img');

  // First cell: must be image or icon (mandatory)
  const imageCell = img;

  // Second cell: text content (mandatory)
  // - Title (optional) as heading
  // - Description (optional), below heading
  // There is no CTA in this block.
  const textContent = [];
  // Title
  const heading = cardBody.querySelector('.h4-heading');
  if (heading) {
    // Use the heading element as-is to preserve semantics
    textContent.push(heading);
  }
  // Description: text after heading (if any)
  // In this HTML, there isn't any, but we should check for robustness
  let descriptionNodes = [];
  if (heading) {
    let next = heading.nextSibling;
    while (next) {
      if (next === img) break;
      if (next.nodeType === Node.TEXT_NODE && next.textContent.trim()) {
        const descDiv = document.createElement('div');
        descDiv.textContent = next.textContent.trim();
        descriptionNodes.push(descDiv);
      } else if (next.nodeType === Node.ELEMENT_NODE && next !== img) {
        descriptionNodes.push(next);
      }
      next = next.nextSibling;
    }
  }
  if (descriptionNodes.length > 0) {
    textContent.push(...descriptionNodes);
  }

  // If title is missing, fallback to any text content in cardBody
  if (!heading && cardBody.textContent.trim()) {
    const fallbackDiv = document.createElement('div');
    fallbackDiv.textContent = cardBody.textContent.trim();
    textContent.push(fallbackDiv);
  }

  const dataRow = [imageCell, textContent];

  const cells = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
