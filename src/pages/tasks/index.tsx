/* eslint-disable react-hooks/rules-of-hooks */
import { NextPage } from 'next';
import React, { useState } from 'react';
import {
  Flex,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Box,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  chakra,
  VisuallyHidden,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { AiFillEdit } from 'react-icons/ai';
import { BsFillTrashFill } from 'react-icons/bs';
import Layout from '../../components/Layout';
import useCrudTasks from '../../hooks/useCrudTasks';
import { formatDate } from '../../util/date';
import firebase from '../../../firebaseConfig';
import { useRouter } from 'next/router';

const Tasks: NextPage = () => {
  const currentUser = firebase.auth().currentUser;

  const router = useRouter();
  const isReady = router.isReady;

  const header = ['tasks', 'created', 'actions'] as const;

  const [editTask, setEditTask] = useState({ id: '', title: '' });

  const {
    tasksData,
    tasksError,
    tasksLoading,
    insert_tasks_one,
    update_task_by_pk,
    delete_task_by_pk,
  } = useCrudTasks();

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editTask.id) {
      try {
        await update_task_by_pk({
          variables: {
            id: editTask.id,
            title: editTask.title,
          },
        });
      } catch (error) {
        alert(error.message);
      }
    } else {
      try {
        await insert_tasks_one({
          variables: {
            title: editTask.title,
          },
        });
      } catch (error) {
        alert(error.message);
      }
    }

    setEditTask({ id: '', title: '' });
  };

  const handleDelete = (id: string) => {
    delete_task_by_pk({
      variables: {
        id,
      },
    });
    setEditTask({ id: '', title: '' });
  };

  if (tasksLoading || !isReady) {
    return (
      <Layout title="Tasks">
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

  if (!currentUser) {
    router.push('/');
  }

  if (tasksError) {
    return (
      <Layout title="Tasks">
        <p>Error:{tasksError.message}</p>{' '}
      </Layout>
    );
  }

  return (
    <Layout title="Tasks">
      <Flex
        w="full"
        bg="gray.400"
        p={50}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Table
          w="full"
          borderRadius="md"
          bg={useColorModeValue('white', 'gray.800')}
          display={{
            base: 'block',
            md: 'table',
          }}
        >
          <Thead
            display={{
              base: 'none',
              md: 'table-header-group',
            }}
          >
            <Tr>
              {header.map((x) => (
                <Th key={x}>{x}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody
            display={{
              base: 'block',
              lg: 'table-row-group',
            }}
          >
            {tasksData.tasks.map((task) => {
              const { title, id } = task;
              const { datetime } = formatDate(
                new Date(task.created_at),
                new Date(),
              );

              const items = { title, datetime };

              return (
                <Tr
                  key={id}
                  display={{
                    base: 'grid',
                    md: 'table-row',
                  }}
                  sx={{
                    gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
                    gridGap: '10px',
                  }}
                >
                  {Object.keys(items).map((x) => {
                    return (
                      <React.Fragment key={`${id}${x}`}>
                        <Td
                          display={{
                            base: 'table-cell',
                            md: 'none',
                          }}
                          sx={{
                            textTransform: 'uppercase',
                            color: useColorModeValue('gray.400', 'gray.400'),
                            fontSize: 'xs',
                            fontWeight: 'bold',
                            letterSpacing: 'wider',
                            fontFamily: 'heading',
                          }}
                        >
                          {x}
                        </Td>
                        <Td
                          color={useColorModeValue('gray.500', 'gray.500')}
                          fontSize="md"
                          fontWeight="hairline"
                        >
                          {items[x]}
                        </Td>
                      </React.Fragment>
                    );
                  })}
                  <Td
                    display={{
                      base: 'table-cell',
                      md: 'none',
                    }}
                    sx={{
                      textTransform: 'uppercase',
                      color: useColorModeValue('gray.400', 'gray.400'),
                      fontSize: 'xs',
                      fontWeight: 'bold',
                      letterSpacing: 'wider',
                      fontFamily: 'heading',
                    }}
                  >
                    Actions
                  </Td>
                  <Td>
                    <ButtonGroup variant="solid" size="sm" spacing={4}>
                      <IconButton
                        colorScheme="green"
                        icon={<AiFillEdit />}
                        aria-label="edit"
                        onClick={() => setEditTask({ id, title })}
                        fontSize="xl"
                      />
                      <IconButton
                        colorScheme="red"
                        variant="outline"
                        icon={<BsFillTrashFill />}
                        aria-label="delete"
                        onClick={() => handleDelete(id)}
                        fontSize="xl"
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>

        <chakra.form w="full" mb={6} mt={2} onSubmit={submitHandler}>
          <VisuallyHidden>New Task</VisuallyHidden>
          <Box display={{ base: 'block', lg: 'none' }}>
            <Input
              size="lg"
              color="brand.900"
              type="text"
              placeholder="New Task..."
              bg="white"
              required={true}
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <Button
              w="full"
              color="white"
              variant="solid"
              colorScheme="primary"
              size="lg"
              type="submit"
            >
              POST
            </Button>
          </Box>
          <InputGroup size="lg" w="full" display={{ base: 'none', lg: 'flex' }}>
            <Input
              size="lg"
              color="brand.900"
              type="text"
              placeholder="New Task..."
              bg="gray.200"
              required={true}
              value={editTask.title}
              onChange={(e) =>
                setEditTask({ ...editTask, title: e.target.value })
              }
            />
            <InputRightElement w="auto">
              {editTask.id && (
                <Button
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={'white'}
                  _hover={{
                    bgGradient: 'linear(to-r, red.300,pink.300)',
                    boxShadow: 'xl',
                  }}
                  variant="solid"
                  size="lg"
                  type="button"
                  roundedRight={0}
                  onClick={() => setEditTask({ id: '', title: '' })}
                >
                  RESET
                </Button>
              )}
              <Button
                bgGradient="linear(to-r, blue.400,teal.400)"
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, blue.300,teal.300)',
                  boxShadow: 'xl',
                }}
                variant="solid"
                size="lg"
                type="submit"
                roundedLeft={0}
              >
                {editTask.id ? 'UPDATE' : 'POST'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </chakra.form>
      </Flex>
    </Layout>
  );
};
export default Tasks;
