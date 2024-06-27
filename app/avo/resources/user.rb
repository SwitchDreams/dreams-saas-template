# frozen_string_literal: true

class Avo::Resources::User < Avo::BaseResource
  self.includes = []

  def fields
    field :id, as: :id
    field :email, as: :text
    field :verified, as: :boolean
    field :role, as: :select, enum: ::User.roles
    field :sessions, as: :has_many
  end
end
