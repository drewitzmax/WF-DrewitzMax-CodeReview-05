let selectedGender = "";

$(document).ready(function () {

    writePersons(selectedGender);
    setAgeSlider();

    $("#persons").sortable();
    $("#favourites").sortable();
    $("#male").click(function(){
        writePersons("male")
        selectedGender = "male"
    })
    $("#female").click(function(){
        writePersons("female")
        selectedGender = "female";
    })
    $("#others").click(function(){
        writePersons("")
        selectedGender = "";
    })
    $(".ageInput").change(function(){
        if(($("#lower").val() > $("#upper").val())&& $("#upper").val() != 0){
            let temp = $("#lower").val();
            $("#lower").val($("#upper").val());
            $("#upper").val(temp);
        }
        writePersons(selectedGender);
    })
})

function writePersons(gender) {
    document.getElementById("persons").innerHTML = "";
    if (gender == "") {
        for (let person of persons) {
            if(( ( person.age >= $("#lower").val() ) && ( (person.age <= $("#upper").val()) || ($("#upper").val() == 0 )))){
                createCard(person);
            }
            
        }
    } else {
        for (let person of persons) {
            if (person.gender == gender) {
                createCard(person);
            }
        }
    }
}

function createCard(person) {
    let cardMargin = document.createElement("div");
    let card = document.createElement("div");
    let picContainer = document.createElement("div");
    let profilePic = document.createElement("img");
    let profilePicLike = document.createElement("span");
    let cardBody = document.createElement("div");
    let name = document.createElement("h4");
    let cardText = document.createElement("p");
    let likebar =document.createElement("hr");
    /*let favouriteButton = document.createElement("a");*/

    cardMargin.className = "col-xl-2 col-lg-3 col-md-6 col-12";
    cardMargin.id = person.id;
    card.className = "card person"
    profilePic.className = "card-img-top";
    cardBody.className = "card-body";
    name.className = "card-title";
    cardText.className = "card-text";
    /*favouriteButton.className = "btn btn-danger";*/
    profilePicLike.className = "profilePicLike";
    picContainer.className = "picContainer";

    cardMargin.style.padding = "2vh 2vh";
    likebar.style.margin = "1vh 0";
    likebar.style.background = "green";
    likebar.style.border = "5px solid green";
    likebar.style.borderRadius = "2px";
    likebar.style.width = `${(persons[person.id].likes%11)*9}%`;

    profilePic.src = person.profilePic;
    name.textContent = person.name;
    cardText.textContent = person.quote;
    /*favouriteButton.textContent = "add to favourites";*/
    profilePicLike.textContent = "恋";

    profilePicLike.addEventListener("click", function () {
        if (profilePicLike.classList.contains("like")) {
            profilePicLike.classList.remove("like")
        } else {
            profilePicLike.classList.add("like")
            persons[person.id].likes++;
            likebar.style.width = `${(persons[person.id].likes%11)*9}%`;

        }
        $("#favourites").empty();
        $(".like").each(function () {
            $temp = $(this).parents().eq(2);
            createCardExtended($temp.attr("id"));
        })
        $("")
    })

    picContainer.appendChild(profilePic);
    picContainer.appendChild(profilePicLike);
    card.appendChild(picContainer);
    cardBody.appendChild(name);
    cardText.appendChild(likebar);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    cardMargin.appendChild(card);

    document.getElementById("persons").appendChild(cardMargin);
}

function createCardExtended(id) {
    let ind = id;
    let cardMargin = document.createElement("div");
    let card = document.createElement("div");
    let picContainer = document.createElement("div");
    let profilePic = document.createElement("img");
    let profilePicLike = document.createElement("span");
    let cardBody = document.createElement("div");
    let name = document.createElement("h4");
    let cardText = document.createElement("div");
    let age = document.createElement("p")
    let gender = document.createElement("p")
    let hobbieHead = document.createElement("h5");
    let hobbies = document.createElement("ul");
    let ageSpan = document.createElement("span");
    let genderSpan = document.createElement("span");

    /*let favouriteButton = document.createElement("a");*/

    cardMargin.className = "col-xl-4 col-12";
    card.className = "card"
    profilePic.className = "card-img-top profilePic";
    cardBody.className = "card-body";
    name.className = "card-title";
    cardText.className = "card-text";
    /*favouriteButton.className = "btn btn-danger";*/
    profilePicLike.className = "profilePicLike like";
    picContainer.className = "picContainer";

    cardMargin.style.padding = "2vh 2vh";

    profilePic.src = persons[id].profilePic;
    name.textContent = persons[id].name;
    hobbieHead.textContent = "Hobbies:"
    for (let hobbyTemp of persons[ind].hobbies) {
        let hobby = document.createElement("li");
        hobby.textContent = hobbyTemp;
        hobbies.appendChild(hobby);
    }
    cardText.textContent = persons[id].quote;
    /*favouriteButton.textContent = "add to favourites";*/
    profilePicLike.textContent = "恋";
    ageSpan.innerHTML = "<h5>Age: </h5>" + persons[id].age
    genderSpan.innerHTML = "<h5>Gender: </h5>" + persons[id].gender

    profilePicLike.addEventListener("click", function () {
        $(`#${ind} .profilePicLike`).removeClass("like");
        $(this).parents().eq(2).remove();
    })

    picContainer.appendChild(profilePic);
    picContainer.appendChild(profilePicLike);
    card.appendChild(picContainer);
    cardText.appendChild(hobbieHead);
    cardText.appendChild(hobbies);
    cardText.appendChild(ageSpan);
    cardText.appendChild(genderSpan);
    cardBody.appendChild(name);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    cardMargin.appendChild(card);

    document.getElementById("favourites").appendChild(cardMargin);

}

function setAgeSlider() {
    $(function () {
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 99,
            values: [10, 99],
            slide: function (event, ui) {
                $("#amount").val(ui.values[0] + "-" + ui.values[1]);
                $(".ui-slider-handle").eq(1).attr(`{"data-toggl": "popover", "data-placement": "bottom" }`);
            }
        });
        $(".ui-slider-handle").attr(`{"data-toggl": "popover", "data-placement": "bottom" }`);
    });
}