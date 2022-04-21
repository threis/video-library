import { useRef, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import BaseReactPlayer from 'react-player/base'
import { CustomControls } from '../custom-controls'

interface VideoProps {
	video: string
	fullListVideos: string[]
	setVideo: (video: string) => void
}

export function Video({ video, setVideo, fullListVideos }: VideoProps) {
	const videoRef = useRef<BaseReactPlayer<ReactPlayerProps>>(null)
	
	const [playing, setPlaying] = useState(false)
	const [volume, setVolume] = useState(1)
	const [duration, setDuration] = useState(0)
	const [elapsed, setElapsed] = useState(0)
	const [lastSeconds, setLastSeconds] = useState(0)
	const [nextVideoAlertIsVisible, setNextVideoAlertIsVisible] = useState(false)

	function handleProgress({ loadedSeconds, playedSeconds }) {
		setDuration(loadedSeconds)
		setElapsed(playedSeconds)
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
		setVideo(fullListVideos[fullListVideos.indexOf(video) + 1])
	}

	function onSeekTo(seconds: number) {
		setElapsed(seconds)
		videoRef.current.seekTo(seconds, 'seconds')
	}

	const FormattedVideoName = video.split('\\')[video.split('\\').length - 1].split('.')[0]

	const controls = {
		lastSeconds,
		nextVideoAlertIsVisible,
		playing,
		setPlaying,
		duration,
		setElapsed,
		elapsed,
		onSeekTo,
		title: FormattedVideoName,
		volume, 
		setVolume
	}

	return (
		<>
			{!!video && (

				<CustomControls controls={controls}>
					<ReactPlayer
						ref={videoRef}
						position="relative"
						onProgress={(e) => handleProgress(e)}
						onEnded={handleEnded}
						width="100%"
						height="100%"
						seekTo={elapsed}
						volume={volume}
						playing={playing}
						url={video}
					/>
				</CustomControls>
			)}
		</>
	)
}