import { put, takeEvery, takeLatest } from "redux-saga/effects";
import { BlogAction } from "./blog-action";
import { blogs_db } from "../../../shared/collections/blogs";

const post = function* (action) {
	try {
		const _id = blogs_db.insert({
			quill: action.payload.quill,
			title: action.payload.title,
			categories: action.payload.categories,
			author: action.payload.author
		});
		yield put(BlogAction.postSuccess(_id));
	} catch (err) {

	}
};

const postSuccess = function* (action) {
	try {
		window.location = "/blogs/" + action.payload._id;
	} catch (err) {

	}
};

export const BlogSaga = function* () {
	yield takeEvery(BlogAction.POST, post);
	yield takeLatest(BlogAction.POST_SUCCESS, postSuccess);
};
