import React, {Fragment} from 'react';
import TableModal from './modal/table_modal';

export default props => {

  const {date, distance, calories, time, id} = props;
  return(
      <Fragment>
        <td>{date}</td>
        <td>{distance}</td>
        <td>{time}</td>
        <td className="calories-data">{calories}</td>
        <td><TableModal displayActivityLogData={props.displayActivityLogData} id={id}/></td>
      </Fragment>
  )
}
