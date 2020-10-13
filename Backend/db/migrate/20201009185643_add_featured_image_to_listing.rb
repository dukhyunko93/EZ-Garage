class AddFeaturedImageToListing < ActiveRecord::Migration[6.0]
  def change
    add_column :listings, :featured_image, :string
  end
end
