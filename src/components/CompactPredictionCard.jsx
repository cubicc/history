import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding: 1rem 0;
  margin-bottom: 2rem;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #334155;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #2563eb;
    border-radius: 3px;
  }
`;

const Card = styled.div`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 0.75rem;
  min-width: 280px;
  max-width: 320px;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: inset 0 0 0 1px rgba(51,65,85,0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 12px rgba(59,130,246,0.2);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #e2e8f0;
`;

const Duration = styled.span`
  font-size: 0.8rem;
  color: #94a3b8;
  background-color: #334155;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
`;

const Confidence = styled.div`
  font-size: 0.8rem;
  font-weight: bold;
  color: ${({ value }) => {
    if (value > 80) return '#10b981';
    if (value > 60) return '#f59e0b';
    return '#ef4444';
  }};
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
  color: #94a3b8;
  font-size: 0.85rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Factors = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
`;

const Factor = styled.span`
  background-color: #334155;
  border-radius: 9999px;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  color: #94a3b8;
`;

const ProbabilityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProbabilityLabel = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #334155;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #2563eb;
  border-radius: 2px;
`;

const ProbabilityValue = styled.span`
  font-size: 0.75rem;
  color: #e2e8f0;
  font-weight: bold;
  min-width: 30px;
  text-align: right;
`;

const CompactPredictionCard = ({ prediction }) => {
  return (
    <Card>
      <Header>
        <Title>场景 {prediction.id}</Title>
        <Confidence value={prediction.confidence}>{prediction.confidence}%</Confidence>
      </Header>
      <Duration>{prediction.duration}</Duration>
      <Description>{prediction.description}</Description>
      {prediction.key_factors.length > 0 && (
        <Factors>
          {prediction.key_factors.slice(0, 3).map((factor, index) => (
            <Factor key={index}>{factor}</Factor>
          ))}
          {prediction.key_factors.length > 3 && (
            <Factor>+{prediction.key_factors.length - 3}</Factor>
          )}
        </Factors>
      )}
      <ProbabilityWrapper>
        <ProbabilityLabel>概率</ProbabilityLabel>
        <ProgressBar>
          <Progress value={prediction.probability} />
        </ProgressBar>
        <ProbabilityValue>{prediction.probability}%</ProbabilityValue>
      </ProbabilityWrapper>
    </Card>
  );
};

export default CompactPredictionCard;
