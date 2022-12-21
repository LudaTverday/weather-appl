const TIME_OUT = 5000;
export function showErrorMessage(elementError, message){
    elementError.innerHTML = message;
    setTimeout(()=>{
        elementError.innerHTML = "";
    }, TIME_OUT)
}