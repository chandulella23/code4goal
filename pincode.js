module.exports.pincodes=function(pincode)
{
  console.log(pincode)
  var words1=require('./words.js')
  var pinArr=[];

    var request = require('request');
           let address='';

             request({
             url:`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode}&key=AIzaSyATAf58891KC6ohOJPsWL4561cUbsqz2qg`,
             json:true
             },(error,response,body)=>{
             if(error){
             console.log("unable to connect forecast.io ")
            }else if(response.statusCode ==400){
            console.log("unable to fetch data ")
            }else if(response.statusCode ==200){
            if(body.results[0].address_components.length!=null && body.results[0].address_components.length!= undefined && body.results[0].address_components.length>0)
            {

              for(let i=0;i<body.results[0].address_components.length;i++){
               //  console.log(body.results[0].address_components[i].long_name)
               //address.push(body.results[0].address_components[i].long_name)
               address=address+' '+body.results[0].address_components[i].long_name
             }
            }
            words1.obj.details.address=address

           //address=address.toString();
           //console.log("Adressis:",address)
           console.log("address:",address)
           }

           })




        }
