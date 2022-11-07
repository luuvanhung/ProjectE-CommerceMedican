/* eslint-disable react-hooks/exhaustive-deps */
import { FrownOutlined, SmileOutlined } from "@ant-design/icons";
import { default as ClassicEditor } from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-react";
import { Publish } from "@material-ui/icons";
import { default as Button } from "antd/es/button";
import "antd/es/button/style/index.css";
import { default as Form } from "antd/es/form";
import "antd/es/form/style/index.css";
import { default as Input } from "antd/es/input";
import { default as InputNumber } from "antd/es/input-number";
import "antd/es/input-number/style/index.css";
import "antd/es/input/style/index.css";
import { default as notification } from "antd/es/notification";
import "antd/es/notification/style/index.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "./../../constants/api";
import "./product.css";

export default function Product() {
    const [state, setState] = useState({
        productDetail: "",
        dataDescription: "",
        dataAttribute: {},
        dataValueUpdate: {},
    });
    const path: Path = useParams();
    const [form] = Form.useForm();

    async function getDataList() {
        try {
            const response = await api.get(`/product/${path.id}`);
            const { data: productDetail } = response;
            const { description: productDescription } = response.data;
            const { attribute: dataAttribute } = response.data;
            setState((prev) => ({
                productDetail: productDetail,
                dataDescription: productDescription,
                dataAttribute: dataAttribute,
            }));
        } catch (err) {
            notification.error({
                message: "Error is occured",
                description: "No data found.",
            });
        }
    }

    const onSubmit = (values) => {
        api.put(`/product/edit-product/${path.id}`, {
            ...values,
            productId: path.id,
            attribute: {
                dimensions: `${values.width}"w + ${values.depth}"d + ${values.height}"h`,
                dimenstionsMetric: `${values.width}w + ${values.depth}d + ${values.height}h cm`,
                weight: values.weight,
                weightMetric: values.weightMetric,
                electrical: values.electrical,
                country: values.country,
            },
        })
            .then((res) => {
                notification.success({
                    message: "Product has been added Successfully",
                    icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                });
            })
            .catch((err) => {
                handleError(err);
            });
    };

    const handleError = (error) => {
        switch (error.response.status) {
            case 400:
                notification.error({
                    message: "Number Catalog already exists",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
            default:
                notification.error({
                    message: "Catalog has been added Failed",
                    icon: <FrownOutlined style={{ color: "#f21b3b" }} />,
                });
                break;
        }
    };

    useEffect(() => {
        getDataList();
        form.setFieldsValue(state.productDetail);
    }, []);

    const onChangeUpdate = (values) => {
        setState({ ...state, dataValueUpdate: values });
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Product Detail</h1>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Product Name</label>
                        <input type="text" placeholder={state.productDetail ? state.productDetail.productName : ''} />
                        <label>In Stock</label>
                        <select name="inStock" id="idStock">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                        <label>Active</label>
                        <select name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={state.productDetail.imageProduct}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="file">
                                <Publish />
                            </label>
                            <input
                                type="file"
                                id="file"
                                style={{ display: "none" }}
                            />
                        </div>
                        <button className="productButton" disabled>Update</button>
                    </div>
                </form>
            </div>
            <div className="productBottom">
                {state?.productDetail && (
                    <Form
                        className="productForm"
                        initialValues={state?.productDetail}
                        onFinish={onSubmit}
                        form={form}
                        onValuesChange={onChangeUpdate}
                        style={{ flexDirection: "column" }}
                    >
                        <div className="editProductItem">
                            <Form.Item
                                label="Product Name"
                                name="productName"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Name!",
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter catalog name"
                                />
                            </Form.Item>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                name="quantity"
                                label="Quantity"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Quantity!",
                                    },
                                    {
                                        pattern: /^[0-9]\d*?$/,
                                        message:
                                            "Quantity cannot enter decimal",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "Quantity cannot enter negative numbers",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter Quantity"
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        parseFloat(
                                            `${value}`.replace(/\\s?|(,*)/g, "")
                                        )
                                    }
                                />
                            </Form.Item>
                            <p>For example: Quantity: 120,000</p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                name="price"
                                label="Price"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Price!",
                                    },
                                    {
                                        pattern: /^[0-9]\d*?$/,
                                        message: "Price cannot enter decimal",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "Price cannot enter negative numbers",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter Price"
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        parseFloat(
                                            `${value}`.replace(/\\s?|(,*)/g, "")
                                        )
                                    }
                                />
                            </Form.Item>
                            <p>For example: Price: 120,000USD</p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                label="Country"
                                name="country"
                                initialValue={state.dataAttribute.country}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your Country!",
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter catalog name"
                                />
                            </Form.Item>
                            <p>For example: Country: VietNam</p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                label="Electrical"
                                name="electrical"
                                initialValue={state.dataAttribute.electrical}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your electrical!",
                                    },
                                ]}
                            >
                                <Input
                                    type="text"
                                    placeholder="Enter catalog electrical"
                                />
                            </Form.Item>
                            <p>
                                For example: Electrical: 115V, 60 Hz, 16A
                                (console); 115V, 60 Hz, 16A (tray dryer)A
                            </p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                name="weight"
                                label="Weight"
                                initialValue={state.dataAttribute.weight}
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your weight!",
                                    },
                                    {
                                        pattern: /^[0-9]\d*?$/,
                                        message: "weight cannot enter decimal",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "weight cannot enter negative numbers",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter weight"
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        parseFloat(
                                            `${value}`.replace(/\\s?|(,*)/g, "")
                                        )
                                    }
                                />
                            </Form.Item>
                            <p>For example: Weight: 678.0 lbs</p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                name="weightMetric"
                                label="Weight Metric"
                                initialValue={state.dataAttribute.weightMetric}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Weight Metric!",
                                    },
                                    {
                                        pattern: /^[0-9]\d*?$/,
                                        message:
                                            "Weight Metric cannot enter decimal",
                                    },
                                    {
                                        type: "number",
                                        min: 0,
                                        message:
                                            "Weight Metric cannot enter negative numbers",
                                    },
                                ]}
                            >
                                <InputNumber
                                    placeholder="Enter Weight Metric"
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        parseFloat(
                                            `${value}`.replace(/\\s?|(,*)/g, "")
                                        )
                                    }
                                />
                            </Form.Item>
                            <p>For example: Weight metric: 307.5 kg</p>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                label="Dimensions"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Dimensions!",
                                    },
                                ]}
                            >
                                <div className="dimensions">
                                    <Form.Item
                                        name="width"
                                        label="Width"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your Width!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Width cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Width"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="depth"
                                        label="Depth"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your depth!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Depth cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Depth"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="height"
                                        label="Height"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your height!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Height cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Height"
                                        />
                                    </Form.Item>
                                </div>
                                <p>
                                    For example:Dimensions: 32.4" w x 29.6" d x
                                    63.7" h
                                </p>
                            </Form.Item>
                        </div>
                        <div className="editProductItem">
                            <Form.Item
                                label="Dimensions Metric"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Dimensions!",
                                    },
                                ]}
                            >
                                <div className="dimensions">
                                    <Form.Item
                                        name="widthMetric"
                                        label="Width Metric"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your Width!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Width cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Width"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="depthMetric"
                                        label="Depth Metric"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your depth!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Depth cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Depth"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        name="heightMetric"
                                        label="Height Metric"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    "Please input your height!",
                                            },
                                            {
                                                pattern: /^[0-9]/,
                                                message:
                                                    "Height cannot negative number",
                                            },
                                        ]}
                                    >
                                        <InputNumber
                                            type="number"
                                            placeholder="Enter Height"
                                        />
                                    </Form.Item>
                                </div>
                            </Form.Item>
                            <p>
                                For example: Dimensions metric: 82.2 w x 75.1 d
                                x 161.7 h cm
                            </p>
                        </div>
                        <div className="editProductItemDescription">
                            <Form.Item
                                label="Description"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            "Please input your Description!",
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
                                    data={state.dataDescription || ""}
                                    onReady={(editor) => {}}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        form.setFieldsValue({
                                            description: data,
                                        });
                                    }}
                                    onBlur={(event, editor) => {}}
                                    onFocus={(event, editor) => {}}
                                />
                            </Form.Item>
                        </div>
                        <Button
                            type="primary"
                            className="addProductButton"
                            htmlType="submit"
                            disabled={(state?.dataValueUpdate) ? false : true}
                        >
                            Update
                        </Button>
                    </Form>
                )}
            </div>
        </div>
    );
}
