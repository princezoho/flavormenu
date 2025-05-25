import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  margin: 10px 0;
  
  &:hover {
    border-color: #55B6E7;
  }
`;

const PreviewImage = styled.img`
  max-width: 100px;
  max-height: 100px;
  margin-top: 10px;
`;

interface LogoUploaderProps {
  onLogoChange: (file: File | undefined) => void;
  currentLogo?: string;
}

const LogoUploader: React.FC<LogoUploaderProps> = ({ onLogoChange, currentLogo }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onLogoChange(acceptedFiles[0]);
    }
  }, [onLogoChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  return (
    <DropzoneContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the logo here...</p>
      ) : (
        <p>Drag & drop a logo here, or click to select one</p>
      )}
      {currentLogo && (
        <PreviewImage src={currentLogo} alt="Logo preview" />
      )}
    </DropzoneContainer>
  );
};

export default LogoUploader; 