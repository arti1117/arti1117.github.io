
window.addEventListener("DOMContentLoaded", function() {

// get the form elements defined in your form HTML above

var form = document.getElementById("my-form");
var button = document.getElementById("my-form-button");
var status = document.getElementById("status-ok");
var altering = document.getElementById("status-fail");

// Success and Error functions for after the form is submitted

function success() {
form.reset();
status.style = "display: visible; background: #04c986; color: #157051; font-size: 10pt; font-weight: 600; padding: 5px 0; border: 1px solid #157c59;";
}

function error() {
altering.style = "display: visible; background: #04c986; color: #157051; font-size: 10pt; font-weight: 600; padding: 5px 0; border: 1px solid #157c59;";
}

// handle the form submission event

form.addEventListener("submit", function(ev) {
ev.preventDefault();
var data = new FormData(form);
ajax(form.method, form.action, data, success, error);
setTimeout(function() {status.style="display: none;"}, 5000);
});
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error){
var xhr = new XMLHttpRequest();
xhr.open(method, url);
xhr.setRequestHeader("Accept", "application/json");
xhr.onreadystatechange = function() {
if (xhr.readyState !== XMLHttpRequest.DONE) return;
if (xhr.status === 200) {
    success(xhr.response, xhr.responseType);
} else {
    error(xhr.status, xhr.response, xhr.responseType);
}
};
xhr.send(data);
}
