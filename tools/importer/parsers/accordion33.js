/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const cells = [
    ['Accordion']
  ];
  // Select all direct child accordions
  const accordionItems = Array.from(element.querySelectorAll(':scope > .w-dropdown'));
  accordionItems.forEach((item) => {
    // Title cell: get .w-dropdown-toggle .paragraph-lg (or fallback for empty)
    let title = null;
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      title = toggle.querySelector('.paragraph-lg');
      if (!title) {
        // fallback to all toggle text
        title = document.createElement('div');
        title.textContent = toggle.textContent.trim();
      }
    } else {
      // fallback empty
      title = document.createElement('div');
      title.textContent = '';
    }
    // Content cell: get nav.accordion-content (usually contains .w-richtext)
    let content = null;
    const nav = item.querySelector('nav.accordion-content');
    if (nav) {
      // Prefer .w-richtext or .rich-text inside nav
      const rich = nav.querySelector('.w-richtext, .rich-text');
      content = rich || nav;
    } else {
      // fallback empty
      content = document.createElement('div');
      content.textContent = '';
    }
    cells.push([
      title,
      content
    ]);
  });
  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
