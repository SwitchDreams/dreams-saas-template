module Pay
  module Webhooks
    class StripeController < Pay::ApplicationController
      if Rails.application.config.action_controller.default_protect_from_forgery
        skip_before_action :verify_authenticity_token
      end

      def create
        verify_access_token!(request.headers["asaas-access-token"])
        event = verified_event
        queue_event(event) if event.livemode || Pay::Stripe.webhook_receive_test_events
        head :ok
      rescue ::Stripe::SignatureVerificationError => e
        log_error(e)
        head :bad_request
      end

      private

      def queue_event(event)
        return unless Pay::Webhooks.delegator.listening?("asaas.#{event.type}")

        record = Pay::Webhook.create!(processor: :asaas, event_type: event.type, event: event)
        Pay::Webhooks::ProcessJob.perform_later(record)
      end

      def verify_access_token!(signature)
        secret = Pay::Assas.webhook_access_token
        return if secret == signature

        raise ::Stripe::SignatureVerificationError.new("Cannot verify signature without a Stripe signing secret", signature, http_body: payload)
      end

      def log_error(e)
        logger.error e.message
        e.backtrace.each { |line| logger.error "  #{line}" }
      end
    end
  end
end