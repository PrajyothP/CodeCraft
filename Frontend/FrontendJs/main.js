//Text area 
var editor = ace.edit("editor");
editor.setTheme("ace/theme/pastel_on_dark");
editor.session.setMode("ace/mode/c_cpp");

// Changing font highlighting as per language
document.getElementById('language').addEventListener('change',function(){
    let val=this.value;
    if(val=='C++'){
        document.getElementById('file-name').innerHTML="main.cpp"
        editor.session.setMode("ace/mode/c_cpp");
        editor.setValue(`#include <iostream>
using namespace std;

int main() 
{
cout << "Hello, World!";
return 0;
}`)
    }
    else if(val=='Java'){
        document.getElementById('file-name').innerHTML="main.java"
        editor.session.setMode("ace/mode/java");
        editor.setValue(`class HelloWorld {
public static void main(String[] args) {
System.out.println("Hello, World!");
}
}`)
    }
    else if(val=='Python'){
        document.getElementById('file-name').innerHTML="main.py"
        editor.session.setMode("ace/mode/python");
        editor.setValue('print("Hello world")')
    }
    else if(val=='C'){
        document.getElementById('file-name').innerHTML="main.c"
        editor.session.setMode("ace/mode/c_cpp");
        editor.setValue(`#include <stdio.h>

int main() 
{
    printf("Hello World!");
    return 0;
}`)
    }

    editor.clearSelection();
})


//Fetching and displaying output
const output =document.getElementById("output")
const runBtn = document.getElementById("Run")
var lang = document.getElementById("language")
const input = document.getElementById("stdin")


runBtn.addEventListener("click",async ()=>{
    const data = {
        code : editor.getValue(),
        lang:lang.value,
        input : input.value
    }
//Request to Backend
    const resp = await fetch("http://localhost:7956/compile",{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
    })
    const ans = await resp.json()
    output.value = ans.error ? ans.error:ans.output;
})
// Clear btn
const clrbtn = document.getElementById('clr')
clrbtn.addEventListener('click',()=>{
    output.value = ""
})

//Logout
const logoutbtn = document.getElementById('logout')

logoutbtn.addEventListener('click',()=>{
  if(!document.cookie) return
  else{
    document.cookie = "jwt= ;  expires = Thu , 01 Jan 1970 00:00:01 GMT ; path = /;"
    location.reload()
    alert("Logged out")
  }
})