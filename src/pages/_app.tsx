import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApollo } from '../lib/apolloClinet';
import { ApolloProvider } from '@apollo/client';
import customaizedTheme from '../styles/customaizedTheme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const client = initializeApollo();
  return (
    <ApolloProvider {...{ client }}>
      <ChakraProvider resetCSS={true} theme={customaizedTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
