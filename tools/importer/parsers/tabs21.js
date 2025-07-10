/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Extract tab labels
  const tabMenu = element.querySelector('[role="tablist"], .w-tab-menu');
  const tabLinks = tabMenu ? Array.from(tabMenu.querySelectorAll('[role="tab"], .w-tab-link')) : [];
  const labels = tabLinks.map(link => {
    // Most likely labels are in a div inside the link
    const labelDiv = link.querySelector('div');
    return labelDiv ? labelDiv.textContent.trim() : link.textContent.trim();
  });

  // 2. Extract tab panes
  const tabContent = element.querySelector('.w-tab-content');
  const tabPanes = tabContent ? Array.from(tabContent.querySelectorAll('.w-tab-pane')) : [];

  // 3. Compose rows: each a [label, content] array
  const rows = labels.map((label, idx) => {
    const pane = tabPanes[idx];
    let contentCell = '';
    if (pane) {
      // Prefer the main content container inside the pane, otherwise use the pane itself
      const mainContent = pane.querySelector(':scope > div') || pane;
      contentCell = mainContent;
    }
    return [label, contentCell];
  });

  // 4. Build table data: first row is a header spanning both columns, then the tab rows
  const numCols = 2;
  // Header row: single cell, remains as array of one item per requirements
  const cells = [['Tabs']];
  // Add the rows as-is
  rows.forEach(r => cells.push(r));

  // 5. Create table and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
