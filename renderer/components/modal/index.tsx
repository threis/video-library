import { useDisclosure, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiImport } from 'react-icons/bi'
import { Season } from '../../interface/season'

export function ModalNewImport() {

	const { isOpen, onOpen, onClose } = useDisclosure()
	const [source, setSource] = useState('')
	const [seasonList, setSeasonList] = useState<Season[]>([])

	useEffect(() => {
		global.ipcRenderer.addListener('folder-import', (_, data) => {
			setSeasonList(data)
			if (seasonList.length > 0) {
				const sourceArr = seasonList[0].path.split('\\').slice(0, -1).join('\\')
				setSource(sourceArr)
			}
		})


	}, [])


	function handleSaveNewImport() {
		if (source) {
			global.ipcRenderer.send('serie-save', { source, name: source.split('\\').pop() })
		}
		onClose()
	}

	function handleOpenModal() {
		setSeasonList([])
		setSource('')
		onOpen()
	}

	return (
		<>
			<Flex alignItems={'center'}>
				<Button bg={'teal'} onClick={handleOpenModal} mr={3}>Incluir</Button>
				<Text fontSize='3rem'>Novas séries</Text>
			</Flex>
			<Modal isOpen={isOpen} onClose={onClose} size='6xl'>
				<ModalOverlay
					bg='blackAlpha.300'
					backdropFilter='blur(10px) hue-rotate(90deg)'
				/>
				<ModalContent bg='gray.700'>
					<ModalHeader color='teal.500' fontSize='2rem' fontWeight="bold">Incluir nova série</ModalHeader>
					<ModalCloseButton bg='gray.900' />
					<ModalBody>
						<Text mb="1rem">Selecione o caminho</Text>
						<Flex alignItems={'center'}>
							<Button bg='gray.900' mr={3} onClick={() => global.ipcRenderer.send('get-folder')} _hover={{ 'bg': 'gray.600' }}>
								<Box mr={3}>
									<BiImport />
								</Box>
								Importar
							</Button>
							<Text>{source}</Text>
						</Flex>
						<Flex direction={'column'} h="400px" p="1rem">
							{seasonList.length > 0 && (<Text color='teal.500' fontSize='1.4rem' fontWeight="light">Temporadas:</Text>)}
							{seasonList && seasonList.map(item => (<Text key={item.description}>{item.description}</Text>))}
						</Flex>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='teal' mr={3} onClick={handleSaveNewImport}>
							Salvar
						</Button>
						<Button bg='gray.400' onClick={onClose} _hover={{ 'bg': 'gray.600' }}>Cancelar</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	)
}