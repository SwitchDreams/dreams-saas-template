# frozen_string_literal: true

class AddRoleToUser < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :role, :integer, limit: 1, default: 1, null: false
  end
end
