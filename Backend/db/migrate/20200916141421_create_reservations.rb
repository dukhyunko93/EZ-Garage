class CreateReservations < ActiveRecord::Migration[6.0]
  def change
    create_table :reservations do |t|
      t.integer :renter_id
      t.integer :listing_id
      t.string :reserved_date
      t.timestamps
    end
  end
end
