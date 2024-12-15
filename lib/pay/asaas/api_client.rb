# frozen_string_literal: true

module Pay::Asaas::ApiClient
  API_KEY = ENV.fetch("ASAAS_API_KEY")
  DEFAULT_PAYMENT_URL = ENV.fetch("ASAAS_API_URL", "https://sandbox.asaas.com/api")
  @base_url = DEFAULT_PAYMENT_URL
  @default_headers = { access_token: API_KEY, "Content-type": "application/json", accept: "application/json" }

  def self.create_client!(client_params)
    body = {
      **client_params,
      notificationDisabled: true,
    }.to_json
    response = HTTParty.post("#{@base_url}/v3/customers", headers: @default_headers, body: body, format: :json)
    error_handler(response)

    response.parsed_response
  end

  def self.update_client!(id:, params:)
    body = params.to_json

    response = HTTParty.put("#{@base_url}/v3/customers/#{id}", headers: @default_headers, body: body, format: :json)
    error_handler(response)

    response.parsed_response
  end

  def self.find_client!(id:)
    response = HTTParty.get("#{@base_url}/v3/customers/#{id}", headers: @default_headers, format: :json)
    error_handler(response)

    response.parsed_response
  end

  def self.create_pix_charge!(processor_id:, amount:, other_params: {})
    body = {
      "billingType": "PIX",
      "customer": processor_id,
      "value": amount.to_f / 100,
      **other_params,
    }.to_json

    response = HTTParty.post("#{@base_url}/v3/payments", headers: @default_headers, body: body, format: :json)
    error_handler(response)

    response.parsed_response
  end

  def self.error_handler(response)
    if response.code != 200
      if response["errors"].present?
        raise StandardError, response["errors"].first["description"]
      else
        Rails.logger.error "Asaas API Error: #{response.code} - #{response.body}"
        raise StandardError, "Ocorreu um erro não identificado na requisição. Por favor, tente novamente mais tarde."
      end
    end
  end
end
