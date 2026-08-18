let calculation = localStorage.getItem('result') || '' ;

displayResult();


function updateCalculation (inputNum) {
    calculation += inputNum ;
    displayResult();
};

function displayResult () {
    
    const output = document.querySelector('.js-output');
    output.innerHTML = calculation;
    saveCalculation()

};

function saveCalculation () {
    localStorage.setItem('result', calculation);
};

