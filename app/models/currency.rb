class Currency < ApplicationRecord
  include HTTParty

  base_uri 'https://pro-api.coinmarketcap.com/v1/'

  API_KEY = Rails.application.credentials.api_key.dig(:development)

  scope :by_name, ->(name) {
    where('LOWER(name) LIKE ?', "%#{name&.downcase}%")
  }

  def calculate_value(amount)
    (current_price * amount.to_f).round(4)
  end

  def current_price
    request = fetch_currency_data
    response = JSON.parse(request.body)['data'].values.first.dig('quote', 'USD', 'price')
    response.to_f
  end

  private

  def fetch_currency_data
    url = "/cryptocurrency/quotes/latest?slug=#{slug}"
    self.class.get(url, headers: { 'X-CMC_PRO_API_KEY' => API_KEY })
  end
end
