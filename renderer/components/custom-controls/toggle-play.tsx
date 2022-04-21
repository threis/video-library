import { FaPlay, FaPause } from 'react-icons/fa'
import { Box } from '@chakra-ui/react'


interface TogglePlayProps {
    isPlaying: boolean
    setPlaying: (play: boolean) => void
}
export function TogglePlay({ isPlaying, setPlaying }: TogglePlayProps) {
	return (
		<Box
			cursor="pointer"
			onClick={() => setPlaying(!isPlaying)}
			padding=".5rem"
			bg='gray.800' 
			w="3rem"
		>
			{isPlaying ? <FaPause /> : <FaPlay />}
		</Box >
	)

}