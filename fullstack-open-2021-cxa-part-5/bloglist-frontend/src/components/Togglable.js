import React, { useState, useImperativeHandle } from "react";
import propTypes from "prop-types";
import { Button } from "react-bootstrap";

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          className="mt-2"
          variant="primary"
          id={props.buttonShowId}
          onClick={toggleVisibility}
        >
          {props.buttonLabelShow}
        </Button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <Button
          className="ml-3"
          variant="primary"
          id={props.buttonShowId}
          onClick={toggleVisibility}
        >
          {props.buttonLabelHide}
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabelShow: propTypes.string.isRequired,
  buttonLabelHide: propTypes.string.isRequired,
  buttonShowId: propTypes.string,
};

Togglable.displayName = "Togglable";

export default Togglable;
