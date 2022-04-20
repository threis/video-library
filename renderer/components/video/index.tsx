import { Box, Text } from '@chakra-ui/react'
import { useState } from 'react'
import ReactPlayer from 'react-player'

interface VideoProps {
	video: string
	fullListVideos: string[]
	setVideo: (video: string) => void
}

export function Video({ video, setVideo, fullListVideos }: VideoProps) {

	const [lastSeconds, setLastSeconds] = useState(0)
	const [nextVideoAlertIsVisible, setNextVideoAlertIsVisible] = useState(false)

	function handleProgress({ loadedSeconds, playedSeconds }) {
		//last 11 seconds
		if (Math.trunc(loadedSeconds - playedSeconds) < 11) {
			setNextVideoAlertIsVisible(true)
			const seconds = Math.trunc(loadedSeconds - playedSeconds)
			setLastSeconds(seconds)
		} else {
			if (nextVideoAlertIsVisible) {
				setNextVideoAlertIsVisible(false)
			}
		}

	}

	function handleEnded() {
		setVideo(fullListVideos[fullListVideos.indexOf(video)+1])
	}

	return (
		<Box w="1260px" h="400px" bg="gray.700" borderRadius="0.125rem" position="relative">
			{!!video && (
				<ReactPlayer
					position="relative"
					onProgress={(e) => handleProgress(e)}
					onEnded={handleEnded}
					width="100%"
					height="100%"
					controls
					playing
					url={video}
				/>
			)}
			<Box w="7rem" h="3rem" position="absolute" bottom="20" right="0" bg='gray.800' filter='opacity(.4)' padding=".4rem" hidden={!nextVideoAlertIsVisible}>
				<Text fontSize=".7rem">Próximo vídeo em </Text>
				<Text fontSize=".8rem">{lastSeconds || 0} segundos</Text>
			</Box>
		</Box >
	)
}