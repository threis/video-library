import { Box } from '@chakra-ui/react'
import moment from 'moment'

interface DisplaySecondsProps {
    elapsed: number
    duration: number
}

export function DisplaySeconds({ elapsed, duration }: DisplaySecondsProps) {

	function convertSecondsTommss(seconds: number) {
		return moment.utc(Math.trunc(seconds)*1000).format('mm:ss')
	}
	const formattedElapsed = convertSecondsTommss(elapsed)
	const formattedDuration = convertSecondsTommss(duration)

	return (
		<Box
			w="8rem"
			padding=".4rem"
			ml="1rem"
		>
			{`${formattedElapsed} / ${formattedDuration}`}
		</Box>
	)


}