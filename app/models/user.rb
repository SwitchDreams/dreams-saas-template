# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  generates_token_for :email_verification, expires_in: 2.days do
    email
  end
  generates_token_for :password_reset, expires_in: 20.minutes do
    password_salt.last(10)
  end

  enum :role, { super_admin: 0, normal: 1 }, default: :normal
  enum :subscription_status, { none: 0, active: 1, canceled: 2 }, default: :none

  has_many :password_reset_tokens, dependent: :destroy
  has_many :sessions, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :password, allow_nil: true, length: { minimum: 6 }

  scope :active_subscribers, -> { where(subscription_status: :active) }

  normalizes :email, with: -> { _1.strip.downcase }

  before_validation if: :email_changed?, on: :update do
    self.verified = false
  end

  after_update if: :password_digest_previously_changed? do
    sessions.where.not(id: Current.session).delete_all
  end

  def subscribed?
    subscription_status != "none"
  end

  def subscription_active?
    subscription_status == "active" && (subscription_ends_at.nil? || subscription_ends_at > Time.current)
  end

  def cancel_subscription
    update(
      subscription_status: :canceled
    )
  end
end
