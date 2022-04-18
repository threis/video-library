import { join } from 'path'
import { format } from 'url'

import { BrowserWindow, app, ipcMain, nativeImage, dialog } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import listItem from './method/list-items'
import { IpcMainEvent } from 'electron/main'

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
		show: false,
		autoHideMenuBar: true,
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

	mainWindow.maximize()
	mainWindow.show()
	mainWindow.loadURL(url)


})

app.on('window-all-closed', app.quit)

ipcMain.on('import-folder', async (event: IpcMainEvent) => {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openDirectory']
	})

	if (!canceled) {

		const sourcePath = filePaths[0]

		const folders = listItem(sourcePath)
		const completeSeason = folders.map(folder => {

			const videos = listItem(`${sourcePath}/${folder}`).filter(video => {
				const extension = (video.split('.').pop() || '').toLowerCase()
				return extension.includes('mp4') || extension.includes('ogv') || extension.includes('webm')
			})

			return {
				description: folder,
				videos
			}
		})

		event.sender.send('season-list', completeSeason)

	} else {
		console.log(event)
	}
})
