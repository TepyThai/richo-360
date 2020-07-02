import HelloWorld from '../component/hello-world';

export default function Home({ data }) {
  return (
    <div>
      {data.data.slice(0, 3).map((v) => (
        <iframe
          style={{
            width: '500px',
            height: '350px',
            scrolling: 'no',
            border: 0,
          }}
          src={v['theta_urls'][0]}
          allowFullScreen=""
        />
      ))}
    </div>
  );
}

export async function getServerSideProps(context) {
  const result = await fetch(
    'https://hackathon.stg-prtimes.net/ricoh360/1?token=e7zCG8N0sl5y'
  );
  const data = await result.json();

  return {
    props: {
      data,
    }, // will be passed to the page component as props
  };
}
