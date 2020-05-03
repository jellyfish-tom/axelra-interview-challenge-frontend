import React from 'react';
import Board from './components/Board';
import { UserMenu } from '../../components/UserMenu';

export const Challenge = () => {
  return (
    <>
      <UserMenu></UserMenu>
      <h1>Axelra Trello Challenge</h1>
      <Board></Board>
    </>
  );
};
