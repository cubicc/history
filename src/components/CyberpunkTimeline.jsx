import React from 'react';
import styled, { keyframes } from 'styled-components';

// 柔和的发光动画
const subtleGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
  }
  50% {
    box-shadow: 0 0 12px rgba(59, 130, 246, 0.5);
  }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 2rem 0;
  margin: 2rem 0;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 10%;
    right: 10%;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      #3b82f6 20%,
      #2563eb 50%,
      #3b82f6 80%,
      transparent 100%
    );
    transform: translateY(-50%);
    box-shadow: 0 0 4px rgba(59, 130, 246, 0.3);
  }
`;

const TimelineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  z-index: 2;
  gap: 1rem;
`;

const TimelineNode = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  min-width: 200px;
  max-width: 300px;
`;

const PredictionCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-color: #3b82f6;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  height: 1.5rem;
`;

const ScenarioTitle = styled.h3`
  margin: 0;
  font-size: 0.9rem;
  color: #e2e8f0;
  font-weight: 600;
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

const Duration = styled.span`
  font-size: 0.75rem;
  color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  margin-bottom: 0.5rem;
  display: inline-block;
  height: 1.2rem;
  line-height: 0.8rem;
  white-space: nowrap;
  width: fit-content;
  min-width: auto;
`;

const Description = styled.p`
  margin: 0 0 0.5rem 0;
  color: #94a3b8;
  font-size: 0.8rem;
  line-height: 1.3;
  height: 2.6rem; /* 固定高度，确保两行文本 */
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
  height: 2rem; /* 固定高度 */
  overflow: hidden;
`;

const Factor = styled.span`
  background: #334155;
  border-radius: 12px;
  font-size: 0.65rem;
  padding: 0.2rem 0.5rem;
  color: #94a3b8;
  height: 1.2rem;
  line-height: 0.8rem;
  display: flex;
  align-items: center;
`;

const ProbabilityWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 1.5rem;
  margin-top: auto;
`;

const ProbabilityLabel = styled.span`
  font-size: 0.7rem;
  color: #94a3b8;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: #334155;
  border-radius: 2px;
  overflow: hidden;
`;

const Progress = styled.div`
  width: ${({ value }) => value}%;
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
`;

const ProbabilityValue = styled.span`
  font-size: 0.7rem;
  color: #e2e8f0;
  font-weight: bold;
  min-width: 30px;
  text-align: right;
`;

const CyberpunkTimeline = ({ predictions }) => {
  return (
    <TimelineContainer>
      <TimelineWrapper>
        {predictions.map((prediction, index) => (
          <TimelineNode key={index}>
            <PredictionCard>
              <CardHeader>
                <ScenarioTitle>场景 {prediction.id}</ScenarioTitle>
                <Confidence value={prediction.confidence}>{prediction.confidence}%</Confidence>
              </CardHeader>
              <Duration>{prediction.duration}</Duration>
              <Description>{prediction.description}</Description>
              {prediction.key_factors.length > 0 && (
                <Factors>
                  {prediction.key_factors.slice(0, 2).map((factor, index) => (
                    <Factor key={index}>{factor}</Factor>
                  ))}
                  {prediction.key_factors.length > 2 && (
                    <Factor>+{prediction.key_factors.length - 2}</Factor>
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
            </PredictionCard>
          </TimelineNode>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default CyberpunkTimeline;
