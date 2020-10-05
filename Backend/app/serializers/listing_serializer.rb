class ListingSerializer < ActiveModel::Serializer
  attributes :id, :owner_id, :title, :address, :price, :featured_image

  def initialize(listing: nil)
    @listing = listing
  end

  def serialize_new_listing()
    serialized_new_listing = serialize_listing(@listing)
    serialized_new_listing.to_json()
  end

  def serialize_existing_listing()
    serialized_new_listing = serialize_listing(@listing)
  end
  
  private def serialize_listing(listing)
    if listing.featured_image.attached?
      { id: listing.id,
      owner_id: listing.owner_id,
      featured_image: listing.get_featured_image_url(),
      title: listing.title,
      address: listing.address,
      latitude: listing.latitude,
      longitude: listing.longitude,
      checkin: listing.checkin,
      checkout: listing.checkout,
      vehicle_types: listing.vehicle_types,
      price: listing.price}
    else
      { id: listing.id,
      owner_id: listing.owner_id,
      title: listing.title,
      address: listing.address,
      latitude: listing.latitude,
      checkin: listing.checkin,
      checkout: listing.checkout,
      longitude: listing.longitude,
      vehicle_types: listing.vehicle_types,
      price: listing.price}
    end
  end
  
end
