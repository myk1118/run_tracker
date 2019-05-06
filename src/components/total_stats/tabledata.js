import React, {Fragment} from 'react';

export default props => {

  const {date, distance, time, id} = props;
  return(
      <Fragment>
        <td>{date}</td>
        <td>{distance}</td>
        <td>{time}</td>
        <td><button onClick={() => props.deleteRow(id)} className="btn btn-sm btn-outline-danger">Delete</button></td>
      </Fragment>
  )
}
