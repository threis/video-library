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
		</Stack>
	)
}