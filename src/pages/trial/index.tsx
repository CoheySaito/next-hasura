import { NextPage } from 'next';
import React, { useState } from 'react';
import Layout from '../../components/Layout';

import {
  Center,
  Spinner,
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  FormControl,
} from '@chakra-ui/react';
import { formatDate } from '../../util/date';
import useCrud from '../../hooks/useCrud';

const Trial: NextPage = () => {
  const {
    data,
    error,
    loading,
    update_users_by_pk,
    insert_users_one,
    delete_users_by_pk,
  } = useCrud();

  const [editedUser, setEditedUser] = useState({ id: '', name: '' });

  const handleSubmit = async (e: React.FormEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (editedUser.id) {
      //Update
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      //Create
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (error) {
        alert(error.message);
      }
    }
    setEditedUser({ id: '', name: '' });
  };

  const deleteHanlder = async (id: string) => {
    await delete_users_by_pk({
      variables: {
        id: id,
      },
    });
  };

  if (error) {
    return <p>Error:{error}</p>;
  }

  if (loading) {
    return (
      <Layout title="Trial">
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Center>
      </Layout>
    );
  }

  return (
    <Layout title="Trial">
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
        >
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
          >
            <Stack spacing={4}>
              <Heading
                color={'gray.800'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              >
                Join our team
                <Text
                  as={'span'}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  !
                </Text>
              </Heading>
            </Stack>
            <FormControl as="form" mt={10} onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <Input
                  placeholder="Name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  value={editedUser.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditedUser({ ...editedUser, name: e.target.value })
                  }
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
              </Stack>
              <Button
                type="submit"
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.300,pink.300)',
                  boxShadow: 'xl',
                }}
              >
                {editedUser.id ? ' Update' : 'Create'}
              </Button>
            </FormControl>
          </Stack>
          <VStack
            spacing={{ base: 4, md: 6 }}
            alignContent="center"
            alignItems="start"
          >
            {data?.users.map((user) => {
              const { datetime } = formatDate(
                new Date(user.created_at),
                new Date(),
              );
              return (
                <HStack key={user.id} spacing={4}>
                  <Text>
                    <Text as="span" fontSize="lg" fontWeight="bold">
                      Name:
                    </Text>
                    {user.name}
                  </Text>
                  <Text>{datetime}</Text>
                  <Button
                    fontFamily={'heading'}
                    bgGradient="linear(to-r, blue.400,teal.400)"
                    color={'white'}
                    _hover={{
                      bgGradient: 'linear(to-r, blue.300,teal.300)',
                      boxShadow: 'xl',
                    }}
                    onClick={() => setEditedUser(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => {
                      deleteHanlder(user.id);
                    }}
                    fontFamily={'heading'}
                    bgGradient="linear(to-r, red.400,orange.400)"
                    color={'white'}
                    _hover={{
                      bgGradient: 'linear(to-r, red.300,orange.300)',
                      boxShadow: 'xl',
                    }}
                  >
                    Delete
                  </Button>
                </HStack>
              );
            })}
          </VStack>
        </Container>
      </Box>
    </Layout>
  );
};
export default Trial;
