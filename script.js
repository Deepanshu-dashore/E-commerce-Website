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
let MycardDisplay=document.getElementById("modelBg2");
let listOfItem=document.getElementById("ListOfItem");
let itemList=document.getElementById("itemlist");
let subtotal=document.getElementById("subTotal");
ProfileEditPic.style.backgroundImage=(`url("${localURL}")`);
//set defult website coor theme mode light--------------
let saveMode=localStorage.getItem('mode');
let curentMode=(saveMode==null)?'LightMode':saveMode;
document.querySelector("path").classList.add("day");
document.body.classList.add((saveMode=="LightMode"||saveMode==null)?"lightMode":'DarkMode');
if(saveMode!="LightMode"){
    let model=document.getElementById("bootstrapmodelbody");
    let navfarcranceicon=document.querySelector("path");
    model.classList.add("bg-dark");
    model.classList.add("text-light");
    navfarcranceicon.classList.replace("day","fracranceicon");
}
// -------------//---------------//-----------
let tempitemarray=JSON.parse(localStorage.getItem("Itemarray"));
if(tempitemarray!=null){
    ItemArray=tempitemarray;
}
dispalyCountCondition();
//this for opneig and closing Mycard window
//function for Mycards window 
function Mycard(){
    MycardDisplay.style.display="flex";
    displayItem(ItemArray);
}
AddItemCount.innerText=ItemArray.length;
//dislay function use for showing card pruducts 
function displayItem(array){
    let arrayi='',List=" ",price=" ";
    fetch("https://dummyjson.com/products").then(response=>response.json()).then((result)=>{
         array.forEach((item,i)=>{
            arrayi+=result.products.filter((data)=>data.id==item).map((data)=>{
                List+=(`<li class="ListItem"><span class="dot"><span></span></span>${data.title}</li>`);
                price+=("+"+data.price);
                return (`
             <!-------Item open--------------->
             <li><img src="${data.thumbnail}" alt="">
                 <div class="contantADDlist">
                     <p>${data.title+`,`+data.description}</p> 
                     <p id="AddListStock">${(data.stock<=10)?`Out of stock &nbsp;<i class="bi bi-shop-window" style="color:red;"></i>`:`In stock &nbsp;<i class="bi bi-shop-window" style="color:green;"></i>`}</p>
                     <p class="GiftCheak"><input type="checkbox" name="" id="">This will be a gift</p>
                     <div class="Dropdown">
                         <h4>Quantity </h4>
                         <select name="" id="">
                             <option value="1"> 1</option>
                             <option value="2"> 2</option>
                             <option value="3"> 3</option>
                             <option value="4"> 4</option>
                             <option value="5"> 5</option>
                             <option value="6"> 6</option>
                             <option value="7"> 7</option>
                             <option value="8"> 8</option>
                             <option value="9"> 9</option>
                             <option value="10+"> 10+</option>
                         </select>
                     </div>
                 </div>
                 <span class="offparsentages">${data.discountPercentage}% off</span>
                 <span class="price"><span class="rupe">&#x20B9;</span>${data.price}<span>.00</span>
                 <button class="btn text-primary" id="removeBtn" onclick="removeFromCard(${i})">Remove</button>
             </li>
             <!-------Item close--------------->
           
                `);
            })//map closing
         })//for each closing
         itemList.innerHTML=List;
         subtotal.innerHTML=(ItemArray.length==0)?(`Subtotal (0 items): <span class="rupe">&#x20B9;</span><span>0</span>`):(`Subtotal (${ItemArray.length} items): <span class="rupe">&#x20B9;</span><span>${eval(price)}.00</span>`);
         listOfItem.innerHTML=arrayi;
    }).catch(e=>e.alert("Erroe 404 data note founted"))//then closing
}//display function closing

//fuction to close Editprofile infomation window 
function cutMycard(){
        MycardDisplay.style.display="none";
}

//get value in local storage by cliking add card btn and show count of add product
function AddItemCountF(id){
    ItemArray.push(id);
    dispalyCountCondition();
    AddItemCount.innerText=ItemArray.length;
    let strobj=JSON.stringify(ItemArray);
    localStorage.setItem('Itemarray',strobj);
}
//funtion is use for card diplay none and 100 + count diplaying
function dispalyCountCondition(){
    if(ItemArray.length==0){
        AddItemCount.style.opacity="0%";
    }
    else{
        AddItemCount.style.opacity="100%";
    }
    
    if(100<=ItemArray.length){
        AddItemCount.style.width="28px";
        AddItemCount.style.height="18px";
    }
    else{
        AddItemCount.style.width="16px";
        AddItemCount.style.height="16px";   
    }
}

//for removing item in add my card 
function removeFromCard(id){
    ItemArray.splice(id,1);
    displayItem(ItemArray);
    dispalyCountCondition();
    AddItemCount.innerText=ItemArray.length;
    let strobj=JSON.stringify(ItemArray);
    localStorage.setItem('Itemarray',strobj);
}
//funtion for swap mode 
function swapthemMode(){
    let mode=document.getElementById("Mode");
    let model=document.getElementById("bootstrapmodelbody");
    let navfarcranceicon=document.querySelector("nav ul li a svg path");
    if(curentMode=='LightMode'){
        document.body.classList.replace("lightMode","DarkMode");
        curentMode='DarkMode';
        mode.innerHTML=(`<i class="bi bi-brightness-high"></i><span id="navTaxt">light mode</span>`);
        localStorage.setItem("mode","DarkMode");
        model.classList.add("bg-dark");
        model.classList.add("text-light");
        navfarcranceicon.classList.replace("day","fracranceicon");
    }
    else if(curentMode=="DarkMode"){
        document.body.classList.replace("DarkMode","lightMode");
        curentMode='LightMode';
        navfarcranceicon.classList.replace("fracranceicon","day");
        mode.innerHTML=(`<i class="bi bi-moon-stars"></i><span id="navTaxt">Dark mode</span>`);
        localStorage.setItem("mode","LightMode");
        model.classList.remove("bg-dark");
        model.classList.remove("text-light");
    }
    
}
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
        <div class="card Homecard">
            <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
            <div class="content">
                <h1>${data.title}</h1>
                <p class="discripcation">${data.description}</p>
                <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span> rupee</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
                <p>Out of stock<i class="bi bi-shop-window" style="color:red;"></i> <button type="button" onclick="getModelData(${data.id})" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">See more.</button>
                </p>
            </div>
        </div>
        `);
        }
        else{
            return(`
        <div class="card Homecard">
            <div class="productImg" ><img src="${data.thumbnail}" alt="product image"></div>
            <div class="content">
                <h1>${data.title}</h1>
                <p class="discripcation">${data.description}</p>
                <h3 class="price"><span>Price</span><sup>&#x20B9;</sup>${data.price}<span> rupee</span><span class="offparsentages">${data.discountPercentage}% off</span></h3>
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
      <h3 class="price" id="price"><span>Price</span><sup>&#x20B9;</sup>${result.products[id-1].price}<span>&nbsp;rupee</span><span class="offparsentages" id="ModelDiscount">- ${result.products[id-1].discountPercentage}% off</span></h3>
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
            <div class="card Homecard">
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
            <div class="card Homecard">
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
