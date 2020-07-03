import { useState, useCallback, useEffect } from 'react';
import PanoView from '../component/PanoView';
import LoadMoreButton from '../component/LoadMoreButton';

export default function Home() {
  const [page, setPage] = useState(1);
  const [panoData, setPanoData] = useState([]);

  const loadMore = useCallback(async () => {
    try {
      const result = await fetch(
        `https://hackathon.stg-prtimes.net/ricoh360/${
          page + 1
        }?token=e7zCG8N0sl5y`
      );
      const data = await result.json();
      const dataArr = data.data;
      setPanoData((panoData) => [...panoData, ...dataArr]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data!');
    }
  }, [panoData, page]);

  const init = useCallback(async () => {
    try {
      const result = await fetch(
        'https://hackathon.stg-prtimes.net/ricoh360/1?token=e7zCG8N0sl5y'
      );
      const data = await result.json();
      setPanoData(data.data);
    } catch (error) {
      console.error('Error fetching data!');
    }
  });

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      style={{
        padding: '100px 30px',
      }}
    >
      {panoData &&
        panoData.map((pano) => (
          <PanoView data={pano} key={pano['release_id']} />
        ))}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
      </div>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   let data;
//   try {
//     const result = await fetch(
//       'https://hackathon.stg-prtimes.net/ricoh360/1?token=e7zCG8N0sl5y'
//     );
//     data = await result.json();
//   } catch (error) {
//     console.error('Error fetching data!');
//   }

//   return {
//     props: {
//       data,
//     }, // will be passed to the page component as props
//   };
// }
