$("#submit").click(function(){
    if ($("#username").val() == ""){
        if (document.querySelector("#name p") == null){
            let newdiv = document.createElement("p");
            newdiv.innerHTML = `
                Please enter a name
            `
            newdiv.style.color = "red";
            document.querySelector("#name").append(newdiv);
        }
    }
    else{
        if (document.querySelector("#name p") != null){
            document.querySelector("#name p").remove();
        }
    }
    if ($("#password").val() == ""){
        if (document.querySelector("#pass p") == null){
            let newdiv = document.createElement("p");
            newdiv.innerHTML = `
                Please enter a password
            `
            newdiv.style.color = "red";
            document.querySelector("#pass").append(newdiv);
        }
    }
    else{
        if (document.querySelector("#pass p") != null){
            document.querySelector("#pass p").remove();
        }
    }
    if ($("#country").val() == ""){
        if (document.querySelector("#ctry p") == null){
            let newdiv = document.createElement("p");
            newdiv.innerHTML = `
                Please enter a country
            `
            newdiv.style.color = "red";
            document.querySelector("#ctry").append(newdiv);
        }
    }
    else{
        if (document.querySelector("#ctry p") != null){
            document.querySelector("#ctry p").remove();
        }
    }
    if ($("#username").val() != "" && $("#password").val() != "" && $("#country").val() != ""){
        localStorage.setItem("username", JSON.stringify($("#username").val()));
        localStorage.setItem("password", JSON.stringify($("#password").val()));
        window.location = "loadingScreen.html";
    }
});