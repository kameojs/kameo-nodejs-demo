export const getFileOpener = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.json';

  function openFile() {
    return new Promise((resolve, reject) => {
      fileInput.onchange = async () => {
        const files = fileInput.files;
        if (!files) return resolve(null);
        const file = files.item(0);
        if (!file) return resolve(null);
        return resolve({ text: await file.text(), file });
      }
      fileInput.oncancel = () => resolve(null);
      fileInput.onerror = reject;
      fileInput.click();
    })
  }

  return openFile;
};
