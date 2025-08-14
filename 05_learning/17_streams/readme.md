# What is a Stream?

- A Stream is just an abstract interface for working with streaming data in chunks instead of all at once.

## Node.js has 4 main stream types:

### Readable → read data (like fs.createReadStream)

### Writable → write data (like fs.createWriteStream)

### Duplex → both read + write (like TCP socket)

### Transform → duplex + modify data (like zlib.createGzip())

##  Why Streams?
- If you read a 1GB file:

-> Without Stream: Load entire 1GB in RAM.

-> With Stream: Read small chunks (64KB by default) → process → discard → next chunk.

This is memory-efficient & works great for I/O:

- Files

- HTTP requests/responses

- TCP sockets

- zlib compression

- process.stdin, process.stdout

## Core Concepts
👉 Event-based:
A Stream is an EventEmitter.
Important events:

- data → When chunk available

- end → No more data

- error → Something failed

- close → Closed

