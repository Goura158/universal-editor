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
  block.innerHTML = '';
  const aemauthorurl = getMetadata('authorurl') || '';
  console.log('author url ', aemauthorurl);
  const persistedquery = '/graphql/execute.json/universal-editor-standard-site/text';
  const graphqlpath = `${aemauthorurl}${persistedquery}`;
  console.log('before content load');
  console.log(graphqlpath);
  console.log('graphql path load');
  // console.log(graphqlpath);
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
  block.setAttribute('data-aue-type', 'container');
  block.innerHTML = `
  <div class='banner-content block' data-aue-label="offer content fragment" data-aue-type="reference" data-aue-filter="cf">
    <p data-aue-prop="pretitle" data-aue-label="pretitle" data-aue-type="text" class='pretitle'>Today's Headline</p>
  </div>`;
  // const path = link ? link.getAttribute('href') : block.textContent.trim();
  // const cftext = document.createElement('div');
  // while (cfReq.title) cftext.append(cfReq.title);
  // block.append(cftext);
}
