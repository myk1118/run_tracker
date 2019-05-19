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
        <td><TableModal deleteRow={props.deleteRow} id={id}/></td>
      </Fragment>
  )
}
