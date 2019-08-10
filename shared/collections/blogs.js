import { Mongo } from "meteor/mongo";

Blogs = new Mongo.Collection("blogs");
BlogsExtract = new Mongo.Collection("blogs_extract");

export const blogs_db = Blogs;
export const blogs_extr_db = BlogsExtract;
