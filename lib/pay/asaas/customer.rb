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
          update!(processor_id: customer_response["id"]) # TODO is not updating
          customer_response
        end
      rescue => e
        # TODO: Handle error better
        Rails.logger.error "[Pay] Error creating Asaas customer: #{e.message}"
        #raise Pay::Stripe::Error, e
      end


      # Charges an amount to the customer's default payment method
      def charge(amount, options = {})
        transaction = ApiClient.create_pix_charge!(
          processor_id: processor_id,
          amount: amount,
          other_params: options)

        attrs = {
          amount: transaction.details.totals.grand_total,
          created_at: transaction.created_at,
          currency: transaction.currency_code,
          metadata: transaction.details.line_items&.first&.id
        }

        charge = charges.find_or_initialize_by(processor_id: transaction.id)
        charge.update(attrs)
        charge
      rescue StandardError => e
        raise Pay::Assas::Error, e
      end
    end

    private

    ### Stripe extras

    # Creates and returns a Stripe::PaymentIntent
    def create_payment_intent(amount, options = {})
      args = {
        amount: amount,
        currency: "usd",
        customer: processor_id || api_record.id,
        expand: ["latest_charge.refunds"],
        return_url: root_url
      }.merge(options)

      ::Stripe::PaymentIntent.create(args, stripe_options)
    end
  end
end