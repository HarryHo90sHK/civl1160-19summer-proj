import React from "react";
import ReactQuill from "react-quill";
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

class Component extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<React.Fragment>
				<ReactQuill
					theme="snow"
					modules={{
						toolbar: [
							[
								{
									header: [
										1,
										2,
										3,
										false
									]
								}
							],
							[
								"bold",
								"italic",
								"underline"
							],
							[
								{
									list: "bullet"
								},
								{
									list: "ordered"
								}
							],
							[
								{
									indent: "+1"
								},
								{
									indent: "-1"
								}
							],
							[
								"link",
								"image",
								"video"
							],
							[
								"clean"
							]
						]
					}}
					value={this.props.value}
					onChange={(value) => {
						this.props.onChange(value);
					}}
				/>
			</React.Fragment>
		);
	}

}

Component.defaultProps = {
	value: "",
	onChange: () => {
	}
};

export const EditorComponent = Component;
