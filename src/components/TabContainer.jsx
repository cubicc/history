import React, { useState } from 'react';
import styled from 'styled-components';
import HistoricalEventCard from './HistoricalEventCard';
import FuturePredictionCard from './FuturePredictionCard';
import CompactPredictionCard from './CompactPredictionCard';
import CyberpunkTimeline from './CyberpunkTimeline';
import HistoricalTimeline from './HistoricalTimeline';

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

const Suggestion = styled.div`
  position: relative;
  color: #e5edff;
  text-align: center;
  margin: 1.5rem auto 1.75rem auto;
  max-width: 980px;
  padding: 0.9rem 0;
  font-size: 1.25rem;
  line-height: 2.1;
  letter-spacing: 0.04em;
  text-shadow: 0 0 12px rgba(93,149,255,0.35), 0 0 24px rgba(37,99,235,0.18);

  &:after {
    content: '';
    position: absolute;
    left: 10%;
    right: 10%;
    bottom: 6px;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(59,130,246,0.65), transparent);
    filter: blur(1px);
    opacity: 0.7;
    pointer-events: none;
  }
`;

const AnalysisBox = styled.div`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  color: #e2e8f0;
  font-size: 1.0625rem;
  line-height: 1.9;
  padding: 1rem 1.25rem;
  width: 100%;
  max-width: 880px;
  margin: 0 auto 2rem auto;
  box-shadow: inset 0 0 0 1px rgba(51,65,85,0.3);
`;


const TabContainer = ({ data, searchQuery }) => {
  const [activeTab, setActiveTab] = useState('history'); // 默认显示未来预测

  // 按年份排序历史事件
  const sortEventsByYear = (events) => {
    return [...events].sort((a, b) => b.year - a.year); // 从新到旧排序
  };

  return (
    <div>
      <ContentWrapper>
        {activeTab === 'future' && (
          <div>
            {data.suggestion && (
              <Suggestion>{data.suggestion}</Suggestion>
            )}
            {data.overall_analysis && (
              <AnalysisBox>{data.overall_analysis}</AnalysisBox>
            )}
            <TabWrapper>
              <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                历史分析
              </Tab>
              <Tab active={activeTab === 'future'} onClick={() => setActiveTab('future')}>
                未来预测
              </Tab>
            </TabWrapper>
            <CyberpunkTimeline predictions={data.future_predictions} />
          </div>
        )}
        {activeTab === 'history' && (
          <div>
            {data.suggestion && (
              <Suggestion>{data.suggestion}</Suggestion>
            )}
            {data.overall_analysis && (
              <AnalysisBox>{data.overall_analysis}</AnalysisBox>
            )}
            <TabWrapper>
              <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                历史分析
              </Tab>
              <Tab active={activeTab === 'future'} onClick={() => setActiveTab('future')}>
                未来预测
              </Tab>
            </TabWrapper>
            <HistoricalTimeline events={sortEventsByYear(data.historical_events)} />
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default TabContainer;