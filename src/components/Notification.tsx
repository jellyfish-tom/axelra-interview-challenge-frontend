import React from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { NotificationState } from '../reducers/notification/types';
import {
  hideNotification,
  HideNotification,
} from '../reducers/notification/actions';
import { __ALERTS } from '../layout/Theme';

const BackgroundColor = styled.div`
  &.error {
    background: ${__ALERTS.ERROR};
  }
  &.success {
    background: ${__ALERTS.SUCCESS};
  }
  &.info {
    background: ${__ALERTS.INFO};
  }
  &.warning {
    background: ${__ALERTS.WARNING};
  }
`;

// TODO: check responsiveness
const Container = styled(BackgroundColor)`
  min-height: 35px;
  max-width: 500px;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-sizing: border-box;
  font-size: 14px;
  left: 0;
  position: absolute;
  right: 0;
  top: -35px;
  margin: 0 auto;
  transition: top 0.5s;
  background: white;
  display: flex;

  &.visible {
    top: 0;
  }
`;

const Message = styled(BackgroundColor)`
  display: flex;
  width: calc(100% - 20px);
  min-height: 35px;
  padding: 10px;
  color: white;
  box-sizing: border-box;
`;

const Close = styled.span`
  cursor: pointer;
  width: 20px;
  display: flex;
  align-items: center;
  font-weight: bold;
  display: none;

  &.displayed {
    display: flex;
  }
`;

const UnconnectedNotification = (props: {
  hideNotification: HideNotification;
}) => {
  const { notification }: { notification: NotificationState } = useSelector(
    (state: RootState) => state
  );
  const { hideNotification } = props;

  const isNotificationVisible = () => {
    const { error, warning, info, success } = notification;

    return error || warning || info || success;
  };

  const isDisplayable = () => {
    return (
      (notification.error && 'error') ||
      (notification.warning && 'warning') ||
      (notification.info && 'info') ||
      (notification.success && 'success')
    );
  };

  const getContainerClassName = () => {
    const visibleClass = `${isNotificationVisible() && 'visible'}`;
    const backgroundClass = isDisplayable();

    return `${visibleClass} ${backgroundClass}`;
  };

  return (
    <Container className={getContainerClassName()}>
      {notification.error && (
        <Message className="error">{notification.error}</Message>
      )}
      {notification.warning && (
        <Message className="warning">{notification.warning}</Message>
      )}
      {notification.info && (
        <Message className="info">{notification.info}</Message>
      )}
      {notification.success && (
        <Message className="success">{notification.success}</Message>
      )}
      <Close
        className={`${isDisplayable() && 'displayed'}`}
        onClick={hideNotification}
      >
        X
      </Close>
    </Container>
  );
};

export const Notification = connect(null, {
  hideNotification,
})(UnconnectedNotification);
