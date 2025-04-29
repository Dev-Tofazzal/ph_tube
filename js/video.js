function getTimeString(time){
    const day = parseInt(time/86400);
    let remainingSecond = time % 86400;
    const hour =parseInt(remainingSecond/3600) ;
    remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60 ) ;
    remainingSecond = remainingSecond % 60 ;
    return `${day} days ${hour} hour ${minute} minites ${remainingSecond} second ago`
}

const loadCategories= () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(err => console.log(err))
    
}

const loadVideos= () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch(err => console.log(err))
    
}

const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category_btn");
    for(let btn of buttons){
        btn.classList.remove('active')
    }
    
}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass()
            const activeButton = document.getElementById(`btn-${id}`)
            activeButton.classList.add("active")
            displayVideos(data.category)
            
        })
        .catch(err => console.log(err))
}


const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories")
    categories.forEach( (item) => {
        const buttonContainer = document.createElement("div");
        buttonContainer.innerHTML = `
         <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})"  Class="btn category_btn">
         ${item.category}
         </button>
        `
        categoryContainer.append(buttonContainer)
    })
    
}


const displayVideos = (videos) => {
    const videoContainer = document.getElementById("videos");
   
    videoContainer.innerHTML = ""
    if(videos.length === 0 ){
        videoContainer.classList.remove("grid")
        videoContainer.innerHTML = `
        <div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center" >
            <img src="assets/Icon.png">
            <h2 class="text-center text-xl font-bold">OPP!! Sorry, There is no <br> content here </h2>
        </div>
        `;
        return;
    }

    else{
        videoContainer.classList.add("grid")
    }
    videos.forEach( video => {
        const card = document.createElement("div");
        card.classList = "card  "
        card.innerHTML = `
        <figure class="h-[200px] relative">
             <img class="h-full w-full object-cover" src= ${video.thumbnail}
              />
              ${video.others.posted_date?.length === 0 ? '' : `<span class="absolute text-sm right-2 bottom-2 bg-black text-white rounded-lg p-1">
                ${getTimeString(video.others.posted_date)}</span>`}
             
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
             <img class="w-10 h-10 rounded-full object-cover" src= ${video.authors[0].profile_picture}>
            </div>
            <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                   <p class="text-gray-400"> ${video.authors[0].profile_name}</p> 
                   ${video.authors[0].verified === true ? '<img class="w-5 " src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">' : ""}
                   
                </div>
                <p></p>
                <p></p>
            </div>
        </div>
        `
        videoContainer.append(card)


        
    })
}

loadCategories()
loadVideos()