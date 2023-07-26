import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
const firebaseConfig = {
    apiKey: "AIzaSyBSSS8XTU7E7R4coKyYyeQaTGtNF9iAftE",
    authDomain: "sem4-69500.firebaseapp.com",
    projectId: "sem4-69500",
    storageBucket: "sem4-69500.appspot.com",
    messagingSenderId: "478281482075",
    appId: "1:478281482075:web:1e969cc8df0d36dab6647e",
    measurementId: "G-7K7YSMBXLR",
    databaseURL: "https://sem4-69500-default-rtdb.firebaseio.com",
};
const app = initializeApp(firebaseConfig);

import {
    getDatabase,
    ref,
    set,
    child,
    get,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const db = getDatabase();
const name = document.getElementById("first-name");
const email = document.getElementById("email");
const mob = document.getElementById("Phone");
const cllg = document.getElementById("College");
const yof = document.getElementById("last-name");
const state = document.getElementById("State");
const pass = document.getElementById("Password");
const submit = document.getElementById("submit");
const linkedin = document.getElementById("linkedin");
const collegeid = document.getElementById("CollegeID");


function Registeruser(e) {
    e.preventDefault();
    const dbref = ref(db);
    const tokenno = document.getElementById("Phone").value + "CU";
    if (auntenticate()) {
        get(
            child(dbref, "UsersList2/" + mob.value)
        ).then((snapshot) => {
            if (snapshot.exists()) {
                alert("Already Exist");
            } else {
                set(
                    child(
                        dbref,
                        "UsersList/" + state.value + "/" + mob.value
                    ), {
                        name: name.value,
                        password: pass.value,
                        mobile: mob.value,
                        email: email.value,
                        collegename: cllg.value,
                        yearofstudy: yof.value,
                        state: state.value.toLowerCase(),
                        linkedin: linkedin.value,
                        collegeid: collegeid.value,
                        token: tokenno,
                    }
                )
                set(
                        child(
                            dbref,
                            "UsersList2/" + mob.value
                        ), {
                            name: name.value,
                            password: pass.value,
                            mobile: mob.value,
                            email: email.value,
                            collegename: cllg.value,
                            yearofstudy: yof.value,
                            state: state.value.toLowerCase(),
                            linkedin: linkedin.value,
                            collegeid: collegeid.value,
                            token: tokenno,
                        }
                    )
                    .then(() => {
                        gotologin();
                        console.log("success");
                    })
                    .catch((error) => {
                        alert("error: " + error);
                    });
            }
        });
    } else {}
}

submit.addEventListener("click", Registeruser);

function auntenticate() {
    console.log(mob.value);
    let val = mob.value;
    let st = state.value;
    var mailFormat = /\S+@\S+\.\S+/;
    if (val.length == 10) {

        if (email.value.match(mailFormat) && email.value != "") {
            if (st != "") {
                if (linkedin.value.length != "") {
                    if (pass.value.length != "") {
                        if (collegeid.value != "") {
                            if (name.value != "") {
                                if (cllg.value != "") {
                                    if (yof.value != "") {
                                        return true;
                                    } else {
                                        yof.style.border = "1px solid red";
                                        alert("Select Your Year of study");

                                    }

                                } else {
                                    cllg.style.border = "1px solid red";
                                    alert(" Enter Your College Name");
                                }
                            } else {
                                name.style.border = "1px solid red";
                                alert(" Enter Your Name");
                            }

                        } else {
                            collegeid.style.border = "1px solid red";
                            alert("Kindly Enter College ID");
                        }

                    } else {
                        pass.style.border = "1px solid red";
                        alert("Kindly Enter Password");

                    }
                } else {
                    linkedin.style.border = "1px solid red";
                    alert("Kindly Enter LinkedIN Profile URL");
                }
            } else {
                state.style.border = "1px solid red";
                alert("Kindly Select the state");

            }

        } else {
            email.style.border = "1px solid red";
            alert("Invalid email address!");
        }
    } else {
        alert("Kindly Fill all the details");
        mob.style.border = "1px solid red";

    }
}

function gotologin() {
    alert("Registered Succesfully");
    location.reload();
    // window.location = "login.html";
}