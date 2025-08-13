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
const GRAPHQL_BASE = 'https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text';
async function getContentFragmentData(fragmentPath) {
  const CFGraphqlUrl = `${GRAPHQL_BASE}${fragmentPath}`;
  // const CFGraphqlUrl = 'https://author-p14733-e1160558.adobeaemcloud.com/graphql/execute.json/universal-editor-standard-site/text';
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
async function updateCF(uuid, etag, updatedElements) {
  const updateUrl = `${AEM_HOST}/adobe/sites/cf/fragments/${uuid}`;
  console.log('updateUrl ', updateUrl);
  const payload = { elements: updatedElements };
  console.log('payload ', payload);

  const resp = await fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3NTUwOTA4NjI2NTNfMTgyZDFhZmItMmM2Yy00YTUyLTkwNjktMTdiYTY4YTVmNzY2X3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJleGNfYXBwIiwidXNlcl9pZCI6IjJGRjMyQTJFNjQzNUEyOTcwQTQ5NUZBRUAwZWZiMjlmMjY0MjRhZGZjNDk1Y2Q4LmUiLCJzdGF0ZSI6IntcInNlc3Npb25cIjpcImh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbS9pbXMvc2Vzc2lvbi92MS9ZV1JoWVdJd1ptSXRNRGRtTnkwME1tSm1MVGhtTmpRdE1EQTBaVEUyTWpobU9UZzVMUzB5UmtZek1rRXlSVFkwTXpWQk1qazNNRUUwT1RWR1FVVkFNR1ZtWWpJNVpqSTJOREkwWVdSbVl6UTVOV05rT0M1bFwifSIsImFzIjoiaW1zLW5hMSIsImFhX2lkIjoiMUUwNjJDQjU2NDM1QTI5NzBBNDk1RkYxQHRyb3dlcHJpY2UuY29tIiwiY3RwIjowLCJmZyI6IlpXTEpVWUpPRkxQNU1IVUtGTVFWWUhBQTZRPT09PT09Iiwic2lkIjoiMTc1Mzg4MTE2MTQyMF9kMGQyMmRjZi02ZjM1LTQ5N2ItYWI3Mi1lN2I2OWYxMGJiYzJfdWUxIiwibW9pIjoiZjQwOTgwNTkiLCJwYmEiOiJPUkcsTWVkU2VjTm9FVixMb3dTZWMiLCJleHBpcmVzX2luIjoiODY0MDAwMDAiLCJjcmVhdGVkX2F0IjoiMTc1NTA5MDg2MjY1MyIsInNjb3BlIjoiYWIubWFuYWdlLGFjY291bnRfY2x1c3Rlci5yZWFkLGFkZGl0aW9uYWxfaW5mbyxhZGRpdGlvbmFsX2luZm8uam9iX2Z1bmN0aW9uLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ucm9sZXMsQWRvYmVJRCxhZG9iZWlvLmFwcHJlZ2lzdHJ5LnJlYWQsYWRvYmVpb19hcGksYWVtLmZyb250ZW5kLmFsbCxhdWRpZW5jZW1hbmFnZXJfYXBpLGNyZWF0aXZlX2Nsb3VkLG1wcyxvcGVuaWQsb3JnLnJlYWQscHBzLnJlYWQscmVhZF9vcmdhbml6YXRpb25zLHJlYWRfcGMscmVhZF9wYy5hY3AscmVhZF9wYy5kbWFfdGFydGFuLHNlcnZpY2VfcHJpbmNpcGFscy53cml0ZSxzZXNzaW9uIn0.HpkW6rN6-ICRm5eR95yR11ULVz-n_4T_uzJWSL3ppk5USfhuCmN9vGP_cp_Q-rqMwRRRXOf5MEFt1TM84IGSSj6SXU4HLbYZEEylR8thPcS12C51I5zJwWCd7egBA45z6gWeWqdFkI6-XDakiJkU2351tJd8pEKfEY2XdpATZkLrE2SFu0_duFhQ3o7xpWSPegd7_gCicnGmxniv4OTNu8UnGVHXE2HQt7-ciO2OmmQWfiF-cNOLxvnMVmi-Fug_S2-15adgTE6h_JSZIMLjywvqbrwtUWt1UIo49ZWTWtm_xxjS3PuHJOsBp1IaCo62zVbmuVxhJSqhBkaHxXu6WQ',
      'If-Match': etag,
    },
    body: JSON.stringify(payload),
  });
  console.log('resp for CF update ', resp);

  if (!resp.ok) {
    throw new Error(`Failed to update CF: ${resp.status}`);
  }

  const updatedMeta = await resp.json();
  return updatedMeta['repo:etag']; // Return new ETag for subsequent updates
}
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
    elements: {
      title: { value: 'Better questions. Better insights. In all markets5' },
    },
  };

  console.log('existing obj ', obj);
  // const { fragmentPath } = block.dataset;
  const link = block.querySelector('a');
  console.log('link in content fragment ', link);
  // const fragmentPath = link ? link.getAttribute('href') : block.textContent.trim();
  // const cleanedFragmentPath = fragmentPath.replace(/\.html$|\.htm$/i, '');
  const cleanedFragmentPath = '/content/dam/universal-editor-standard-site/cf/trp-text';
  console.log('path in content fragment ', cleanedFragmentPath);
  if (!cleanedFragmentPath) {
    block.innerHTML = '<p>Please select a content fragment in the editor.</p>';
    return;
  }
  try {
    const cfData = await getContentFragmentData(cleanedFragmentPath);
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
    // Auto-save observer with debounce
    let debounceTimer;
    const saveChanges = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const newText = block.querySelector('.editable-text').innerText.trim();
        console.log('newText of content fragment ', newText);
        // Replace values
        // obj.fields[0].values = newText;
        obj.elements.title.value = newText;
        console.log('new obj ', obj);
        try {
          // await updateContentFragment(cleanedFragmentPath, newText);
          await updateCF(id, cfetag, obj);
          console.log('Auto-saved text update');
        } catch (err) {
          console.error('Auto-save failed', err);
        }
      }, 500); // 500ms debounce
    };

    const observer = new MutationObserver(saveChanges);
    observer.observe(block.querySelector('.editable-text'), {
      childList: true,
      subtree: true,
      characterData: true,
    });
  } catch (err) {
    block.innerHTML = `<p class="error">Error: ${err.message}</p>`;
  }
}
