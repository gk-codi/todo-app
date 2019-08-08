import React, { Component } from 'react';
import EditButton from 'react-edit-button';

const Edit = props => {
  return (
    <div>
      <EditButton
        onAccept={value => {
          props.handleOnTitleAccept(props.task.id, value);
        }}>
        <span>{props.task.title}</span>
      </EditButton>

      <EditButton
        onAccept={value => {
          props.handleOnTypeAccept(props.task.id, value);
        }}>
        <span>{props.task.type}</span>
      </EditButton>

      <EditButton
        onAccept={value => {
          props.handleOnDescriptionAccept(props.task.id, value);
        }}>
        <span>{props.task.description}</span>
      </EditButton>
    </div>
  );
};
export default Edit;
