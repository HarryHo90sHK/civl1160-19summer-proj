export class BlogAction {

	static POST = "BlogAction/POST";
	static POST_SUCCESS = "BlogAction/POST-SUCCESS";

	static post = (quill, title, author) => {
		return {
			type: BlogAction.POST,
			payload: {
				quill: quill,
				title: (title && title !== "") ? title : "Untitled",
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

}
