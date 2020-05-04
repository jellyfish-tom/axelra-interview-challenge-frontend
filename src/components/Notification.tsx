import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { NotificationState } from '../reducers/notification/types';
import {
  clearNotification,
  ClearNotification,
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
  top: -300px;
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

const UnconnectedNotification = (props: {
  clearNotification: ClearNotification;
}) => {
  const { notification }: { notification: NotificationState } = useSelector(
    (state: RootState) => state
  );
  const { clearNotification } = props;
  const [notificationVisible, setNotificationVisible] = useState(false);
  const { error, warning, info, success } = notification;

  const [slideUpTimeout, setSlideUpTimeout] = useState();
  const [clearNotificationTimeout, setClearNotificationTimeout] = useState();

  useEffect(() => {
    if (error || warning || info || success) {
      setNotificationVisible(true);
      clearTimeout(slideUpTimeout);
      clearTimeout(clearNotificationTimeout);

      const _slideUpTimeout = setTimeout(() => {
        setNotificationVisible(false);

        const _clearNotificationTimeout = setTimeout(() => {
          clearNotification();
        }, 700);

        setClearNotificationTimeout(_clearNotificationTimeout);
      }, 3000);

      setSlideUpTimeout(_slideUpTimeout);
    }
  }, [error, warning, info, success]);

  return (
    <Container className={`${notificationVisible && 'visible'}`}>
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
  clearNotification,
})(UnconnectedNotification);
