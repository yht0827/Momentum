const form = document.querySelector(".js-form"),
    input = form.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
    SHOWING_CN= "showing";


function saveName(text){

    localStorage.setItem(USER_LS,text);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.classList.add("name__text");
    greeting.innerText =`안녕하세요 ${text}님`;
}

function loadname(){
 const currnetUser = localStorage.getItem(USER_LS);
 if(currnetUser == null){
     askForName();
 }else{
    paintGreeting(currnetUser);
 }
}

function init(){

    loadname();
}

init();