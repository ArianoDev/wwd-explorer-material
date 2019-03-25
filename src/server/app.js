const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { ipcMain } = require('electron');
const reader = require('./airpicture-reader.js');

let win;
let linkStatus = false;

function createWindow() {
  win = new BrowserWindow({ width: 1280, height: 720 });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  // The following is optional and will open the DevTools:
  win.webContents.openDevTools(); 
    
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});



ipcMain.on('link', (event, arg) => {
  try {
    if(arg !== linkStatus) {
      if(arg === true) {
        // active link status
        console.log('SERVER: (LINK) Starting DDS Reader');
        reader.startReader(function(tracks) {
          console.log('SERVER: (LINK) callback function');
          event.sender.send('airpicture', tracks);
        });
      }
    } else {
      // stop link
      
    }
    // update link status
    linkStatus = !linkStatus;
    // send ack
    event.sender.send('link', true);
  } catch(err) {
    console.log(err);
    // send ack
    event.sender.send('link', false);
  }
});