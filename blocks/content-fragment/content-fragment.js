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
  block.innerHTML = '';

  block.innerHTML = `
  <div class='banner-content block' data-aue-label="offer content fragment" data-aue-type="reference" data-aue-filter="cf">
		
        <p data-aue-prop="headline" data-aue-label="headline" data-aue-type="text" class='pretitle'>${
          resp?.title
        }</p>
        

      </div>
      <div class='banner-logo'>
      </div>
  </div>
	`;
}
