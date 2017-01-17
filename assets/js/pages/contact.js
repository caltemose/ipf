// eslint exception:
/*global jQuery*/

var ipf = ipf || {};

ipf.contact = (function ($) {

    var $form, $name, $email, $recipient, $message, $robot;

    function initialize (form) {
        // form is passed through as an ID
        $form = $('#' + form);

        // save references
        saveReferences();

        // setup validation

        // attach submit handler
        $form.submit(checkForm.bind(this));
    }

    function saveReferences () {
        $name = $form.find('[name="name"]');
        $email = $form.find('[name="email"]');
        $recipient = $form.find('[name="recipient"]');
        $message = $form.find('[name="message"]');
        $robot = $form.find('[name="robot"]');
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
        if (!$robot.prop('checked')) {
            valid = false;
        }
        if (valid) {
            submitAjaxForm();
        } else {
            alert('You must fill out all fields with valid values.');
        }
    }

    function emailIsValid (email) {
        return email.length > 5;
    }

    function submitAjaxForm () {
        // var formData = {};
        alert('(not really) sending to: ' + $recipient.val());
    }

    return {
        init: initialize
    };

})(jQuery);
