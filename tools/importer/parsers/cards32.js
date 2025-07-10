/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Set up table with header as per block name
  const rows = [['Cards (cards32)']];

  // 2. Find all direct <a> children (each card is an <a>)
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  cards.forEach(card => {
    // a. Card image: the first <img> in the card
    const img = card.querySelector('img');

    // b. Card text cell: wrap all the meaningful text content
    // Find the main content <div> (contains meta, h3, p, and "Read")
    // In the card, it's always the div that's NOT .w-layout-grid and not an ancestor of the img
    // But, safest: find all <div>s, pick the one with an h3 (title)
    let textDiv = null;
    const divs = Array.from(card.querySelectorAll('div'));
    for (const div of divs) {
      if (div.querySelector('h3')) {
        textDiv = div;
        break;
      }
    }
    // Fallback: try the last div
    if (!textDiv && divs.length) textDiv = divs[divs.length - 1];

    // Compose the text content
    const textContent = document.createElement('div');
    // Add meta (tag + min read), if present
    if (textDiv) {
      const meta = textDiv.querySelector('.flex-horizontal');
      if (meta) textContent.appendChild(meta);
      // Add heading
      const heading = textDiv.querySelector('h3');
      if (heading) textContent.appendChild(heading);
      // Add description paragraph
      const para = textDiv.querySelector('p');
      if (para) textContent.appendChild(para);
      // Add CTA (Read), if present
      // In this markup, it's a div with textContent 'Read' (case-insensitive)
      const cta = Array.from(textDiv.querySelectorAll('div'))
        .find(d => d.textContent && d.textContent.trim().toLowerCase() === 'read');
      if (cta) textContent.appendChild(cta);
    }
    // Add the row (image in first col, text content in second)
    rows.push([img, textContent]);
  });

  // 3. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
