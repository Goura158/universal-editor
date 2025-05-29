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
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  const aemauthorurl = getMetadata('authorurl') || '';
  const persistedquery = '/graphql/execute.json/universal-editor-standard-site/text';
  const graphqlpath = `${aemauthorurl}${persistedquery}`;
  const cfReq = await fetch(graphqlpath)
			.then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        offer = contentfragment.data[Object.keys(contentfragment.data)[0]].item;
      }
      return offer;
    });
  console.log(cfReq);
  // const path = link ? link.getAttribute('href') : block.textContent.trim();
  // const cftext = document.createElement('div');
  // while (cfReq.title) cftext.append(cfReq.title);
  // block.append(cftext);
}
