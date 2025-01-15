# frozen_string_literal: true

class AddSubscriptionFieldsToUsers < ActiveRecord::Migration[7.2]
  def change
    add_column :users, :subscription_status, :integer, null: false, default: 0
    add_column :users, :subscription_id, :string
    add_column :users, :subscription_ends_at, :datetime

    add_index :users, :subscription_id
    add_index :users, :subscription_status
  end
end
