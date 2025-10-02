import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  padding: 0.65rem 0.85rem;
  margin-bottom: 0.5rem;
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
  margin-bottom: 0.7rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.98rem;
`;

const Confidence = styled.div`
  font-size: 0.95rem;
  font-weight: bold;
  color: ${({ value }) => {
    if (value > 80) return '#10b981';
    if (value > 60) return '#f59e0b';
    return '#ef4444';
  }};
`;

const Description = styled.p`
  margin: 0 0 0.4rem 0;
  color: #94a3b8;
`;

const Factors = styled.div`
  margin-bottom: 0.4rem;
`;

const Factor = styled.span`
  background-color: #334155;
  border-radius: 9999px;
  display: inline-block;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  padding: 0.4rem 0.8rem;
`;

const ProbabilityWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ProbabilityLabel = styled.span`
  margin-right: 0.5rem;
  font-size: 0.85rem;
  color: #94a3b8;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  width: 60%;
  height: 5px;
  background-color: #334155;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #2563eb;
`;

const FuturePredictionCard = ({ prediction }) => {
  return (
    <Card>
      <Header>
        <Title>预测场景 {prediction.id} <span style={{ color: '#94a3b8', fontSize: '1rem' }}>({prediction.duration})</span></Title>
        <Confidence value={prediction.confidence}>{prediction.confidence}% 置信度</Confidence>
      </Header>
      <Description>{prediction.description}</Description>
      {prediction.key_factors.length > 0 && (
        <Factors>
          {prediction.key_factors.map((factor, index) => (
            <Factor key={index}>{factor}</Factor>
          ))}
        </Factors>
      )}
      <ProbabilityWrapper>
        <ProbabilityLabel>发生概率</ProbabilityLabel>
        <ProgressBar>
          <Progress value={prediction.probability} />
        </ProgressBar>
      </ProbabilityWrapper>
    </Card>
  );
};

export default FuturePredictionCard;