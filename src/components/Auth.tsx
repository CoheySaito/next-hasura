import React from 'react';
import { useFirebaseAuth } from '../hooks/useFirebaseAuth';
import firebase from '../../firebaseConfig';
import NextLink from 'next/link';

import {
  Box,
  Button,
  Center,
  chakra,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { AiOutlineUserAdd, AiOutlineLogin } from 'react-icons/ai';
import { BiLinkExternal } from 'react-icons/bi';
import DividerWithText from './DividerWithText';
import { useLogout } from '../hooks/useLogout';
import { useRouter } from 'next/router';

const Auth: React.VFC = () => {
  const {
    email,
    password,
    isLogin,
    emailChange,
    pwChange,
    resetInput,
    toggleMode,
    authUser,
  } = useFirebaseAuth();

  const currentUser = firebase.auth().currentUser;
  const { logout } = useLogout();
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    resetInput();
    router.push('/');
  };

  return (
    <Box
      bg={useColorModeValue('gray.50', 'inherit')}
      minH="100vh"
      py="12"
      px={{ base: '4', lg: '8' }}
    >
      {currentUser ? (
        <>
          <DividerWithText mt="6">
            <Text as="span" fontWeight="bold">
              Login User:
            </Text>
            {currentUser.email}
          </DividerWithText>
          <Link as={NextLink} href="/tasks">
            <HStack
              justifyContent="center"
              alignItems="center"
              mt={{ base: '2', md: '4' }}
            >
              <Text
                fontSize="xl"
                cursor="pointer"
                textAlign="center"
                color={'blue.500'}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.400',
                }}
              >
                to Tasks page
              </Text>
              <Text
                fontSize="xl"
                cursor="pointer"
                textAlign="center"
                color={'blue.500'}
                _hover={{
                  textDecoration: 'none',
                  color: 'blue.400',
                }}
              >
                <BiLinkExternal />
              </Text>
            </HStack>
          </Link>
          <Center>
            <Button
              colorScheme="teal"
              size="md"
              fontWeight="extrabold"
              py={{ md: '4' }}
              px="6"
              mt="4"
              variant="outline"
              borderWidth="2px"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Center>
        </>
      ) : (
        <Box maxW="md" mx="auto">
          <Heading textAlign="center" size="xl" fontWeight="extrabold">
            Sign in to your account
          </Heading>
          <HStack
            mt="4"
            mb="8"
            align="center"
            maxW="md"
            fontWeight="medium"
            justifyContent="center"
            onClick={toggleMode}
            cursor="pointer"
          >
            <Text
              as="span"
              color="blue.500"
              transition="all .4s ease-out"
              _hover={{
                color: 'blue.400',
              }}
            >
              {isLogin ? 'Create new account' : 'Sign In'}
            </Text>
            <Text color="rgb(43, 108, 176)">
              {isLogin ? (
                <AiOutlineUserAdd size={24} />
              ) : (
                <AiOutlineLogin size={24} />
              )}
            </Text>
          </HStack>
          <Box
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue('white', 'gray.700')}
            py="8"
            px={{ base: '4', md: '10' }}
            shadow="base"
            rounded={{ sm: 'lg' }}
          >
            <chakra.form onSubmit={authUser}>
              <Stack spacing="6">
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={emailChange}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>password</FormLabel>
                  <Input
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    value={password}
                    onChange={pwChange}
                  />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme={isLogin ? 'blue' : 'pink'}
                  size="lg"
                  fontSize="md"
                  transition="all .4s ease-out"
                >
                  {isLogin ? 'Sign in' : 'Register'}
                </Button>
              </Stack>
            </chakra.form>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Auth;
