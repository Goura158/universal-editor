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
const AEM_HOST = 'https://author-p14733-e1160558.adobeaemcloud.com';
const GRAPHQL_BASE = 'https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text%3Bpath=';
async function getContentFragmentData(fragmentPath) {
  const CFGraphqlUrl = `${GRAPHQL_BASE}${fragmentPath}`;
  console.log(' CFGraphqlUrl ', CFGraphqlUrl);
  const resp = await fetch(CFGraphqlUrl, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Failed to fetch CF: ${resp.status}`);
  const result = await resp.json();
  console.log('result ', result);
  // const etag = resp.header.get('etag') || resp.header.get('ETAG');
  return result;
}
async function fetchCFETag(uuid) {
  // const CFGraphqlUrl = `${GRAPHQL_BASE}${fragmentPath}`;
  const CFUuidurl = `${AEM_HOST}/adobe/sites/cf/fragments/${uuid}`;
  console.log(' CFUuidurl ', CFUuidurl);
  const resp = await fetch(CFUuidurl, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Failed to fetch CF: ${resp.status}`);
  const result = await resp.json();
  console.log('result1 ', result);
  // const data = await resp.json();
  // const etag = result['repo:Etag'];
  const etag = result.headers.get('Etag');
  // const etag = resp.getResponseHeader('Etag');
  console.log('etag1 ', etag);
  return etag;
}
/*
async function getContentFragment(fragmentPath) {
  const url = `${AEM_HOST}/adobe/sites/cf${fragmentPath}`;
  console.log('url ', url);
  const resp = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Failed to fetch CF: ${resp.status}`);
  console.log('resp.json ', resp.json);
  return resp.json();
}
*/
export default async function decorate(block) {
  console.log('block ', block);
  // const { fragmentPath } = block.dataset;
  const link = block.querySelector('a');
  console.log('link in content fragment ', link);
  const fragmentPath = link ? link.getAttribute('href') : block.textContent.trim();
  const cleanedFragmentPath = fragmentPath.replace(/\.html$|\.htm$/i, '');
  console.log('path in content fragment ', cleanedFragmentPath);
  if (!fragmentPath) {
    block.innerHTML = '<p>Please select a content fragment in the editor.</p>';
    return;
  }
  try {
    const cfData = await getContentFragmentData(cleanedFragmentPath);
    console.log('cfData of content fragment ', cfData);
    const { data: { textByPath: { item: { _id } } } } = cfData;
    console.log('ID of content fragment ', _id);
    const { data: { textByPath: { item: { title } } } } = cfData;
    console.log('title of content fragment ', title);
    const cfetag = await fetchCFETag(_id);
    console.log('cfetag of content fragment ', cfetag);
    // const textVal = cfData.elements?.text?.value || '';
    // console.log('textVal of content fragment ', textVal);
    // Render inline editable text area bound to CF
    block.setAttribute('data-aue-type', 'container');
    block.innerHTML = `
    <div class='banner-content block' data-aue-label="offer content fragment" data-aue-type="reference" data-aue-filter="cf">
      <p data-aue-prop="pretitle" data-aue-label="pretitle" data-aue-type="text" class='pretitle'>${title}</p>
    </div>`; 
  } catch (err) {
    block.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
}
