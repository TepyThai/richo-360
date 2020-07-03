import React from 'react';
import LazyLoad from 'react-lazyload';

function PanoView({ data }) {
  return (
    <LazyLoad height={700} offset={100}>
      <div>
        <iframe
          style={{
            margin: '0 auto 150px auto',
            width: '500px',
            height: '700px',
            scrolling: 'no',
            border: 0,
            borderRadius: 10,
            display: 'block',
          }}
          src={data['theta_urls'][0]}
          allowFullScreen={true}
        />
      </div>
    </LazyLoad>
  );
}

export default PanoView;
