class AddColumnToListing < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :title, :string
  end
end
