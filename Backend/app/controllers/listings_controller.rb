class ListingsController < ApplicationController
    skip_before_action :authorized

    def index
        listings = Listing.all
        listings_array = []
        listings.each do |t|
            listing_object = {
                reservation: t.reservations,
                listing: show_all_listings(t)
            }
            listings_array.push(listing_object)
        end
        render json: listings_array
    end

    def create
        listing = Listing.create(listing_params)
        respond_to_listing(listing)
    end

    def show
        listings = Listing.where(owner_id: params[:id])
        listings_array = []
        listings.each do |t|
            reservation_array = []
            t.reservations.each do |u|
                renter = User.find(u.renter_id)
                reservation_obj = {
                    reservation: u,
                    renter: renter
                }
                reservation_array.push(reservation_obj)
            end
            listing_object = {
                reservation: reservation_array,
                listing: show_all_listings(t)
            }
            listings_array.push(listing_object)
        end
        render json: listings_array.sort_by {|obj| obj[:listing][:title]}
    end

    def destroy
        listing = Listing.find_by(id: params[:id])
        listing.destroy()
        render json: { listing: listing, message: "Deleted"}
    end

    def update
        listing = Listing.where(id: params[:id])
        listing.update(listing_params)
    end

    private

    def listing_params
        params.permit(:owner_id, :address, :title, :price, :featured_image, :latitude, :longitude, :checkin, :checkout, :vehicle_types)
    end

    def show_all_listings(listing)
        listing_serializer = ListingSerializer.new(listing: listing)
        listing_serializer.serialize_existing_listing()
    end

    def respond_to_listing(listing)
        listing_serializer = ListingSerializer.new(listing: listing)
        render json: listing_serializer.serialize_new_listing()
    end

end
