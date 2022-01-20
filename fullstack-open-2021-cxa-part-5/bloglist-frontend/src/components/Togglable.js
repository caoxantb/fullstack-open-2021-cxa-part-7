import React, { useState, useImperativeHandle } from "react";
import propTypes from "prop-types";

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
        <button id={props.buttonShowId} onClick={toggleVisibility}>
          {props.buttonLabelShow}
        </button>
      </div>
      <div style={showWhenVisible} className="togglableContent">
        {props.children}
        <button onClick={toggleVisibility}>{props.buttonLabelHide}</button>
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
