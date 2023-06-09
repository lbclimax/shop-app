const { app, BrowserWindow ,ipcMain} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

var Datastore = require('nedb');
let userData= app.getPath("userData")
const productDb = new Datastore({ filename: path.join(userData,"product.db"), autoload: true });
const sellsDb = new Datastore({ filename: path.join(userData,'sells.db'), autoload: true });
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon:path.join(__dirname, '../../icons/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    show:false
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  mainWindow.maximize();
  mainWindow.show();
  // Open the DevTools.
//mainWindow.webContents.openDevTools();

 ipcMain.on('db:getProducts',(event)=>{
  productDb.find({},function(err,docs){
    console.log("docs loaded ",docs.length);
    mainWindow.webContents.send('store:Products',docs)
  })
 })

 ipcMain.on('db:getSells',(event)=>{
  sellsDb.find({},function(err,docs){
    console.log("sells loaded ",docs.length);
    mainWindow.webContents.send('store:Sells',docs)
  })
 })
  ipcMain.on('db:add-product',(event,product)=>{
    productDb.insert(product,function(err,newDoc){
      mainWindow.webContents.send('store:addProduct',newDoc)
    })
  })

  ipcMain.on('db:add-sell',(event,sell)=>{
    sellsDb.insert(sell,function(err,newDoc){
      mainWindow.webContents.send('store:addSell',newDoc)
    })
    let itemUpdate=0;
    sell.sellItems.forEach((value)=>{
      productDb.update(
        {_id:value.productId}, 
        { $inc: {remainedStock: -1*value.quantity}},
        {},
        function(){
          console.log('item updated',++itemUpdate,'of',sell.sellItems.length);
          if(itemUpdate==sell.sellItems.length){
            productDb.find({},function(err,docs){
              console.log("products updated ",docs.length);
              mainWindow.webContents.send('store:Products',docs)
            })
          }
        }
        
        )
    })

  })
  
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',()=>{
  //ipcMain.handle('db:add-product',addProduct)
  
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
