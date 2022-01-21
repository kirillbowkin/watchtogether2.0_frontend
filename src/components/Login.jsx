import {
  Button,
  Center,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  position,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import GoogleLogin from 'react-google-login';
import { FcGoogle } from 'react-icons/fc';
import { UserContext } from '../context/UserContext';

function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const axios = require('axios');
  const context = useContext(UserContext);
  const { setUser, setTokens } = context;
  const toast = useToast()

  const onLogin = () => {
    onOpen();
  };

  const googleSuccess = async response => {
    const token = response.accessToken;
    axios
      .post(`/login?social_provider=google&social_token=${token}`)
      .then(function (response) {
        const user = response.data.user
        setUser(user)
        localStorage.setItem("user", JSON.stringify(user))

        console.log(response.data.tokens)
        setTokens(response.data.tokens)
        localStorage.setItem("tokens", JSON.stringify(response.data.tokens))
        toast({
          title: `You've been successfully logged in as ${user?.profileName}`,
          position: "top",
          status: "success",
          duration: 3000,
          isClosable: true
        })
      })
      .catch(function (response) {
         toast({
          title: "Error while logging in",
          position: "top",
          status: "error",
          duration: 3000,
          isClosable: true
        })
       
      });
    onClose();
  };
  return (
    <>
      <Button variant="ghost" onClick={onLogin}>
        Login
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GoogleLogin
              clientId="507462820234-uf2jk3mmtg334jc46fab6qq2amlp43u9.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              render={renderProps => (
                <Center>
                  <Button onClick={renderProps.onClick}>
                    <Icon as={FcGoogle} mr={2} />
                    Login with Google
                  </Button>
                </Center>
              )}
            />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Login;
