import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { Playlist } from '../components/playlist'
import { Header } from '../components/template/header'
import { Video } from '../components/video'
import { Season } from '../interface/season'

export default function Player() {
	const [video, setVideo] = useState('')
	const [seasonList, setSeasonList] = useState<Season[]>([])
	const [fullListVideos, setFullListVideos] = useState([])
	const [selectedSeason, setSelectedSeason] = useState('')

	useEffect(() => {
		global.ipcRenderer.addListener('season-list', (_, data) => {
			setSeasonList(data)
			setFullListVideos(data.map(({ videos, path }) => {
				return videos.map(video => `${path}\\${video}`)
			}).flat())
		})


	}, [])

	useEffect(() => {
		if (video) {
			const seasonName = video.split('\\')[video.split('\\').length - 2]
			if (selectedSeason !== seasonName){
				handleSelectSeason(seasonName)
			}
		}
	}, [video])

	function handleSelectSeason(season: string) {
		setSelectedSeason(season === selectedSeason ? '' : season)
	}

	return (
		<>
			<Header />
			<Box w="100vw">
				<Flex my="6" h="calc(100vh-2rem)" w="100%" px="6">
					<Playlist seasonList={seasonList} setVideo={setVideo} video={video} handleSelectSeason={handleSelectSeason} selectedSeason={selectedSeason} />
					<Video video={video} setVideo={setVideo} fullListVideos={fullListVideos} />
				</Flex>
			</Box>
		</>

	)
}