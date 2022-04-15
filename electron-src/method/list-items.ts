import fs from 'fs'

export default function listItem(folder: string): string[] {

	return fs.readdirSync(folder)
}