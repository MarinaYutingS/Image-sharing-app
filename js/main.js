//initialise :
const initApp = async () => {
    //get jason data from APOD api
    const photos = await fetchPhoto();
    console.log(photos);
    //render data to page
    renderPhotos(photos);
    //add listeners
    listenForLikes();
};

document.addEventListener("DOMContentLoaded", initApp);

//define function fetchPhoto():
const fetchPhoto = async () => {
    const photData = await fetch(
        "https://api.nasa.gov/planetary/apod?count=12&api_key=V2qcq6LyW5xJCwhMgOgklhs0sgoB8lOI2qdqzMLi"
    );
    const jsonData = await photData.json();
    return jsonData;
};

//define function displayPhoto():
// const displayPhoto = async(data) => {
//     for (let i = 0; i < 11; i++) { 
//     const { date } = data[i].date;
//     const { title } = data[i].title;
//     const { hdurl } = data[i].hdurl; //img
//     const { explanation } = data[i].explanation;
//     console.log(date,title,hdurl,explanation);
//     };
// };

//define function renderPhotos():
const renderPhotos = (photos) => {
    const main = document.querySelector("main");
    const photoArray = [];

    photos.forEach(photo => {
        const elemObj = createCardElements();
        const card = creatPhotoCard(elemObj,photo);
        photoArray.push(card);
    });
        
   photoArray.forEach((card)=> {
       main.appendChild(card);
   })
};

//define createCardElements():
const createCardElements = () => {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const details = document.createElement("div");
    const like = document.createElement("div");
    const title = document.createElement("h2");
    const date = document.createElement("h5");
    const explanation = document.createElement("p");
    return { article,img,details,like,title,date,explanation };
};

//define creatPhotoCard():
const creatPhotoCard = (elemObj,photo) => {
    const { article,img,details,like,title,date,explanation } = elemObj;

    details.className = "details";
    like.classList.add("like","like-no");

    title.textContent = photo.title;
    img.src = photo.hdurl;
    date.textContent = photo.date;
    explanation.textContent = photo.explanation;

    // loading page
    document.querySelector(".photo").classList.remove("loading");

    article.appendChild(img);
    details.appendChild(title);
    details.appendChild(date);
    details.appendChild(explanation);
    article.appendChild(details);
    article.appendChild(like);
    return article;
}

//define listenForLikes():
const listenForLikes = () => {
    const likes = document.querySelectorAll(".like");
    likes.forEach(like => {
        like.addEventListener("click", (event) => {
            event.target.classList.toggle("like-no");
            event.target.classList.toggle("like-yes");
            if (event.target.classList.contains("like-yes")) {
                console.log("Saving Favorite...");
            }else {
                console.log("Removing Favorite...");
            }
        })
    })
}