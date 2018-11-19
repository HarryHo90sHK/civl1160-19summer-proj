import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Card, Icon, List } from 'antd';
import { styles } from "./styles";
import { LocaleAction } from "/client/redux/actions/locale-action";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<div
					style={styles.page}
				>
					<h1>
						{this.props.strings['welcome']}
					</h1>
					<p>
						{this.props.strings['brief']}
					</p>
					<p
						style={styles.hyperlink}
					>
						<a
							href='https://github.com/pkcwong/meteor-react-starter'
						>
							<Icon
								type="github"
							/>
							{'\t' + this.props.strings['github']}
						</a>
					</p>
					<Card
						title={this.props.strings['bundled-packages']}
					>
						<List>
							<List.Item>
								{this.props.strings['meteor']}
							</List.Item>
							<List.Item>
								{this.props.strings['react-meteor-data']}
							</List.Item>
							<List.Item>
								{this.props.strings['antd']}
							</List.Item>
							<List.Item>
								{this.props.strings['restivus']}
							</List.Item>
							<List.Item>
								{this.props.strings['redux']}
							</List.Item>
						</List>
					</Card>
					<Card
						title={this.props.strings['demo-documents']}
					>
						<List
							dataSource={this.props.Meteor.collection.users}
							renderItem={(item) => {
								return (
									<List.Item>
										{JSON.stringify(item)}
									</List.Item>
								)
							}}
						/>
					</Card>
					<Card
						title={this.props.strings['demo-rest']}
					>
						<List.Item>
							<a
								href={'/api/meteor'}
							>
								{this.props.strings['version']}
							</a>
						</List.Item>
					</Card>
				</div>
			</React.Fragment>
		);
	}

}

const Tracker = withTracker(() => {
	Meteor.subscribe('users_db');
	return {
		Meteor: {
			collection: {
				users: Meteor.users.find().fetch()
			},
			user: Meteor.user(),
			userId: Meteor.userId(),
			status: Meteor.status(),
			loggingIn: Meteor.loggingIn()
		}
	};
})(Component);

export const DemoComponent = connect((store) => {
	return {
		logs: store['LoggerReducer']['logs'],
		strings: store['LocaleReducer']['strings']
	};
})(Tracker);
