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
		window.location = "/blogs/view/" + action.payload._id;
	} catch (err) {

	}
};

const edit = function* (action) {
	try {
		blogs_db.update(action.payload._id, {
			$set: {
				quill: action.payload.quill
			}
		});
		yield put(BlogAction.editSuccess(action.payload._id));
	} catch (err) {

	}
};

const editSuccess = function* (action) {
	try {
		window.location = "/blogs/view/" + action.payload._id;
	} catch (err) {

	}
};

const remove = function* (action) {
	try {
		blogs_db.remove(action.payload._id);
		yield put(BlogAction.removeSuccess());
	} catch (err) {

	}
};

const removeSuccess = function* () {
	try {
		window.location = "/";
	} catch (err) {

	}
};

export const BlogSaga = function* () {
	yield takeEvery(BlogAction.POST, post);
	yield takeLatest(BlogAction.POST_SUCCESS, postSuccess);
	yield takeEvery(BlogAction.EDIT, edit);
	yield takeLatest(BlogAction.EDIT_SUCCESS, editSuccess);
	yield takeEvery(BlogAction.REMOVE, remove);
	yield takeLatest(BlogAction.REMOVE_SUCCESS, removeSuccess);
};
