import React, { useState } from 'react';
import styled from 'styled-components';
import HistoricalEventCard from './HistoricalEventCard';
import FuturePredictionCard from './FuturePredictionCard';

const TabWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background: none;
  border: none;
  color: ${({ active }) => (active ? '#2563eb' : '#94a3b8')};
  cursor: pointer;
  font-size: 1rem;
  margin: 0 1rem;
  padding: 0.5rem 0;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #2563eb;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: ${({ active }) => (active ? 'scaleX(1)' : 'scaleX(0)')};
    transition: transform 0.3s ease;
  }
`;

const ContentWrapper = styled.div`
  padding: 0 2rem;
`;

const TabContainer = ({ data }) => {
  const [activeTab, setActiveTab] = useState('history');

  return (
    <div>
      <TabWrapper>
        <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
          历史分析
        </Tab>
        <Tab active={activeTab === 'timeline'} onClick={() => setActiveTab('timeline')}>
          时间线
        </Tab>
        <Tab active={activeTab === 'future'} onClick={() => setActiveTab('future')}>
          未来预测
        </Tab>
      </TabWrapper>
      <ContentWrapper>
        {activeTab === 'history' && (
          <div>
            <h2>相似历史事件</h2>
            {data.historical_events.map((event, index) => (
              <HistoricalEventCard key={index} event={event} />
            ))}
          </div>
        )}
        {activeTab === 'future' && (
          <div>
            <h2>AI 预测分析</h2>
            {data.future_predictions.map((prediction, index) => (
              <FuturePredictionCard key={index} prediction={prediction} />
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default TabContainer;