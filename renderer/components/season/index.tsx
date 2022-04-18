import { Box, Flex } from '@chakra-ui/react'

import { AiFillPlayCircle, AiOutlinePlayCircle } from 'react-icons/ai'

interface SeasonProps {
	videos: string[]
	playingVideoName?: string
}

export function Season({ videos, playingVideoName }: SeasonProps) {
	return (
		<>
			{
				videos.map(video =>
					<Flex
						key={video}
						p="1rem"
						w="100%"
						cursor="pointer"
						bg="gray.800"
						color="teal.400"
						transition='filter .5s'
						_hover={{
							filter: 'brightness(1.2)'
						}}>
						<Box fontSize="1.5rem" mr="0.4rem">
							{playingVideoName === video ? <AiFillPlayCircle /> : <AiOutlinePlayCircle />}
						</Box>
						{video}
					</Flex>
				)
			}
		</>
	)
}