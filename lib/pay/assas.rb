# frozen_string_literal: true

module Pay
  module Asaas
    autoload :Customer, "pay/asaas/customer"
    autoload :Charge, "pay/asaas/charge"
    autoload :Error, "pay/asaas/error"
    autoload :PaymentMethod, "pay/asaas/payment_method"
  end
end
