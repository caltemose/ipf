<?php
// In order to make this form work, some dependencies are required.
// See Mailgun docs: https://documentation.mailgun.com/libraries.html#php
// Install Composer
# curl -sS https://getcomposer.org/installer | php
// Add Mailgun and Guzzle6 as a dependency
# php composer.phar require mailgun/mailgun-php php-http/guzzle6-adapter php-http/message

require 'vendor/autoload.php';
use Mailgun\Mailgun;

# Instantiate the client.
$mgClient = new Mailgun('key-531fa3a409cd408c0c594febe61dd547');
$domain = "mg.inmanparkfestival.org";

// get POST data
$visitorName = Trim(stripslashes($_POST['name']));
$visitorEmail = Trim(stripslashes($_POST['email']));
$recipient = Trim(stripslashes($_POST['recipient']));
$message = stripslashes($_POST['message']);
$robot = $_POST['robot'];

// validation finfo_set_flags
$valid=true;

$errors = array(
    "name"=>true,
    "email"=>true,
    "recipient"=>true,
    "message"=>true,
    "robot"=>true
);

// this is only used for testing.
$success = array(
    "name"=>true,
    "email"=>true,
    "recipient"=>true,
    "message"=>true,
    "robot"=>true
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

if ($robot !== 'on') {
    $valid = false;
    $errors["robot"] = false;
} else {
    $success["robot"] = true;
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
    'from'    => 'Site Admin <admin@inmanparkfestival.org>',
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
