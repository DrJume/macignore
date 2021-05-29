// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, Tray, nativeImage, dialog } = require('electron')
const path = require('path')

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

let tray = null
app.whenReady().then(async () => {
  if (process.platform !== 'darwin') {
    dialog.showMessageBoxSync(undefined, {
      message: 'This app is only supported on macOS.',
      type: 'error',
    })
    app.quit()
  }

  app.dock.hide()
  app.setAboutPanelOptions({
    applicationName: app.getName(),
    applicationVersion: app.getVersion(),
    version: '',
    copyright: 'Copyright © 2021 DrJume\n\nLicensed under GPL-3.0',
    // credits: 'Made by DrJume with ❤️', // macOS specific credits in Credits.html
    website: 'https://github.com/DrJume/macignore'
  })



  // createWindow()

  // app.on('activate', function () {
  //   // On macOS it's common to re-create a window in the app when the
  //   // dock icon is clicked and there are no other windows open.
  //   if (BrowserWindow.getAllWindows().length === 0) createWindow()
  // })

  const menuBarIcon = nativeImage.createFromPath(path.join(__dirname, './assets/file-minusTemplate.png'))

  tray = new Tray(menuBarIcon)
  const contextMenu = Menu.buildFromTemplate([
    { label: 'About ' + app.getName(), click: () => { app.showAboutPanel(); app.focus({ steal: true }) } },
    { type: 'separator' },
    {
      label: 'Ignored Items', submenu: [
        { label: '/asdasdasdasd/dfgsdfgsdfgsdfgsdfgsdf/gsdfg', icon: nativeImage.createFromNamedImage('NSFolder').resize({ height: 16 }) },
        { label: 'test', icon: nativeImage.createFromNamedImage('NSFolder').resize({ height: 16 }) },
      ]
    },
    { label: 'Settings...' },
    { type: 'separator' },
    { label: 'Quit', role: 'quit' }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)

  // console.log((await app.getFileIcon(path.join(__dirname, './assets/file-minusTemplate.png'), { size: 'small' })).getSize())

})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  // if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
