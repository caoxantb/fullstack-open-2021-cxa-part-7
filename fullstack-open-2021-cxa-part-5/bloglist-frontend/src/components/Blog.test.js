import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;

  const blog = {
    title: "",
    author: "",
    likes: 0,
    user: { username: "" },
  };

  const user = { username: "" };

  const mockHandler = jest.fn();

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} updateBlogLikes={mockHandler}></Blog>
    );
  });

  test("fire like button twice", () => {
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
