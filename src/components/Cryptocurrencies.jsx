import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Input } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import millify from 'millify';

const Cryptocurrencies = ({ simplified }) => {
  // to render only ten if in homepage
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);

  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // filtering coins
  useEffect(() => {
    const filteredCurrencies = cryptosList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCryptos(filteredCurrencies);
  }, [cryptosList, searchTerm]);

  if (isFetching) return 'Loading ...';

  return (
    <>
      {/*  filter input*/}
      {!simplified && (
        <div className='search-crypto'>
          <Input
            placeholder='search Cryptocurrencies'
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className='crypto-card-container'>
        {cryptos?.map((currency) => (
          <Col xs={24} sm={12} lg={6} className='crypto-card' key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                hoverable
                title={`${currency.rank}. ${currency.name}`}
                extra={
                  <img
                    className='crypto-image'
                    src={currency.iconUrl}
                    alt={currency.name}
                  />
                }>
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: ${millify(currency.marketCap)}</p>
                <p>Daily change: {millify(currency.change)}</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
