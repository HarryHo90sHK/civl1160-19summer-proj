import React from "react";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import { Button, Input, message, PageHeader } from "antd";
import { EditorComponent } from "../../components/editor-component/editor-component";
import { BlogAction } from "../../redux/blog/blog-action";
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
		return (
			<React.Fragment>
				<PageHeader
					onBack={() => {
						this.props.history.push("/");
					}}
					title="Create Blog Post"
				/>
				<div style={styles.container}>
					<Input
						style={styles.input}
						placeholder="Title"
						value={this.state.title}
						onChange={(e) => {
							this.setState({
								title: e.target.value
							});
						}}
					/>
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
					<Input
						style={styles.input}
						placeholder="Author"
						value={this.state.author}
						onChange={(e) => {
							this.setState({
								author: e.target.value
							});
						}}
					/>
				</div>
				<div style={styles.container}>
					<Button
						type="primary"
						onClick={() => {
							const quill = this.state.quill;
							const title = this.state.title;
							const author = this.state.author;
							if (title === "") {
								message.info("Title cannot be blank.");
								return;
							}
							this.props.dispatch(BlogAction.post(quill, title, author));
						}}
					>
						Submit
					</Button>
				</div>
			</React.Fragment>
		);
	}

}

const Tracker = withTracker(() => {
	return {
		Meteor: {
			collection: {},
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

export const CreatePage = Redux;
