import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import moment from 'moment';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage =
  'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');

  const count = simplified ? 6 : 12;

  const { data } = useGetCryptosQuery(100);

  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });

  if (isFetching) return 'Loading...';
  return (
    <Row gutter={[24, 24]}>
      {/* select news */}
      {!simplified && (
        <Col span={24}>
          <Select
            autoFocus
            dropdownMatchSelectWidth={false}
            value={newsCategory}
            size='large '
            showSearch
            className='search-news'
            placeholder='Choose Crypto'
            optionFilterProp='chidlren'
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }>
            <Option value='Cryptocurrency'>Cryptocurrency</Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}

      {/* display news */}
      {cryptoNews.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt='news'
                  style={{
                    maxWidth: '200px',
                    maxHeight: '100px',
                    borderRadius: '5px',
                  }}
                />
              </div>

              <p>
                {news.description.length > 250
                  ? `${news.description.substring(0, 250)}...`
                  : news.description}
              </p>

              <div className='provider-container'>
                <div>
                  <Avatar
                    alt='thumbnail'
                    src={
                      news.provider[0].image?.thumbnail?.contentUrl || demoImage
                    }
                  />
                  <Text className='provider-name'>
                    {news.provider[0]?.name}
                  </Text>
                </div>
                <Text>
                  {moment(news.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
