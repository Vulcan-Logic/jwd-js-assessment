/* ***************************
  JWD JavaScript Assessment

  This code is unfinished. You will need to study it to figure out what it does. Then you will need to use this and
  your own code, to finish the app. 
  
  The tasks you need to do are below.

    TASKS TODO:
      1. Calculate the score as the total of the number of correct answers

      2. Add an Event listener for the submit button, which will display the score and highlight 
         the correct answers when the button is clicked. Use the code from lines 67 to 86 to help you.

      3. Add 2 more questions to the app (each question must have 4 options).

      4. Reload the page when the reset button is clicked (hint: search window.location)

      5. Add a countdown timer - when the time is up, end the quiz, display the score and highlight the correct answers
*************************** */

window.addEventListener('DOMContentLoaded', () => {
  const start = document.querySelector('#start');
  //code added by Vineet 
  //submit button element
  const submitButton = document.querySelector("#btnSubmit");
  //reset button element
  const resetButton = document.querySelector("#btnReset");
  //counter for timer
  var counter=0;
  var id=null;
  //end code - Vineet 
  start.addEventListener('click', function (e) {
    document.querySelector('#quizBlock').style.display = 'block';
    start.style.display = 'none';

    console.log('start counter');

    //code added by Vineet to implement timer
    counter=60000;
    //fire every 1 second until counter is 0
    id=setInterval(()=>{
      counter-=1000;
      if (counter<0){
        //counter is below 0 - 60 seconds have elapsed
        //click the submit button 
        submitButton.click();
      }
      else{
        document.querySelector('#time').innerText=`Time Remaining: ${counter/1000} seconds`;
      }
    },1000);
  });

  // quizArray QUESTIONS & ANSWERS
  // q = QUESTION, o = OPTIONS, a = CORRECT ANSWER
  // Basic ideas from https://code-boxx.com/simple-javascript-quiz/
  const quizArray = [
    {
      q: 'Which is the third planet from the sun?',
      o: ['Saturn', 'Earth', 'Pluto', 'Mars'],
      a: 1, // array index 1 - so Earth is the correct answer here
    },
    {
      q: 'Which is the largest ocean on Earth?',
      o: ['Atlantic Ocean', 'Indian Ocean', 'Arctic Ocean', 'Pacific Ocean'],
      a: 3,
    },
    {
      q: 'What is the capital of Australia?',
      o: ['Sydney', 'Canberra', 'Melbourne', 'Perth'],
      a: 1,
    },
    //questions added by Vineet 
    {
      q: 'Who is the biggest clown in the world?',
      o: ['Donald Trump', 'Kim Jong Un', 'Xi Jingping', 'Narendra Modi'],
      a: 0,
    },
    {
      q: 'What is the next number in the sequence: 1,1,2,3,5,8,13,_?',
      o: ['14', '12', '17', '21'],
      a: 3,
    },
  ];

  // function to Display the quiz questions and answers from the object
  const displayQuiz = () => {
    const quizWrap = document.querySelector('#quizWrap');
    let quizDisplay = '';
    quizArray.map((quizItem, index) => {
      quizDisplay += `<ul class="list-group">
                   Q - ${quizItem.q}
                    <li class="list-group-item mt-2" id="li_${index}_0"><input type="radio" name="radio${index}" id="radio_${index}_0"> ${quizItem.o[0]}</li>
                    <li class="list-group-item" id="li_${index}_1"><input type="radio" name="radio${index}" id="radio_${index}_1"> ${quizItem.o[1]}</li>
                    <li class="list-group-item"  id="li_${index}_2"><input type="radio" name="radio${index}" id="radio_${index}_2"> ${quizItem.o[2]}</li>
                    <li class="list-group-item"  id="li_${index}_3"><input type="radio" name="radio${index}" id="radio_${index}_3"> ${quizItem.o[3]}</li>
                    </ul>
                    <div>&nbsp;</div>`;
      quizWrap.innerHTML = quizDisplay;
    });
    
  };

  // Calculate the score
  const calculateScore = () => {
    let score = 0;
    quizArray.map((quizItem, index) => {
      for (let i = 0; i < 4; i++) {
        //highlight the li if it is the correct answer
        let li = `li_${index}_${i}`;
        let r = `radio_${index}_${i}`;
        liElement = document.querySelector('#' + li);
        radioElement = document.querySelector('#' + r);

        if (quizItem.a == i) {
          //change background color of li element here - added by Vineet Singh
          //change color to green
          liElement.style.backgroundColor='#87e6a0';
        }

        if (radioElement.checked) {
          // code for task 1 goes here - added by Vineet Singh
          if (quizItem.a == i) {
            //change background color of li element here - added by Vineet Singh
            score++;  
          }
          else{
            //wrong answer change background color to red
            liElement.style.backgroundColor='#f05b5b';
          }
        }
      }
    });
    return(score);
  };

  // code added by Vineet Singh 
  // add an event listener for the submit button
  //get the submit button element
  

  console.log(submitButton);
  //add an event listener
  submitButton.addEventListener('click',()=>{
    clearInterval(id);
    submitButton.style.display='none';
    document.querySelector('#btnReset').classList.remove('d-none');
    document.querySelector('#time').style.display='none';
    document.querySelector("#score").innerHTML=`Score: You got <strong> ${calculateScore()} </strong> correct answers out of a total of <strong> ${quizArray.length} </strong> answers in ${60-(counter/1000)} seconds.`;
  });
  //end added code. 

 
  //add an event listener
  resetButton.addEventListener('click',()=>location.reload());
  //end added code. 
    // code added by Vineet Singh 
    //hide the submit button

  // call the displayQuiz function
  displayQuiz();
});
