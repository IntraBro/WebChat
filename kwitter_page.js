var firebaseConfig = {
      apiKey: "AIzaSyDebulxZJo9yeWkGGMqTcPmc61KrYnARZo", authDomain: "firedb-28565.firebaseapp.com", databaseURL: "https://firedb-28565-default-rtdb.firebaseio.com", projectId: "firedb-28565", storageBucket: "firedb-28565.appspot.com", messagingSenderId: "801004775252", appId: "1:801004775252:web:2ca349bd05eff941918ac1"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

//YOUR FIREBASE LINKS
user_name = localStorage.getItem("user_name")
room_name = localStorage.getItem("room_name")

function sending(){
      msg = document.getElementById("msg").value
      firebase.database().ref(room_name).push({
            name: user_name,
            message : msg,
            like:0
      })
      document.getElementById("msg").value = ""
}
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id)
console.log(message_data)

name = message_data['name']
message = message_data['message']
like = message_data['like']

name_with_tag = "<h4>"+name+"<img class = 'user_tick' src = 'tick.png'></h4>"
message_tag = "<h4 class = 'message_h4'>"+message+"</h4>"
like_btn = "<button class = 'btn btn-warning' id ="+firebase_message_id+" value = "+like+" onclick = 'update_like(this.id)'> <span class = 'glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button> <hr>"

row = name_with_tag+message_tag+like_btn
document.getElementById('output').innerHTML +=row




//End code
      } });  }); }
getData();

function update_like(message_id){
      console.log('Cliked On Like Button'+message_id)
      button_id = message_id
      likes =  document.getElementById(button_id).value
      updated_likes = Number(likes)+1
      console.log(updated_likes)
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes

      })
}

function logout(){
      localStorage.removeItem("user_name")
      localStorage.removeItem("room_name")
      window.location = "index.html"
}
