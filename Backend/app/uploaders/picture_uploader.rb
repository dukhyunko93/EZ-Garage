class PictureUploader < CarrierWave::Uploader::Base

  include Cloudinary::CarrierWave

  process :convert => 'png'
  process :tags => ['listing_picture']

end