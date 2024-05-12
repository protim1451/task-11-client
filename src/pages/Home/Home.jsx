import React from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';

const Home = () => {
    return (
        <div>
            <Helmet>BookNest || Homepage</Helmet>
            <Banner></Banner>
        </div>
    );
};

export default Home;