import { Flex, Box, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Slider, SliderFilledTrack, SliderThumb, SliderTrack, useBoolean } from '@chakra-ui/react'
import { useState } from 'react'
import { FaSignal } from 'react-icons/fa'

interface VolumeProps {
    volume: number
    setVolume: (volume: number) => void
}
export function Volume({ volume, setVolume }: VolumeProps) {

	const [isEditing, setIsEditing] = useState(false)

	return (
		<Flex
			fontSize="1.2rem"
			w="1.5rem"
			h="100%"
			ml="1rem"
			cursor="pointer"
			alignItems="center"
			justifyContent="center"
		>


			<Popover
				placement='top'
				closeOnBlur={false}
				isOpen={isEditing}
				onOpen={() => setIsEditing(true)}
			>
				<PopoverTrigger>
					<Box w="80%" onClick={() => setIsEditing(false)}>
						<FaSignal />
					</Box>
				</PopoverTrigger>
				<PopoverContent
					p=".4rem"
					h="8rem"
					w="2rem"
				>
					<Slider
						colorScheme="teal.500"
						cursor="pointer"
						min={0}
						max={1}
						step={.1}
						value={volume}
						onChange={(e) => setVolume(e)}
						onClick={() => setIsEditing(false)}
						orientation='vertical'
					>
						<SliderTrack>
							<SliderFilledTrack bg="teal.500" />
						</SliderTrack>
						<SliderThumb bg="teal.500" />
					</Slider>
				</PopoverContent>
			</Popover>


		</Flex >
	)
}

