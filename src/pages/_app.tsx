import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { initializeApollo } from '../lib/apolloClinet';
import { ApolloProvider } from '@apollo/client';
import customaizedTheme from '../styles/customaizedTheme';
import { useUserChanged } from '../hooks/useUserChanged';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const {} = useUserChanged();
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
