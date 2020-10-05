class ReservationsController < ApplicationController
    skip_before_action :authorized

    def show
        reservations = Reservation.where(renter_id: params[:id])
        reservations_array = []
        reservations.each do |r|
            reservation_object = {
                reservation: r,
                listing: show_all_listings(r.listing)
            }
            reservations_array.push(reservation_object)    
        end
        render json: reservations_array.sort_by {|obj| obj[:reservation][:reserved_date]}
    end

    def create
        Reservation.create(reserve_params)
    end

    def destroy
        reservation = Reservation.find_by(id: params[:id])
        reservation.destroy()
        render json: { reservation: reservation, message: "Deleted"}
    end

    private

    def reserve_params
        params.require(:reservation).permit(:renter_id, :listing_id, :reserved_date, :fee)
    end

    def show_all_listings(listing)
        listing_serializer = ListingSerializer.new(listing: listing)
        listing_serializer.serialize_existing_listing()
    end

end
