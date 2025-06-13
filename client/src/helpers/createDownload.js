export const createDownload = ({ blob, name, extension }) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${name}.${extension}`;
  document.body.appendChild(a);
  a.click();
};
