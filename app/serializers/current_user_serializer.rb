# frozen_string_literal: true

class CurrentUserSerializer < ApplicationSerializer
  attributes :id,
    :name,
    :subscription_status,
    :subscription_ends_at
end
