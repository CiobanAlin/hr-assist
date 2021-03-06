class CreateJoinTableProjectsTechnologies < ActiveRecord::Migration[5.0]
  def change
    create_join_table :projects, :technologies do |t|
      t.references :project, index: true, foreign_key: true
      t.references :technology, index: true, foreign_key: true
      # t.index [:project_id, :technology_id]
      # t.index [:technology_id, :project_id]
    end
  end
end
