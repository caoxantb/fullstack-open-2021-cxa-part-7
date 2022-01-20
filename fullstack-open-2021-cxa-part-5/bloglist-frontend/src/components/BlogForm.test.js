import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogForm";

describe("<BlogForm/>", () => {
  let component;
  const mockAddBlog = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm createBlog={mockAddBlog}></BlogForm>);
  });

  test("test title", () => {
    const title = component.container.querySelector("#title");
    const form = component.container.querySelector("form");

    fireEvent.change(title, {
      target: { value: "new title" },
    });

    fireEvent.submit(form);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
    expect(mockAddBlog.mock.calls[0][0].title).toBe("new title");
  });

  test("test author", () => {
    const author = component.container.querySelector("#author");
    const form = component.container.querySelector("form");

    fireEvent.change(author, {
      target: { value: "new author" },
    });

    fireEvent.submit(form);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
    expect(mockAddBlog.mock.calls[0][0].author).toBe("new author");
  });

  test("test url", () => {
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(url, {
      target: { value: "new url" },
    });

    fireEvent.submit(form);

    expect(mockAddBlog.mock.calls).toHaveLength(1);
    expect(mockAddBlog.mock.calls[0][0].url).toBe("new url");
  });
});
