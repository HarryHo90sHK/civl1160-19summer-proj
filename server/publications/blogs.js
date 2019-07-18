import { Meteor } from "meteor/meteor";
import { blogs_db } from "../../shared/collections/blogs";

Meteor.publish("blogs_db", () => {
	return blogs_db.find();
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
