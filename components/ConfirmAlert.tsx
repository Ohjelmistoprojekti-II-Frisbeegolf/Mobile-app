import { useRef, Dispatch, SetStateAction} from "react";
import { AlertDialog, Button, Center, NativeBaseProvider } from "native-base";

interface Props{
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleSubmit: () => void;
}
export default function ConfirmAlert({ isOpen, setIsOpen, handleSubmit}: Props) {

  const onClose = () => setIsOpen(false);

  const cancelRef = useRef(null);
  return <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Lopeta peli</AlertDialog.Header>
          <AlertDialog.Body>
            Haluatko lopettaa pelin?
          </AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant='unstyled' colorScheme='coolGray' onPress={onClose} ref={cancelRef}>
                En halua
              </Button>
              <Button colorScheme='danger' onPress={handleSubmit}>
                Lopeta
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>;
};