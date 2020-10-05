class AddColumnsToListing < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :checkin, :string
    add_column :listings, :checkout, :string
  end
end
