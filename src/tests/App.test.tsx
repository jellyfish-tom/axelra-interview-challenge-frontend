import React, { Component } from "react";
import ReactDOM, { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, configure } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import { withProvider } from "../tests/utils";
import App from "../App";

const mockStore = configureMockStore();
const store = mockStore({});

describe("App Component", () => {
  it("matches snapshot", () => {
    expect(shallow(withProvider(<App />, store))).toMatchSnapshot();
  });
  it("should render without throwing an error", () => {
    expect(shallow(withProvider(<App />, store)).exists()).toBe(true);
  });
});
