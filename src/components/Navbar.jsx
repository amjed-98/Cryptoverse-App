import { useState, useEffect } from 'react';
import {
  BulbOutlined,
  FundOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  MenuOutlined,
} from '@ant-design/icons/lib/icons';
import { Avatar, Button, Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  // handling mobile Nav
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className='nav-container'>
      <div className='logo-container'>
        <Avatar src={icon} />

        <Typography.Title level={1} className='logo'>
          <Link to='/'>Cryptoverse</Link>
        </Typography.Title>

        <Button
          className='menu-control-container'
          onClick={() => setActiveMenu(!activeMenu)}>
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <Menu theme='dark'>
          <Menu.Item icon={<HomeOutlined />} key='home'>
            <Link to='/'>Home</Link>
          </Menu.Item>

          <Menu.Item icon={<FundOutlined />} key='cryptocurrencies'>
            <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
          </Menu.Item>

          <Menu.Item icon={<MoneyCollectOutlined />} key='Exchanges'>
            <Link to='/exchanges'>Exchanges</Link>
          </Menu.Item>

          <Menu.Item icon={<BulbOutlined />} key='News'>
            <Link to='/news'>News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
