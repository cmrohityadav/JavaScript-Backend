```js
const selectedField= await User.find().select(name email -password)

```

```js
const limitedusers=await User.find().limit(5).skip(1)

```
const sortedUser= await User.find().sort({age:-1})

```js
const count= aawait User.countDocuments({isActive:true})

```

# 📘 Mongoose Methods Summary

| Category         | Method(s)                                                                 |
|------------------|---------------------------------------------------------------------------|
| **Create**       | `new Model(..).save()`, `Model.create()`, `Model.insertMany()`           |
| **Read**         | `find()`, `findOne()`, `findById()`, + query helpers                     |
| **Update**       | `updateOne()`, `updateMany()`, `findOneAndUpdate()`, `save()`            |
| **Delete**       | `deleteOne()`, `deleteMany()`, `findOneAndDelete()`, `remove()`          |
| **Bulk / Advanced** | `bulkWrite()`, `startSession()`, `watch()`, `castObject()`, `init()`  |
| **Model Utilities** | `statics`, `methods`, `query`, `virtual`, `.populate()`               |
| **Doc Utilities**   | `isModified()`, `.toJSON()`, `.equals()`, etc.                        |





# 📘 Mongoose Methods 

| Category           | Method                  | Description                                                       | Parameters                                | Returns                                      |
|--------------------|-------------------------|-------------------------------------------------------------------|-------------------------------------------|----------------------------------------------|
| **Create**         | `new Model(..).save()`  | Create a single document with schema validation and middleware    | `{}` (document)                            | Saved document with `_id`, timestamps        |
|                    | `Model.create()`        | Create one or more documents; applies validation                  | `doc` or `[doc, ...]`                      | Created document(s)                          |
|                    | `Model.insertMany()`    | Bulk insert; faster but skips middleware by default               | `[doc, ...]`, `{ ordered, lean }`         | Inserted documents or error details          |
| **Read**           | `find()`                | Retrieve multiple documents matching a filter                     | `filter`, `projection`, `options`         | Array of documents                           |
|                    | `findOne()`             | Retrieve the first document matching a filter                     | `filter`, `projection`                    | Single document or `null`                    |
|                    | `findById()`            | Retrieve a document by its `_id`                                  | `id`, `projection`                        | Single document or `null`                    |
|                    | `query helpers`         | Custom chainable query methods on schema                          | `this.<query>`                            | Extended query chain                         |
| **Update**         | `updateOne()`           | Update the first document matching the filter                     | `filter`, `update`, `options`             | Result object with matched/modified count    |
|                    | `updateMany()`          | Update all documents matching the filter                          | `filter`, `update`, `options`             | Result object with modified count            |
|                    | `findOneAndUpdate()`    | Find and update one doc; optionally return the new one            | `filter`, `update`, `{ new, upsert }`     | Original or updated document                 |
|                    | `save()`                | Save an existing document instance (with validation)              | None                                      | Updated document                             |
| **Delete**         | `deleteOne()`           | Delete the first document that matches the filter                 | `filter`                                  | Delete result object                         |
|                    | `deleteMany()`          | Delete all documents that match the filter                        | `filter`                                  | Delete result object                         |
|                    | `findOneAndDelete()`    | Find and delete a single document                                 | `filter`                                  | Deleted document or `null`                   |
|                    | `remove()`              | Delete the document instance directly                             | None                                      | Deleted document                             |
| **Bulk / Advanced**| `bulkWrite()`           | Execute multiple write operations in bulk                         | `[ ops ]`, `{ ordered }`                  | Summary with inserted/modified/deleted counts|
|                    | `startSession()`        | Start a MongoDB session for transactions                          | None                                      | `ClientSession` object                       |
|                    | `watch()`               | Create a change stream to watch changes                           | `pipeline`, `options`                     | `ChangeStream` object                        |
|                    | `castObject()`          | Convert a raw object into a model's schema                        | `object`, `options`                       | Validated and cast object                    |
|                    | `init()`                | Build model indexes as defined in schema                          | None                                      | `Promise<void>`                              |
| **Model Utilities**| `statics`               | Attach static methods to model (class-level)                      | `Schema.statics.<fn>`                     | Callable using the model                     |
|                    | `methods`               | Attach instance methods to documents                              | `Schema.methods.<fn>`                     | Callable using a document instance           |
|                    | `query`                 | Attach reusable query helper methods                              | `Schema.query.<fn>`                       | Chainable on queries                         |
|                    | `virtual`               | Define virtual fields (not stored in DB)                          | `get()`, `set()`                          | Computed field                               |
|                    | `.populate()`           | Populate document references                                      | `field`, `{ path, select }`              | Documents with populated refs                |
| **Doc Utilities**  | `isModified()`          | Check if a field has been modified                                | `path`                                    | `true` or `false`                            |
|                    | `.toJSON()`             | Convert a document into a plain JSON object                       | `options (optional)`                      | POJO (plain object)                          |
|                    | `.equals()`             | Compare if two `_id` values are equal                             | `other`                                   | `true` or `false`                            |



