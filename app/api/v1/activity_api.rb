module V1
  class ActivityAPI < Grape::API
    version 'v1', using: :path
    format :json

    include RescuesAPI

    helpers do
      include AccessGranted::Rails::ControllerMethods
      include Authentication
      include Responses
      include APIHelpers

      def postParams
        ActionController::Parameters.new(params)
          .permit(:name, :description)
      end

      params :pagination do
        optional :page, type: Integer
        optional :per_page, type: Integer
      end

    end
    
    before do
      authenticate!
    end

    resource :activities do

      desc "Return all activities"
      params do
        use :pagination # aliases: includes, use_scope
      end
      get do
        getPaginatedItemsFor Activity
      end

      desc "Returns an activity"
      params do
        requires :id ,type: Integer , desc: "activity id"
      end
      get ':id' do
        authorize! :read, Activity.find(params[:id])
      end

      desc "Create new activity"
      params do
        requires :name, allow_blank: false, type: String
        requires :description, allow_blank: false, type: String
      end
      post 'new' do
        authorizeAndCreate Project postParams
      end
      
    end
  end
end
