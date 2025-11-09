console.log("This is the SIT725 webpage");

function showthemessage(){
    const user=document.getElementById("username").value;
    const date=new Date();
    alert(`Hi ${user} !Welcome to SIT725 on ${date.toDateString()}.`);
}
