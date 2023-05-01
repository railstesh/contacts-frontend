import React from 'react';
import moment from 'moment';

import classes from './Contact.module.css';

const EditVersion = ({ editedAt, changeSet }) => {
  const timeago = moment(editedAt).fromNow();

  const attributesChanges = Object.entries(changeSet)
    .map(([key, values]) => `${key}: changed from "${values[0]}" to "${values[1]}"`);

  return (
    <li className={classes.contact}>
      <span>{attributesChanges.map(attr => <li>{attr}</li>)}</span>
      <p>Edited at: {timeago}</p>
    </li>
  );
};

export default EditVersion;
