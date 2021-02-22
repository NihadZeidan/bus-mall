'use-strict';

let container = document.getElementById('images-container')

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

let timeShownPrev = [];

function Products(name, source, timeShown) {
    this.name = name;
    this.source = source;
    this.timeShown = 0;
    this.votes = 0;
    productsName.push(this.name)
    Products.allImages.push(this)

}


Products.allImages = [];


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

function generateRandom() {
    return Math.floor(Math.random() * Products.allImages.length);
}
generateRandom();
console.log(Math.floor(Math.random() * Products.allImages.length));



function renderThreeProducts() {


    firstImageIndex = generateRandom();
    secondImageIndex = generateRandom();
    thirdImageIndex = generateRandom();



    while (timeShownPrev === firstImageIndex || timeShownPrev === secondImageIndex || timeShownPrev === thirdImageIndex) {

        while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex) {

            firstImageIndex = generateRandom();
            secondImageIndex = generateRandom();
            thirdImageIndex = generateRandom();
        }
        
    };




    firstImageElement.src = Products.allImages[firstImageIndex].source;
    secondImageElement.src = Products.allImages[secondImageIndex].source;
    thirdImageElement.src = Products.allImages[thirdImageIndex].source;

    Products.allImages[firstImageIndex].timeShown++
    Products.allImages[secondImageIndex].timeShown++
    Products.allImages[thirdImageIndex].timeShown++


    timeShownPrev = [];

    timeShownPrev.push(firstImageIndex)
    timeShownPrev.push(secondImageIndex)
    timeShownPrev.push(thirdImageIndex)

    console.log(timeShownPrev);
}




renderThreeProducts();



container.addEventListener('click', onClick)

function onClick(event) {

    counter++;

    // console.log(event.target.id);

    if (counter <= maxAttempts) {

        if (event.target.id === 'firstImage') {
            Products.allImages[firstImageIndex].votes++;
        } else if (event.target.id === 'secondImage') {
            Products.allImages[secondImageIndex].votes++
        } else {
            Products.allImages[thirdImageIndex].votes++
        }

        renderThreeProducts();


    } else {
        let button = document.getElementById('toShowResults');
        button.addEventListener('click', charts)

        // you can use the below function to show a list instead of chart when clicking the button.

        function createResultesList(event) {
            let list = document.getElementById('resultes')
            let productesResultes;
            for (let i = 0; i < Products.allImages.length; i++) {
                productesResultes = document.createElement('li')
                list.appendChild(productesResultes)
                productesResultes.textContent = Products.allImages[i].name + ' has ' + Products.allImages[i].votes + ' votes, and was shown  ' + Products.allImages[i].timeShown + ' times'

            }
        }

        firstImageElement.removeEventListener('click', onClick);
        secondImageElement.removeEventListener('click', onClick);
        thirdImageElement.removeEventListener('click', onClick);

        for (let i = 0; i < Products.allImages.length; i++) {
            totalVotes.push(Products.allImages[i].votes);
            totalShown.push(Products.allImages[i].timeShown);

        }

    }
}

function charts() {

    var ctx = document.getElementById('canvas').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels:
                productsName,


            datasets: [{
                label: 'Votes',
                backgroundColor: 'red',
                borderColor: 'black',
                data: totalVotes
            },

            {
                label: 'Times Shown',
                backgroundColor: 'black',
                borderColor: 'red',
                data: totalShown
            }]

        },

        // Configuration options go here
        options: {}
    });

}