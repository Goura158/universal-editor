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

export async function updateContentFragment(cfPath, updatedData) {
  try {
    const response = await fetch(`${cfPath}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json();
    console.log('Content fragment updated:', responseData);
  } catch (error) {
    console.error('Error updating content fragment:', error);
  }
}

/**
 *
 * @param {Element} block
 */
export default async function decorate(block) {
  //console.log('block ', block);
  block.innerHTML = '';
  const link = block.querySelector('a');
  console.log('link ', link);
  const path = link ? link.getAttribute('href') : block.textContent.trim();
  console.log('cf path ', path);
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
        console.log('CF data ', contentfragment.data.textList.items[0]);
        offer = contentfragment.data.textList.items[0].title;
        // const headline = offer.data.textList.items[0].title;
        // console.log('offer ', headline);
      }
      return offer;
    });
  console.log('cfReq ', cfReq);
  console.log('path ', path);
  const fragment = await updateContentFragment(path, cfReq);
  console.log('fragment path ', fragment);
  block.setAttribute('data-aue-type', 'container');
  block.innerHTML = `
  <div class='banner-content block' data-aue-label="offer content fragment" data-aue-type="reference" data-aue-filter="cf">
    <p data-aue-prop="pretitle" data-aue-label="pretitle" data-aue-type="text" class='pretitle'>${cfReq}</p>
  </div>`;
  // const path = link ? link.getAttribute('href') : block.textContent.trim();
  // const cftext = document.createElement('div');
  // while (cfReq.title) cftext.append(cfReq.title);
  // block.append(cftext);
}
