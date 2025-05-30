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

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  block.innerHTML = '';
  const aemauthorurl = 'https://author-p14733-e1160558.adobeaemcloud.com';
  console.log('author url ', aemauthorurl);
  const persistedquery = '/graphql/execute.json/universal-editor-standard-site/text';
  const graphqlpath = `${aemauthorurl}${persistedquery}`;
  console.log(graphqlpath);
  const cfReq = await fetch(graphqlpath)
    .then((response) => response.json())
    .then((contentfragment) => {
      let offer = '';
      if (contentfragment.data) {
        console.log('CF data ', contentfragment.data.textList.items[0].title);
        offer = contentfragment.data.textList.items[0].title;
        // const headline = offer.data.textList.items[0].title;
        // console.log('offer ', headline);
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
