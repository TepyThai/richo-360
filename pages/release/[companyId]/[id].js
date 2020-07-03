import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

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
        <>
          <div>{data['company_name']}</div>
          <div dangerouslySetInnerHTML={{ __html: data.body }} />
        </>
      )}
    </>
  );
}

export default ReleaseDetail;
