import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
	fonts: {
		heading: 'Roboto',
		body: 'Roboto',
	},
	styles: {
		global: {
			body: {
				bg: 'gray.900',
				color: 'gray.50',
			},
			'::-webkit-scrollbar': {
				width: '4px',
				height: '4px'
			},
			'::-webkit-scrollbar-track': {
				width: '6px',
				height: '4px'
			},
			'::-webkit-scrollbar-thumb': {
				background: 'gray.50',
				borderRadius: '24px',
			}
		},
	},
})