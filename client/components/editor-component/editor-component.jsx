import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "antd/dist/antd.css";
import "react-quill/dist/quill.snow.css";
import "./styles.css";

class Component extends React.Component {

	constructor(props) {
		super(props);
		this.imageHandler = () => {
			const range = this.quillRef.getEditor().getSelection();
			const url = prompt("Enter or paste the image URL");
			if (url)
				this.quillRef.getEditor().insertEmbed(range.index, 'image', url);
		}
	}

	render() {
		var icons = Quill.import("ui/icons");
		icons["imageEmbed"] = "<img src='/assets/images/magnifying-glass.png' width='18' height='18'/>";

		return (
			<React.Fragment>
				<ReactQuill
					ref={(el) => this.quillRef = el}
					theme="snow"
					modules={{
						toolbar: {
							container: [
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
									"imageEmbed",
									"video"
									],
								[
									"clean"
								]
							],
							handlers: {
								'imageEmbed': this.imageHandler
							}
						}
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
