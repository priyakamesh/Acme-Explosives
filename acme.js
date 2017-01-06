console.log("acme")
var categories;
var products;
var types;
var catNum;
var typeNum;
var typesHtml ;

//promise1
var promise1 = new Promise (function (resolve,reject){
  var request1 = new XMLHttpRequest();
  request1.addEventListener("load",function(){
    var data =JSON.parse(request1.responseText).categories
    resolve(data)
  })
  request1.open("GET", "categories.json")
  request1.send()
  })

//promise2
var promise2 = new Promise(function (resolve,reject){
  var request2 = new XMLHttpRequest();
  request2.addEventListener("load",function(){
    var data =JSON.parse(request2.responseText).types
    resolve(data)
  })
  request2.open("GET", "types.json")
  request2.send()
  })

//promise3
var promise3 = new Promise(function (resolve,reject){
  var request3 = new XMLHttpRequest();
  request3.addEventListener("load",function(){
    var data =JSON.parse(request3.responseText).products
    resolve(data)
  })
  request3.open("GET", "products.json")
  request3.send()
  })

//single Promise
promise1
.then (function (val) {
  categories = val
  var categoryHtml = `<option class="cateSelected">Select a Category</option>`

  for (var i=0; i<categories.length; i++){

    categoryHtml += `<option class="cateSelected">${categories[i].name}</option>`
    $(".selected").html(categoryHtml)
  }
  console.log(val)
  return promise2
})
.then (function (val){
  types = val;
  console.log("types:", val)
  return promise3
})
.then (function (val){
  products = val;
  console.log(products[0])
  console.log("products", products)
})
.then ($(".selected").change(getType))
.then ($("#productGrid").click(getProducts))
//function to get the types from category selection
function getType (){
  var categorySelected = $(".selected").val();
  switch (categorySelected) {
    case "Fireworks" :
    var typesHtml = "";
    for(var i = 0; i<categories.length; i++){
    if (categorySelected === categories[i].name){
      catNum = categories[i].id;
      for (var i=0; i < types.length; i++){
        if (types[i].categoriesId === catNum){
        typesHtml +=  `<div id="type${i}" class="col-md-12 "><button class="btn btn-primary active widthChange" value="${types[i].typeId}">${types[i].name} </button></div>`
         $("#productGrid").html(typesHtml)


      }
    }
  }
      }
      break;
    case "Demolition":
    var typesHtml = "";
    for (var i=0; i<categories.length; i++){
      if (categorySelected === categories[i].name) {
        catNum = categories[i].id;
      for (var i=0; i <types.length; i++){
          if (types[i].categoriesId === catNum){
                  typesHtml +=  `<div id="type${i}" class="col-md-12 "><button class="btn btn-primary active widthChange" value="${types[i].typeId}">${types[i].name} </button></div>`

           $("#productGrid").html(typesHtml)
           // var temp = `${types[i].typeId}`;
           // console.log("temp::::::::", temp)

        }
    }
      }
    }
    break;

}
}

//function to get the products from type selected
function getProducts(e) {
  console.log(e)
    typeNum = parseInt(e.target.value)
    console.log(typeNum)
    var productsHtml = "";
    for (var i =0 ; i< products.length ; i++){
      for (var key in products[i]) {
      if (typeNum === products[i][key].type){
        productsHtml += `<table class="table table-bordered colorChange col-sm-offset-4"><td>${products[i][key].name}</td></table>`

      }$("#productList").html(productsHtml)
    }
    }
}



















// /
// function getProduct () {
//   // console.log(e)


//       for(var i=0; i< products.length; i++){
//       // Object.keys(products).forEach(function(key){
//         for(var key in products[i]) {
//         console.log(key)

//        if (products[i][key].type === ){
//         console.log(products[i][key].name)
//       }
//       }
//     }


// }







// console.log(selectedType)


    // Object.keys(products).forEach(function(key){
    // for (var i=0; i < types.length; i++){
    // if (types[i].categoriesId === products[i][key].type){
    //     console.log(products[i][key])
    // //     if (selectedType === products[i][key].name ){
    // //       productsHtml += `<div>${products[i][key].name}</div>`
    // //       $("#productList").html(productsHtml)
    //     }
    // //   })
    // }})
