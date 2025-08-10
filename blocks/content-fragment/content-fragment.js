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

/**export async function updateContentFragment(cfPath, updatedData) {
  try {
    const response = await fetch(`${cfPath}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization: eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3NTQ2NzYyODc1MjdfYTc4OGZjMzYtMmFhYi00NTRiLWE0MTEtZWE1ZDAzZDYyMDIxX3VlMSIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJleGNfYXBwIiwidXNlcl9pZCI6IjJGRjMyQTJFNjQzNUEyOTcwQTQ5NUZBRUAwZWZiMjlmMjY0MjRhZGZjNDk1Y2Q4LmUiLCJzdGF0ZSI6IntcInNlc3Npb25cIjpcImh0dHBzOi8vaW1zLW5hMS5hZG9iZWxvZ2luLmNvbS9pbXMvc2Vzc2lvbi92MS9OVFExTWpnMVptVXRaR0UxTkMwMFlqZ3pMV0ZpTUdNdE0yVmxORE13WkdGbE1XRmlMUzB4UlRBMk1rTkNOVFkwTXpWQk1qazNNRUUwT1RWR1JqRkFkSEp2ZDJWd2NtbGpaUzVqYjIwXCJ9IiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIxRTA2MkNCNTY0MzVBMjk3MEE0OTVGRjFAdHJvd2VwcmljZS5jb20iLCJjdHAiOjAsImZnIjoiWlY1WllZSk9GTFA1TUhVS0ZNUVZZSEFBNlE9PT09PT0iLCJzaWQiOiIxNzUzODgxMTYxNDIwX2QwZDIyZGNmLTZmMzUtNDk3Yi1hYjcyLWU3YjY5ZjEwYmJjMl91ZTEiLCJtb2kiOiI1MzNlMDJkZiIsInBiYSI6Ik9SRyxNZWRTZWNOb0VWLExvd1NlYyIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsInNjb3BlIjoiYWIubWFuYWdlLGFjY291bnRfY2x1c3Rlci5yZWFkLGFkZGl0aW9uYWxfaW5mbyxhZGRpdGlvbmFsX2luZm8uam9iX2Z1bmN0aW9uLGFkZGl0aW9uYWxfaW5mby5wcm9qZWN0ZWRQcm9kdWN0Q29udGV4dCxhZGRpdGlvbmFsX2luZm8ucm9sZXMsQWRvYmVJRCxhZG9iZWlvLmFwcHJlZ2lzdHJ5LnJlYWQsYWRvYmVpb19hcGksYWVtLmZyb250ZW5kLmFsbCxhdWRpZW5jZW1hbmFnZXJfYXBpLGNyZWF0aXZlX2Nsb3VkLG1wcyxvcGVuaWQsb3JnLnJlYWQscHBzLnJlYWQscmVhZF9vcmdhbml6YXRpb25zLHJlYWRfcGMscmVhZF9wYy5hY3AscmVhZF9wYy5kbWFfdGFydGFuLHNlcnZpY2VfcHJpbmNpcGFscy53cml0ZSxzZXNzaW9uIiwiY3JlYXRlZF9hdCI6IjE3NTQ2NzYyODc1MjcifQ.Nh3-nOIEeOzXGcHL2owqwiOiD734X9EvdmKD2XVZHu7F4OC5NyGAtwUAfSSyRnDYgVFxOoNSnJo7ckptscF3YBHcwGF6g_TTi5Jl4_KBJX-z3FKk2VaGEkgw3v8y0j6vO2bFlJqQWvoj2p8Dp2yEESjkbmzsemMzErvACWadmvuENoJfBjGt2T7b5nUCO9rWDogWeBXRADtmks0SXeb9bErj7OnXeN9n9yGEjae8WNeKDFfQG9dZPe9TN1nY5yFdVqPsVEBmhQjlRrOrXrYd6ndCfakUL1zmCiXB3Wclj4viUJOrOOUxIl1578fIW2-NifTWsqHClxjlS3eptXAsQw'
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
} **/

/**
 *
 * @param {Element} block
 */
/**
export default async function decorate(block) {
  console.log('block ', block);
  block.innerHTML = '';
  const link = block.querySelector('picker');
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
 */
 
const AEM_HOST = 'https://author-p14733-e1160558.adobeaemcloud.com'; 

async function getContentFragment(fragmentPath) {
  const url = `${AEM_HOST}/adobe/sites/cf${fragmentPath}`;
  const resp = await fetch(url, {
    credentials: 'include',
    headers: { Accept: 'application/json' }
  });
  if (!resp.ok) throw new Error(`Failed to fetch CF: ${resp.status}`);
  return await resp.json();
}

async function updateContentFragment(fragmentPath, textValue) {
  const url = `${AEM_HOST}/adobe/sites/cf${fragmentPath}`;
  const resp = await fetch(url, {
    method: 'PATCH',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      elements: {
        text: { value: textValue }
      }
    })
  });
  if (!resp.ok) throw new Error(`Failed to update CF: ${resp.status}`);
  return resp.json();
}

export default async function decorate(block) {
  const { fragmentPath } = block.dataset;
  if (!fragmentPath) {
    block.innerHTML = '<p>Please select a content fragment in the editor.</p>';
    return;
  }

  try {
    const cfData = await getContentFragment(fragmentPath);
    const textVal = cfData.elements?.text?.value || '';

    // Render inline editable text area bound to CF
    block.innerHTML = `
      <div class="cf-text-block" data-aue-resource="${fragmentPath}" data-aue-type="content-fragment">
        <div 
          class="editable-text" 
          data-aue-prop="elements.text.value" 
          data-aue-label="Text"
          data-aue-type="text">
          ${textVal}
        </div>
      </div>
    `;

    // Auto-save observer with debounce
    let debounceTimer;
    const saveChanges = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(async () => {
        const newText = block.querySelector('.editable-text').innerText.trim();
        try {
          await updateContentFragment(fragmentPath, newText);
          console.log('✅ Auto-saved text update');
        } catch (err) {
          console.error('❌ Auto-save failed', err);
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
