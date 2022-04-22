import fs from 'fs'
import path from 'path'

const DB_FILE_NAME = 'series_db.json'

export function save(userDataPath: string, data: any) {
	const dirDatabase = path.resolve(userDataPath, 'database')
	fs.writeFile(`${dirDatabase}\\${DB_FILE_NAME}`, JSON.stringify(data), null, () => console.log())
}

export function load(userDataPath: string) {
	try {
		const dirDatabase = path.resolve(userDataPath, 'database')

		const data = fs.readFileSync(`${dirDatabase}\\${DB_FILE_NAME}`, 'utf8')
		const file = data.toString()
		return JSON.parse(file)
	} catch {
		return []

	}
}

export function createDir(userDataPath: string) {

	const dirDatabase = path.resolve(userDataPath, 'database')

	if (!fs.existsSync(dirDatabase)) {
		fs.mkdirSync(dirDatabase)
	}

}

export function existDb(userDataPath: string): boolean {

	const dirDatabase = path.resolve(userDataPath, 'database')

	if (fs.existsSync(`${dirDatabase}\\${DB_FILE_NAME}`)) {
		return true
	}
	return false

}