import { Box, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { Season } from '../../interface/season'
import { Season as VideosList } from '../season'
import { AiOutlineUnorderedList } from 'react-icons/ai'

interface PlaylistProps {
	seasonList: Season[]
	setVideo: (video: string) => void
	video: string
	selectedSeason: string
	handleSelectSeason: (season: string) => void
}
export function Playlist({ seasonList, setVideo, video, handleSelectSeason, selectedSeason }: PlaylistProps) {
	return (
		<Flex direction="column" mr=".4rem" h="100%" overflowX='hidden' w="300px">
			{seasonList.map(item =>
				<>
					<Flex
						key={`${item.path}\\${item.description}`}
						px="1rem"
						py="1rem"
						mb='.2rem'
						cursor="pointer"
						borderRadius='0.125rem'
						bg="gray.700"
						color="teal.400"
						onClick={() => handleSelectSeason(item.description)}
					>
						<Box fontSize="1.4rem" mr="0.4rem">
							<AiOutlineUnorderedList />
						</Box>
						<Text>
							{item.description}
						</Text>
					</Flex>
					{selectedSeason === item.description && <VideosList videos={item.videos} playbackName={video} setVideo={setVideo} path={item.path} />}
				</>
			)}
		</Flex>
	)
}