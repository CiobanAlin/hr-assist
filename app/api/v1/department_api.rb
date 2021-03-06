module V1
  class DepartmentAPI < Grape::API
    version 'v1', using: :path
    format :json

    include RescuesAPI

    helpers do
      include AccessGranted::Rails::ControllerMethods
      include Authentication
      include Responses
      include APIHelpers

      def post_params
        ActionController::Parameters.new(params).permit(:name, :description)
      end

      params :pagination do
        optional :page, type: Integer
        optional :per_page, type: Integer
      end

    end

    before do
      authorize_admin!
    end

    resource :departments do

      desc "Get all departments"
      params do
        use :pagination # aliases: includes, use_scope
      end
      get do
        get_paginated_items_for Department
      end

      desc "Get department"
      params do
        requires :id, type: Integer , desc: "Department id"
      end
      get ':id' do
        authorize! :read, Department.find(params[:id])
      end

      desc "Create new department"
      params do
        requires :name, allow_blank: false, type: String
        requires :description, allow_blank: false, type: String
      end
      post 'new' do
        authorize_and_create(Department, post_params)
      end

      desc "Update department"
      params do
        optional :name, allow_blank: false, type: String
        optional :description, allow_blank: false, type: String
      end
      put ':id' do
        department = Department.find(params[:id])
        authorize!(:update, Department)
        department.update(post_params)
        success
      end

      desc "Delete department"
      delete ':id' do
        Department.find(params[:id]).destroy
      end
    end
  end
end
