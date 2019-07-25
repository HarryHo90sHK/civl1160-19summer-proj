import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, List } from "antd";
import { blogs_db } from "../../../shared/collections/blogs";
import "antd/dist/antd.css";
import { styles } from "./styles";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div style={styles.container}>
					CIVL 1160
					<Button
						style={styles.right}
						type="primary"
						onClick={() => {
							this.props.history.push("/blogs/new");
						}}
					>
						Create Blog Post
					</Button>
				</div>
				<div style={styles.container}>
					<List
						itemLayout="vertical"
						size="large"
						dataSource={this.props.Meteor.collection.blogs}
						renderItem={(item) => {
							const extract = (html) => {
								let span = document.createElement("span");
								span.innerHTML = html;
								return span.textContent || span.innerText;
							};
							return (
								<List.Item key={item._id}>
									<List.Item.Meta
										title={(
											<a href={"/blogs/view/" + item._id}>
												{item.title}
											</a>
										)}
										description={item.author}
									/>
									{extract(item.quill).substring(0, 255) + "..."}
								</List.Item>
							);
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

const Redux = connect((store) => {
	return {};
})(Tracker);

export const IndexPage = Redux;
