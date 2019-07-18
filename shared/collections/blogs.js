import { Mongo } from "meteor/mongo";

Blogs = new Mongo.Collection("blogs");

export const blogs_db = Blogs;
