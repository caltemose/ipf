// eslint exception:
/*global jQuery*/

var ipf = ipf || {};

ipf.contact = (function ($) {

    var $form, $successMessage, $name, $email, $recipient, $message;

    function initialize (form) {
        // form is passed through as an ID
        $form = $('#' + form);
        
        $successMessage = $('#successMessage');

        // save references
        saveReferences();

        // attach submit handler
        $form.submit(checkForm.bind(this));
    }

    function saveReferences () {
        $name = $form.find('[name="name"]');
        $email = $form.find('[name="email"]');
        $recipient = $form.find('[name="recipient"]');
        $message = $form.find('[name="message"]');
    }

    function checkForm (event) {
        event.preventDefault();
        var valid = true;
        if ($name.val().length < 2) {
            valid = false;
        }
        if (!emailIsValid($email.val())) {
            valid = false;
        }
        if ($recipient.val().length < 1) {
            valid = false;
        }
        if ($message.val().length < 2) {
            valid = false;
        }
        if (valid) {
            submitAjaxForm(event);
        } else {
            alert('You must fill out all fields with valid values.');
        }
    }

    function emailIsValid (email) {
        return email.length > 5;
    }

    function submitAjaxForm () {
        $.post('contact.php', $form.serialize())
            .done(function (res) {
                console.log(res);
                $form.hide();
                $successMessage.show();
            })
            .error(function (res) {
                if (res.status === 400) {
                    console.log(res.responseJson.err);
                } else {
                    console.error(res.statusText);
                }
            });
    }

    return {
        init: initialize
    };

})(jQuery);
