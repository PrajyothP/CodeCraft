
function validateForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(!email || !password){
      alert("Please enter all fields")
      return false
    }
    // Validate email
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    if(!(emailRegex.test(email))){
        alert("Email is not in the right format")
        return false;
      }
  return true
}

const loginBtn = document.getElementById('login')

//Request to server
loginBtn.addEventListener('click',async(e)=>{
  e.preventDefault()
  if(validateForm()){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = JSON.stringify({
      email,password
    })
    try{
      const resp = await axios({
        method : "POST",
        url : "http://localhost:7956/login",
        headers : {
          'Access-Control-Allow-Origin': '*',
          'Content-Type' : 'application/json'
        },
        data
      })
      if(resp.data.status == 200){
        //Success
        alert("Signed in")
        window.location.replace("http://localhost:7956")
      }
      else if(resp.data.status !=200){
        alert(resp.data.msg)
      }
      else{
        alert("Unexpected server error")
      }
    }
    catch(err){
      alert("Unexpected network error")
      console.log(err)
    }
  }
})

