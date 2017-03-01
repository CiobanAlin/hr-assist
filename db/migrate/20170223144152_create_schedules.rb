class CreateSchedules < ActiveRecord::Migration[5.0]
  def change
    create_table :schedules do |t|
      t.string :name
      t.string :timetable
      t.integer :user_id

      t.timestamps
    end
  end
end
