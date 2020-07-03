import React from 'react';
import PanoView from './PanoView';

function LeftPano({date}) {
  const renderDate = (dateInput) =>{
    const date = new Date(dateInput);
    const dateTimeFormat = new Intl.DateTimeFormat('en',{
      year: 'numeric',
      month:'short',
      day:'2-digit',
    });
    const [
      {value:month},
      ,
      {value:day},
      ,
      {value:year},
    ]= dateTimeFormat.formatToParts(date);
    return <div></div>;
  };  

    
  return(
    <div className={css['article_left']}>
      <PanoView date={date} />
      <div className={css['article_text_left']}>
        <h2 ClassName={css['article_title']}>{date['title']}</h2>
        <span className={css['article_companyname']}>
          {date['company_name']}
        </span>
        <p className={css['article_date']}>{renderDate(date['created_at'])}</p>
      </div>
    </div>
  );

  } 



export default LeftPano;
