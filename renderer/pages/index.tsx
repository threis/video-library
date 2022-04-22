
import { Box, Flex, Text, Link as LinkChakraUI } from '@chakra-ui/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ModalNewImport } from '../components/modal'

export default function Home() {

	const [seriesList, setSeriesList] = useState([])

	useEffect(() => {
		global.ipcRenderer.send('serie-list')
		global.ipcRenderer.addListener('serie-list', (_, data) => {
			setSeriesList(data)
		})
	}, [])
	return (
		<Box p="1rem">
			<ModalNewImport />
			<Flex>
				{seriesList.length > 0 && seriesList.map(serie => {
					return (

						<Link href={{
							pathname: '/player',
							query: { sourcePath: serie.source },
						}} key={serie.source}>
							<LinkChakraUI>
								<Text >{serie.name}</Text>
							</LinkChakraUI>
						</Link>
					)
				}
				)}
			</Flex>
		</Box>
	)
}