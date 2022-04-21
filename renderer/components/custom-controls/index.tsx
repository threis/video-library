import { Box, Flex } from '@chakra-ui/react'
import { ReactNode, useState } from 'react'
import { FullScreen, useFullScreenHandle } from 'react-full-screen'
import { useHideOnMouseStop } from 'react-hide-on-mouse-stop'
import { DisplaySeconds } from './display-seconds'
import { DisplayTitle } from './display-title'
import { ProgressBar } from './progress-bar'
import { TogglePlay } from './toggle-play'
import { Volume } from './volume'
import { WarningNext } from './warning-next'

interface CustomControlsProps {
	controls: {
		nextVideoAlertIsVisible: boolean
		lastSeconds: number
		playing: boolean
		setPlaying: (play: boolean) => void
		duration: number
		onSeekTo: (seconds: number) => void
		elapsed: number
		title: string
		volume: number
		setVolume: (volume: number) => void
	}
	children: ReactNode
}

export function CustomControls({ controls, children }: CustomControlsProps) {
	const [showControls, setShowControls] = useState(false)
	const {
		nextVideoAlertIsVisible,
		lastSeconds,
		playing,
		setPlaying,
		duration,
		onSeekTo,
		elapsed,
		title,
		volume,
		setVolume
	} = controls

	const fullscreen = useFullScreenHandle()
	const [hide] = useHideOnMouseStop({ delay: 1000, hideCursor: true })

	return (
		<FullScreen handle={fullscreen}>
			<Box h="100%" w="100%" borderRadius="0.125rem" position="relative"
				onMouseEnter={() => setShowControls(true)}
				onMouseLeave={() => setShowControls(false)}
				onDoubleClick={fullscreen.active ? fullscreen.exit : fullscreen.enter}
				_fullScreen={{ 'width': '100vw', 'height': '100vh' }}
			>
				<Box onClick={() => setPlaying(!playing)}>{children}</Box>
				{!hide && (
					<Box display={showControls ? 'block' : 'none'}>

						<DisplayTitle title={title} />
						<WarningNext nextVideoAlertIsVisible={nextVideoAlertIsVisible} lastSeconds={lastSeconds} />

						<Flex
							position="absolute"
							bottom="0"
							w="100%"
							alignItems="center"
							alignContent="stretch"
							bg='gray.800'
						>

							<TogglePlay isPlaying={playing} setPlaying={setPlaying} />
							<ProgressBar duration={duration} elapsed={elapsed} onSeekTo={onSeekTo} />
							<Volume volume={volume} setVolume={setVolume} />
							<DisplaySeconds duration={duration} elapsed={elapsed} />
						</Flex>

					</Box>
				)}
			</Box >
		</FullScreen >
	)
}