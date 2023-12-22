var arr=[];
var favArr=[];

async function fetchData(){
    let response = await fetch('http://localhost:3000/movies/');
    let responseText = await response.text();
    arr= await JSON.parse(responseText);
    // console.log(responseText);
    // console.log(arr);
    displayCards(arr);    
}

async function fetchFavData(){
    let response = await fetch('http://localhost:3000/favourites');
    let responseText = await response.text();
    favArr= await JSON.parse(responseText);
    // console.log(responseText);
    // console.log(arr);
    displayfavCards(favArr);    
}

async function DeleteFav(id){
    fetch('http://localhost:3000/favourites/'+id, {
        method: 'DELETE',
    })
}

function displayCards(arr){
    for(let i=0;i<arr.length;i++){
        console.log(arr[i].title);
        document.getElementById("cards").innerHTML+= `
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
            <img class="card-img-top" src="${arr[i].posterPath}" alt="Card image cap">  
            <div class="card-body">
                <h5 class="card-title">${arr[i].title}</h5>
                <p class="card-text">Release Date : ${arr[i].releaseDate}</p>
                <button id="${arr[i].id}" class="btn btn-primary" onClick="addFav(this.id)">Add Favourite</button>
        </div>
      </div>
      `
    }
}

function displayfavCards(arr){
    for(let i=0;i<arr.length;i++){
        console.log(arr[i].title);
        document.getElementById("favCards").innerHTML+= `
        <div class="card m-3 border-info bg-info-subtle" style="width: 18rem;">
            <img class="card-img-top" src="${arr[i].posterPath}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${arr[i].title}</h5>
                <p class="card-text">Release Date : ${arr[i].releaseDate}</p>
                <button id="${arr[i].id}" class="btn btn-primary" onClick="DeleteFav(this.id)">Delete Favourite</button>
        </div>
      </div>
      `
    }
}

    async function addFav(id){
        var item = arr.find(item => item.id === id);
        if(favArr.find(temp => temp.movieID === item.movieID)!=null){
            alert("Movie already exists in favourites");
        }

        else

        {
           
            let config = {
                method: 'POST',
                 body: JSON.stringify({
                    movieID:item.movieID,
                    title:item.title,
                    releaseDate:item.releaseDate,
                    posterPath:item.posterPath
                  }),
                  
                  
                 headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
            
            let response = await fetch('http://localhost:3000/favourites',config);
            let responseText = await response.text();
            // console.log(responseText);
            favArr.push(item);
            fetchFavData();
        }
    }

fetchData();
fetchFavData();


