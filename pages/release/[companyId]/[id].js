import React, { useCallback, useEffect, useState, Children } from 'react';
import { useRouter } from 'next/router';
import css from './[id].module.css';

function ReleaseDetail({}) {
  const router = useRouter();
  const [data, setData] = useState(null);

  const { companyId, id } = router.query;

  const fetchDetail = useCallback(async () => {
    try {
      const result = await fetch(
        `https://hackathon.stg-prtimes.net/detail/${companyId}/${id}?token=e7zCG8N0sl5y`
      );
      if (result.ok) {
        const data = await result.json();
        console.log(data.data.body);
        setData(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchDetail();
  }, []);

  return (
    <>
      {data && (
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            display: 'block',
            padding: '100px 30px',
            width: '100%',
          }}
        >
          <h1
            style={{
              fontSize: '18px',
              lineHeight: '24px',
              color: '#3b3b3b',
              margin: '0.67em 0',
            }}
          >
            {data['title']}
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <a
              style={{
                display: 'inline-block',
                lineHeight: '20px',
                color: '#5686ab',
                lineHeight: 1,
                margin: 0,
                textDecoration: 'none',
              }}
              href={''}
            >
              {data['company_name']}
            </a>
            <div
              style={{
                color: '#797979',
                fontSize: '12px',
                fontWeight: 'normal',
                lineHeight: '17px',
              }}
            >
              {Date(data['created_at'])}
            </div>
          </div>
          <div className={css['sub-title']}>{data['sub_title']}</div>
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
          <div style={{ margin: '10px', padding: '8px' }}>
            種類：　<Tag>{data['type']}</Tag>
          </div>
          <div style={{ margin: '10px', padding: '8px' }}>
            キーワード：　
            {data['keywords'].map((word) => (
              <Tag key={word}>{word}</Tag>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

const Tag = ({ children }) => {
  return (
    <div
      style={{
        backgroundColor: 'teal',
        borderRadius: 90,
        display: 'inline-block',
        padding: '2px 8px',
        color: 'white',
        margin: '0 2px',
      }}
    >
      {children}
    </div>
  );
};

export default ReleaseDetail;
