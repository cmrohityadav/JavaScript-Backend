# What are Buffers?

A Buffer is a chunk of raw binary data.
It’s like a tiny block of memory — a fixed-size box that holds bytes (0s and 1s).

In Node.js, Buffers let you work directly with binary data.

They’re similar to arrays, but each element is a byte (8 bits).

They handle raw data that doesn’t fit nicely as plain strings.

# Why do Buffers exist?
JavaScript was designed for browsers — mostly text (HTML, JSON, strings).
But Node.js runs on servers — and servers must deal with binary data:

✅ Files (images, videos, PDFs)
✅ Network packets (TCP streams, HTTP bodies)
✅ Cryptography (hashes, keys, encryption)
✅ Protocols (binary formats, custom data)

The Buffer class lets Node.js handle this efficiently, without converting everything to strings.



## Let’s make this crystal clear:

When you create a Buffer in Node.js, you’re literally creating a chunk of raw bytes in memory — just like low-level languages do (like C or C++).

📂 Example: Buffer is raw bytes
```js
const buf = Buffer.from('ABC');
console.log(buf); // <Buffer 41 42 43>
'A' → 0x41 (hex) → 65 (decimal)

'B' → 0x42 → 66

'C' → 0x43 → 67
```
So buf holds the actual binary representation:
```bash
01000001 01000010 01000011
```
Each letter → 1 byte (8 bits).
When you .toString() the Buffer, Node decodes the bytes back into characters