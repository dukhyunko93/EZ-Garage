class AddLatLngColumnToListing < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :latitude, :decimal
    add_column :listings, :longitude, :decimal
  end
end
