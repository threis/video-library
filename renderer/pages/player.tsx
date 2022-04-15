import { Box, Flex } from '@chakra-ui/react'
import { Playlist } from '../components/playlist'
import { Header } from '../components/template/header'
import { Video } from '../components/video'

export default function Player() {
	return (
		<>
			<Header />
			<Box>
				<Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
					<Video />
					<Playlist />
				</Flex>
			</Box>
		</>

	)
}