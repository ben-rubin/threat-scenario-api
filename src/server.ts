import boot from './boot'

// Separation of the app from the server makes it possible to unit test
// ..otherwise we'd get a port conflict when running more than a single test
boot().then(app => {
    app.listen(process.env.PORT)
})