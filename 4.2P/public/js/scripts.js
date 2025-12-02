$(document).ready(function () {

  $('.materialboxed').materialbox();
  $('.modal').modal();

 //  .then(data => addCards(data));
fetch("/api/drinks")
  .then(res => res.json())
  .then(result => {
    if (result.statusCode === 200) {
      addCards(result.data);
    } else {
      console.error("Failed to load drinks:", result.message);
    }
  });


  $(document).on("click", "#formSubmit", function (e) {
    e.preventDefault();

    let formData = {
      name: $("#first_name").val(),
      favorite: $("#favorite").val(),
      message: $("#message").val()
    };

    alert("Submit!🎉");
    console.log("Form data submitted: ", formData);
  });

});



function addCards(items) {
  items.forEach(item => {

    let card = `
      <div class="col s12 m4">
        <div class="card">

          <div class="img">
            <img class="act" src="${item.image}">
          </div>

          <div class="cardcontent">

            <div class="title-row">
              <i class="material-icons toggle-info">more_vert</i>
              <span class="card-title">${item.title}</span>
            </div>

            <p>${item.description}</p>
            <p><a href="#">${item.link}</a></p>

          </div>

          <div class="reveal" style="display:none;">
            <span class="text">${item.title}</span>
            <p>${item.extra || "You can find more information about this drink."}</p>
          </div>

        </div>
      </div>
    `;

    $("#card-section").append(card);
  });
}


$(document).on("click", ".toggle-info", function () {
  $(this).closest(".card").find(".reveal").slideToggle(200);
});
