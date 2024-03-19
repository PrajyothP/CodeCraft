
//Request to save code
const savebtn = document.getElementById("savebtn")

savebtn.addEventListener('click', async(e)=>{
    e.preventDefault()
    if(!document.cookie){
        alert("Please login or register to save code")
        return;
    }
    const editor = ace.edit("editor")
    const code = editor.getValue()
    const lang = document.getElementById("language").value
    if(!code){
        alert("Code is required")
        return;
    }
    try{
    const data = JSON.stringify({code,lang})
    const resp = await axios({
        method : "POST",
        url : "http://localhost:7956/save",
        headers : {
            "Content-Type" : "application/json",
            'Access-Control-Allow-Origin': '*'
        },
        data
    })
    if(resp.data.status = 200){
        alert(resp.data.msg)
    }
   }
   catch(err){
    alert(err)
   }
})

const loadbtn = document.getElementById('loadbtn')

loadbtn.addEventListener('click',async(e)=>{
    e.preventDefault()
    if(!document.cookie){
        alert("Please login or register")
        return;
    }
    const editor = ace.edit("editor")
    const lang = document.getElementById("language").value

    try{
        const data = JSON.stringify({lang})
        const resp = await axios({
            method : "POST",
            url : "http://localhost:7956/load",
            headers : {
                "Content-Type" : "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            data
        })
        if(resp.data.status==200){
            editor.setValue(resp.data.msg)
        }
        else if(resp.data.status==204) {
            alert(resp.data.msg)
        }
        else {
            alert("Internal server error")
        }
    }
    catch(err){
        console.log(err)
        alert(err)
    }    
})