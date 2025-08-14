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
// const GRAPHQL_BASE = 'https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text';
async function getContentFragmentData() {
  // const CFGraphqlUrl = `${GRAPHQL_BASE}${fragmentPath}`;
  const CFGraphqlUrl = 'https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text';
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
  const CFUuidurl = `${AEM_HOST}/adobe/sites/cf/fragments/${uuid}`;
  console.log(' CFUuidurl ', CFUuidurl);
  const resp = await fetch(CFUuidurl, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (!resp.ok) throw new Error(`Failed to fetch CF: ${resp.status}`);
  const etag = resp.headers.get('Etag');
  console.log('etag ', etag);
  const result = await resp.json();
  console.log('result1 ', result);
  // const data = await resp.json();
  // const etag = result['repo:Etag'];
  // const etag = resp.getResponseHeader('Etag');
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
/**
 * Update CF attributes using UUID + ETag via Assets API
 */
/*
async function updateCF(uuid, etag, updatedElements) {
  console.log('uuid ', uuid);
  console.log('etag ', etag);
  console.log('updatedElements ', updatedElements);
  const updateUrl = `${AEM_HOST}/adobe/sites/cf/fragments/${uuid}`;
  console.log('updateUrl ', updateUrl);
  // const payload = { elements: updatedElements };
  // console.log('payload ', updatedElements);
  const bearerToken = '';
  console.log('bearerToken ', bearerToken);
  const resp = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: bearerToken,
      'If-Match': etag,
    },
    body: JSON.stringify(updatedElements),
  });
  console.log('resp for CF update ', resp.json);

  if (!resp.ok) {
    throw new Error(`Failed to update CF: ${resp.status}`);
  }
  const output = await resp.json();
  // return updatedMeta['repo:etag']; // Return new ETag for subsequent updates
  console.log('output ', output);
  return output;
}
*/
/*
async function updateContentFragment(fragmentPath, textValue) {
  const url = `${AEM_HOST}/adobe/sites/cf${fragmentPath}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      elements: {
        text: { value: textValue },
      },
    }),
  });
  if (!resp.ok) throw new Error(`Failed to update CF: ${resp.status}`);
  return resp.json();
}
*/
export default async function decorate(block) {
  console.log('block ', block);

  const obj = {
    title: 'TRP Text',
    fields: [
      {
        name: 'title',
        type: 'text',
        values: [
          'Better questions. Better insights. In all markets',
        ],
      },
    ],
  };

  console.log('existing obj ', obj);
  // const { fragmentPath } = block.dataset;
  const link = block.querySelector('a');
  console.log('link in content fragment ', link);
  // const fragmentPath = link ? link.getAttribute('href') : block.textContent.trim();
  // const cleanedFragmentPath = fragmentPath.replace(/\.html$|\.htm$/i, '');
  const cleanedFragmentPath = '/content/dam/universal-editor-standard-site/cf/trp-text/jcr:content/data/master';
  console.log('path in content fragment ', cleanedFragmentPath);

  const FullCFPath = 'urn:aemconnection:$cleanedFragmentPath';
  console.log('FullCFPath in content fragment ', FullCFPath);
  if (!cleanedFragmentPath) {
    block.innerHTML = '<p>Please select a content fragment in the editor.</p>';
    return;
  }
  try {
    const cfData = await getContentFragmentData();
    console.log('cfData of content fragment ', cfData);
    const { data: { textByPath: { item: { _id } } } } = cfData;
    // const id = '435ff07d-2f03-4f36-8f97-f9227aec2c73';
    console.log('ID of content fragment ', _id);
    const id = _id;
    const { data: { textByPath: { item: { title } } } } = cfData;
    console.log('title of content fragment ', title);
    const cfetag = await fetchCFETag(id);
    console.log('cfetag of content fragment ', cfetag);
    // const textVal = cfData.elements?.text?.value || '';
    // console.log('textVal of content fragment ', textVal);
    // Render inline editable text area bound to CF
    block.setAttribute('data-aue-type', 'container');
    // Render inline editable text area bound to CF
    block.innerHTML = `
      <div class="cf-text-block" data-aue-resource="${cleanedFragmentPath}" data-aue-type="content-fragment">
        <div 
          class="editable-text" 
          data-aue-prop="elements.text.value" 
          data-aue-label="Text"
          data-aue-type="text">
          ${title}
        </div>
      </div>
    `;
  } catch (err) {
    block.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
}
