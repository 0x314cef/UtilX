//An index of pages
var appIndex = {
    "vpn": 0
}
//Decide which direction to slide the home div, and how much. c is current and t is target.
const pageOffsets = [
    0,//Page0
    -235,//Page1
    -470//Page2
]
var currentPage = 1
//Root function running when the extension's window finishes loading
//This doesn't work like normal on extensions?
document.addEventListener("load", function() {
    function switchPage(page) {
        var home = document.getElementById("home");
        console.log(`${pageOffsets[page]}px`);
        home.style.left = `${pageOffsets[page]}px`;
        var previousBtn = document.getElementById(`navbtn${currentPage}`);
        var currentBtn = document.getElementById(`navbtn${page}`)
        currentPage = page;
        previousBtn.style.backgroundColor = "#b1b1b1";
        currentBtn.style.backgroundColor = "#fff";
    }

    document.querySelectorAll(".navbtn").forEach(Btn => {
        var Button = document.getElementById(Btn.id);
        Button.addEventListener("click", function() {
            switch(Btn.id) {
                case "navbtn0":
                    switchPage(0);
                    break;
                case "navbtn1":
                    switchPage(1);
                    break;
                case "navbtn2":
                    switchPage(2);
                    break;
            }
        });
    });

    document.querySelectorAll(".icon").forEach(iconBtn => {
        var iconButton = document.getElementById(iconBtn.id);
        iconButton.addEventListener("click", function() {
            chrome.runtime.sendMessage({"command": "initApp", "data": "vpn"}, function(response) {
                if (response && response.error) {
                    console.log(response.info);
                } else {
                    console.log(response);
                }
            });
        });
    })
});

//Bootleg way that should work most of the time. May not work on slower internet, i'll have to think of something else.
//I have an idea to check for certain elements until they are all loaded.
setTimeout(function() {
    const loadevent = new Event("load");
    document.dispatchEvent(loadevent);
}, 1000)