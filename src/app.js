//nodeIntegrationをfalseにしたことで、以下は使えなくなった
//const { ipcRenderer } = require('electron');

const button = document.getElementById('button');
const text = document.getElementById('text');

window.openDialog = () => {
  return ipcRenderer.invoke('open-dialog');
};

button.addEventListener('click', async () => {
    // Window オブジェクトに openDialog() メソッドが存在している
    text.textContent = await window.openDialog();
});