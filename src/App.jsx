import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
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

function App() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    // In a real application, you would fetch from an API
    // const response = await axios.get('/api/predict');
    // setData(response.data);
    setData(initialData);
  };

  return (
    <AppWrapper>
      <Header>
        <div>
          <Title>Mirror of History</Title>
          <Subtitle>以史为鉴・预见未来</Subtitle>
        </div>
        <AiEngineButton>AI 分析引擎</AiEngineButton>
      </Header>
      <InputSection onSearch={fetchData} />
      {data && <TabContainer data={data} />}
    </AppWrapper>
  );
}

export default App;
