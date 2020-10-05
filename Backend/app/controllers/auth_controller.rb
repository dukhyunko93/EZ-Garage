class AuthController < ApplicationController
    skip_before_action :authorized
 
    def create
      @user = User.find_by(username: user_login_params[:username])
      if @user && @user.authenticate(user_login_params[:password])
        total_earnings = 0
        @user.listings.each do |t|
          t.reservations.each do |r|
            total_earnings += r.fee
          end
        end
        token = encode_token({ user_id: @user.id })
        render json: { user: @user, jwt: token, total_earnings: total_earnings }, status: :accepted
      else
        render json: { message: 'Invalid username or password' }, status: :unauthorized
      end
    end

    def third_party
      @user = User.find_by(username: user_login_params[:username])
      if @user && @user.authenticate(user_login_params[:password])
        total_earnings = 0
        @user.listings.each do |t|
          t.reservations.each do |r|
            total_earnings += r.fee
          end
        end
        token = encode_token({ user_id: @user.id })
        render json: { user: @user, jwt: token, total_earnings: total_earnings }, status: :accepted
      else
        @new_user = User.create(user_login_params)
        token = encode_token({ user_id: @new_user.id })
        render json: { user: @new_user, jwt: token }, status: :accepted
      end
    end

    private

    def user_login_params
      params.require(:user).permit(:username, :password, :first_name, :last_name)
    end
end
