class Listing < ApplicationRecord

    include Rails.application.routes.url_helpers
    
    has_one_attached :featured_image

    validates_uniqueness_of :address
    # belongs_to :user
    belongs_to :owner, :class_name => "User"
    has_many :reservations

    def get_featured_image_url
        url_for(self.featured_image)
    end
end
