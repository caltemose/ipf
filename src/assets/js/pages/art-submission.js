(function ($) {

    var $form, artDropZone

    function submitForm (event) {
        var $name = $('input[name="artistName"]')
        var $phone = $('input[name="artistPhone"]')
        var $email = $('input[name="artistEmail"]')

        var isValid = true
        var errorMsg = '<p>Please correct the errors with your form: '
        if ($name.val().length < 3) {
            isValid = false
            errorMsg += 'You must submit a name. '
        }
        if (!phoneIsValid($phone.val()) && !emailIsValid($email.val())) {
            isValid = false
            errorMsg += 'You must submit either a valid phone number or email address. '
        }
        if (artDropZone.getQueuedFiles() < 1) {
            isValid = false
            errorMsg += 'You must submit at least one art file.'
        }
        errorMsg += '</p>'
        event.preventDefault()
        if (isValid) {
            console.log('submit form')
            artDropZone.processQueue()
        } else {
            console.error('invalid form')
            $('.ArtForm-error').html(errorMsg)
        }
    }

    function phoneIsValid (phone) {
        return phone.length > 10
    }

    function emailIsValid (email) {
        var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return email.match(emailRegex)
    }

    function initialize () {
        Dropzone.autoDiscover = false
        var dzOptions = {
            autoProcessQueue: false,
            previewsContainer: '.dz-previews-container',
            maxFilesize: 5,
            maxFiles: 3,
            acceptedFiles: 'image/*,application/pdf',
            autoProcessQueue: false
        }
        $form = $('#imagedrop')
        $form.submit(submitForm)
        artDropZone = new Dropzone("#imagedrop", dzOptions);
    }

    initialize()
})(window.jQuery)
