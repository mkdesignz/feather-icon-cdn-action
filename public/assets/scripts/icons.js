// Function to update the data-url attribute
// Function to update the data-url attribute
function updateDataUrl(element, color, number) {
  // Extract the base URL (without query parameters)
  let baseUrl = element.getAttribute('data-url');
  const queryIndex = baseUrl.indexOf('?');
  if (queryIndex >= 0) {
    // If there are existing query parameters, remove them
    baseUrl = baseUrl.substring(0, queryIndex);
  }

  // Construct the new URL with updated query parameters
  const updatedUrl = `${baseUrl}?color=${encodeURIComponent(color)}&size=${number}`;
  element.setAttribute('data-url', updatedUrl);
}


// Function to display a message
function showMessage(element, message) {
  // eslint-disable-next-line no-undef
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
  }, 1500); // Remove the message after 1.5 seconds
}

// Function to copy the data-url to clipboard
function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Data URL copied to clipboard');
    showMessage(element, 'Copied!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Add event listeners to all icon divs
// Add event listeners to all icon divs
document.querySelectorAll('.icon').forEach(icon => {
  const colorInput = icon.querySelector('input[type="color"]');
  const numberInput = icon.querySelector('input[type="number"]');

  // Update data-url when inputs change
  colorInput.addEventListener('change', () => updateDataUrl(icon, colorInput.value, numberInput.value));
  numberInput.addEventListener('change', () => updateDataUrl(icon, colorInput.value, numberInput.value));

  // Copy data-url to clipboard on click, excluding input clicks
  icon.addEventListener('click', (event) => {
    // Check if the click is on one of the inputs
    if (event.target === colorInput || event.target === numberInput) {
      // If so, do nothing (don't copy)
      return;
    }

    const dataUrl = icon.getAttribute('data-url');
    copyToClipboard(dataUrl, icon);
  });
});

