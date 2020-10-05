class UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]
  
    def profile
        total_earnings = 0
        current_user.listings.each do |t|
          t.reservations.each do |r|
            total_earnings += r.fee
          end
        end
        render json: { user: current_user, total_earnings: total_earnings }, status: :accepted
    end
    
    def create
        @user = User.create(user_params)
        if @user.valid?
          @token = encode_token(user_id: @user.id)
          render json: { user: @user, jwt: @token , created: 'successful'}, status: :created
        else
          render json: { error: 'failed to create user' }, status: :not_acceptable
        end
    end


     
      private
      def user_params
        params.require(:user).permit(:username, :password, :first_name, :last_name)
      end

end
