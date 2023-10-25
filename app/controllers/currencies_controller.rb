class CurrenciesController < ApplicationController

  def index
  end

  def search
    @currencies = Currency.by_name(params[:search])
    render json: { currencies: @currencies }
  end

  #take in currency id and amount owned
  #returns final calculations
  def calculate
    amount = params[:amount]
    currency_id = params[:id]
    render json: {
      currency: currency,
      current_price: currency.current_price,
      amount: amount,
      value: currency.calculate_value(amount),
    }
  end

  private

  def currency
    @currency ||= Currency.find(params[:id])
  end
end
