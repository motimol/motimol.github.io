const button = document.getElementById("submit_button");
//LANGUAGES
const lang_heb = {
  title: "תודה לך שנרשמת!",
  sub_title: "עכשיו נשאר רק להכניס פרטים, והבוט מיד שולח לך הודעה!",
  mail: "המייל שאיתו שילמת (בפייפאל)",
  name: "שם",
  phone_number: "מספר טלפון",
  button_text: "!תרשמו אותי",
};
const lang_en = {
  title: "Thank you for signing up!",
  sub_title:
    "Now all that is left is to enter details, and the bot will immediately send you a message",
  mail: "The email you paid with (on PayPal)",
  name: "Name",
  phone_number: "Phone number",
  button_text: "Submit!",
};

//LANG SELECTION CHANGED
document.getElementById("language").onchange = function () {
  if (this.value == "heb") Render(lang_heb);
  if (this.value == "en") Render(lang_en);
};

//RENDER
const Render = (lang) => {
  if (lang == lang_heb) document.body.setAttribute("dir", "rtl");
  else document.body.setAttribute("dir", "ltr");

  document.getElementById("title").innerHTML = lang.title;
  document.getElementById("sub_title").innerHTML = lang.sub_title;
  document.getElementById("email").placeholder = lang.mail;
  document.getElementById("name").placeholder = lang.name;
  document.getElementById("phone_number").placeholder = lang.phone_number;
  document.getElementById("submit_button").innerHTML = lang.button_text;
};

window.onload = function () {
  Render(lang_en);
};
//     if(!document.referrer.includes("paypal")){
//         alert("הדף זמין רק לאחר תשלום!");
//         document.getElementById("submit_button").disabled = true;
//     }
// }

button.addEventListener("click", async function (e) {
  let address = "http://10.0.0.51:5000";
  let email = document.getElementById("email").value;
  let phone_number = document.getElementById("phone_number").value;
  let name = document.getElementById("name").value;

  if (phone_number.length != 10) {
    alert("מספר טלפון לא תקין");
    return;
  }

  //RIGHT FORMAT FOR DB
  phone_number = phone_number.substring(1);

  if (email.length == 0 || phone_number.length == 0 || name.length == 0) {
    alert("נא למלא את כל השדות");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("כתובת מייל לא תקינה");
    return;
  }

  // window.location = `http://api.whatsapp.com/send?phone=972502332823&text=%F0%9F%91%8B%F0%9F%91%8B%F0%9F%91%8B`;

  let url = `${address}/api/v1/add_user?phone_number=${phone_number}&name=${name}&email=${email}`;
  await fetch(url, { method: "GET" });
  alert("Thank you!\nתודה רבה!");
  return;
});
