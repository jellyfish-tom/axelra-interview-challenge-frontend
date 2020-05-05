import React, { Component } from "react";
import { Provider } from "react-redux";
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";

configure({ adapter: new Adapter() });

export const withProvider = (component: Component, store: any) => (
  <Provider store={store}>{component}</Provider>
);
