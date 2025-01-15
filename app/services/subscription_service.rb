# frozen_string_literal: true

class SubscriptionService
  Result = Struct.new(:success?, :error)

  def initialize(user)
    @user = user
  end

  def create_subscription
    response = HTTP.auth("Bearer #{Polar.api_key}")
      .post("#{Polar.api_base_url}/subscriptions", json: {
        user_id: @user.id,
        email: @user.email,
        amount: Polar::SUBSCRIPTION_PRICE_BRL,
        currency: Polar::SUBSCRIPTION_CURRENCY,
        interval: "month"
      })

    if response.status.success?
      data = JSON.parse(response.body.to_s)
      @user.update!(
        subscription_id: data["id"],
        subscription_status: :active,
        subscription_ends_at: Time.current + 1.month
      )
      Result.new(true)
    else
      Result.new(false, "Failed to create subscription: #{response.status}")
    end
  rescue StandardError => e
    Result.new(false, e.message)
  end

  def cancel_subscription
    return Result.new(false, "No active subscription") unless @user.subscription_id

    response = HTTP.auth("Bearer #{Polar.api_key}")
      .delete("#{Polar.api_base_url}/subscriptions/#{@user.subscription_id}")

    if response.status.success?
      Result.new(true)
    else
      Result.new(false, "Failed to cancel subscription: #{response.status}")
    end
  rescue StandardError => e
    Result.new(false, e.message)
  end

  def self.process_webhook(payload, headers)
    return Result.new(false, "Invalid signature") unless valid_signature?(payload, headers)

    begin
      data = JSON.parse(payload)
      process_webhook_event(data)
      Result.new(true)
    rescue JSON::ParserError
      Result.new(false, "Invalid JSON payload")
    rescue StandardError => e
      Result.new(false, e.message)
    end
  end

  private

  def self.process_webhook_event(data)
    case data["type"]
    when "subscription.created"
      process_subscription_created(data)
    when "subscription.cancelled"
      process_subscription_cancelled(data)
    when "subscription.renewed"
      process_subscription_renewed(data)
    end
  end

  def self.process_subscription_created(data)
    user = User.find(data["user_id"])
    user.update!(
      subscription_id: data["subscription_id"],
      subscription_status: :active,
      subscription_ends_at: Time.parse(data["valid_until"])
    )
  end

  def self.process_subscription_cancelled(data)
    user = User.find_by!(subscription_id: data["subscription_id"])
    user.update!(subscription_status: :canceled)
  end

  def self.process_subscription_renewed(data)
    user = User.find_by!(subscription_id: data["subscription_id"])
    user.update!(
      subscription_status: :active,
      subscription_ends_at: Time.parse(data["valid_until"])
    )
  end

  def self.valid_signature?(payload, headers)
    return false if Polar.webhook_secret.blank?

    signature = headers["X-Polar-Signature"]
    return false if signature.blank?

    expected = OpenSSL::HMAC.hexdigest(
      OpenSSL::Digest.new("sha256"),
      Polar.webhook_secret,
      payload
    )
    ActiveSupport::SecurityUtils.secure_compare(signature, expected)
  end
end
