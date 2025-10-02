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

const Suggestion = styled.div`
  color: #cbd5e1;
  text-align: center;
  margin: 1rem 0 1.25rem 0;
  letter-spacing: 0.02em;
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
  const [activeTab, setActiveTab] = useState('future'); // 默认显示未来预测

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
              <Tab active={activeTab === 'future'} onClick={() => setActiveTab('future')}>
                未来预测
              </Tab>
              <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                历史分析
              </Tab>
            </TabWrapper>
            <div style={{display:'grid',gap:'1rem'}}>
              {data.future_predictions.map((prediction, index) => (
                <FuturePredictionCard key={index} prediction={prediction} />
              ))}
            </div>
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
              <Tab active={activeTab === 'future'} onClick={() => setActiveTab('future')}>
                未来预测
              </Tab>
              <Tab active={activeTab === 'history'} onClick={() => setActiveTab('history')}>
                历史分析
              </Tab>
            </TabWrapper>
            {data.historical_events.map((event, index) => (
              <HistoricalEventCard key={index} event={event} />
            ))}
          </div>
        )}
      </ContentWrapper>
    </div>
  );
};

export default TabContainer;