import React from 'react';
import { FeedItem } from '../types';

interface Props {
  item: FeedItem;
}

const FeedItemCard: React.FC<Props> = ({ item }) => {
  return (
    <div className="feed-item-card">
      {item.imageUrl && <img src={item.imageUrl} alt="Feed item" className="feed-item-img" />}
      <div className="feed-item-content">
        <div className="feed-item-message">{item.message}</div>
        <div className="feed-item-time">{new Date(item.time).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default FeedItemCard;
