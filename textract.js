const path =require('path')
module.exports.textRact=function(file,res){
var textract = require('textract');
var mammoth=require('mammoth');
var fs=require('fs');

var pincodes=require('./pincode.js')
var words=require('./words.js')

var textArr=[];
var dataArr=[];
textract.fromFileWithPath(path.join(__dirname,"/converted/"+file+".docx"), function( error, text ) {

  console.log('***************************************************************************',text)

  textArr=text.split('.');
  //console.log(textArr.length);
  //console.log("text*****",text.toString())

  mammoth.extractRawText({path: path.join(__dirname , "/converted/"+file+".docx")})
    .then(function(result){
      var data = result.value; // The raw text
      var messages = result.messages;
      //console.log(data.trim().toString())
      dataArr=data.split('.');
      //  console.log(dataArr.length)


//*******************************************************************************************************************************

      const fs = require('fs');
      function cleanStr(str) {
        return str.replace(/\r?\n|\r|\t|\n/g, '').trim();
      }
      function cleanTextByRows(data) {
        var rows,
        clearRow,
        clearRows = [];
        rows = data.split("\n");
        for (var i = 0; i < rows.length; i++) {
          clearRow = cleanStr(rows[i]);
          if (clearRow) {
            clearRows.push(clearRow);
          }
        }
      //  console.log(clearRows);
      return clearRows.join("\n") + "\n";
      }

      var data  = cleanTextByRows(data);
      data=data.replace(/[\s]+/gm,' ')
      data=data.toString();
      text=text.toString();
      text=text.trim();
      data=data.trim();

      let a = text.replace(/\W+/gm,"~")
      let b = data.replace(/\W+/gm,"~");
      //console.log("%%%%%%%%%%%%%%%%",a);
      //console.log("%%%%%%%%%%%%%%%%",b);

       let arr1=a.split('~'); //high data
       let arr2=b.split('~'); //low data
       //console.log(arr1);
       //console.log(arr2);
      //var arr1Len=arr1.length;
      var arr2Len=arr2.length-7;
      //console.log(arr2.length)
      var j=0;
      var myArr=[];
      for(let i=arr2Len;i<arr2.length;i++)
      {
        myArr[j]=arr2[i];
        j++;
      }

      var keyword=myArr.join('~')
      keyword=keyword.trim();
      console.log(keyword);
      var remove=new RegExp(`((\n*.*))${keyword}`,"gmi")
      //console.log(remove);
      a=a.toString();
      var toDelete=a.match(remove);
    //  toDelete=toDelete.toString();
      a=a.replace(`${toDelete}`,'')
      a=a.replace(/~/gm,' ');
      a=a.trim();
      console.log("MY header***************",a);
      head=a.split(' ');
      //console.log(head);
      if(head.length>1  )
      {
        let count=0;
        for(let i=0;i<2;i++)
        {
          if(head[i]=="page" || head[i]=="Page" || head[i]=="PAGE")
          count++;
        }
        if(count==0)
        {
          words.obj.details.name.firstName=head[0];
          words.obj.details.name.lastName="null"
        }

      }


      //Email Starts here
      if(words.obj.details.email==null){
        if(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gm.test(text))
        {
          var mailId=text.toString().match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/gm);
          console.log("email id is :",mailId[0]);
          words.obj.details.email=mailId[0];
        }
        else{
          console.log("No mail found");
        } //End of email
      }


      //contact starts here
      if(words.obj.details.mobile==null)
      {

        if(/(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b/.test(text))
        {
        var phone=text.toString().match(/(\(|\+|^\s)*\b(([\+])?([\(]?(\d{1}\-\d{3}|[+]|[+]\d{2}|\d{2,3}|\d{1})?[\)]?)[\-|\s|\.]*?([\(]\d{1}[\)])?[(]?\d{3,4}[)]?[\-|\s|\.]*?\d{3}[\-|\s|\.]*?\d{2}[\-|\s|\.]?\d{1,2})\b/gm);
        console.log("phone id is :",phone[0]);
        words.obj.details.mobile=phone[0]
        }
        else{
        console.log("No phone found");
        }
      }//phone

      //pincode starts here

      if(words.obj.details.address==null){
        if(/[^\d]\d{5,6}[^a-z|[^@|^\d]/.test(text.toString())){
          let pincodereg=text.toString().match(/[^\d]\d{5,6}[^a-z|[^@|^\d]/gm)
          var pincode=pincodereg.toString().match(/\d{5,6}/gm)
          // console.log("pincode:",pincode[0])
        }

        if(pincode!=null && pincode!= undefined && pincode.length>0)
        {
          var pincode1=pincode[0];
          console.log("pincode",pincode1)
          pincodes.pincodes(pincode1);
        }
      }//pincodes end here
      fs.unlinkSync('./converted/' +file+'.docx')
       setTimeout(function(){

         res.send(words); }, 3000);

       })


       .done();
    })

}
