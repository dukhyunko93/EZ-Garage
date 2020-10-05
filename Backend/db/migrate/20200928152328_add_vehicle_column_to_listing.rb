class AddVehicleColumnToListing < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :vehicle_types, :string
  end
end
