class CreateListings < ActiveRecord::Migration[6.0]
  def change
    create_table :listings do |t|
      t.integer :owner_id
      t.string :address
      t.integer :price
      t.timestamps
    end
  end
end
