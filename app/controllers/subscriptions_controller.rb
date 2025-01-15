# frozen_string_literal: true

class SubscriptionsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :webhook
  skip_before_action :authenticate, only: :webhook

  def index
    render inertia: "Subscriptions/Index"
  end

  def create
    result = SubscriptionService.new(Current.user).create_subscription

    if result.success?
      redirect_to subscriptions_path,
        notice: t("subscriptions.created_successfully")
    else
      redirect_to subscriptions_path,
        inertia: { errors: result.error || t("subscriptions.creation_failed") }
    end
  rescue StandardError => e
    Rails.logger.error "Subscription creation failed: #{e.message}"
    redirect_to subscriptions_path,
      inertia: { errors: t("subscriptions.creation_failed") }
  end

  def cancel
    result = SubscriptionService.new(Current.user).cancel_subscription

    if result.success?
      Current.user.cancel_subscription
      redirect_to subscriptions_path,
        notice: t("subscriptions.cancelled_successfully")
    else
      redirect_to subscriptions_path,
        inertia: { errors: result.error || t("subscriptions.cancellation_failed") }
    end
  rescue StandardError => e
    Rails.logger.error "Subscription cancellation failed: #{e.message}"
    redirect_to subscriptions_path,
      inertia: { errors: t("subscriptions.cancellation_failed") }
  end

  def webhook
    result = SubscriptionService.process_webhook(request.raw_post, request.headers)

    if result.success?
      head :ok
    else
      head :unprocessable_entity
    end
  end
end
