import { NextPage } from 'next';
import React from 'react';
import Auth from '../components/Auth';
import Layout from '../components/Layout';

const Home: NextPage = () => {
  return (
    <Layout title="Home">
      <Auth />
    </Layout>
  );
};
export default Home;
