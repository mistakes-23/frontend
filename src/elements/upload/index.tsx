import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { sendPdf } from '../../client';
import { useNavigate } from 'react-router-dom';



const { Dragger } = Upload;



export const FileUpload: React.FC = () => {
    const navigate = useNavigate();
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        customRequest: async (e: any) => {
          var form = new FormData();
          form.append('file', e.file);
          var data = await sendPdf(form);
          var fileId = data.data.file_url.split('/')[3];
          var statusId = data.data.status.split('/')[3];
          localStorage.setItem('statusId', statusId);
          navigate('/result/' + fileId);
        },
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
  return <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
};