import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
`;

const Input = styled.textarea`
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 2px solid #334155;
  border-radius: 1rem;
  color: #e2e8f0;
  font-size: 1.125rem;
  letter-spacing: 0.01em;
  padding: 1.5rem 1.75rem;
  width: 100%;
  max-width: 880px;
  height: 160px;
  line-height: 1.6;
  box-shadow: 
    inset 0 2px 4px rgba(0,0,0,0.1),
    0 4px 12px rgba(0,0,0,0.1),
    inset 0 0 0 1px rgba(51,65,85,0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  caret-color: #60a5fa;
  text-shadow: 0 0 8px rgba(59,130,246,0.3);
  resize: none;
  overflow: auto;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(37,99,235,0.05) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &::placeholder {
    color: #94a3b8;
    opacity: 0.8;
    font-weight: 300;
  }

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 
      0 0 0 4px rgba(59,130,246,0.2),
      0 8px 25px rgba(37,99,235,0.4),
      inset 0 0 0 1px rgba(59,130,246,0.3);
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    transform: translateY(-2px);

    &::before {
      opacity: 1;
    }
  }

  &:hover:not(:focus) {
    border-color: #475569;
    box-shadow: 
      0 4px 16px rgba(0,0,0,0.15),
      inset 0 0 0 1px rgba(51,65,85,0.3);
  }
`;

const Button = styled.button`
  position: relative;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: #ffffff;
  border: 2px solid transparent;
  border-radius: 0.75rem;
  cursor: pointer;
  font-size: 1.0625rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  margin-top: 0.5rem;
  letter-spacing: 0.02em;
  text-shadow: 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: 
    0 4px 16px rgba(37,99,235,0.4),
    0 2px 8px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    border-color: #3b82f6;
    box-shadow: 
      0 6px 24px rgba(37,99,235,0.5),
      0 4px 12px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.3);
    transform: translateY(-2px);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 12px rgba(37,99,235,0.4),
      0 1px 6px rgba(0,0,0,0.1),
      inset 0 1px 0 rgba(255,255,255,0.1);
  }

  /* 添加脉冲动画效果 */
  @keyframes pulse {
    0% {
      box-shadow: 
        0 4px 16px rgba(37,99,235,0.4),
        0 2px 8px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.2);
    }
    50% {
      box-shadow: 
        0 4px 20px rgba(37,99,235,0.6),
        0 2px 10px rgba(0,0,0,0.15),
        inset 0 1px 0 rgba(255,255,255,0.3);
    }
    100% {
      box-shadow: 
        0 4px 16px rgba(37,99,235,0.4),
        0 2px 8px rgba(0,0,0,0.1),
        inset 0 1px 0 rgba(255,255,255,0.2);
    }
  }

  &:hover {
    animation: pulse 2s infinite;
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  max-width: 900px;
  padding: 0 1rem;
`;

const Tag = styled.span`
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border: 1px solid #475569;
  border-radius: 9999px;
  cursor: pointer;
  display: inline-block;
  font-size: 0.8125rem;
  padding: 0.625rem 1.125rem;
  color: #e2e8f0;
  font-weight: 500;
  letter-spacing: 0.01em;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 2px 8px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent);
    transition: left 0.6s ease;
  }

  &:hover {
    background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
    border-color: #3b82f6;
    box-shadow: 
      0 4px 16px rgba(59,130,246,0.4),
      0 2px 8px rgba(0,0,0,0.2),
      inset 0 1px 0 rgba(255,255,255,0.2);
    transform: translateY(-2px);
    color: #ffffff;

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 8px rgba(59,130,246,0.3),
      0 1px 4px rgba(0,0,0,0.15),
      inset 0 1px 0 rgba(255,255,255,0.1);
  }

  /* 为不同长度的标签提供更好的响应式布局 */
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.5rem 0.875rem;
  }
`;

const InputSection = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    } else {
      onSearch('日本是否会变成移民国家'); // 默认搜索
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
        onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSearch())}
        placeholder="输入您想要分析的历史事件或未来趋势..." 
      />
      <Tags>
        <Tag onClick={() => handleTagClick('日本是否会变成移民国家')}>日本移民</Tag>
        <Tag onClick={() => handleTagClick('中国老龄化社会会变成什么样')}>中国老龄化</Tag>
        <Tag onClick={() => handleTagClick('特朗普贸易逆行，加收关税，未来走向是什么')}>特朗普关税</Tag>
        <Tag onClick={() => handleTagClick('全球气候恶化，山火频发，会持续下去吗')}>气候变化</Tag>
        <Tag onClick={() => handleTagClick('一直找不到工作怎么办')}>就业困境</Tag>
        <Tag onClick={() => handleTagClick('俄乌战争会变成什么样')}>俄乌战争</Tag>
        <Tag onClick={() => handleTagClick('还会出现下一次新冠疫情吗')}>新冠疫情</Tag>
        <Tag onClick={() => handleTagClick('AI时代会导致更多的失业还是就业')}>AI就业</Tag>
      </Tags>
      <Button onClick={handleSearch}>开始预测分析</Button>
    </InputWrapper>
  );
};

export default InputSection;