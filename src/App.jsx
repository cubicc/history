import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import InputSection from './components/InputSection';
import TabContainer from './components/TabContainer';
import mockData from './data/workflow_output_20251001_234728.json';

const AppWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #94a3b8;
`;

const AiEngineButton = styled.button`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: #e2e8f0;
  cursor: pointer;
  padding: 0.5rem 1rem;
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 9999px;
  border: 1px solid #334155;
  background: radial-gradient(120% 120% at 50% 0%, rgba(37,99,235,0.25), rgba(30,41,59,0.6) 55%, rgba(15,23,42,0.9));
  color: #93c5fd;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 0 0 1px rgba(59,130,246,0.25) inset, 0 0 16px rgba(37,99,235,0.18);
  transition: transform 0.15s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    border-color: #3b82f6;
    box-shadow: 0 0 0 1px rgba(59,130,246,0.35) inset, 0 0 22px rgba(59,130,246,0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// 加载动画
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingSpinner = styled.div`
  width: 60px;
  height: 60px;
  border: 4px solid #334155;
  border-top: 4px solid #2563eb;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 2rem;
`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  color: #e2e8f0;
  animation: ${pulse} 2s ease-in-out infinite;
  text-align: center;
`;

const LoadingSubtext = styled.div`
  font-size: 1rem;
  color: #94a3b8;
  margin-top: 1rem;
  text-align: center;
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
`;

const MockDataSwitch = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: #e2e8f0;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  z-index: 1001;

  label {
    margin-right: 0.5rem;
  }
`;

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('input'); // 'input' or 'analysis'
  const [searchQuery, setSearchQuery] = useState('');
  const [useMockData, setUseMockData] = useState(true); // true: use mock data, false: use real backend

  const fetchData = async (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    try {
      if (useMockData) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockData);
      } else {
        const response = await axios.post("http://127.0.0.1:8001/analyse", { query });
        setData(response.data);
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      // 这里可以添加一些错误处理逻辑，比如显示一个错误信息
    } finally {
      setIsLoading(false);
      setCurrentPage('analysis');
    }
  };

  const handleBackToInput = () => {
    setCurrentPage('input');
    setData(null);
    setSearchQuery('');
  };

  if (isLoading) {
    return (
      <LoadingOverlay>
        <LoadingSpinner />
        <LoadingText>AI 正在分析历史数据...</LoadingText>
        <LoadingSubtext>正在寻找相似的历史事件和预测未来趋势</LoadingSubtext>
      </LoadingOverlay>
    );
  }

  if (currentPage === 'input') {
    return (
      <PageContainer>
        <AppWrapper>
          <Header>
            <div>
              <Title>Mirror of History</Title>
              <Subtitle>以史为鉴・预见未来</Subtitle>
            </div>
          </Header>
          <InputSection onSearch={fetchData} />
          <MockDataSwitch>
            <label htmlFor="mock-data-switch">使用模拟数据</label>
            <input
              type="checkbox"
              id="mock-data-switch"
              checked={useMockData}
              onChange={() => setUseMockData(!useMockData)}
            />
          </MockDataSwitch>
        </AppWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppWrapper>
        <Header>
          <div>
            <Title>Mirror of History</Title>
            <Subtitle>以史为鉴・预见未来</Subtitle>
          </div>
          <IconButton onClick={handleBackToInput} aria-label="返回">
            {/* 左箭头样式的图形 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L8 12L15 19" stroke="#93c5fd" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </IconButton>
        </Header>
        {data && <TabContainer data={data} searchQuery={searchQuery} />}
        <MockDataSwitch>
          <label htmlFor="mock-data-switch">使用模拟数据</label>
          <input
            type="checkbox"
            id="mock-data-switch"
            checked={useMockData}
            onChange={() => setUseMockData(!useMockData)}
          />
        </MockDataSwitch>
      </AppWrapper>
    </PageContainer>
  );
}

export default App;
