# frozen_string_literal: true

module Pay
  module Asaas
    class Error < Pay::Error
    end

    class ApiClientError < StandardError
    end
  end
end
