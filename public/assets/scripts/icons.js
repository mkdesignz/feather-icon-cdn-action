'use strict';

function updateDataUrl(element, color, number) {
  let baseUrl = element.getAttribute('data-url');
  const queryIndex = baseUrl.indexOf('?');
  if (queryIndex >= 0) {
    baseUrl = baseUrl.substring(0, queryIndex);
  }

  const updatedUrl = `${baseUrl}?color=${encodeURIComponent(
    color
  )}&size=${number}`;
  element.setAttribute('data-url', updatedUrl);
}

function showMessage(element, message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.style.position = 'absolute';
  messageDiv.style.left = '50%';
  messageDiv.style.transform = 'translateX(-50%)';
  messageDiv.style.background = 'lightgreen';
  messageDiv.style.color = 'black';
  messageDiv.style.padding = '5px';
  messageDiv.style.borderRadius = '5px';
  messageDiv.style.fontSize = '0.8em';
  messageDiv.style.zIndex = '1000';
  element.appendChild(messageDiv);

  setTimeout(() => {
    element.removeChild(messageDiv);
  }, 1500);
}

/**
 *
 * Copies the data URL to the clipboard.
 * @param text {string} The data URL to copy.
 * @param element {HTMLElement} The element to show the message on.
 */
function copyToClipboard(text, element) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Data URL copied to clipboard');
      showMessage(element, 'Copied!');
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}

/**
 * Searches icons based on the provided query.
 * @param query {string} The search query to filter icons by name.
 */
function searchIcons(query) {
  /** @type {string} */
  const filter = query.toLowerCase();
  /** @type {NodeListOf<HTMLElement>} */
  const icons = document.querySelectorAll('.icon');

  icons.forEach(icon => {
    const name = icon.getAttribute('data-name').toLowerCase();
    if (filter === '' || name.includes(filter)) {
      icon.style.display = 'inline-block';
    } else {
      icon.style.display = 'none';
    }
  });
}

document.querySelectorAll('.icon').forEach(icon => {
  /** @type {HTMLInputElement} */
  const colorInput = icon.querySelector('input[type="color"]');
  /** @type {HTMLInputElement} */
  const numberInput = icon.querySelector('input[type="number"]');

  colorInput.addEventListener('change', () =>
    updateDataUrl(icon, colorInput.value, numberInput.value)
  );
  numberInput.addEventListener('change', () =>
    updateDataUrl(icon, colorInput.value, numberInput.value)
  );

  icon.addEventListener('click', event => {
    if (event.target === colorInput || event.target === numberInput) {
      return;
    }

    const dataUrl = icon.getAttribute('data-url');
    copyToClipboard(dataUrl, icon);
  });
});

document.querySelector('.search-bar input').addEventListener('input', event => {
  /** @type {string} */
  const query = event.target.value;
  searchIcons(query);
});
