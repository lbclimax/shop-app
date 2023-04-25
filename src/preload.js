// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('db',{
    addProduct:(product)=>ipcRenderer.send('db:add-product',product),
    getProducts:()=>ipcRenderer.send('db:getProducts'),
    handleAddProduct:(callback)=>ipcRenderer.on('store:addProduct',callback),
    handleProducts:(callback)=>ipcRenderer.on('store:Products',callback)
})