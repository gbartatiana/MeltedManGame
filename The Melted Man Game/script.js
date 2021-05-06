
// Variables, Arrays and Constant declaration
let words = ["formiga", "bola", "urso", "livro", "onibus", "gato", "vaca", "papai", "dog",
 "pato", "ovo", "peixe", "sapo", "bode", "feliz", "chapeu", "lago", "folha", "leao", "mapa", "lua", "torta",
"natal", "navio", "estrela", "pare", "carro",	"arvore", "tartaruga", "sol", "repolho"]

let image;
let secretword;
let message;
let i;
let x;
let guess;
let missingletter;
let used = [];
let spaces = [];
let response;
let expression;
let check;
let finish;

//Starting the game
	function newGame()
	{
			used.length = 0;
			spaces.length = 0;
			secretword = "";
			x = 1;
			i = 0;

		//Disable/Enable buttons
		document.getElementById("newgame").disabled = true;
		document.getElementById("searchLetter").disabled = false;
		document.getElementById("letter").disabled = false;
		document.getElementById("letter").focus();


		//Showing initial image
		document.getElementById("image").src = "Images/snowman"+[x]+".png";

		//Picking a secret word
        secretword = words[Math.floor(Math.random()* words.length)];    
		
		// Displaying the number of letters in the secret word     
		document.getElementById("nbrOfLetters").innerHTML = "A palavra misteriosa contém " + secretword.length + " letras.";

		//Show spaces of the secret word
        for (; i < secretword.length; i++)
			{
				spaces.push("_");
				document.getElementById("result").innerHTML = spaces.join(" ");
			}       
      
}

function verifySearchedLetter()
	//When the SEARCH button is clicked,
	//Check if the guessed letter corresponds to the criterias.

{  

	check = true;

		guess = document.getElementById("letter").value.toLowerCase();
		document.getElementById("letter").value = "";
		document.getElementById("letter").focus();
		expression = /[A-Za-z]/i;
		response = document.getElementById("message")
	
	if(expression.test(guess))
	{
		
				for(i=0; i < used.length; i++)
				{
					if(used[i] == guess)
					{
						check = false
					}
				
				}

		if (check)
		{
			used.push(guess);
			response.innerHTML = "VOCÊ ACERTOU A LETRA!!"
			response.style.color = "green";
			displayGuessedLetters()

		}

		else if (typeof guess !== 'string')
		{
			response.innerHTML = "A number or special character cannot be part of a word. Please try again!";
			response.style.color = "red";		
		}

		else
		{
			response.innerHTML = "Você já tentou essa letra. Tente novamente!"
			response.style.color = "red";
		}
	}

	//Then, check if the guessed letter fits in the secret word.

    if(secretword.includes(guess))
    {		

        for (i=0; i < secretword.length; i++)
        {
			
					if (secretword[i] === guess)
					{
						spaces[i] = guess;
						document.getElementById("result").innerHTML = spaces.join(" ");
						displayGuessedLetters()
					}
        }
    }
		else
		{
			displayGuessedLetters()
			response.innerHTML = "Essa letra não pertence à palavra misteriosa. Tente novamente!";
			response.style.color = "red";
			x++;
			document.getElementById("image").src = "Images/snowman" +[x]+ ".png";
			stopImages();
		}

		LoseGame();
		WinGame();
	}

	function stopImages()
	{
		if (x >= 10)
		{
			document.getElementById("image").src = "Images/snowman9.png";
		}
	}

function LoseGame()
//End the game if the snowman melts.

{

	if (x == 9)
    {
        response.innerHTML = "GAME OVER! Você perdeu. A palavra misteriosa era " + secretword + ".";
		response.style.color = "red";		
		document.getElementById("searchLetter").disabled = true;
		document.getElementById("letter").disabled = true;
		document.getElementById("newgame").disabled = false;
	}
}   

function WinGame()
// End game if secret word is found.

{
	if(spaces.join('') === secretword)
	{
		response.innerHTML = "PARABÉNS! VOCÊ ACERTOU A PALAVRA MISTERIOSA!!";
		response.style.color = "green";		
		document.getElementById("searchLetter").disabled = true;
		document.getElementById("letter").disabled = true;
		document.getElementById("newgame").disabled = false;
	}
}



function displayGuessedLetters()
// Compose the list of letters already guessed

{
    document.getElementById("used").innerHTML = "VOCÊ JÁ USOU ESSAS LETRAS: " + used;
}


function processerror(error)
				{
					alert("An error occured: " + error);
				}