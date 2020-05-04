import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { AuthState } from "../../reducers/auth/types";
import { RootState } from "../../reducers/store";
import { Spinner } from "../../layout/UI/Spinners/Spinner";
import { __COLORS } from "../../layout/Theme";
import Board from "./components/Board";
import { TopBar } from "../../components/TopBar";

const Container = styled.div``;

export const Challenge = () => {
  const { auth }: { auth: AuthState } = useSelector(
    (state: RootState) => state
  );

  return (
    <Container>
      {auth.loading ? (
        <Spinner color={__COLORS.SECONDARY}></Spinner>
      ) : (
        <>
          <TopBar></TopBar>
          <Board></Board>
        </>
      )}
    </Container>
  );
};
