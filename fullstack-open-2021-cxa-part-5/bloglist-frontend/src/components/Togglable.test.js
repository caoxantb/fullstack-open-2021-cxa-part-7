import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Togglable from "./Togglable";

describe("<Togglable/>", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Togglable buttonLabelShow="show" buttonLabelHide="hide">
        <div className="testDiv"></div>
      </Togglable>
    );
  });

  test("renders children", () => {
    expect(component.container.querySelector(".testDiv")).not.toBe(null);
  });

  test("does not initially display children", () => {
    const div = component.container.querySelector(".togglableContent");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, children are displayed", () => {
    const button = component.getByText("show");
    fireEvent.click(button);

    const div = component.container.querySelector(".togglableContent");
    expect(div).not.toHaveStyle("display: none");
  });
});
