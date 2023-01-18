// utility functions
// 1.get dom element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

// initilize no. of parameters
let addparamscount = 0;

// hide param box as default
let parameterbox = document.getElementById('parameterbox');
parameterbox.style.display = 'none';

// if any other selected hide json box
let otherradio = document.getElementById('otherradio');
otherradio.addEventListener('click', () => {
    document.getElementById('jsonbox').style.display = 'none';
    document.getElementById('parameterbox').style.display = 'block';
})

// if json selected hide param box
let jsonradio = document.getElementById('jsonradio');
jsonradio.addEventListener('click', () => {
    document.getElementById('jsonbox').style.display = 'block';
    document.getElementById('parameterbox').style.display = 'none';
})

// Add parameters
let addparam = document.getElementById('addparam');
addparam.addEventListener('click', (element) => {
    element.preventDefault()
    let params = document.getElementById('params');
    let string = ` <form class="row g-3 my-2">
            <label for="parameters" class="col-sm-2 col-form-label">Parameter${addparamscount + 2}</label>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterKey${addparamscount + 2}Key" placeholder="Enter ${addparamscount + 2} Parameter Key">
            </div>
            <div class="col-md-4">
                <input type="text" class="form-control" id="parameterValue${addparamscount + 2}Value" placeholder="Enter ${addparamscount + 2} Parameter Value">
            </div>
            <div class="col-md-1"><button class="btn btn-primary fs-6 removeparam"> - </button></div>
        </form>`
    // convert the element string to dom node
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    // remove param on clicking -
    let removeparam = document.getElementsByClassName('removeparam');
    for (item of removeparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();

        })
    }
    addparamscount++;
})

// if user click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // loading in response box
    document.getElementById('responseText').value = "Please wait...."
    // Fetch all values
    let urlinput = document.getElementById('urlinput').value;
    let requesttype = document.querySelector("input[name='requesttype']:checked").value;
    let contenttype = document.querySelector("input[name='contenttype']:checked").value;
    // console.log('url is',urlinput);
    // console.log('request type is',requesttype);
    // console.log('content type is',contenttype);
    // if user select other option then collect all params
    if (contenttype == 'other') {
        data = {};
        for (let i = 0; i < addparamscount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('jsonText').value;
    }

    console.log('url is', urlinput);
    console.log('request type is', requesttype);
    console.log('content type is', contenttype);
    console.log('data is', data);

    // if the request is get, invoke fetch api
    if (requesttype == 'Get') {
        fetch(urlinput, {
            method: 'Get',
        })
            .then(response=> response.text())
            .then((text) => {
                document.getElementById('responseText').value = text;
            });
    }else{
        fetch(urlinput, {
            method: 'Post',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
        })
            .then(response=> response.text())
            .then((text) => {
                document.getElementById('responseText').value = text;
            }); 
    }
})