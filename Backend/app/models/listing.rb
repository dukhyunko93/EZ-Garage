class Listing < ApplicationRecord

    # include Rails.application.routes.url_helpers
    
    # has_one_attached :featured_image
    mount_uploader :featured_image, PictureUploader

    validates_uniqueness_of :address
    # belongs_to :user
    belongs_to :owner, :class_name => "User"
    has_many :reservations

    def get_featured_image_url
        self.featured_image_url
    end
end
