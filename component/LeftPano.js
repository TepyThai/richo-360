import React from 'react';
import PanoView from './PanoView';
import css from './LeftPano.module.css';

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
        <h2 ClassName={css['article_title']}>{data['title']}</h2>
        <span className={css['article_companyname']}>
          {data['company_name']}
        </span>
        <p className={css['article_date']}>{renderDate(data['created_at'])}</p>
      </div>
    </div>
  );
}

export default LeftPano;
