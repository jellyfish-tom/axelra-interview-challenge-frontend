import React, { Component } from "react";
import ReactDOM, { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, configure, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import { withProvider } from "../../../../tests/utils";
import { TodoStatesDropdown } from "../TodoStatesDropdown";
import {
  DropdownItem,
  POSSIBLE_TODO_DROPDOWN_STATES,
  NEUTRAL_TODO_DROPDOWN_STATE,
} from "../../../../model/Dropdown";

const mockStore = configureMockStore();

const defaultProps = {
  onClick: (state: DropdownItem) => {},
  items: POSSIBLE_TODO_DROPDOWN_STATES,
  initialState: NEUTRAL_TODO_DROPDOWN_STATE,
};

describe("TodoStatesDropdown Component", () => {
  it("matches snapshot", () => {
    expect(
      shallow(
        withProvider(<TodoStatesDropdown {...defaultProps} />, mockStore({}))
      )
    ).toMatchSnapshot();
  });

  it("should render without throwing an error", () => {
    expect(
      shallow(
        withProvider(<TodoStatesDropdown {...defaultProps} />, mockStore({}))
      ).exists()
    ).toBe(true);
  });

  it("should show dropdown on 'Pick State' button hover", () => {
    const wrapper = mount(
      withProvider(<TodoStatesDropdown {...defaultProps} />, mockStore({}))
    );

    const pickStateButton = wrapper.find("button").at(0);

    // check if we found initial state button
    expect(
      pickStateButton.html().includes(NEUTRAL_TODO_DROPDOWN_STATE.label)
    ).toBe(true);
  });
});
