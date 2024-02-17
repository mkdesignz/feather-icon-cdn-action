function updateDataUrl(element, color, number) {
  const baseUrl = element.getAttribute('data-url');
  const updatedUrl = `${baseUrl}?color=${encodeURIComponent(color)}&size=${number}`;
  element.setAttribute('data-url', updatedUrl);
}

// Function to copy the data-url to clipboard
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    console.log('Data URL copied to clipboard');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Add event listeners to all icon divs
document.querySelectorAll('.icon').forEach(icon => {
  const colorInput = icon.querySelector('input[type="color"]');
  const numberInput = icon.querySelector('input[type="number"]');

  // Update data-url when inputs change
  colorInput.addEventListener('change', () => updateDataUrl(icon, colorInput.value, numberInput.value));
  numberInput.addEventListener('change', () => updateDataUrl(icon, colorInput.value, numberInput.value));

  // Copy data-url to clipboard on click
  icon.addEventListener('click', () => {
    const dataUrl = icon.getAttribute('data-url');
    copyToClipboard(dataUrl);
  });
});
