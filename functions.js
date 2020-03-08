function Contact(fname, email, phone, gender) {
  this.fname = fname;
  this.email = email;
  this.phone = phone;
  this.gender = gender;
}

function getContacts() {
  var contacts = new Array;
  var contact_str = localStorage.getItem('contact');
  if (contact_str !== null) {
    contacts = JSON.parse(contact_str);
  }
  return contacts;
}
var callOne = true;

function save() {
  $("#incorrectName").text("");
  $("#incorrectPhone").text("");
  $("#incorrectMail").text("");
  if (callOne) add();
  else edit();
}

function add() {


  var fname = $("#fname").val();
  var phone = $("#phone").val();
  var email = $("#email").val();
  var gender = $("input[name='gender']:checked").val();
  if (validareName(fname) && validateNumber(phone) && validateMail(email)) {

    var contact = {
      'fname': fname,
      'phone': phone,
      'email': email,
      'gender': gender
    };
    var contacts = getContacts();
    contacts.push(contact);
    localStorage.setItem('contact', JSON.stringify(contacts));
    showContacts()

    location.href = "#contacts";
    return true;
  }
  if (!validareName(fname)) {
    $("#incorrectName").text("Name must contain only letters");
  }
  if (!validateNumber(phone)) {
    $("#incorrectPhone").text("Incorrect phone Number");
  }
  if (!validateMail(email)) {
    $("#incorrectMail").text("Incorrect email format");
  }
}

function showContacts() {
  $("#contactsListView").empty();

  var contacts = getContacts();
  console.log(contacts);
  var html = '';
  for (var i = 0; i < contacts.length; i++) {
    var button1 = document.createElement("a")

    var li = document.createElement("li");
    var h2 = document.createElement("h2");
    var img = document.createElement("img");
    var button = document.createElement("a")

    li.setAttribute("class", "ui-li-has-alt ui-li-has-thumb ui-first-child")
    button1.setAttribute('id', i);

    button1.setAttribute("href", "#profile");
    button1.setAttribute("class", "ui-button ui-btn")

    button1.appendChild(img);
    button1.appendChild(h2);


    button.setAttribute("href", "tel:"+contacts[i].phone);
    button.setAttribute("class", "ui-btn ui-btn-icon-notext ui-icon-phone ui-btn-a");
    if (contacts[i].gender == 'male') {
      img.setAttribute('src', 'user.png');
    } else {
      img.setAttribute('src', 'female.png');
    }


    h2.append(document.createTextNode(contacts[i].fname));
    li.appendChild(button1);


    li.appendChild(button);
    button1.addEventListener('click', contactProfile)

    console.log(li);

    document.getElementById("contactsListView").appendChild(li);


  };
}



$("#contacts").load(showContacts());

function contactProfile() {
  var contacts = getContacts();
  id = this.getAttribute('id');
  console.log(id);


  $("#contactName").text(contacts[id].fname);
  $("#contactnum").text(contacts[id].phone);
  $("#contactmail").text(contacts[id].email);

  if (contacts[id].gender == 'male') {
    $("#contactimg").attr("src", "user.png");
  } else {
    $("#contactimg").attr("src", "female.png");
  }
  var call =document.getElementById("call");
  call.setAttribute("href","tel:"+contacts[id].phone);
}

function editProfile() {
  callOne = false;

  window.location.replace("#register");
  var contacts = getContacts();


  $("#fname").val(contacts[id].fname);
  $("#phone").val(contacts[id].phone);
  $("#email").val(contacts[id].email);
  if (contacts[id].gender == male) {
    $("male").prop("checked", true);
  } else {
    $("female").prop("checked", true);
  }
}



function edit() {
  var contacts = getContacts();

  contacts[id].fname = $("#fname").val();
  contacts[id].phone = $("#phone").val();
  contacts[id].email = $("#email").val();
  contacts[id].gender = $("input[name='gender']:checked").val();
  if (validareName(contacts[id].fname) && validateNumber(contacts[id].phone) && validateMail(contacts[id].email)) {


    localStorage.setItem('contact', JSON.stringify(contacts));

    console.log($("#fname").val());


    $("#fname").val("");
    $("#phone").val("");
    $("#email").val("");

    showContacts()

    location.href = "#contacts";
    callOne = !callOne;

    return true;
  }
  if (!validareName(contacts[id].fname)) {
    $("#incorrectName").text("Name must contain only letters");
  }
  if (!validateNumber(contacts[id].phone)) {
    $("#incorrectPhone").text("Incorrect phone Number");
  }
  if (!validateMail(contacts[id].email)) {
    $("#incorrectMail").text("Incorrect email format");
  }

}

function validareName(inputtxt) {
  var letters = /^[A-Za-z]+$/;
  if (String(inputtxt).match(letters)) {
    return true;
  } else {
    return false;
  }
}

function validateMail(inputtxt) {
  var email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (String(inputtxt).match(email)) {
    return true;
  } else {
    return false;
  }
}

function validateNumber(inputtxt) {
  var number = /^(010|011|012)[0-9]{8}$/;
  if (String(inputtxt).match(number)) {
    return true;
  } else {
    return false;
  }
}
