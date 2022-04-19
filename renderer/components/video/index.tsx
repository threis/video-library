import { Box } from '@chakra-ui/react'
import ReactPlayer from 'react-player'

interface VideoProps {
	video: string
}

export function Video({ video }: VideoProps) {
	console.log('video', video)

	return (
		<Box w="1260px" h="400px" bg="gray.700" borderRadius="0.125rem">
			{!!video && (
				<ReactPlayer
					width="100%"
					height="100%"
					playing
					controls
					url={[
						{ src: video, type: `video/${video.split('.').pop()}` }
					]}
				/>

			)}
		</Box>
	)
}