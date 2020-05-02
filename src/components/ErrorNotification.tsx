import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { RootState } from '../reducers/store';
import { ActionTypes, ErrorState } from '../reducers/error/types';
import { hideError, HideError } from '../reducers/error/actions';

const UnconnectedErrorNotification = (props: { hideError: HideError }) => {
  const { error }: { error: ErrorState } = useSelector(
    (state: RootState) => state
  );
  const { hideError } = props;

  useEffect(() => {
    setTimeout(hideError, 3000);
  }, [hideError]);

  return (
    <>
      {error && error.isOpen && error.error && (
        <div>
          <span>{error.error}</span>
        </div>
      )}
    </>
  );
};

export const ErrorNotification = connect(null, {
  hideError,
})(UnconnectedErrorNotification);
