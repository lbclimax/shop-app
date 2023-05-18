// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const {contextBridge,ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld('db',{
    addProduct:(product)=>ipcRenderer.send('db:add-product',product),
    addSell:(sell)=>ipcRenderer.send('db:add-sell',sell),
    getProducts:()=>ipcRenderer.send('db:getProducts'),
    getSells:()=>ipcRenderer.send('db:getSells'),
    handleAddProduct:(callback)=>ipcRenderer.on('store:addProduct',callback),
    handleAddSell:(callback)=>ipcRenderer.on('store:addSell',callback),
    handleProducts:(callback)=>ipcRenderer.on('store:Products',callback),
    handleSells:(callback)=>ipcRenderer.on('store:Sells',callback)
    
})