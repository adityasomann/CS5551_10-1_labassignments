function onSignIn(googleUser) {

    var profile = googleUser.getBasicProfile();
    response = "Hello " + profile.getName() + "!";
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    //                    This is HTML ID         This is JavaScript Variable
    document.getElementById("output1").innerHTML = response;
    document.getElementById("output2").src = profile.getImageUrl();
    document.getElementById("output3").innerHTML = profile.getEmail();
    location.href="home.html"
}