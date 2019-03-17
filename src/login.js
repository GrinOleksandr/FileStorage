
//*********************************************REGISTRATION HANLER**************************************
const LoginForm = document.forms['login-form'];
RegistrationForm.addEventListener('submit', formSubmit);

// const LoginField = document.getElementById("login");
// const EmailField = document.getElementById("email");
// const PasswordField = document.getElementById("password");



function formSubmit(ev){
    ev.preventDefault();
    alert("FORM IS SENT");
    console.log("***********FORM SUBMITTED***********");

    console.log(`login: ${RegistrationForm.elements['login'].value}`);
    console.log(`Email: ${RegistrationForm.elements['email'].value}`);
    console.log(`pass: ${RegistrationForm.elements['password'].value}`);
    console.log("************************************");


    let request = new XMLHttpRequest();
    request.open('POST', `/user/register`);
    let formData = new FormData(RegistrationForm);
    request.send(formData);
    RegistrationForm.reset();
    alert("Registration Complete");

}
