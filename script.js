const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

let photoArray = [];

//initial load increase it later
let isInitialCount = true;

// Unsplash API
let photoCount = 5;
const unSplashKey = '16KHsdXmZQVwFjHpgAFQHkvEpF3aLbLgGWurMYJFJ5M';
let unSplashApi = `https://api.unsplash.com/photos/?client_id=${unSplashKey}&count=${photoCount}`;

//Update the new count for second load
function updateAPINewCount(picount){
    unSplashApi = `https://api.unsplash.com/photos/?client_id=${unSplashKey}&count=${picount}`;
}


//Check if all image are loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
               
    }

}



// Create elements for links and photos, add to DOM
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;

    //Run Function for each object in photoArray
    photoArray.forEach((photo) => {

        // create a <a> for each photo
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');

        // Create an image <img> for each photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title', photo.alt_description);
        
        img.addEventListener('load',imageLoaded);

        // Put <img> inside <a> and both into imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
        });

    }



async function getPhotos(){
    try{
        const response = await fetch(unSplashApi);
        photoArray = await response.json();
        displayPhotos();
        if(isInitialCount) {
            updateAPINewCount(30)
            isInitialCount = false;
        }

    }catch{
        //Catch error
    }
   
}

// infinite scroll
window.addEventListener('scroll', () => {

    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//on Load
getPhotos();