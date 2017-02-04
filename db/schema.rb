# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170130044508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "image_id"
    t.text     "comment"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "dialogs", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "opponent_id"
    t.string   "message",     default: [],              array: true
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "summessage1", default: [],              array: true
    t.integer  "summessage",  default: 0
  end

  create_table "images", force: :cascade do |t|
    t.integer  "user_id",                  null: false
    t.string   "avatar",                   null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "description"
    t.string   "like",        default: [],              array: true
    t.hstore   "comment"
  end

  add_index "images", ["comment"], name: "index_images_on_comment", using: :gin

  create_table "users", force: :cascade do |t|
    t.string   "email",                        null: false
    t.string   "name"
    t.string   "password_digest",              null: false
    t.text     "description"
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "avatar"
    t.string   "follow",          default: [],              array: true
    t.string   "subscribers",     default: [],              array: true
  end

end
