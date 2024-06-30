module Pay
  module Asaas
    class Charge
      attr_reader :pay_charge

      delegate :processor_id, :owner, to: :pay_charge

      def initialize(pay_charge)
        @pay_charge = pay_charge
      end

      def charge
        pay_charge
      end

      def refund!(amount_to_refund)
        raise NotImplementedError, "Refunding charges is not supported yet by the Asaas fake processor"
      end
    end
  end
end