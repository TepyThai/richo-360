import React from 'react';
import css from './RightPano.module.css';
import PanoView from './PanoView';
import Link from 'next/link';
import { Tag } from '../pages/release/[companyId]/[id]';

function RightPano({ data }) {
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
    <div className={css['article_right']}>
      <PanoView data={data} />
      <div className={css['article_text_right']}>
        <Link
          href="/release/[companyId]/[id]"
          as={`/release/${data['company_id']}/${data['release_id']}`}
        >
          <h2 className={css['article_title']}>{data['title']}</h2>
        </Link>
        <span className={css['article_companyname']}>
          {data['company_name']}
        </span>
        <p class={css['article_date']}>{renderDate(data['created_at'])}</p>
        <div>
          {data['main_category_name'] && (
            <Tag>{data['main_category_name']}</Tag>
          )}
          {data['sub_category_name'] && <Tag>{data['sub_category_name']}</Tag>}
        </div>
      </div>
    </div>
  );
}

export default RightPano;
