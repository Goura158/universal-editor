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
