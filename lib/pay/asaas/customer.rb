module Pay
  module Stripe
    class Customer < Pay::Customer
      include Pay::Routing

      has_many :charges, dependent: :destroy, class_name: "Pay::Stripe::Charge"
      has_many :payment_methods, dependent: :destroy, class_name: "Pay::Stripe::PaymentMethod"
      has_one :default_payment_method, -> { where(default: true) }, class_name: "Pay::Stripe::PaymentMethod"

      def api_record_attributes
        { email: email, name: customer_name }
      end

      def api_record
        if processor_id?
          ::Stripe::Customer.retrieve(id: processor_id)
        else
          ::Stripe::Customer.create(api_record_attributes).tap do |customer|
            update!(processor_id: customer.id, stripe_account: stripe_account)
          end
        end
      rescue ::Stripe::StripeError => e
        raise Pay::Stripe::Error, e
      end
    end
  end
end