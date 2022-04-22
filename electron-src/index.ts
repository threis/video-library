import { join } from 'path'
import { format } from 'url'

import { BrowserWindow, app, ipcMain, nativeImage, dialog } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'
import listItem from './method/list-items'
import { IpcMainEvent } from 'electron/main'
import { createDir, existDb, load, save } from './series-service'

const icon = nativeImage.createFromPath(`${app.getAppPath()}/public/icon.ico`)

const userDataPath = app.getPath('userData')

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
			webSecurity: false,
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

ipcMain.on('get-folder', async (event: IpcMainEvent) => {

	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ['openDirectory']
	})

	event.sender.send('get-folder', !canceled ? filePaths[0] : '')

})

ipcMain.on('folder-import', async (event: IpcMainEvent, sourcePath: string) => {

	const folders = listItem(sourcePath)
	const completeSeason = folders.map(folder => {

		const videos = listItem(`${sourcePath}\\${folder}`).filter(video => {
			const extension = (video.split('.').pop() || '').toLowerCase()
			return extension.includes('mp4') || extension.includes('ogv') || extension.includes('webm')
		})

		const path = `${sourcePath}\\${folder}`

		return {
			description: folder,
			videos,
			path
		}
	})

	event.sender.send('folder-import', completeSeason)


})


ipcMain.on('serie-save', async (event: IpcMainEvent, serie) => {

	createDir(userDataPath)

	let data: string[] = []

	if (existDb(userDataPath)) {
		const fileLoaded = load(userDataPath)
		data = [...fileLoaded]
	}
	const serieList = [...data, serie]
	save(userDataPath, serieList)
	event.sender.send('serie-list', serieList)
})

ipcMain.on('serie-list', (event: IpcMainEvent) => {

	const data = load(userDataPath)
	event.sender.send('serie-list', data)
})