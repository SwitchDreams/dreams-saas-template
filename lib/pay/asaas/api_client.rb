module Pay::Asaas::Client
  API_KEY = ENV.fetch("ASAAS_API_KEY")
  DEFAULT_PAYMENT_URL = ENV.fetch("ASAAS_API_URL", default: "https://sandbox.asaas.com/api")

  def self.create_client!(client_params)
    body = {
      **client_params,
      notificationDisabled: true,
    }.to_json
    response = HTTParty.post("#{@base_url}/v3/customers", headers: @default_headers, body: body, format: :json)
    error_handler(response)

    response
  end

  def self.find_client!(id:)
    response = HTTParty.get("#{@base_url}/v3/customers/#{id}", headers: @default_headers, format: :json)
    error_handler(response)

    response

  end

  def self.error_handler(response)
    if response.code != 200
      if response["errors"].present?
        raise response["errors"].first["description"]
      else
        raise "Ocorreu um erro não identificado na requisição. Por favor, tente novamente mais tarde."
      end
    end
  end
end