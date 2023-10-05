import express from 'express' // module js asynchronous
const app = express()

app.get('/', (req, res) => {
    res.send('server is the ready');

})

// get a list of  jokes
app.get('/api/jokes', (req, res) => {

    const jokes = [
        {
            id: 1,
            title: 'A joke',
            content: 'This is a joke'

        },
        {
            id: 2,
            title: 'Another joke',
            content: 'This is another joke'

        },
        {
            id: 3,
            title: '3 joke',
            content: ' 3 This is a joke'

        },
        {
            id: 4,
            title: 'A  4th joke',
            content: 'This is a 4th joke'

        },
        {
            id: 5,
            title: 'A 5th joke',
            content: 'This is a 5th joke'

        }
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)

})
