import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Playlist } from '../components/playlist'
import { Header } from '../components/template/header'
import { Video } from '../components/video'
import { Season } from '../interface/season'

export default function Player() {
	const [video, setVideo] = useState('')
	const [seasonList, setSeasonList] = useState<Season[]>([])

	useEffect(() => {
		global.ipcRenderer.addListener('season-list', (_, data) => {
			setSeasonList(data)
		})
	}, [])

	return (
		<>
			<Header />
			<Box>
				<Flex w="100%" my="6" maxW={1480} h="400px" mx="auto" px="6">
					<Video video={video} />
					<Playlist seasonList={seasonList} setVideo={setVideo} video={video} />
				</Flex>
			</Box>
		</>

	)
}