console.log("This is the SIT725 webpage");

function showthemessage(){
    const user=document.getElementById("username").value;
    const date=new Date();
    alert(`Hi ${user} !Welcome to SIT725 on ${date.toDateString()}.`);
}

function add(){
    const a=document.getElementById("numbera").value;
    const b=document.getElementById("numberb").value;
    fetch(`/add?a=${a}&b=${b}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById("result").textContent = data.error;
            } else {
                document.getElementById("result").textContent = 
                    `The sum of ${data.a} and ${data.b} is ${data.sum}`;
            }
        });
}