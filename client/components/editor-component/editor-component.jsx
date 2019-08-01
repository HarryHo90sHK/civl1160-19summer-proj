import React from "react";
import ReactQuill, { Quill } from "react-quill";
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
									align: ""
								},
								{
									align: "center"
								},
								{
									align: "right"
								},
								{
									align: "justify"
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

	componentDidMount() {
		Quill.register(Quill.import("attributors/style/align"), true);
		Quill.register(Quill.import("attributors/style/background"), true);
		Quill.register(Quill.import("attributors/style/color"), true);
		Quill.register(Quill.import("attributors/style/direction"), true);
		Quill.register(Quill.import("attributors/style/font"), true);
		Quill.register(Quill.import("attributors/style/size"), true);
	}

}

Component.defaultProps = {
	value: "",
	onChange: () => {
	}
};

export const EditorComponent = Component;
