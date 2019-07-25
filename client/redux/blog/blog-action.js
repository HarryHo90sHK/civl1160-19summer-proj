export class BlogAction {

	static POST = "BlogAction/POST";
	static POST_SUCCESS = "BlogAction/POST-SUCCESS";
	static EDIT = "BlogAction/EDIT";
	static EDIT_SUCCESS = "BlogAction/EDIT-SUCCESS";
	static REMOVE = "BlogAction/REMOVE";
	static REMOVE_SUCCESS = "BlogAction/REMOVE-SUCCESS";

	static post = (quill, title, categories, author) => {
		return {
			type: BlogAction.POST,
			payload: {
				quill: quill,
				title: (title && title !== "") ? title : "Untitled",
				categories: (Array.isArray(categories) ? categories : []),
				author: (author && author !== "") ? author : "anonymous"
			}
		};
	};

	static postSuccess = (_id) => {
		return {
			type: BlogAction.POST_SUCCESS,
			payload: {
				_id: _id
			}
		};
	};

	static edit = (_id, quill) => {
		return {
			type: BlogAction.EDIT,
			payload: {
				_id: _id,
				quill: quill
			}
		};
	};

	static editSuccess = (_id) => {
		return {
			type: BlogAction.EDIT_SUCCESS,
			payload: {
				_id: _id
			}
		};
	};

	static remove = (_id) => {
		return {
			type: BlogAction.REMOVE,
			payload: {
				_id: _id
			}
		};
	};

	static removeSuccess = () => {
		return {
			type: BlogAction.REMOVE_SUCCESS,
			payload: {}
		};
	};

}
