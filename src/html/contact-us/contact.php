<?php
require 'vendor/autoload.php';
use Mailgun\Mailgun;
require '_config.php';

# Instantiate the client.
$mgClient = new Mailgun($mailgunKey);
$domain = "mg.inmanparkfestival.org";

// get POST data
$visitorName = Trim(stripslashes($_POST['name']));
$visitorEmail = Trim(stripslashes($_POST['email']));
$recipient = Trim(stripslashes($_POST['recipient']));
$message = stripslashes($_POST['message']);

// HONEYPOT
$email_address = Trim(stripslashes($_POST['email_address']));
if ($email_address !== '') {
    header('Content-Type: application/json');
    echo '{"success": "not-really"}';
    exit;
}

// validation flag
$valid=true;

$errors = array(
    "name"=>true,
    "email"=>true,
    "recipient"=>true,
    "message"=>true
);

// this is only used for testing.
$success = array(
    "name"=>true,
    "email"=>true,
    "recipient"=>true,
    "message"=>true
);

if ($visitorName === '') {
    $valid = false;
    $errors["name"] = false;
} else {
    $success["name"] = $visitorName;
}

if ($visitorEmail === '') {
    $valid = false;
    $errors["email"] = false;
} else {
    $success["email"] = $visitorEmail;
}

if ($recipient === '') {
    $valid = false;
    $errors["recipient"] = false;
} else {
    $success["recipient"] = $recipient;
}

if ($message === '') {
    $valid = false;
    $errors["message"] = false;
} else {
    $success["message"] = $message;
}

if (!$valid) {
    $res = '{"err":' . json_encode($errors) . '}';
    header("HTTP/1.0 400 Bad Request");
    header('Content-Type: application/json');
    echo $res;
    exit;
}

// determine true recipient(s)
$recipientList = '';
switch($recipient) {
    case 'chair':
        $recipientList = 'festival@inmanparkfestival.org';
        break;
    case 'dance':
        $recipientList = 'dance@inmanparkfestival.org';
        break;
    case 'market':
        $recipientList = 'vendors@inmanparkfestival.org';
        break;
    case 'parade':
        $recipientList = 'parade@inmanparkfestival.org';
        break;
    case 'food':
        $recipientList = 'food.vendors@inmanparkfestival.org';
        break;
    case 'music':
        $recipientList = 'entertainment@inmanparkfestival.org';
        break;
    case 'toh':
        $recipientList = 'tickets@inmanparkfestival.org';
        break;
    case 'sponsors':
        $recipientList = 'sponsors@inmanparkfestival.org';
        break;
    case 'volunteers':
        $recipientList = 'volunteer@inmanparkfestival.org';
        break;
    case 'pr':
        $recipientList = 'pr@inmanparkfestival.org';
        break;
    case 'marketing':
        $recipientList = 'advertising@inmanparkfestival.org';
        break;
    case 'support':
        $recipientList = 'support@inmanparkfestival.org';
        break;
    default:
        $recipientList = 'festival@inmanparkfestival.org';
}

$messageBody  = "To respond to this email, copy the email address shown below into a new message please.\n";
$messageBody .= "Email sent from the website contact form from:\n";
$messageBody .= $visitorName . ' - ' . $visitorEmail . "\n\n";
$messageBody .= $message;

# Make the call to the client.
$result = $mgClient->sendMessage($domain, array(
    'from'    => $visitorName . ' <' . $visitorEmail . '>',
    'to'      => $recipientList,
    'subject' => 'Email from Festival Contact Form',
    'text'    => $messageBody
));
$success["result"] = $result;
$success["recipientList"] = $recipientList;

$res = json_encode($success);
header('Content-Type: application/json');
echo $res;

?>
