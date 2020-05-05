import React, { Component } from "react";
import ReactDOM, { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { shallow, configure, mount } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Adapter from "enzyme-adapter-react-16";

import { withProvider } from "../../../tests/utils";
import { LoginPage } from "..//LoginPage";
import { Spinner } from "../../../layout/UI/Spinners/Spinner";
import { __COLORS } from "../../../layout/Theme";

const mockStore = configureMockStore();

describe("App Component", () => {
  it("matches snapshot", () => {
    expect(
      shallow(withProvider(<LoginPage />, mockStore({})))
    ).toMatchSnapshot();
  });

  it("should render without throwing an error", () => {
    expect(shallow(withProvider(<LoginPage />, mockStore({}))).exists()).toBe(
      true
    );
  });

  it("should not render spinner on initial render", () => {
    expect(
      shallow(withProvider(<LoginPage />, mockStore({}))).exists(
        <Spinner color={__COLORS.BLACK} />
      )
    ).toBe(false);
  });

  it("should not render spinner when on of spinner conditional rendering values not as expected", () => {
    const store = mockStore({ auth: { loading: true } });

    const wrapper = mount(withProvider(<LoginPage />, store));

    const emailInput = wrapper.find("input").at(0);
    const passwordInput = wrapper.find("input").at(1);

    emailInput.simulate("change", { target: { value: "" } }); // EMPTY EMAIL
    passwordInput.simulate("change", { target: { value: "password" } });

    expect(
      wrapper.containsMatchingElement(<Spinner color={__COLORS.SECONDARY} />)
    ).toBe(false);
  });

  it("should render spinner when auth.loading true and loading with component.state.email and component.state.password not empty", () => {
    const store = mockStore({ auth: { loading: true } });

    const wrapper = mount(withProvider(<LoginPage />, store));

    const emailInput = wrapper.find("input").at(0);
    const passwordInput = wrapper.find("input").at(1);

    emailInput.simulate("change", { target: { value: "email" } });
    passwordInput.simulate("change", { target: { value: "password" } });

    expect(
      wrapper.containsMatchingElement(<Spinner color={__COLORS.SECONDARY} />)
    ).toBe(true);
  });

  it("renders 'Not registered yet?' call to action initially", () => {
    const store = mockStore({ auth: { loading: true } });

    const wrapper = mount(withProvider(<LoginPage />, store));

    const callToAction = wrapper.find("span").at(0);
    expect(callToAction.html().includes("Not registered yet?")).toBe(true);
  });

  it("renders 'Go back to login' after 'Not registered yet?' call to action clicked", () => {
    const store = mockStore({ auth: { loading: true } });

    const wrapper = mount(withProvider(<LoginPage />, store));

    const callToAction = wrapper.find("span").at(0);
    callToAction.simulate("click");

    expect(callToAction.html().includes("Go back to Login")).toBe(true);
  });
});
