# frozen_string_literal: true

class Avo::Resources::User < Avo::BaseResource
  self.includes = []

  def fields
    field :id, as: :id
    field :email, as: :text
    field :name, as: :text
    field :verified, as: :boolean
    field :role, as: :select, enum: ::User.roles
  end
end
