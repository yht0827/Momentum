const toDoForm = document.querySelector(".js-toDoForm"),//form
            toDoInput= toDoForm.querySelector("input"),//input
            toDoList = document.querySelector(".js-toDoList");//ul

            const TODOS_LS = "toDos";

            let toDos = [];

            function saveToDos(){

                localStorage.setItem(TODOS_LS,JSON.stringify(toDos));

            }

            function deleteToDo(event){

                const btn = event.target;
                const li = btn.parentNode;
                toDoList.removeChild(li);

                const cleanToDos = toDos.filter(function(toDo) {
                    return toDo.id !== parseInt(li.id);
                });
                toDos = cleanToDos;
                saveToDos();
            }

            function paintToDo(text){
                
                const li = document.createElement("li");
                const delBtn = document.createElement("span");
                const span = document.createElement("span");
                const newId = toDos.length+1;
                delBtn.innerHTML="❌"; 
                delBtn.classList.add("toDo__button");
                delBtn.addEventListener("click",deleteToDo);

                span.innerText = text;
                li.appendChild(delBtn);
                li.appendChild(span);
                li.id = newId;
                li.classList.add("toDo");
                toDoList.appendChild(li);
                const toDoObj = {
                    text: text,
                    id: newId
                };
                toDos.push(toDoObj);
                saveToDos();
            }

            function handleSubmit(event){
                    event.preventDefault();
                    const currentValue = toDoInput.value;
                    paintToDo(currentValue);
                    toDoInput.value="";
            }

            function loadToDos(){
                    const loadedToDos = localStorage.getItem(TODOS_LS);
                    if(loadedToDos !== null){
                    const parsedToDos = JSON.parse(loadedToDos);
                    parsedToDos.forEach(function(toDo){
                        paintToDo(toDo.text);
                    });
                }
            }

            function init(){
                loadToDos();
                toDoForm.addEventListener("submit",handleSubmit)
            }

            init();