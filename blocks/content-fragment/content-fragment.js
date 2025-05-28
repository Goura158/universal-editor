/*
 * Fragment Block
 * Include content on a page as a fragment.
 * https://www.aem.live/developer/block-collection/fragment
 */

/**
* import {
* decorateMain,
* } from '../../scripts/scripts.js';
*/
import {
  getMetadata,
} from '../../scripts/aem.js';

/**
 * Loads a fragment.
 * @param {string} path The path to the fragment
 * @returns {HTMLElement} The root element of the fragment
 */
export async function loadFragment(path) {
  const aemauthorurl = getMetadata('authorurl') || '';
  if (path && path.startsWith('/')) {
    // eslint-disable-next-line no-param-reassign
    // path = path.replace(/(\.plain)?\.html/, '');
    const cfapipath = `${aemauthorurl}/graphql/execute.json/universal-editor-standard-site/text`;
    const resp = await fetch(`${cfapipath}`)
      .then((response) => response.json())
      .then((contentfragment) => {
        let textcf = '';
        if (contentfragment.data) {
          textcf = contentfragment.data[Object.keys(contentfragment.data)[0]].item;
        }
        return textcf;
      });
    console.log(resp);
  }
  return null;
}

export default async function decorate(block) {
	const graphqlpath = `https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text`;
	const graphqlpathresult = await loadFragment(`graphqlpath`);
	// console.log(graphqlpathresult);
	// const path = link ? link.getAttribute('href') : block.textContent.trim();
	// const cftext = document.createElement('div');
  // while (fragment.title) cftext.append(fragment.title);
  // block.append(cftext);
}
