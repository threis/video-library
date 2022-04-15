import { Stack, Box, Text } from '@chakra-ui/react'
import { FaPlay } from 'react-icons/fa'
import Link from 'next/link'

export function Header() {

	return (
		<Stack direction='row' align='center' w="100vw" h="2rem" bg='teal'>
			<Stack align="center" w="5rem" >
				<Link href="/">
					<a>
						<FaPlay />
					</a>
				</Link>
			</Stack>
			<Stack w="5rem">
				<Link href="/player">
					<a>
						<Text>video</Text>
					</a>
				</Link>
			</Stack>
			<Box w="5rem" onClick={() => global.ipcRenderer.send('import-folder')} cursor="pointer">
				<Text>import</Text>
			</Box>
		</Stack>
	)
}