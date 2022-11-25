import "../../style/modal.css";

import { Button, Form, Input, Modal } from "antd";
import { modalStatus } from "components/Blog/Category/Categories";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCategory,
  editCategory,
} from "../../redux/reducer/categorySlice";

export default function CategoryModal({ visible, category, status, query, ...props }) {
  const dispatch = useDispatch();
  const [form] = Form.useForm()
  const [modalText, setModalText] = useState()

  console.log('ca', category)
  const handleSubmit = async () => {
    const value = await form.validateFields()

    if (status == modalStatus.edit) dispatch(editCategory({ id: category.id, data: value }));
    else if (status == modalStatus.child)
      dispatch(
        createCategory({
          ...value,
          parent_id: category.id,
        })
      );
    else
      dispatch(
        createCategory(value)
      );
    props.closeModal();
  };

  useEffect(() => {
    if (status == modalStatus.createnew)
      setModalText({ title: "Tạo danh mục bài viết mới", okText: "Tạo" })
    else if (status == modalStatus.edit)
      setModalText({ title: "Sửa danh mục bài viết", okText: "Sửa" })
    else setModalText({ title: "Thêm danh mục bài viết thứ cấp", okText: "Thêm" })

  }, [status])

  return (
    <Modal
      bodyStyle={{ overflowY: "auto" }}
      centered
      visible={visible}
      title={modalText?.title}
      onCancel={props.closeModal}
      footer={[
        <Button key="back" className="ant-btn1" onClick={props.closeModal}>
          Quay lại
        </Button>,
        <Button
          className="btn"
          key="submit"
          type="primary"
          loading={false}
          onClick={handleSubmit}
        >
          {modalText?.okText}
        </Button>,
      ]}

    >
      <Form className="flex flex-col gap-3" form={form}
        initialValues={{ name: (status == modalStatus.edit) ? category?.name || query : query, description: (status == modalStatus.edit) ? category?.description : undefined }}  >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Tên không được bỏ trống',
            },
          ]}
        >
          <Input
            size="large"
            autoFocus={true}
            type="text"
            placeholder="Tên"
          // onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          name="description"
        >
          <Input.TextArea
            className="resize-none"
            placeholder="Mô tả (tuỳ chọn)"
            rows="5"
          />
        </Form.Item>
      </Form>
    </Modal >
  );
}
