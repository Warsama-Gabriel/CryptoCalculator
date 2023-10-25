import React from "react";

function Calculate(props) {
  return (
    <div>
      <h1>How much of {props.active_currency.name} do you own?</h1>
      <form onSubmit={props.handleSubmit}>
        <div className="form-group">
          <label>Enter Amount Owned:</label>
          <br />
          <input
            //actual handleAmount
            onChange={props.handleChange}
            autoComplete="off"
            type="text"
            name="amount"
            placeholder="How much do you own?"
            value={props.amount}
          />
        </div>
        <div className="form-group">
          <input
            onSubmit={props.handleSubmit}
            type="submit"
            className="calculate-btn"
            value="Calculate My Total"
          />
        </div>
      </form>
    </div>
  );
}

export default Calculate;
