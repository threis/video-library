import { Box } from '@chakra-ui/react'

interface DisplayTitleProps {
    title: string
}

export function DisplayTitle({ title }: DisplayTitleProps) {

	return (
		<Box
			position="absolute"
			top="30"
			left="0"
			h="3rem"
			padding=".4rem"
			bg='gray.800' 
			filter='opacity(.4)'
			fontSize='1.2rem'
		>
			{title}
		</Box>
	)


}