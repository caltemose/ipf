<?php
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
        $recipientList = 'chair';
        break;
    case 'dance':
        $recipientList = 'dance';
        break;
    case 'market':
        $recipientList = 'market';
        break;
    case 'parade':
        $recipientList = 'parade';
        break;
    case 'food':
        $recipientList = 'food';
        break;
    case 'music':
        $recipientList = 'music';
        break;
    case 'toh':
        $recipientList = 'toh';
        break;
    case 'sponsors':
        $recipientList = 'sponsors';
        break;
    case 'volunteers':
        $recipientList = 'volunteers';
        break;
    case 'pr':
        $recipientList = 'pr';
        break;
    case 'marketing':
        $recipientList = 'marketing';
        break;
    default:
        $recipientList = 'chair';
}
$success["recipientList"] = $recipientList;

$res = json_encode($success);
header('Content-Type: application/json');
echo $res;

?>
