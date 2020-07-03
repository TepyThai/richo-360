import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import Lottie from 'react-lottie';
import * as loadingData from '../utils/loading.json';
import Header from '../component/Header';
import Footer from '../component/Footer';
import PanoView from '../component/PanoView';
import LoadMoreButton from '../component/LoadMoreButton';
import { categoryMap } from '../utils/categoryMap';
import RightPano from '../component/RightPano';
import LeftPano from '../component/LeftPano';

export default function Home() {
  const [page, setPage] = useState(1);
  const [panoData, setPanoData] = useState(null);
  const [category, setCategory] = useState(null);
  const [filterData, setFilterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    try {
      const result = await fetch(
        `https://hackathon.stg-prtimes.net/ricoh360/${
          page + 1
        }?token=e7zCG8N0sl5y`
      );
      const data = await result.json();
      let dataArr = data.data;
      if (Object.keys(dataArr).length === 0 && dataArr.constructor === Object) {
        dataArr = [];
        setHasMore(false);
        return;
      }
      setPanoData((panoData) => [...panoData, ...dataArr]);
      setPage(page + 1);
    } catch (error) {
      console.error('Error fetching data!');
    }
  }, [panoData, page, hasMore]);

  const init = useCallback(async () => {
    try {
      const result = await fetch(
        'https://hackathon.stg-prtimes.net/ricoh360/1?token=e7zCG8N0sl5y'
      );
      const data = await result.json();

      //check empty object
      if (
        Object.keys(data.data).length === 0 &&
        data.data.constructor === Object
      ) {
        setPanoData([]);
        setHasMore(false);
      }
      setPanoData(data.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data!');
    }
  }, []);

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (category !== null) {
      setLoading(true);
      let newFilterData = panoData.filter(
        (pano) =>
          parseInt(pano['main_category_id']) === category ||
          parseInt(pano['sub_category_id']) === category
      );
      //no more data
      // if (newFilterData.length === (filterData && filterData.length)) {
      //   setHasMore(false);
      // }
      setFilterData(newFilterData);
      setLoading(false);
    }
  }, [category, panoData]);

  const renderFilterPano = () => {
    if (category !== null) {
      if (filterData && filterData.length === 0) {
        return <div>No Release for this category</div>;
      }
      return (
        filterData &&
        filterData.map((pano, index) => (
          <div key={pano['release_id']}>
            {index % 2 === 0 ? (
              <RightPano data={pano} />
            ) : (
              <LeftPano data={pano} />
            )}
          </div>
        ))
      );
    } else {
      if (panoData && panoData.length === 0) {
        return <div>No More Release</div>;
      }
      return (
        panoData &&
        panoData.map((pano, index) => (
          <div key={pano['release_id']}>
            {index % 2 === 0 ? (
              <RightPano data={pano} />
            ) : (
              <LeftPano data={pano} />
            )}
          </div>
        ))
      );
    }
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
    eventListeners: [
      {
        eventName: 'complete',
        callback: () => setLoading(false),
      },
    ],
  };

  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <Header />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {Object.keys(categoryMap).map((key) => (
          <button
            style={{
              color: category === parseInt(key) ? '#3081c9' : 'black',
              fontWeight: '700',
              backgroundColor: 'white',
              margin: '20px auto',
            }}
            key={key}
            onClick={() => {
              if (category === parseInt(key)) {
                setCategory(null);
              } else {
                setCategory(parseInt(key));
              }
            }}
          >
            {categoryMap[key]}
          </button>
        ))}
      </div>
      <div
        style={{
          width: '100%',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {loading && (
          <div
            style={{
              height: '100vh',
              width: '100%',
              textAlign: 'center',
              display: 'block',
            }}
          >
            <Lottie
              options={defaultOptions}
              height={400}
              width={400}
              isStopped={!loading}
            />
          </div>
        )}
        {!loading && renderFilterPano()}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!loading && hasMore && (
            <LoadMoreButton onClick={loadMore}>Load More</LoadMoreButton>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
