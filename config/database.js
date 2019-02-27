module.exports = {
    database: mongoose.connect("mongodb://localhost/magicMirror", { useNewUrlParser: true }),
    secret: 'apple pie'
}