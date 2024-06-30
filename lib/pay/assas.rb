# frozen_string_literal: true

module Pay
  module Asaas
    autoload :Billable, "pay/asaas/billable"
    autoload :Charge, "pay/asaas/charge"
    autoload :Error, "pay/asaas/error"
    autoload :PaymentMethod, "pay/asaas/payment_method"
    autoload :Subscription, "pay/asaas/subscription"
    autoload :Merchant, "pay/asaas/merchant"
  end
end
