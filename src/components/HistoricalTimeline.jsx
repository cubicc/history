import React, { useState } from 'react';
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
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: linear-gradient(
      180deg,
      transparent 0%,
      #3b82f6 20%,
      #2563eb 50%,
      #3b82f6 80%,
      transparent 100%
    );
    box-shadow: 0 0 4px rgba(59, 130, 246, 0.3);
    transform: translateX(-50%);
  }
`;

const TimelineWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 2;
`;

const TimelineNode = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: ${({ index }) => (index % 2 === 0 ? 'flex-end' : 'flex-start')};
  padding: 0 1.5rem;
`;

const EventCard = styled.div`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 1.2rem;
  position: relative;
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(59, 130, 246, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  width: 48%;
  max-width: 380px;
  cursor: pointer;
  margin: 0 0.8rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      45deg,
      transparent 30%,
      rgba(59, 130, 246, 0.02) 50%,
      transparent 70%
    );
    border-radius: 12px;
    pointer-events: none;
  }
  
  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 
      0 8px 25px rgba(0, 0, 0, 0.4),
      0 0 20px rgba(59, 130, 246, 0.15),
      inset 0 1px 0 rgba(59, 130, 246, 0.2);
    border-color: #3b82f6;
    z-index: 10;
  }
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EventYear = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  color: #60a5fa;
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.4);
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;

const EventTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  color: #e2e8f0;
  font-weight: 600;
  flex: 1;
  margin-left: 1rem;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`;

const EventType = styled.span`
  font-size: 0.7rem;
  color: #93c5fd;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(30, 58, 138, 0.1));
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  white-space: nowrap;
  width: fit-content;
  min-width: auto;
  text-shadow: 0 0 4px rgba(59, 130, 246, 0.3);
  font-weight: 500;
`;

const EventDescription = styled.p`
  margin: 0.5rem 0;
  color: #a1a1aa;
  font-size: 0.8rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

const EventOutcome = styled.p`
  margin: 0.5rem 0 0 0;
  color: #60a5fa;
  font-size: 0.75rem;
  line-height: 1.3;
  font-weight: 500;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 0 4px rgba(96, 165, 250, 0.3);
`;

const EventDetails = styled.div`
  margin: 0.5rem 0 0 0;
  color: #cbd5e1;
  font-size: 0.75rem;
  line-height: 1.5;
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  
  ${EventCard}:hover & {
    max-height: 180px;
    opacity: 1;
  }
`;

const RelevanceScore = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: ${({ value }) => {
    if (value > 80) return '#60a5fa';
    if (value > 60) return '#93c5fd';
    return '#94a3b8';
  }};
  margin-top: 0.5rem;
  text-align: right;
  text-shadow: 0 0 4px currentColor;
  font-family: 'Courier New', monospace;
  letter-spacing: 0.5px;
`;

const HistoricalTimeline = ({ events }) => {
  return (
    <TimelineContainer>
      <TimelineWrapper>
        {events.map((event, index) => (
          <TimelineNode key={index} index={index}>
            <EventCard>
              <EventHeader>
                <EventYear>{event.year}</EventYear>
                <EventTitle>{event.title}</EventTitle>
                <EventType>{event.type}</EventType>
              </EventHeader>
              <EventDescription>{event.description}</EventDescription>
              <EventOutcome>结果: {event.outcome}</EventOutcome>
              <EventDetails>{event.details}</EventDetails>
              <RelevanceScore value={event.relevance_score}>
                相关度: {event.relevance_score}%
              </RelevanceScore>
            </EventCard>
          </TimelineNode>
        ))}
      </TimelineWrapper>
    </TimelineContainer>
  );
};

export default HistoricalTimeline;
