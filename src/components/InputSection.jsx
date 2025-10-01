import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const Input = styled.input`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: #e2e8f0;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  width: 100%;
  max-width: 600px;

  &::placeholder {
    color: #64748b;
  }
`;

const Button = styled.button`
  background-color: #2563eb;
  border: none;
  border-radius: 0.5rem;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1d4ed8;
  }
`;

const Tags = styled.div`
  margin-top: 1rem;
`;

const Tag = styled.span`
  background-color: #334155;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;

  &:hover {
    background-color: #475569;
  }
`;

const InputSection = ({ onSearch }) => {
  return (
    <InputWrapper>
      <Input placeholder="央行意外宣布大幅加息政策" />
      <Tags>
        <Tag>科技股暴跌</Tag>
        <Tag>央行加息</Tag>
        <Tag>贸易争端</Tag>
        <Tag>货币危机</Tag>
      </Tags>
      <Button onClick={onSearch}>开始预测分析</Button>
    </InputWrapper>
  );
};

export default InputSection;