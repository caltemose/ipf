import './asyncModules'
import exclaimify from './exclaimify'

const button = document.getElementById('button')

const alertAsyncMessage = function() {
    // CommonJS async syntax webpack magic
    require.ensure([], function() {
        const message = require('./asyncMessage')
        alert(exclaimify(message))
    })
}

button.addEventListener('click', alertAsyncMessage)


console.log(`
    asset references like this one:
        images/gulp.png
    get updated in js too!`)
