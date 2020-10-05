class Reservation < ApplicationRecord
    belongs_to :listing
    belongs_to :renter, :class_name => "User"
end
