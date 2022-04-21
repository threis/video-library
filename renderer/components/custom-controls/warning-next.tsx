import { Box, Text } from '@chakra-ui/react'

interface WarningNextProps {
    nextVideoAlertIsVisible: boolean
    lastSeconds: number
}
export function WarningNext({ nextVideoAlertIsVisible, lastSeconds }: WarningNextProps) {
	return (
		<Box
			w="7rem" h="3rem"
			position="absolute" bottom="3.5rem" right="0"
			bg='gray.800' filter='opacity(.4)'
			padding=".4rem"
			hidden={!nextVideoAlertIsVisible}
		>
			<Text fontSize=".7rem">Próximo vídeo em </Text>
			<Text fontSize=".8rem">{lastSeconds || 0} segundos</Text>
		</Box>
	)

}