'use-strict';


let firstImageElement = document.getElementById('firstImage')
let secondImageElement = document.getElementById('secondImage')
let thirdImageElement = document.getElementById('thirdImage')

let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;

let canvas = document.getElementById('canvas')

let productsName = [];

let maxAttempts = 25;
let counter = 0;

let totalVotes = [];
let totalShown = [];

let PreviousImages = [];


function Products(name, source, timeShown) {
    this.name = name;
    this.source = source;
    this.timeShown = 0;
    this.votes = 0;
    productsName.push(this.name)
    Products.allImages.push(this)

}

// To add all instances to the array
Products.allImages = [];

// To create instances
new Products('bag', '/images/bag.jpg')
new Products('banana', '/images/banana.jpg')
new Products('bathroom', '/images/bathroom.jpg')
new Products('boots', '/images/boots.jpg')
new Products('breakfast', '/images/breakfast.jpg')
new Products('bubblegum', '/images/bubblegum.jpg')
new Products('chair', '/images/chair.jpg')
new Products('cthulhu', '/images/cthulhu.jpg')
new Products('dog-duck', '/images/dog-duck.jpg')
new Products('dragon', '/images/dragon.jpg')
new Products('pen', '/images/pen.jpg')
new Products('pet-sweep', '/images/pet-sweep.jpg')
new Products('scissors', '/images/scissors.jpg')
new Products('shark', '/images/shark.jpg')
new Products('sweep', '/images/sweep.png')
new Products('tauntaun', '/images/tauntaun.jpg')
new Products('unicorn', '/images/unicorn.jpg')
new Products('usb', '/images/usb.gif')
new Products('water-can', '/images/water-can.jpg')
new Products('wine-glass', '/images/wine-glass.jpg')

console.log(Products.allImages);


// To generate random number for images index
function generateRandom() {
    return Math.floor(Math.random() * Products.allImages.length);
}
generateRandom();



// To render the three images
function renderThreeProducts() {
    // To make sure that images not repeated each round and not repeated with the previous one
    do {
        do {
            firstImageIndex = generateRandom();
            secondImageIndex = generateRandom();
            thirdImageIndex = generateRandom();
        } while (firstImageIndex == secondImageIndex || firstImageIndex == thirdImageIndex || secondImageIndex == thirdImageIndex)

    } while (PreviousImages.includes(firstImageIndex) || PreviousImages.includes(secondImageIndex) || PreviousImages.includes(thirdImageIndex))




    // To add Sources to each image source in HTML
    firstImageElement.src = Products.allImages[firstImageIndex].source;
    secondImageElement.src = Products.allImages[secondImageIndex].source;
    thirdImageElement.src = Products.allImages[thirdImageIndex].source;

    // To increment each time the image shown
    Products.allImages[firstImageIndex].timeShown++
    Products.allImages[secondImageIndex].timeShown++
    Products.allImages[thirdImageIndex].timeShown++

    // To clear the previouse images from the array
    PreviousImages = [];
    // To push the current images into array
    PreviousImages.push(firstImageIndex)
    PreviousImages.push(secondImageIndex)
    PreviousImages.push(thirdImageIndex)
    
    console.log(PreviousImages);
}


renderThreeProducts();


// To add event when click on each image
let container = document.getElementById('images-container')
container.addEventListener('click', onClick)

function onClick(event) {
    //To increment counting each time we click 
    counter++;
    
    // To not exceed the max attempts
    if (counter < maxAttempts) {
        // To increment votes for each image you click on
        if (event.target.id === 'firstImage') {
            Products.allImages[firstImageIndex].votes++;
        } else if (event.target.id === 'secondImage') {
            Products.allImages[secondImageIndex].votes++
        } else {
            Products.allImages[thirdImageIndex].votes++
        }
        
        // To render images again after each click and to storage data in the Local Storage
        renderThreeProducts();
        
        // When exceeding the max attempts 
    } else {
        // let button = document.getElementById('toShowResults');
        
        //  To remove Events after done all the attempts
        container.removeEventListener('click', onClick);
    
        
        
        // To push all the votes into an array
        for (let i = 0; i < Products.allImages.length; i++) {
            totalVotes.push(Products.allImages[i].votes);
            totalShown.push(Products.allImages[i].timeShown);
        }
        // charts();
        // To render the chart after all attempts
        
        toSetItems();
        charts();   
    }
}




// To create a chart
function charts() {
    
    var ctx = document.getElementById('canvas').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',
        
        // The data for our dataset
        data: {
            labels:
            productsName,
            
            color: "burlywood",
            
            
            datasets: [{
                label: 'Votes',
                backgroundColor: "burlywood",
                borderColor: 'black',
                data: totalVotes
            },
            
            {
                label: 'Times Shown',
                backgroundColor: 'rgb(100, 74, 41)',
                borderColor: 'black',
                data: totalShown
            }]
            
        },
        
        // Configuration options go here
        options: {}
        
    });
    
}


// To save items in the local storage after stringifing them
function toSetItems() {
    
    let toBeString = JSON.stringify(Products.allImages)
    localStorage.setItem('ProductsVotes', toBeString)
    
}


// To get the data from local storage  
function toGetItem() {
    
    
    let getStringObject = localStorage.getItem('ProductsVotes')
    // To change strings to object again
    let backToObject = JSON.parse(getStringObject)
    
    let allStoredVotes = [];
    let allStoredShown = [];
    
    // To make sure not to change if there are no data
    if (backToObject !== null) {
        Products.allImages = backToObject
    }
    
    // To push each votes and time shown from the last attempts to an array
    for (let i = 0; i < Products.allImages.length; i++) {
        allStoredVotes.push(backToObject[i].votes);
        allStoredShown.push(backToObject[i].timeShown);
    }
    
    // To update the total and time shown array with the new data from last attempts
    for (let y = 0; y < Products.allImages.length; y++) {
        totalVotes.push(allStoredVotes[y]);
        totalShown.push(allStoredShown[y]);
    }
    
    // To render the chart again after updating
    charts();
    console.log(allStoredVotes);
}

toGetItem();