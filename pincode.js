module.exports.pincodes=function(pincode,text)
{
      var request = require('request');
      var words1=require('./words.js');
      //console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~",text)
      console.log("0",pincode[0]);
      console.log("1",pincode[1]);
      var up_ad=[],arrStr = [],arrStr1=[],newArr=[],f_addr=[];
      let address="";

     for(var j=0;j<pincode.length;j++){

     request({url:`https://maps.googleapis.com/maps/api/geocode/json?address=${pincode[j]}&key=AIzaSyATAf58891KC6ohOJPsWL4561cUbsqz2qg`,
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
                            address=address+' '+body.results[0].address_components[i].long_name;
             }
          newArr.push(address);
             address="";
                f_addr.push(body.results[0].formatted_address);
             }
           }})
      }


            setTimeout(function(){
              console.log("new array",newArr,f_addr);
              if(newArr.length>1) {
                console.log("started");
             for(let i=0;i<newArr.length;i++){
                var str=f_addr[i]+" ";
                var tempStr='';
                var len = str.length;
               for(var k=0;k<len;k++){
                  if(str.charAt(k)==' '||str.charAt(k)==','){
                   arrStr.push(tempStr);
                   tempStr ='';}
              else{
                  tempStr += str.charAt(k);
                  }
                  }

                  arrStr=arrStr.filter((ele)=>{
                    if(isNaN(ele)){
                      if(ele!=undefined) return ele}
                    });

             console.log("array list to compare",arrStr);

                 if(arrStr.length>0)
                       for(l=0;l<arrStr.length;l++){
                           m1=arrStr[l];
                           r=`([^\w*|^\W]|\s|\,)${m1}([^\w*|^\W]|\s|\,)`;
                           console.log("array regex ",r);
                           let keys1 = new RegExp(r, 'g')
                           //    console.log("array keys1 ",keys1);
                       if(keys1.test(text.toString())){
                           words1.obj.details.address.fullAddress=f_addr[i];
                            if(newArr[i]!=null||newArr[i]!=undefined)
                            up_ad=newArr[i].split(' ');
                            up_ad=up_ad.filter((ele)=>{
                              if(ele!=undefined||ele!=''||ele!=null) return ele
                              });
                            console.log("3<",up_ad);
                            words1.obj.details.address.pincode=up_ad[0];
                            words1.obj.details.address.locality=up_ad[1];
                            words1.obj.details.address.country=up_ad[up_ad.length-1];
                            arrStr.length=0;
                            newArr.length=0;

                            }

                }

                }
              }
              else {
                console.log("welcome 1 pin",f_addr[0]);
                words1.obj.details.address.fullAddress=f_addr[0];
                          if(newArr[0]!=null||newArr[0]!=undefined)
                          up_ad=newArr[0].split(' ');
                          up_ad=up_ad.filter((ele)=>{
                            if(ele!=undefined||ele!=''||ele!=null) return ele
                            });
                                console.log("1 pin",up_ad);
                          words1.obj.details.address.pincode=up_ad[0];
                          words1.obj.details.address.locality=up_ad[1];
                          words1.obj.details.address.country=up_ad[up_ad.length-1];

                      }
          },2500);





}
