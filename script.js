var cityHistory = document.getElementById('cityHistory');
var searchButton = document.getElementById('search-button');

function renderHistory () {
    
    // Creating elements, br, row, and button
    var elementDiv = document.createElement('div');
    var elementBr = document.createElement('br');
    var historyRow = document.createElement('div');
    var createButton = document.createElement('button');

    // Setting the text of createButton
    createButton.textContent = 'city test';
    console.log(createButton.textContent);
    $(createButton).addClass('btn btn-primary');
    $(historyRow).addClass('row');
    

    // Appending the button to the historyRow and then appending the historyRow to the elementBr
    // The elementBr then gets appended to the cityHistory
    
    historyRow.appendChild(createButton);    
    elementDiv.appendChild(elementBr);
    elementDiv.appendChild(historyRow);
    cityHistory.append(elementDiv);
}

searchButton.addEventListener('click', renderHistory);