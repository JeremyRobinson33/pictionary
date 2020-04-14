let isDrawer = false;
const wordList = ['Angel','Eyeball','Pizza','Angry','Fireworks','Pumpkin','Baby','Flower','Rainbow','Beard','Flying saucer','Recycle','Bible','Giraffe','Sand castle','Bikini','Glasses','Snowflake','Book','High heel','Stairs','Bucket','Ice cream cone','Starfish','Bumble bee','Igloo','Strawberry','Butterfly','Lady bug','Sun','Camera','Lamp','Tire','Cat','Lion','Toast','Church','Mailbox','Toothbrush','Crayon','Night','Toothpaste','Dolphin','Nose','Truck','Egg','Olympics','Volleyball','Eiffel Tower','Peanut', 'Abraham Lincoln','Kiss','Pigtails','Brain','Kitten','Playground','Bubble bath','Kiwi','Pumpkin pie','Buckle','Lipstick','Raindrop','Bus','Lobster','Robot','Car accident','Lollipop','Sand castle','Castle','Magnet','Slipper','Chain saw','Megaphone','Snowball','Circus tent','Mermaid','Sprinkler','Computer','Minivan','Statue of Liberty','Crib','Mount Rushmore','Tadpole','Dragon','Music','Teepee','Dumbbell','North pole','Telescope','Eel','Nurse','Train','Ferris wheel','Owl','Tricycle','Flag','Pacifier','Tutu','Junk mail','Piano', 'Attic','Glue','Pocket watch','Back seat','Highchair','Rock band','Birthday','Hockey','Sasquatch','Black hole','Hotel','Scrambled eggs','Blizzard','Jump rope','Seat belt','Burrito','Koala','Skip','Captain','Leprechaun','Solar eclipse','Chandelier','Light','Space','Crib','Mask','Stethoscope','Cruise ship','Mechanic','Stork','Dance','Mom','Sunburn','Deodorant','Mr Potato Head','Thread','Facebook','Pantyhose','Tourist','Flat','Paper plate','United States','Frame','Photo','WiFi','Full moon','Pilgram','Zombie','Game','Pirate']

var answer = wordList.splice(Math.floor(Math.random()*wordList.length), 1)[0].toUpperCase();

let guess_history = [];

var socket  = io.connect();

document.querySelector('.g').addEventListener('click', () => {
    // var x = document.getElementsByClassName("guess")[0].value;
    // document.getElementById("demo").innerHTML = x;
    let guess = document.getElementsByClassName("guess")[0].value;
    console.log(guess)
    socket.emit('guess', { guess: guess });

    let guessDiv = document.getElementById("guess_history");

    // var g = document.createElement("p");
    // g.innerText = guess;
    // guessDiv.appendChild(g);

    // guess_history += guess;

    document.getElementsByClassName("guess")[0].value = "";
    // console.log("about to go to socket")


    if(guess.toUpperCase() == answer) {console.log("you win")};
});

// write guess received from server
socket.on('guess', function (data) {
    console.log(data);
    let guessDiv = document.getElementById("guess_history");
    var g = document.createElement("p");
    g.innerText = data.guess;
    guessDiv.appendChild(g);
 });
