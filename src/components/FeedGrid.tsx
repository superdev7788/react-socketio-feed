import React, { useEffect, useState, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import FeedItemCard from './FeedItemCard';
import { FeedItem } from '../types';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';

const PAGE_LIMIT = 20;
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001/api";
const SOCKET_IO_URL = process.env.REACT_APP_SOCKET_IO_URL || "http://localhost:3001";

const FeedGrid: React.FC = () => {
    const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const socketRef = useRef<Socket | null>(null);

    // Fetch paginated feed data via REST API
    const fetchFeedData = async (pageNum: number) => {
        try {
            const res = await axios.get(`${API_BASE_URL}/feed?page=${pageNum}&limit=${PAGE_LIMIT}`);
            const data: FeedItem[] = res.data?.data || [];
            // const uniquedata = Array.from(new Map(data.map(item => [item.id, item])).values());
            // console.error(res.data.items);
            if (data.length < PAGE_LIMIT) {
                setHasMore(false);
            }
            if (pageNum === 1) {
                setFeedItems(data);
            } else {
                setFeedItems((prev) => [...prev, ...data]);
            }
        } catch (error) {
            console.error('Failed to fetch feed data', error);
            setHasMore(false);
        }
    };

    useEffect(() => {
        fetchFeedData(1);
        socketRef.current = io(SOCKET_IO_URL);

        socketRef.current.on("connect", () => console.log("Socket connected:", socketRef.current?.id));

        socketRef.current.on("new-feed-item", (newItem: FeedItem) => {
            console.log("Received new feed item:", newItem);
            setFeedItems((prev) => {
                if (prev.some((item) => item.id === newItem.id)) {
                    return prev;
                }
                return [newItem, ...prev];
            });
        });

        return () => {
            socketRef.current?.off("new-feed-item");
            socketRef.current?.disconnect();
        };
    }, []);

    const fetchMoreData = () => {
        const nextPage = page + 1;
        fetchFeedData(nextPage);
        setPage(nextPage);
    };

    return (
        <InfiniteScroll
            dataLength={feedItems.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4 className="loading-text">Loading...</h4>}
            endMessage={<p className="end-text">No more data to load.</p>}
            scrollThreshold={0.9}
        >
            <div className="feed-grid">
                {feedItems.map((item) => (
                    <FeedItemCard key={item.id} item={item} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default FeedGrid;
