/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { default as ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import "antd/es/input/style/index.css";
import "antd/es/notification/style/index.css";
import "antd/es/select/style/index.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import UploadImage from "../../../components/upload-image";
import { URL_UPLOAD } from "../../../constants/api";
import "./style.css";

interface Props {
    onSubmit: (values: any) => void;
    // isEditCatalog?: boolean
    fileList?: String;
    news?: {
        content?: String,
        title?: String,
        newsId?: Number,
        imageurl?: String,
        nameurl?: String,
    };
}

export default function UserForm(props: Props) {
    const { onSubmit, news } = props;
    const [state, setState] = useState({
        dataValueUpdate: {},
        image: props?.news ? props?.news.imageurl : [],
    });
    const [form] = Form.useForm();
    const history = useHistory();
    const url = `${URL_UPLOAD}`;

    useEffect(() => {
        form.setFieldsValue(props.news);
    }, [props]);

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    const uploadImg = (value: string) => {
        const urlImg = value;
        state.image.push(urlImg);
        form.setFieldsValue({ image: state.image });
    };

    const deleteImg = (value: string) => {
        const urlImg = url + value;
        const index = state.image.indexOf(urlImg);
        state.image.splice(index, 1);
        form.setFieldsValue({ image: state.image });
        // api.put(`catalogs/update/image/${props.catalog?.id}`, {
        //     image: state.image.toString(),
        // });
    };

    const convertImage = (image?: string) => {
        const data: UploadFile[] =
            image?.split(",").map((file: string, index: number) => {
                return {
                    uid: index.toString(),
                    name: `${file}`,
                    url: `${file}`,
                };
            }) || [];
        return data;
    };

    return (
        <div className="news">
            <div className="newsForm">
                <div className="newsShow">
                    <div className="userTitleContainerChangePassword">
                        <div className="userContainerChangePassword">
                            <Form
                                initialValues={props.news}
                                id="change_password"
                                onFinish={props.onSubmit}
                                form={form}
                            >
                                <Form.Item
                                    name="title"
                                    label="Title"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input your Title!",
                                        },
                                    ]}
                                >
                                    <Input placeholder="Title" />
                                </Form.Item>
                                <Form.Item
                                    label="Content"
                                    name="content"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Please input your Content!",
                                        },
                                    ]}
                                >
                                    <CKEditor
                                        editor={ClassicEditor}
                                        config={{
                                            toolbar: [
                                                "heading",
                                                "|",
                                                "bold",
                                                "italic",
                                                "link",
                                                "|",
                                                "outdent",
                                                "indent",
                                                "|",
                                                "bulletedList",
                                                "numberedList",
                                                "|",
                                                "code",
                                                "codeBlock",
                                                "|",
                                                "blockQuote",
                                                "insertTable",
                                                "mediaEmbed",
                                                "|",
                                                "undo",
                                                "redo",
                                            ],
                                        }}
                                        data={props.news?.content || ""}
                                        onReady={(editor) => {}}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            form.setFieldsValue({
                                                content: data,
                                            });
                                        }}
                                        onBlur={(event, editor) => {}}
                                        onFocus={(event, editor) => {}}
                                    />
                                </Form.Item>
                                <Form.Item
                                    valuePropName=""
                                    label="Image"
                                    name="imageurl"
                                    // rules={[{ required: props.isEditCatalog ? false : true, message: 'Please add your Images!' }]}
                                >
                                    <UploadImage
                                        // fileListImage={[]}
                                        fileListImage={
                                            props?.news
                                                ? convertImage(
                                                      props.news.imageurl
                                                  )
                                                : []
                                        }
                                        customRequest={(option) =>
                                            uploadImg(option)
                                        }
                                        onRemove={(option) => deleteImg(option)}
                                    />
                                </Form.Item>
                                <div className="columns">
                                    <button className="userUpdateButton small">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
