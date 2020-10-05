class User < ApplicationRecord
    has_many :listings, :foreign_key => "owner_id"
    has_many :reservations, :foreign_key => "renter_id"

    has_secure_password

    validates_uniqueness_of :username

end
