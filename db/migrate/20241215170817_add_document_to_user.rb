class AddDocumentToUser < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :document, :string, null: true
  end
end
