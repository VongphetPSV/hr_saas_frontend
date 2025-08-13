/**
 * Downloads a blob as a file with the specified filename
 * @param {Blob} blob - The blob to download
 * @param {string} filename - The name to give the downloaded file
 */
export function downloadBlob(blob, filename) {
  // Create a URL for the blob
  const url = URL.createObjectURL(blob);
  
  // Create a temporary link element
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  
  // Trigger the download
  a.click();
  
  // Clean up by revoking the URL
  URL.revokeObjectURL(url);
}
