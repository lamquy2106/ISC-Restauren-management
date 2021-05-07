import React, { Component } from "react";

class Input extends Component {
  state = {};
  render() {
    const {
      type,
      id,
      label,
      labelSize,
      frmField,
      err,
      errMessage,
      inputRef,
      ...others
    } = this.props;
    const size = labelSize ? labelSize : 3;
    const classLeft = `col-sm-${size} col-form-label`;
    const classRight = `col-sm-${12 - size}`;
    const inputClass = `form-control ${err ? "is-invalid" : ""}`;
    return (
      <div className="form-group row">
        <label htmlFor={id} className={classLeft}>
          {label}
        </label>
        <div className={classRight}>
          {others["row"] > 1 ? (
            <textarea
              ref={inputRef}
              className={inputClass}
              id={id}
              {...others}
              {...frmField}
            />
          ) : (
            <input
              ref={inputRef}
              className={inputClass}
              id={id}
              type={type}
              {...others}
              {...frmField}
            />
          )}
          {err ? <div className="invalid-feedback">{errMessage}</div> : null}
        </div>
      </div>
    );
  }
}

export default Input;
