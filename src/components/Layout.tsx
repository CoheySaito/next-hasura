import React, { ReactNode } from 'react';
import Head from 'next/head';
import Footer from './Footer';
import NavBar from './NavBar';
import { Center } from '@chakra-ui/react';

type LayoutProps = {
  title?: string;
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({
  title = 'Welcom to Next-hasura',
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <NavBar />
      <Center minH="76vh" flexWrap="wrap" alignContent="center">
        {children}
      </Center>
      <Footer />
    </>
  );
};
export default Layout;
