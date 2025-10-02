import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  padding: 3rem 2rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

const Input = styled.input`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  color: #e2e8f0;
  font-size: 1.125rem;
  padding: 1rem 1.25rem;
  width: 100%;
  max-width: 880px;
  height: 192px;
  box-shadow: inset 0 0 0 1px rgba(51,65,85,0.3);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &::placeholder {
    color: #64748b;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59,130,246,0.15), 0 0 18px rgba(37,99,235,0.3), inset 0 0 0 1px rgba(59,130,246,0.2);
    background-color: #162033;
  }
`;

const Button = styled.button`
  position: relative;
  background: transparent;
  color: #e2e8f0;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1.0625rem;
  padding: 0.95rem 2rem;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
  text-shadow: 0 0 6px rgba(37,99,235,0.45);
  box-shadow: 0 0 0 1px rgba(37,99,235,0.25) inset, 0 0 16px rgba(37,99,235,0.18);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, transform 0.1s ease;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 0.75rem;
    pointer-events: none;
    background: linear-gradient(135deg, rgba(37,99,235,0.22) 0%, rgba(30,41,59,0.0) 40%);
    opacity: 0.7;
  }

  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59,130,246,0.35) inset, 0 0 24px rgba(59,130,246,0.35);
    background-color: rgba(37,99,235,0.08);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 0 0 1px rgba(59,130,246,0.45) inset, 0 0 18px rgba(59,130,246,0.4);
  }
`;

const Tags = styled.div`
  margin-top: 0.25rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`;

const Tag = styled.span`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  padding: 0.5rem 1rem;
  color: #cbd5e1;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;

  &:hover {
    background-color: #162033;
    border-color: #3b82f6;
    box-shadow: 0 0 12px rgba(59,130,246,0.25);
  }
`;

const InputSection = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    } else {
      onSearch('央行意外宣布大幅加息政策'); // 默认搜索
    }
  };

  const handleTagClick = (tag) => {
    setInputValue(tag);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <InputWrapper>
      <Input 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="央行意外宣布大幅加息政策" 
      />
      <Tags>
        <Tag onClick={() => handleTagClick('科技股暴跌')}>科技股暴跌</Tag>
        <Tag onClick={() => handleTagClick('央行加息')}>央行加息</Tag>
        <Tag onClick={() => handleTagClick('贸易争端')}>贸易争端</Tag>
        <Tag onClick={() => handleTagClick('货币危机')}>货币危机</Tag>
      </Tags>
      <Button onClick={handleSearch}>开始预测分析</Button>
    </InputWrapper>
  );
};

export default InputSection;