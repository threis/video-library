import { Box, Slider, SliderFilledTrack, SliderThumb, SliderTrack } from '@chakra-ui/react'
import { MdGraphicEq } from 'react-icons/md'

interface ProgressBarProps {
    duration: number
    elapsed: number
    onSeekTo: (seconds: number) => void
}

export function ProgressBar({ duration, elapsed, onSeekTo }: ProgressBarProps) {

	function handleProgressBarChangeValue(seconds: number) {
		onSeekTo(seconds)
	}

	return (
		<Slider
			w="100%"
			colorScheme="teal.500"
			cursor="pointer"
			min={0}
			max={duration}
			step={1}
			value={elapsed}
			onChange={(e) => handleProgressBarChangeValue(e)}
		>
			<SliderTrack>
				<SliderFilledTrack bg="teal.500" />
			</SliderTrack>
			<SliderThumb boxSize={6} bg="teal.500">
				<Box color="white" as={MdGraphicEq} />
			</SliderThumb>
		</Slider>
	)

}