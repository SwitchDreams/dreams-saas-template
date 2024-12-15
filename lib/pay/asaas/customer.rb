module Pay
  module Asaas
    class Customer < Pay::Customer

      has_many :charges, dependent: :destroy, class_name: "Pay::Asaas::Charge"
      has_many :payment_methods, dependent: :destroy, class_name: "Pay::Asaas::PaymentMethod"
      has_one :default_payment_method, -> { where(default: true) }, class_name: "Pay::Asaas::PaymentMethod"

      def api_record_attributes
        { email: email, name: customer_name }
      end

      # TODO: what to return in this method?
      def api_record
        if processor_id?
          ApiClient.find_client!(id: processor_id)
        else
          customer_response = ApiClient.create_client!(api_record_attributes)
          update!(processor_id: customer_response[:id])
        end
      rescue => e
        # TODO: Handle error better
        Rails.logger.error "[Pay] Error creating Asaas customer: #{e.message}"
        #raise Pay::Stripe::Error, e
      end
    end
  end
end