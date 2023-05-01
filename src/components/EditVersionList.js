import React from 'react';

import EditVersion from './EditVersion';
import classes from './ContactsList.module.css';

const EditVersionList = (props) => {
  return (
    <ul className={classes['contacts-list']}>
      {props.editVersions.map((editVersion) => (
        <EditVersion
          key={editVersion.id}
          changeSet={editVersion.change_set}
          editedAt={editVersion.created_at}
        />
      ))}
    </ul>
  );
};

export default EditVersionList;
