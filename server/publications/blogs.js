import { Meteor } from "meteor/meteor";
import { blogs_db } from "../../shared/collections/blogs";

Meteor.publish("blogs_db", () => {
	return blogs_db.find();
});

// Publish only blogs with at least one category that is not in catArray
Meteor.publish("blogs_db_excl_only_cat", (catArray) => {
	return blogs_db.find({"categories": {
			$elemMatch: {$nin: catArray}
		}});
});

// Publish by category
Meteor.publish("blogs_db_by_cat", (cat) => {
	return blogs_db.find({"categories": {$all: [cat]}});
});

// Publish by blog
Meteor.publish("blogs_db_by_blog", (id) => {
	return blogs_db.find({"_id": id});
});

// TODO: authentication
blogs_db.allow({
	insert(userId, doc) {
		return true;
	},
	update(userId, doc, fieldNames, modifier) {
		return true;
	},
	remove(userId, doc) {
		return true;
	}
});
