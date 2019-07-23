import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { PageHeader } from "antd";
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			quill: "",
			title: "",
			author: ""
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
					<div
						dangerouslySetInnerHTML={{
							__html: blog ? blog.quill : ""
						}}
					/>
				</div>
			</React.Fragment>
		);
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

export const BlogPage = Redux;
