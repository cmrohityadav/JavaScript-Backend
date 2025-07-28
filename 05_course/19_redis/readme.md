# Redis
-Download
```windows
https://github.com/tporadowski/redis/releases

```
## Redis is an open-source, in-memory data structure store that’s widely used as
- A database (key-value store, NoSQL)
- A cache (to speed up applications by storing frequently used data in memory)
- A message broker (via Pub/Sub and Streams)


## Key Points about Redis
- In-memory → Everything is kept in RAM, so it’s super fast.

- Data structures → Not just strings! It supports strings, lists, sets, sorted sets, hashes, bitmaps, hyperloglogs, and streams.

- Persistence → Though it’s in-memory, Redis can persist data to disk with RDB snapshots or AOF logs.

- Atomic operations → Commands are atomic. You can also use Lua scripts for transactional behavior.

- Replication → Supports master-replica architecture for high availability.

- Cluster mode → For horizontal scaling (partitioning data across multiple nodes).

🔧 What is Redis used for?
- Caching (e.g., session storage, page caching)

- Leaderboards & counting (using sorted sets and counters)

- Pub/Sub systems (real-time notifications, chat apps)

- Queue systems (using lists as queues)

- Rate limiting (e.g., limit API requests)



