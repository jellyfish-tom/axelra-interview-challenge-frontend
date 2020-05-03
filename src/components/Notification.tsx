import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { ActionTypes, NotificationState } from '../reducers/notification/types';
import {
  hideNotification,
  HideNotification,
} from '../reducers/notification/actions';
import { __ALERTS } from '../layout/Theme';

// TODO: check responsiveness
const Container = styled.div`
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
  transition: all 1s;
  background: white;

  &.visible {
    top: 0;
  }
`;

const Message = styled.div`
  width: 100%;
  height: 35px;
  padding: 10px;
  color: white;
  box-sizing: border-box;

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

const hideAfterMilis = 3000;

const UnconnectedNotification = (props: {
  hideNotification: HideNotification;
}) => {
  const { notification }: { notification: NotificationState } = useSelector(
    (state: RootState) => state
  );
  const { hideNotification } = props;

  useEffect(() => {
    setTimeout(hideNotification, hideAfterMilis);
  }, [hideNotification]);

  const isNotificationVisible = () => {
    const { error, warning, info, success } = notification;

    return error || warning || info || success;
  };

  return (
    <Container className={`${isNotificationVisible() && 'visible'}`}>
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
    </Container>
  );
};

export const Notification = connect(null, {
  hideNotification,
})(UnconnectedNotification);
