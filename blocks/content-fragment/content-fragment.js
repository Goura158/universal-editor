/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

import {
  decorateMain,
} from '../../scripts/scripts.js';

import {
  loadSections, getMetadata,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  const aemauthorurl = getMetadata('authorurl') || '';
  console.log(path);
  console.log(aemauthorurl);
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    // path = path.replace(/(\.plain)?\.html/, '');
    const path1 = `${aemauthorurl}/graphql/execute.json/universal-editor-standard-site/text`;
    const resp = await fetch(`${path1}`)
      .then((response) => response.json())
      .then((contentfragment) => {
        let offer = '';
        if (contentfragment.data) {
          offer = contentfragment.data[Object.keys(contentfragment.data)[0]].item;
        }
        return offer;
      });
    console.log(resp);
  }
  return null;
}

export default async function decorate(block) {
  const link = block.querySelector('a');
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  const fragment = await loadFragment(path);
  if (fragment) {
    const fragmentSection = fragment.querySelector(':scope .section');
    if (fragmentSection) {
      block.classList.add(...fragmentSection.classList);
      block.classList.remove('section');
      block.replaceChildren(...fragmentSection.childNodes);
    }
  }
}
