import React from 'react';
import PanoView from './PanoView';
import css from './LeftPano.module.css';
import Link from 'next/link';

function LeftPano({ data }) {
  const renderDate = (dateInput) => {
    const date = new Date(dateInput);
    const dateTimeFormat = new Intl.DateTimeFormat('en', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
    ] = dateTimeFormat.formatToParts(date);
    return <div>{`${day}-${month}-${year}`}</div>;
  };

  return (
    <div className={css['article_left']}>
      <PanoView data={data} />
      <div className={css['article_text_left']}>
        <Link
          href="/release/[companyId]/[id]"
          as={`/release/${data['company_id']}/${data['release_id']}`}
        >
          <h2 className={css['article_title']}>{data['title']}</h2>
        </Link>
        <span className={css['article_companyname']}>
          {data['company_name']}
        </span>
        <p className={css['article_date']}>{renderDate(data['created_at'])}</p>
      </div>
    </div>
  );
}

export default LeftPano;
