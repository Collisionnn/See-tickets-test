/* display the filter menu on click */

let refine = document.getElementById('refine');
let checkboxes = document.getElementById('checkboxes');


refine.addEventListener('click', displayCheckboxes = () => {
    checkboxes.classList.toggle('active')
})



/*events and search logic */

// Global Variable Declaration

const resultContainer = document.querySelector('[data-result-container]')
const yourResults = document.querySelector('[data-your-results]')
let input = document.getElementById('g-site-search-input');
let search = document.getElementById('search');
let eventCard = document.getElementById('event-card');
let searchValue = '';
let eventResults = [{}];
let allEventCardsResult;
let allEventCardsCategories;

//events array

let events =[
    {   image:'https://c.ststat.net/content/entimg//-1843065091-154x154.jpg',
        title:'London African Gospel Choir: Bob Marley Songbook',
        location:'EartH (Theatre), Stoke Newington, London',
        date:'Fri 25 Mar 2022, 20:00',
        artist: 'Artist: The London African Gospel Choir',
        category:'category2'
    },

    {   image:'https://c.ststat.net/content/entimg/tour/theophilus-london-409157072-154x154.jpeg',
    title:'Theophilus London',
    location:'Jazz Cafe, Camden, London',
    date:'Mon 28 Mar 2022, 19:00 ',
    artist: 'Artist: Theophilus London',
    category:'category3'
    },

    {   image:'https://c.ststat.net/content/entimg/tour/london-calling-play-the-clash--1838779187-154x154.png',
    title:'LONDON CALLING play The Clash',
    location:'The Garage, Glasgow',
    date:'Sat 19 Mar 2022, 19:00',
    artist: 'Artist: London Calling & The Clash Tribute',
    category:'category4'
    },

    {   image:'https://c.ststat.net/content/entimg/tour/london-calling-play-the-clash--1838779187-154x154.png',
    title:'LONDON CALLING play The Clash',
    location:'The Voodoo Rooms, Edinburgh',
    date:'Sun 20 Mar 2022, 19:00',
    artist: 'Artist: London Calling & The Clash Tribute',
    category:'category40'
    },

    {   image:'https://c.ststat.net/content/entimg//--720169574-154x154.png',
    title:'2021/22 London Under 12 Sunday Cup Final',
    location:'Charlton Athletic Football Club, London',
    date:'Sun 06 Mar 2022, 11:00 ',
    artist: '',
    category:'category14'
    },

    {   image:'https://c.ststat.net/content/entimg//--1685452998-154x154.jpeg',
    title:'ASTROWORLD - London&#x27;s Biggest Party',
    location:'The Lighthouse Bar &amp; Club, London',
    date:'Sat 16 Apr 2022, 22:00  ',
    artist: '',
    category:'category27'
    },
];  

//search function 

let searchFunction = (userInput) => {

    // if the value has alrerady entered, and the form is submit again, the results do not duplicate
    

    if (searchValue.toLowerCase() === input.value.toLowerCase()){
        return;
    }

    // the results gets refreshed on every submit
    resultContainer.innerHTML = '';
    yourResults.innerHTML='';
    eventResults = [{}];


    //variable optmisation
    let value = input.value.toLowerCase();  

    //sets what has been searched for
    yourResults.insertAdjacentHTML("beforeend",`Your results matching '${input.value.toUpperCase()}'`);

    //searches the array
    events.forEach(eventCard =>{ 
       
        if (eventCard.title.toLowerCase().includes(`${value}`)){
            eventResults.push({...eventCard})
            return
       }
       if (eventCard.location.toLowerCase().includes(`${value}`)){
            eventResults.push({...eventCard})
             return
        }
        if (eventCard.date.toLowerCase().includes(`${value}`)){
            eventResults.push({...eventCard})
            return
       }
       if (eventCard.artist.toLowerCase().includes(`${value}`)){
        eventResults.push({...eventCard})
        return
        }
    })

    //removes the first empty value
    eventResults.shift();
    

    //returns the results
    eventResults.forEach(eventResult =>{
        
        resultContainer.insertAdjacentHTML("beforeend",`
        <div id="event-card" class="event-card active">
            <img class='event-image' src="${eventResult.image}" >
                <span class="divider"></span>
                <div class="text-card-content">
                <div class="event-title" data-event-title><a href="#">${eventResult.title}</a></div>
                <div class="event-location" data-event-location><a href="#">${eventResult.location}</a></div>
                <div class="event-date" data-event-date>${eventResult.date}</div>
                <div class="event-artist" data-event-artist><a href="#"> ${eventResult.artist}</a></div>
                <div class='event-category' style="display:none">${eventResult.category}</div>
            </div>
        </div>`)

    })


    // if blank;

    if(eventResults.length-1 === -1){

        resultContainer.innerHTML= 'No events available, try "London"';
        
    }


    //sets value for filters
    searchValue = value;
    allEventCardsResult = document.querySelectorAll('.event-card');
    allEventCardsCategories = document.querySelectorAll('.event-category');
    return

}

// search triggers
search.addEventListener('click', searchFunction);

input.addEventListener('keyup', function(event){
    if(event.keyCode === 13){
        search.click()
    }
});     


/* checkbox filter */



let counter = 0;
let active = [];


function check(id){

    let temp=[];
    console.log('tempvuoto' + temp);

    let category = document.getElementById(id);

    if (counter === 0){
        resultContainer.innerHTML = '';
    } 

    if (category.checked === true){
        active.push(id);
       
    } else {
        active.splice(active.indexOf(id), 1);
        resultContainer.innerHTML = '';
    }


    resultContainer.innerHTML = '';

    active.forEach(el => {
        eventResults.filter(er => er.category === el).forEach(eventResult =>{

            resultContainer.insertAdjacentHTML("beforeend",`
            <div class="event-card">
                <img class='event-image' src="${eventResult.image}" >
                <span class="divider"></span>
                    <div class="text-card-content">
                    <div class="event-title" data-event-title><a href="#">${eventResult.title}</a></div>
                    <div class="event-location" data-event-location><a href="#">${eventResult.location}</a></div>
                    <div class="event-date" data-event-date>${eventResult.date}</div>
                    <div class="event-artist" data-event-artist><a href="#"> ${eventResult.artist}</a></div>
                    <div class='event-category' style="display:none">${eventResult.category}</div>
                </div>
            </div>`)
    
        })
    })

      if (active.length === 0 && counter != 0){
        resultContainer.innerHTML = '';
        
        eventResults.forEach(eventResult =>{
        
            resultContainer.insertAdjacentHTML("beforeend",`
            <div id="event-card" class="event-card active">
                <img class='event-image' src="${eventResult.image}" >
                    <span class="divider"></span>
                    <div class="text-card-content">
                    <div class="event-title" data-event-title><a href="#">${eventResult.title}</a></div>
                    <div class="event-location" data-event-location><a href="#">${eventResult.location}</a></div>
                    <div class="event-date" data-event-date>${eventResult.date}</div>
                    <div class="event-artist" data-event-artist><a href="#"> ${eventResult.artist}</a></div>
                    <div class='event-category' style="display:none">${eventResult.category}</div>
                </div>
            </div>`)
    
        })
        
    }
    
    counter++;
}
