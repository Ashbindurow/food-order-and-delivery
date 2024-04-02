import React, { useState } from "react";
import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "../../utils/axios.js";

const ImageUploader = ({ imageUrl, onChange }) => {
  const [loading, setLoading] = useState(false);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const handleChange = async info => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get URL from response and update state
      onChange(info.file.response.url);
      setLoading(false);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess }) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/image", formData);
      onSuccess(response.data, file);
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      customRequest={customRequest}
    >
      {imageUrl ? (
        <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUploader;
