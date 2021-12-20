import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {
  Navbar,
  Exchanges,
  Homepage,
  News,
  CryptoDetails,
  Cryptocurrencies,
} from './components';

import './App.css';

const App = () => {
  return (
    <div className='app'>
      <nav className='navbar'>
        <Navbar />
      </nav>

      <main className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Homepage />} />

              <Route path='/exchanges' element={<Exchanges />} />

              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />

              <Route path='/crypto/:coinId' element={<CryptoDetails />} />

              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>

        <footer className='footer'>
          <Typography.Title
            level={5}
            style={{ color: 'white', textAlign: 'center' }}>
            Cryptoverse <br />
            All rights reserved
            <br />
            <Space>
              <Link to='/'>Home </Link>
              <Link to='/exchanges'>Exchanges</Link>
              <Link to='/news'>news</Link>
            </Space>
          </Typography.Title>
        </footer>
      </main>
    </div>
  );
};

export default App;
