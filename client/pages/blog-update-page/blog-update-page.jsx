import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, PageHeader } from "antd";
import { EditorComponent } from "../../components/editor-component/editor-component";
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";
import { BlogAction } from "../../redux/blog/blog-action";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quill: ""
		};
	}

	render() {
		const blog = this.props.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		if (!blog) {
			return (
				<React.Fragment/>
			);
		}
		return (
			<React.Fragment>
				<PageHeader
					onBack={() => {
						this.props.history.push("/");
					}}
					title={(blog ? blog.title : "")}
				/>
				<div style={styles.container}>
					{
						blog.categories.map((category, index) => {
							if (index === 0) {
								return "#" + category;
							}
							return " #" + category;
						})
					}
				</div>
				<div style={styles.container}>
					<EditorComponent
						value={this.state.quill}
						onChange={(value) => {
							this.setState({
								quill: value
							});
						}}
					/>
				</div>
				<div style={styles.container}>
					<Button
						type="primary"
						onClick={() => {
							const quill = this.state.quill;
							this.props.dispatch(BlogAction.edit(this.props.match.params._id, quill));
						}}
					>
						Submit
					</Button>
				</div>
			</React.Fragment>
		);
	}

	componentDidMount() {
		const blog = this.props.Meteor.collection.blogs.find((blog) => {
			return (blog._id === this.props.match.params._id);
		});
		if (blog) {
			this.setState({
				quill: blog.quill
			});
		}
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe("blogs_db");
	return {
		Meteor: {
			collection: {
				blogs: blogs_db.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

const Redux = connect(() => {
	return {};
})(Tracker);

export const BlogUpdatePage = Redux;
