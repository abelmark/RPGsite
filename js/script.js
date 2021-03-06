$(document).ready(function () {

  //hides content for later use
  var hideBattleItems = function () {
    $('#menu-container').hide();
    $('#stat-container').hide();
    $('#monster').hide();
    $('#user').hide();
    $('#princess').hide();
    $('#dubus2').hide();
  }


  //creates audio variables for music/sound
  var fight = new Audio('./sounds/fight.mp3'),
    hitAudio = new Audio('./sounds/hit.wav'),
    healAudio = new Audio('./sounds/cure.wav'),
    killAudio = new Audio('./sounds/kill.wav'),
    mAttack = new Audio('./sounds/somersalt.wav'),
    preBattleMusic = new Audio('./sounds/8bit.mp3'),
    error = new Audio('./sounds/error.mp3'),
    introMusic = new Audio('./sounds/intro.mp3'),
    openScene = new Audio('./sounds/openscene.mp3'),
    outroMusic = new Audio('./sounds/torn.m4a')
  battleNumber = 0;

  //Creates character objects
  var monster = {
    hp: 30,
    mp: 10,
    damage: 0,
    defend: 0,
    heal: 0,
    choice: 0
  };
  var player = {
    hp: 30,
    mp: 20,
    damage: 0,
    defend: 0,
    heal: 0,
    choice: "",
    clicked: false,
    name: "Dubus"
  };

  //function that resets stats to be used after battle
  var resetStats = function () {
    monster = {
      hp: 30,
      mp: 10,
      damage: 0,
      defend: 0,
      heal: 0,
      choice: 0
    };
    player = {
      hp: 30,
      mp: 20,
      damage: 0,
      defend: 0,
      heal: 0,
      choice: "",
      clicked: false,
      name: "Dubus"
    };
  }


  //Populates the container divs for battle, starts battle audio
  var beginBattle = function () {
    if (battleNumber == 1) {
      $('#monster').html("<img src='./images/wizard.png' id='monster-img'>");
      $('#battle-container').css("background-image", "url('./images/inn.jpg')");
      $('#player').css({
        "height": "250px",
        "width": "300px",
        "left": "-50px",
        "bottom": "-17px"
      });
      $('#user').css({
        "left": "55px",
        "bottom": "-15px"
      });
      $('#monster').css({
        "bottom": "60px"
      });
      resetStats();
      $('#battle-container').css("z-index", "5");
      $('#inn-container').hide();
      $('#battle-container').show();

    }
    $('#menu-container').show();
    $('#user').show();
    $('#monster').show();
    $('#battle-dialogue').hide();
    $('#stat-container').show().animate();
    appendStats();
    if (battleNumber == 1) {
      $('#monster').animate({
        right: "0px",
        bottom: "60px"
      });
    } else {
      $('#monster').animate({
        right: "0px",
        bottom: "-10px"
      });
    }
    $('#user').animate({
      left: "-40px",
      bottom: "10px"
    });
    fight.play();
  }


  //attempting a function to switch scenes

  var playScene = function (thisScene, whichDialogue, music, sceneOver, text, nextScene, battle) {
    var splitText = text.split("");
    music.currentTime = 0;
    music.play();
    $(splitText).each(function (index) {
      setTimeout(function () {
        $(whichDialogue).append(splitText[index]);
        if (index + 1 === splitText.length) {
          $(whichDialogue).append("<p>Press Enter to Begin</p>");
        }
      }, 75 * (index + 1));
    })
    document.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (sceneOver == false) {
        if (key === 13) {
          if (battle) {
            music.pause();
            beginBattle();
            sceneOver = true;
          } else {
            music.pause();
            nextScene();
            $(thisScene).hide();
            sceneOver = true;
          }
        }
      }
    })
  }

  //Opening Scene
  var openingScene = function () {
    var thisScene = ("#opening-screen"),
      whichDialogue = ("#opening-dialogue"),
      music = openScene,
      sceneOver = false,
      text = "THE ADVENTURE OF DUBUS",
      nextScene = introSequence,
      battle = false;
    playScene(thisScene, whichDialogue, music, sceneOver, text, nextScene, battle)
  }

  //Intro sequence
  var introSequence = function () {
    thisScene = ("#intro-container");
    whichDialogue = ("#intro-dialogue");
    music = introMusic;
    sceneOver = false;
    text = "You. The lone knight Sir Dubus have been aimlessly wandering hoping for clues on your missing princess... A passing peasant tells you that he saw a wizard and a princess heading towards Anselton.  Could this be your princess?";
    nextScene = beginBattleIntro;
    battle = false;
    playScene(thisScene, whichDialogue, music, sceneOver, text, nextScene, battle);
  }

  //Pre-battle sequence
  var beginBattleIntro = function () {
    thisScene = ("#battle-container");
    whichDialogue = ("#battle-dialogue");
    music = preBattleMusic;
    sceneOver = false;
    text = "On your way to the village of Anselton a monster jumps out of the bushes at you...";
    nextScene = beginBattle;
    battle = true;
    playScene(thisScene, whichDialogue, music, sceneOver, text, nextScene, battle);
  }

  //Inn sequence
  var innSequence = function () {
    thisScene = ("#inn-container");
    whichDialogue = ("#inn-dialogue");
    music = preBattleMusic;
    sceneOver = false;
    text = "Upon arriving in Anselton you head straight to the inn.  Once inside you immediately find your princess... You drag the wizard outside and challenge him to a duel";
    nextScene = foundPrincess;
    battle = true;
    playScene(thisScene, whichDialogue, music, sceneOver, text, nextScene, battle);

  }

  //found princess sequence
  var foundPrincess = function () {
    foundPrincessOver = false;
    $('#princess').show();
    $('#dubus2').show();
    var openText = "You rush up to the princess, and you realize she is crying.  She informs you that she ran off with the wizard and that she is looking for some stability in her life, which a knight can't give her. She pulls a vial of poison out of her pocket and swallows it";
    var splitOpenText = openText.split("");
    $(splitOpenText).each(function (index) {
      preBattleMusic.currentTime = 0;
      preBattleMusic.play();
      setTimeout(function () {
        $("#found-princess-dialogue").append(splitOpenText[index]);
        if (index + 1 === splitOpenText.length) {
          $("#found-princess-dialogue").append("<p>Press Enter to Begin</p>");
          $("#found-princess-dialogue");
        }
      }, 100 * (index + 1));
    })
    document.addEventListener('keypress', function (e) {
      var key = e.which || e.keyCode;
      if (foundPrincessOver == false) {
        if (key === 13) {
          $("#princess").toggle('explode');
          mAttack.play();
          setTimeout(function () {
            preBattleMusic.pause();
            outroSequence();
            $("#inn-container").hide();
            $("#found-princess-container").hide();
            $("#dubus2").animate({
              opacity: "0"
            });
            foundPrincessOver = true;
          }, 3000)
        }
      }
    })
  }


  //outro sequence
  var outroSequence = function () {
    var outroOver = false;
    var outroText = ["Game Design: Mark Abel", "Animation:      Mark Abel",
      "Written By: Mark Abel", "Art:          Stolen From Various Artists and Vecteezy",
      "General Music: Stolen from various Artists", "Battle Music By:  Nobuo Uematsu",
      "Thank you for playing", "Why are you still here?", "You really don't have anything better to do?",
      "You're enjoying this song, aren't you?", "All the feels",
      "All your feels are belong to us", "You can leave now", "Or not", "Outro Music by Natalie Imbruglia",
      "Thanks again"
    ]
    $(outroText).each(function (index) {
      outroMusic.play();
      setTimeout(function () {
        $("#outro-dialogue").html("<h1>" + outroText[index] + "</h1>").animate({
          opacity: "1",
          color: "white"
        }, 5000, function () {
          $("#outro-dialogue").animate({
            opacity: "0",
            color: "black"
          }, 9000)
        });
        if (index == outroText.length) {
          $("#dubus-container").hide("slow");
          $("#tear-container").hide();
        }
        $('#tear-container').html("<img src='./images/tear.png'>").animate({
          bottom: "-=60px",
          opacity: "0"
        }, 2000, function () {
          $('#tear-container').html("").css({
            bottom: "+=60px",
            opacity: "1"
          });
        })

      }, 15000 * (index + 1))
    })

  }

  //Damage taken and healing animations	
  var showAction = function () {
    if (monster.damage > 0) {
      $('#userDamage').html("<h1>" + Math.floor(monster.damage / player.defend) + "</h1>").animate({
        bottom: "+=60px",
        opacity: "0",
        color: "red"
      }, 1000, function () {
        $('#userDamage').html("").css({
          bottom: "-=60px",
          opacity: "1"
        });
      });
    }
    if (player.damage > 0) {
      $('#monsterDamage').html("<h1>" + Math.floor(player.damage / monster.defend) + "</h1>").animate({
        bottom: "+=40px",
        opacity: "0",
        color: "red"
      }, 1000, function () {
        $('#monsterDamage').html("").css({
          bottom: "-=40px",
          opacity: "1"
        });
      });
    }
    if (player.choice == "heal") {
      $('#userHeal').html("<img src='./images/heal.png'>").animate({
        bottom: "-=40px",
        opacity: "0"
      }, 1000, function () {
        $('#userHeal').html("").css({
          bottom: "+=40px",
          opacity: "1"
        });
      })
    }
    if (monster.choice == 3) {
      $('#monsterHeal').html("<img src='./images/heal.png'>").animate({
        bottom: "-=60px",
        opacity: "0"
      }, 1000, function () {
        $('#monsterHeal').html("").css({
          bottom: "+=60px",
          opacity: "1"
        });
      })
    }
  }

  //animates player character to show that the knight attacked
  var userAttack = function () {
    $('#user').animate({
      left: "+=30px"
    }, 'fast')
    $('#user').animate({
      left: "-=30px"
    }, 'fast')
    if (monster.choice == 1) {
      showAction();
    }
  }

  //animates monster character to show that the monster attacked
  var monsterAttack = function () {
    $('#monster').animate({
      right: "+=30px"
    }, 'fast')
    $('#monster').animate({
      right: "-=30px"
    }, 'fast')
    if (player.choice == "attack") {
      showAction();
    }
  }

  //function to run through the monsters roll
  function monsterChoice() {
    //checks to see if monster has available MP for heal if not it runs a roll without heal as an option
    if (monster.mp == 0) {
      monster.choice = 1 + (Math.floor(Math.random() * 2));
      //monster attacks
      switch (monster.choice) {
        case 1:
          monster.damage = 1 + (Math.floor(Math.random() * 5));
          monster.defend = 1;
          monster.heal = 0;
          break;
          //monster defends
        case 2:
          monster.damage = 0;
          monster.defend = 2;
          monster.heal = 0;
          break;
      };
      //runs if monster has available MP to heal
    } else {
      monster.choice = 1 + (Math.floor(Math.random() * 5));

      switch (monster.choice) {
        //monster attacks
        case 1:
        case 4:
        case 5:
          monster.damage = 1 + (Math.floor(Math.random() * 5));
          monster.defend = 1;
          monster.heal = 0;
          break;
          //monster defends
        case 2:
          monster.damage = 0;
          monster.defend = 2;
          monster.heal = 0;
          break;
          //monster heals
        case 3:
          monster.damage = 0;
          monster.defend = 1;
          monster.heal = 5;
          monster.mp -= 5;
          break;
      }
    }

  };

  //Assigns numbers for battle algorithm based on user selection
  function userChoice() {
    switch (player.choice) {
      case "attack":
        player.damage = 1 + (Math.floor(Math.random() * 10));
        player.defend = 1;
        player.heal = 0;
        break;
      case "defend":
        player.damage = 0;
        player.defend = 2;
        player.heal = 0;
        break;
      case "heal":
        player.damage = 0;
        player.defend = 1;
        player.heal = 5;
        player.mp -= 5;
        break;
    }

  };

  //appends stats to the stat menu on the DOM
  var appendStats = function () {
    $('#name').html("Character:" + player.name)
    $('#health').html("HP: " + player.hp);
    $('#magic').html("MP:   " + player.mp);
  }

  //algorithm to change HP based on user and monster choices
  function userTurn() {
    monster.hp = monster.hp - Math.floor(player.damage / monster.defend) + monster.heal;
    showAction();
    if (player.choice == 'attack') {
      userAttack();
      hitAudio.play();
    } else if (player.choice == 'heal') {
      healAudio.play();
    }
  };

  function monsterTurn() {
    player.hp = player.hp - Math.floor(monster.damage / player.defend) + player.heal;
    if (monster.choice === 1 || monster.choice === 4 || monster.choice === 5) {
      monsterAttack();
      mAttack.play();
    } else if (monster.choice == 3) {
      healAudio.play();
    }
  }

  //Corrects for HP going below zero
  function belowZero() {
    if (player.hp <= 0) {
      player.hp = 0;
    }
    if (monster.hp <= 0) {
      monster.hp = 0;
    }
  }

  //Determines if either player's HP is below zero if so begins endgame animation
  function endGame() {
    if (player.hp <= 0) {
      $("#user").toggle("explode");
      $('#menu-container').hide();
      $("#stat-container").hide();
      fight.pause();
      var defeatAudio = new Audio('./sounds/defeat.mp3');
      defeatAudio.play();
      $('#inn-container').hide();
      $('#outro-container').hide();
      $('#battle-container').css({
        'background-image': 'none'
      }).animate({
        backgroundColor: "#000000",
        color: "white"
      }, 2000);
      $("#battle-dialogue").html("<h1>YOU'VE BEEN DEFEATED!</h1>");
      $("#battle-dialogue").show();
      $("#monster-img").animate({
        right: "200px",
        height: "400px",
        width: "400px"
      });
      $("#monster").animate({
        right: "200px"
      });

    } else if (monster.hp <= 0) {
      battleNumber++;
      var battleOver = false;
      $("#monster").toggle('explode');
      $("#menu-container").hide();
      $("#stat-container").hide();
      fight.pause();
      fight.currentTime = 0;
      var victoryAudio = new Audio('./sounds/victory.mp3');
      victoryAudio.play();
      if (battleNumber == 1) {
        $("#battle-dialogue").html("<h1>You Defeated the Monster!</h1><p>Press enter to continue</p>");
      } else if (battleNumber == 2) {
        $("#battle-dialogue").html("<h1>You Defeated the Wizard!</h1><p>Press enter to continue</p>");
      }
      $("#battle-dialogue").show();
      $("#player").animate({
        left: "360px",
        height: "400px",
        width: "500px"
      });
      $("#user").animate({
        left: "160px"
      });
      document.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (battleNumber == 1) {
          if (battleOver == false) {
            if (key === 13) {
              victoryAudio.pause();
              $("#battle-container").hide();
              innSequence();
              battleOver = true;
            }
          }
        } else if (battleNumber == 2) {
          if (battleOver == false) {
            if (key === 13) {
              victoryAudio.pause();
              $("#battle-container").hide();
              $("#inn-container").hide();
              foundPrincess();
              battleOver = true;
            }
          }
        }

      });
    }
  };

  //Runs during battle.  These are all of the functions needed for battle to work
  var runGame = function () {
    player.clicked = true;
    if (player.clicked == true) {
      monsterChoice();
      userChoice();
      userTurn();
      monsterTurn();
      belowZero();
      appendStats();
      // dialogue();
      endGame();
      player.clicked = false;
    } else {
      player.clicked = false;
    }
    setTimeout(function () {

    }, 1200)
  }

  //Event listener for user actions
  var resetClickListeners = function () {
    $('#attack').on("click", function () {
      $('#attack').off('click');
      $('#defend').off('click');
      $('#heal').off('click');
      player.choice = "attack";
      runGame();
      setTimeout(function () {
        resetClickListeners();
      }, 1000);
    });
    $('#defend').on("click", function () {
      $('#attack').off('click');
      $('#defend').off('click');
      $('#heal').off('click');
      player.choice = "defend";
      runGame();
      setTimeout(function () {
        resetClickListeners();
      }, 1000)
    });
    $('#heal').on("click", function () {
      $('#attack').off('click');
      $('#defend').off('click');
      $('#heal').off('click');
      if (player.mp == 0) {
        error.play();
      } else {
        player.choice = "heal";
        runGame();
        setTimeout(function () {
          resetClickListeners();
        }, 1000)
      };
    });
  }

  $('#attack').on("click", function () {
    resetClickListeners();
  });
  $('#defend').on("click", function () {
    resetClickListeners();
  });
  $('#heal').on("click", function () {
    resetClickListeners();
  });


  //Begins intro sequences
  hideBattleItems();
  openingScene();

})
