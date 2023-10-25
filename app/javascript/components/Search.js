import React from "react";

function Search(props) {
  const searchResults = props.searchResults.map((curr) => (
    <li
      key={curr.id}
      data-id={curr.id}
      onClick={props.handleSelect}
      className="currency-list-item"
    >
      <a href="#" className="currency">
        <span>
          {curr.name} {curr.currency_symbol}
        </span>
      </a>
    </li>
  ));
  return (
    <div>
      <h1>CryptoCurrency Portfolio Calculator</h1>
      <form>
        <div className="form-group">
          <label>Search for a Currency:</label>
          <br></br>
          <input
            onChange={props.handleChange}
            autoComplete="off"
            type="text"
            name="name"
            placeholder="BTC, Ethereum, Litecoin, etc.."
            value={props.name}
            className="field"
          />
          <div className="currency-list">{searchResults}</div>
        </div>
      </form>
    </div>
  );
}

export default Search;
