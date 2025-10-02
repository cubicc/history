import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import InputSection from './components/InputSection';
import TabContainer from './components/TabContainer';
import initialData from './data/workflow_output_20251001_234728.json';

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

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('input'); // 'input' or 'analysis'
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async (query) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // In a real application, you would fetch from an API
    // const response = await axios.get('/api/predict', { params: { query } });
    // setData(response.data);
    setData(initialData);
    setIsLoading(false);
    setCurrentPage('analysis');
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
            <AiEngineButton>AI 分析引擎</AiEngineButton>
          </Header>
          <InputSection onSearch={fetchData} />
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
          <AiEngineButton onClick={handleBackToInput}>返回搜索</AiEngineButton>
        </Header>
        {data && <TabContainer data={data} searchQuery={searchQuery} />}
      </AppWrapper>
    </PageContainer>
  );
}

export default App;
