import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: #1e293b;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const EventInfo = styled.div`
  h3 {
    margin: 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
    color: #94a3b8;
  }
`;

const Similarity = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${({ value }) => {
    if (value > 90) return '#10b981';
    if (value > 80) return '#f59e0b';
    return '#ef4444';
  }};
`;

const HistoricalEventCard = ({ event }) => {
  return (
    <Card>
      <EventInfo>
        <h3>{event.year} {event.title}</h3>
        <p>{event.type} - {event.description}</p>
        <p>历史结果：{event.outcome}</p>
      </EventInfo>
      <Similarity value={event.similarity}>{event.similarity}% 相似度</Similarity>
    </Card>
  );
};

export default HistoricalEventCard;