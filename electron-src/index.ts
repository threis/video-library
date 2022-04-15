import { join } from 'path'
import { format } from 'url'

import { BrowserWindow, app, ipcMain, IpcMainEvent, nativeImage } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

const icon = nativeImage.createFromPath(`${app.getAppPath()}/public/icon.ico`)

app.on('ready', async () => {
	await prepareNext('./renderer')


	if (app.dock) {
		app.dock.setIcon(icon)
	}

	const mainWindow = new BrowserWindow({
		icon,
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			preload: join(__dirname, 'preload.js'),
		},
	})

	const url = isDev
		? 'http://localhost:8000/'
		: format({
			pathname: join(__dirname, '../renderer/out/index.html'),
			protocol: 'file:',
			slashes: true,
		})

	mainWindow.loadURL(url)
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
	console.log(message)
	setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})
