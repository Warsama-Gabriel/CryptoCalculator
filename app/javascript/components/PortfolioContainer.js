import React, { useState } from "react";
import axios from "axios";
import Search from "./Search";
import Calculate from "./Calculate";
import Portfolio from "./Portfolio";

function PortfolioContainer() {
  const [state, setState] = useState({
    name: "",
    portfolio: [],
    search_results: [],
    active_currency: null,
    amount: "",
  });

  // Search
  const handleChange = (e) => {
    //use prevstate to only update attributes
    //use setstate to completely wipe out and use new state
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

    axios
      .post("http://localhost:3000/search", {
        search: e.target.value,
      })
      .then((data) => {
        console.log(data);
        setState((prevState) => ({
          ...prevState,
          search_results: data.data.currencies,
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Select a currency
  // set active currency
  const handleSelect = (e) => {
    e.preventDefault();
    const selectedId = e.currentTarget.dataset.id;
    const activeCurrency = state.search_results.find(
      (item) => item.id === parseInt(selectedId)
    );
    setState({
      ...state,
      active_currency: activeCurrency,
      search_results: [],
    });
  };

  // Handle the amount
  // what user types in for amount
  //target.name is amount
  const handleAmount = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  // Submit the calculation
  const handleSubmit = (e) => {
    e.preventDefault();

    const currency = state.active_currency;
    const amount = state.amount;

    axios
      .post("http://localhost:3000/calculate", {
        id: currency.id,
        amount: amount,
      })
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          amount: "",
          name: data.data.currency.name,
          active_currency: null,
          portfolio: [...prevState.portfolio, data.data],
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const searchOrCalculate = state.active_currency ? (
    <Calculate
      active_currency={state.active_currency}
      handleSubmit={handleSubmit}
      handleChange={handleAmount}
      amount={state.amount}
    />
  ) : (
    <Search
      name={state.name}
      searchResults={state.search_results}
      handleChange={handleChange}
      handleSelect={handleSelect}
    />
  );

  return (
    <div className="grid">
      <div className="left">{searchOrCalculate}</div>
      <div className="right">
        <Portfolio portfolio={state.portfolio} />
      </div>
    </div>
  );
}

export default PortfolioContainer;
