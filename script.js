//declaration of elment varibales
let Pname=document.getElementById("profileName");
let LocalName = localStorage.getItem('ProfileName');
let navText = document.querySelectorAll("navTaxt");
let homepage=document.getElementById("homePage");
let nav = document.querySelector("nav");
let modelTitle=document.getElementById("exampleModalCenterTitle");
let modelBody=document.querySelector(".Mbody");
Pname.innerText=LocalName;
let profile=document.getElementById("profile");
let localURL=localStorage.getItem("ProfileURL");
profile.style.backgroundImage=(`url("${localURL}")`);
profile.style.backgroundSize= "cover";
let ItemArray=[];
let PofileMname= document.getElementById("IdName");
let Modeldisplay=document.querySelector(".modelBg");
let ProfileEditPic= document.querySelector(".ModelProfile");
let AddItemCount=document.getElementById("AddPruductCount");
let ProfileInputLink=document.getElementById("PicLink");
ProfileEditPic.style.backgroundImage=(`url("${localURL}")`);

//this for opnig and closing profile information edit window
//function for profile edit window 
function ProfileEdit(){
    Modeldisplay.style.display="flex";
    PofileMname.value=LocalName;
}
//fuction to close Editprofile infomation window 
function cut(){
    let testKey=confirm("confirm save the change");
    if(testKey==true){
        let Modeldisplay=document.querySelector(".modelBg");
        Modeldisplay.style.display="none";
        ProfileInputLink.value="";
    }
    
}

PofileMname.addEventListener('focus',()=>{
    PofileMname.classList.add("ModelInput");
    document.querySelector("#editcon").style.display="none";
})
PofileMname.addEventListener('blur',()=>{
    PofileMname.classList.remove("ModelInput");
    document.querySelector("#editcon").style.display="block";
})

ProfileInputLink.addEventListener('focus',()=>{
    PofileMname.classList.add("ModelInput");
    PofileMname.classList.remove("ModelInput");
    document.querySelector("#editcon").style.display="block";
})
ProfileInputLink.addEventListener('blur',()=>{
    PofileMname.classList.remove("ModelInput");
})
//Function for changing for profile picture of user
function ChangeProfilePic(){
        let PicUrl=ProfileInputLink.value;
    if(PicUrl!=null && PicUrl!=""){
        localStorage.setItem("ProfileURL",PicUrl);
        profile.style.backgroundImage=(`url('${PicUrl}')`);
        profile.style.backgroundSize= "cover";
        ProfileEditPic.style.backgroundImage=(`url("${PicUrl}")`);
    }  
}

//Function for changing name of user
function ChangeName(){
    let name=PofileMname.value;
    if(name!=null && name!=""){
        localStorage.setItem('ProfileName',name);
        LocalName =localStorage.getItem('ProfileName');
        Pname.innerText=LocalName;
    }
}

//get value in local storage by cliking add card btn and show count of add product
function AddItemCountF(id){
    ItemArray.push(id);
    // console.log(i);
    AddItemCount.innerText=ItemArray.length;
    localStorage.setItem('array',ItemArray);
}
//this event listener use to closing nav  
nav.addEventListener("mouseleave",()=>{
    nav.style.width=(90+"px");
    nav.classList.add("Navclose");
    homepage.style.width=(100+'%');
})
//this event listener use to showing nav on hover 
nav.addEventListener("mouseenter",()=>{
    nav.style.width=(350+"px");
    nav.classList.replace("Navclose","Navopen");
    homepage.style.width=(76.2+'%');
})

//this fetch use to fetch data from API and make it card  
fetch("https://dummyjson.com/products").then(response=>response.json()).then((result)=>{
    console.log(result.products);
    let newArray=result.products.map((data)=>{
        if(data.stock<=10){
            return(`
        <div class="card">
            <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
            <div class="content">
                <h1>${data.title}</h1>
                <p class="discripcation">${data.description}</p>
                <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span>rupes</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
                <p>Out of stock<i class="bi bi-shop-window" style="color:red;"></i> <button type="button" onclick="getModelData(${data.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">See more.</button>
                </p>
            </div>
        </div>
        `);
        }
        else{
            return(`
        <div class="card">
            <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
            <div class="content">
                <h1>${data.title}</h1>
                <p class="discripcation">${data.description}</p>
                <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span>rupes</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
                <p>In stock<i class="bi bi-shop-window" style="color:green;"></i> <button type="button" onclick="getModelData(${data.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">See more.</button>
                </p>
            </div>
        </div>
        `);
        }
        
    })
    homepage.innerHTML=newArray;
});

//this funtion with id parametar it use show fetch model data by particular id of array object ID
function getModelData(id){
console.log(id); 
fetch("https://dummyjson.com/products").then(response=>response.json())
.then((result)=>{
    modelTitle.innerText=result.products[id-1].title;
    modelBody.innerHTML=(`
    <div id="Modelimage"><img src="${result.products[id-1].thumbnail}" alt=""></div>
    <div id="ModelContend">
      <p id="ProductDescription">${result.products[id-1].description}</p>
      <p id="ProductBrand">Brand ${result.products[id-1].brand}</p>
      <p id="catagory">Category &nbsp;<span>${result.products[id-1].category}</span></p>
      <p id="ModelStocks">${(result.products[id-1].stock<=10)?`Out of stock &nbsp;<i class="bi bi-shop-window" style="color:red;"></i>`:`In stock &nbsp;<i class="bi bi-shop-window" style="color:green;"></i>`}</p>
      <p id="ProductRating">Rating&nbsp; <span>${result.products[id-1].rating}</span></p>
      <h3 class="price" id="price"><span>Price</span><sup>&#x20B9;</sup>${result.products[id-1].price}<span>&nbsp;rupes</span><span class="offparsentages" id="ModelDiscount">- ${result.products[id-1].discountPercentage}% off</span></h3>
      <p class="oderBtns"><button class="btn  addbtn" onclick="AddItemCountF(${result.products[id-1].id})">add to card<i class="bi bi-cart-plus"></i></button><button class="btn buybtn">buy now<i class="bi bi-bag-check"></i></button></p>
 `);
});

}

//funtion for filter data by nav buttons
function filterByCatogroy(catagory){
    fetch("https://dummyjson.com/products").then((response)=>response.json()).then((result)=>{
        let filterArray=result.products.filter((data)=>data.category==catagory||(data.price<=catagory&&data.price>catagory-100)).map((data)=>{
            if(data.stock<=10){
                return(`
            <div class="card">
                <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
                <div class="content">
                    <h1>${data.title}</h1>
                    <p class="discripcation">${data.description}</p>
                    <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span>rupes</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
                    <p>Out of stock<i class="bi bi-shop-window" style="color:red;"></i> <button type="button" onclick="getModelData(${data.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">See more.</button>
                    </p>
                </div>
            </div>
            `);
            }
            else if(data.stock>10){
                return(`
            <div class="card">
                <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
                <div class="content">
                    <h1>${data.title}</h1>
                    <p class="discripcation">${data.description}</p>
                    <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span>rupes</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
                    <p>In stock<i class="bi bi-shop-window" style="color:green;"></i> <button type="button" onclick="getModelData(${data.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">See more.</button>
                    </p>
                </div>
            </div>
            `);
            }
        })
        homepage.innerHTML=filterArray;
        
    })
}
