module.exports.execu=function(data,addSkill,addSkillextra,addCareer,addLang,addProject,addExp,addEdu,addHobbie,myKeys){
  var words=require("./words.js")
  const tableData = require('./tables').table
  const DomParser = require('dom-parser');
  const parser = new DomParser();
  const stream=require('stream')
  const readline=require('readline')
  let hobbieExecu=activities(addHobbie)
  //console.log("my hobbie execu returned array is :",hobbieExecu);
  if(hobbieExecu!=undefined){
      words.obj.hobbies=hobbieExecu;
  }
  let skillExecu=activities(addSkill)
  //console.log("my skill execu returned array is :",skillExecu);
  if(skillExecu!=undefined){
      words.obj.technicalSkills=skillExecu;
  }

  let extraskillExecu=activities(addSkillextra)
  //console.log("my extra skill execu returned array is :",extraskillExecu);
  if(extraskillExecu!=undefined){
      words.obj.skills=extraskillExecu;
  }

  let careerExecu=activities(addCareer)
  //console.log("my career execu returned array is :",careerExecu);
  if(careerExecu!=undefined){
      words.obj.careerObjective=careerExecu.toString();
  }

  let langExecu=activities(addLang)
  //console.log("my lang execu returned array is :",langExecu);
  if(langExecu!=undefined){
      words.obj.languages=langExecu
  }

  let projectExecu=experience(addProject)
  //console.log("my project execu returned array is :",projectExecu);
  if(projectExecu!=undefined){
      words.obj.project=projectExecu
  }

  let expExecu=experience(addExp)
  //console.log("my experience execu returned array is :",expExecu);
  if(expExecu!=undefined){
      words.obj.professionalExperience=expExecu
  }

  let eduExecu=education(addEdu)
  //console.log("my education execu returned array is :",eduExecu);
  if(eduExecu!=undefined){
      words.obj.academicQualifications=eduExecu.filter(ele=>ele!=null)
  }

    function activities(myArr)
    {
//   console.log("mykeysAAAAA",myKeys)
      if(myArr==null || myArr == undefined || myArr.length==0){
        //console.log("Not present");
        return;
      }
      else{
        var str=myArr.splice(1,myArr.length-2);
        str=str.join('\n');
        // for(i=0;i<myKeys.length;i++){
        //     var reg=new RegExp(myKeys[i],'gmi')
        //     str=str.replace(/${reg}/gm,'')
        //     if(i === myKeys.length){
        //         return strs
        //     }
        // }


        // console.log("myarrAAAAAA",str)
        var rege = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gmi
        var matchContent=str.match(rege);
        ////console.log("Matching content in li's and p's are : ",matchContent);
        if(matchContent==null || matchContent==undefined || matchContent.length==0){
          return;
        }
        else{
            // console.log("ASSSSSSSS",matchContent)
          var returnArr=matchContent.map((ele)=>ele.replace(/<[a-z]+>|\|\|\•|\●|<\/[a-z]+>|<[a-z]+\/>|Languages|Tools|\t|\:|\n|\●|\•|►|\s\s+/gmi,'').trim())
          ////console.log("return array would be:",returnArr)
          if(returnArr!=null && returnArr!=undefined){
            for(let i=0;i<returnArr.length;i++)
            {
              returnArr[i]=returnArr[i].trim();
            }
          }
        }
         returnArr = returnArr.filter(function(x){
            return (x !== (undefined || null || ''));
          });
        return returnArr;
      }
    }



  function education(edu){
    edu=edu.splice(1,edu.length-2);
    edu=[edu.toString().replace(/<strong>\s*\W\s*<\/strong>/gm,'')]
    let arr = {}
    edu.forEach( (ele,i) => {
        ele = ele.replace( /<\/body>|\s*(Page \d{2}\s*)/gim,'' )
        ele=ele.replace(/<h\d>/gm,'<strong>').replace(/<\/h\d>/gm,'</strong>')
        //console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!! ele is",ele);
        if (( parser.parseFromString(ele).getElementsByTagName('table') || parser.parseFromString(ele).getElementsByTagName('table') )&& ele.includes('<table>','</table>','<td>','</td>') ){
            arr[i] = tableData(data)
        }else if( parser.parseFromString(ele).getElementsByTagName('ul').length >= 1 ){
            //console.log(" 🤷‍♀asnkcnsalkn" )
            arr[i] = listData(ele)
        }else if( parser.parseFromString(ele).getElementsByTagName('strong').length >= 1 ){
            //console.log( edu )
            strongList = dommer( ele, 'strong' )
            let strongArr = []
            strongList.forEach( (value, index, ar) => {
                strongArr.push(value.innerHTML.trim())
            } )
            let finalStrong = []
            let flag = false;
            //console.log( " 😋", strongArr )
            edu=edu.toString().replace(/<h\d>/gm,'<strong>').replace(/<\/h\d>/gm,'</strong>')
            edu=edu.toString().split('<strong>');
            console.error(edu);
            // readNow(edu,strongArr)
  //           function readNow(baseText, lastArray){
  //   const buf = new Buffer(baseText);
  //   // //console.log(lastArray)
  //   const bufferStream = new stream.PassThrough();
  //   bufferStream.end(buf);
  //
  //   const rl = readline.createInterface({
  //       input: bufferStream,
  //   });
  //   var flag=false;
  //   var newStr;
  //   var newArr = [];
  //   let count = 0;
  //   let base = null
  //   rl.on('line', function (line) {
  //     console.error(line);
  //     if(line.includes(lastArray[0])){
  //       flag=true;
  //     }
  //     if(flag==true){newStr+=line;
  //       if(lastArray[count] === undefined){
  //       }else if(line.includes(lastArray[count])){
  //           newArr.push(newStr)
  //           newStr=null;
  //       }}
  //       // //console.log( " ❌",base)
  //
  //
  //   });
  //   rl.on('close', (data) => {
  //        // //console.log(lastObj)
  //        console.error(" fffffffffffffffffffffff::  ",newArr);
  //       return newArr;
  //   })
  //
  // }
            // strongArr.forEach( (el,i) => {
            //     // //console.log( ' 🇿🇼 ', el, new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm'));
            //
            //     if( strongArr[i+1] === null || strongArr[i+1] === undefined ) return ;
            //     if (ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')) != null){
            //         flag = true;
            //         finalStrong.push( ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')).join().replace( strongArr[i+1], '').replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
            //     }
            // } )
            // if (ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')) != null){
            //     finalStrong.push( ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')).join().replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
            // }
            // ele = ele.toString().replace(/<\w+>|<\/\w+>/gm,'').trim()
            let listArr = []
            checkData = strongArr
            console.error(checkData);
            edu.forEach( el => {
                var listObj={
                    degree:'',

                    year:'',
                    university:'',
                    marks:''
                }
                listArr.push(breakStrong(el,listObj))
            })
            console.error(listArr);
            arr[i] = listArr //end of strong
        }else{
            let listArr = []
            var listObj={
                degree:'',
                year:'',
                university:'',
                marks:''
            }
            ele = ele.toString().replace(/<\w+>|<\/\w+>/gm,'').replace(/(,,+)/g,',').trim()
            console.error("!!!!!!!!!!!!!!!!!!!!!!!!!ele is",ele)
            listArr.push(breakStrong(ele, listObj))
            arr[i] = listArr
        }
    })

    function dommer( d, st ){
        let dom = parser.parseFromString(d);
        let ul = dom.getElementsByTagName(st);
        let list = []
        return Array.prototype.slice.call(ul);

    }

    function breakStrong(ele,obj){
      console.error(ele);
        // let dateReg = /((\s*(19[5-9]\d|20[0-4]\d|2050))|(Jan|Apr|May|June|July|Aug|Sep|Oct|Nov|Dec)\s\d{2})/gi
        let dateReg = /(\s*([^\w]|^)(19[5-9]\d|20[0-4]\d|2050))/gi
        let degreeReg = /\s*(Bachelors of Science|MBA|Masters of Business Administration|Bachelor of Commerce|B\.S|HSC|SSC|PGDMPGDCA|M.Tech|B.Tech|B\.Tech|Biotechnology|Diploma|BA|Doctorate |Bachelors of (|commerce)|B(|\W)Tech(|\W)|M(|\W)Tech(|\W)|XII|X|12th|10th)\s*/g
        let universityReg = /(university|Institute|P.S.E.B|college|Vidhalaya|school)/gim
        let marksReg = /((\s*(\d{2}|\d{2}[\.](\d{1,2}))[\%])|(\s*\d{1}\.\d{1,2}\b)|\b(\d{1}|\d{2})\s*(cgpa|grades)\b|((cgpa(\s*:|\s*)|grades(\s*:|\s*)|percentage(\s*:|\s*))\s*((\d{1}.\d{1,2})|(\d{2}[\.](\d{1,2})|\d{2}))))/g
        //console.log( " ❌" , ele)
        ele = ele.replace(/\s\s+/gm,' ').split(',').filter( el => el.length > 1 ).map( el => el.replace(/\.$|<\w+>|<\/\w+>/g,'').replace(/\t/g,' '))
        console.error( " ❌" , ele)
        // obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        // let f = ele.map( el => dateReg.test(el) ? //console.log( " 👳‍♀", el.match(dateReg), ' ::' ,el) : undefined)
        // //console.log( " 🤼‍♀", f)
        obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())

          // ele.filter( el => replace())
        obj.university = ele.filter( el => el.match(universityReg) != null ? true : false).map(ele=> ele.replace(dateReg,''))
        obj.degree = ele.map( el => degreeReg.test( el ) ? el.match( degreeReg ) : undefined).filter(el => el != undefined).map( el => el.toString().trim() )
        obj.marks = ele.map( el => marksReg.test(el) ? el.match(marksReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        //console.log( " 🔧", obj)
        if(obj.year.length==0  &&obj.university.length==0  &&obj.marks.length==0 && obj.degree.length==0 ){
          return;
        }

        return obj
    }
    function listData(data){
        var inputList2 = dommer( data, 'ul' )
        let list = []
        //console.log(inputList2[0].innerHTML)
        if ( inputList2.length === 1){
            dom = parser.parseFromString( inputList2[0].innerHTML )
            ul = dom.getElementsByTagName('li')
            let liList = Array.prototype.slice.call(ul)
            liList.forEach(ShowResults3);
        }else{
            inputList2.forEach(ShowResults3);

        }
        function ShowResults3(value, index, ar) {
            let listObj = {
                degree:'',
                year:'',
                university:'',
                marks:''
            }
            //console.log( ' 💯', value.innerHTML)
            list.push(breakStrong(value.innerHTML, listObj))
        }
        return list
    }
    // //console.log( ' 💯', arr[0] )
    return arr[0]
}

function experience(exp){
  console.log("In experience function",exp)
  if(exp !=null && exp != undefined)
  {
    var str=exp.splice(1,exp.length-2).join('\n')
    str=str.replace(/<table>|<\/table>|<td>|<\/td>|<tr>|<\/tr>|<th>|<\/th>|<thead>|<\/thead>|<tbody>|<\/tbody>|<(strong|h[1-6]|p)>\n*\s*(\.)?<\/(strong|h[1-6]|p)>/gmi,"")
    str=str.replace(/(<\/strong>|<\/h[1-6])\n*\s*(.*)?\n*\s*<\/p>\n*\s*<p>\n*\s*(<strong>|<h[1-6]>)/gmi,"")
    // for(i=0;i<myKeys.length;i++){
    //     var reg=new RegExp(myKeys[i],'gmi')
    //     str=str.replace(/${reg}/gm,'')
    //     if(i === myKeys.length){
    //         return str
    //     }
    // }
    console.log("In experience function AAAAAAAAA",str)
var keys3 = /(^(\s*<h[1|2|3]>|\s*<strong>)\n*(.*)([^(Roles (&amp;|and|)|key|)Responsibilities|^Key Responsibilities Handling|^(Primary|Secondary|Job) Responsibilities(\-|:)?|^Key Accomplishments(:)?|^Company’s Profile|^Page 1 of 3]).*(\n*\s*(<\/h[1|2|3]>|<\/strong>))\n*(((<[a-z]>)\n*\s*((([A-Za-z]+\s*\d{4}\s*[\-|\W ]?\s*[A-Za-z]+\s*(\d{4})?)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?\s*)+)(\\(.*\\))?)\n*\s*(<\/[a-z]+>))?|(^\s*(<[a-z]+><\/[a-z]+>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^\s*(<em><\/em>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^(\s*<p>)\n*\s*[a-z]+\s([a-z\s*\-\–]+?\d{4}[a-z\s*\-\–]+?)+)(\n*\s*<\/p>))/gmi

var matches4 = str.match(keys3)
// console.log(matches4)
  if(matches4 == null){
    var obj={
        title:null,
          startDate:null,
          endDate:null,
          description:null,
          role:null
    }


    var keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
    var c=str.match(keys1)
    if(c!=null&& c!=undefined){
    var exparr1;
           var exparr=c.map((ele)=>ele.replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|\t|\:|\n|\s\s+/gmi,'').trim())

           exparr = exparr.filter(function(x){
            return (x !== (undefined || null || ''));
          });

           obj.role=exparr
           exparr1=Object.assign({},obj);

    }
          return exparr1
         }else{

var b=[];
var a=[];
if(matches4.length > 1){

    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/gm, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)'))
   for(let i=0;i<regarr.length - 1;i++){
        var j=i;
        var matches6 = regarr[j].trim('\n')
        var matches5 = regarr[++j]

        let regex = `(${ matches6 })\\n?(.*\\n)+\n?(\\s*${ matches5 })`
        keys1 = new RegExp(regex,'gm')



        if(str.match(keys1))
      {
        var h_i=str.match(keys1);
        h_j=h_i.join('\n').split('\n');
        // //console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",h_j);
        if(h_j.length>5)
        {
            b.push(h_i);
            // //console.log("h_i",h_i);
        }

      }
    }
    // //console.log(matches5);
    b.push(str.match(new RegExp(`${ matches5 }\\n?(.*\\n)+`,'gm')))
}else{
    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*'))
    //console.log(regarr)
    b.push(str.match(new RegExp(`${ regarr }\\n?(.*\\n)+`,'gm')))
}

var b = b.filter((x)=>{
  if(x!=null)return x;
});

// console.log("hello b WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",b)
if(b!=null && b!= undefined){
let c = b.map(element=> element.join('\n').split('\n'))
var final_experience=[];
var obj={
    title:"",
      startDate:"",
      endDate:"",
      description:"",
      role:""
}
for(let j=0;j<b.length;j++){
    obj.title=null;
    obj.startDate=null;
    obj.endDate=null;
    obj.description=null;
    obj.role=null;
let experience=b[j].toString().split('\n')
experience.pop()
experience.pop()
experience=experience.join('\n')
//console.log("EEEEEEEEEEEEEEEEEEEE",experience)
//    experience=experience.splice(0,experience.length-2)
   let exptitle=experience.split('\n').splice(0,3)
   if(exptitle != null && exptitle != undefined){
   exptitle=exptitle.toString().replace(/<[a-z\d]+>|<\/[a-z\d]+>|<[a-z\d]+\/>|&amp;|\t|\:|\,|(([A-Za-z]+\s*\d{4}[ \-|\–]?)|\d{2}\/\d{4})|Present|\–|\n|(\(.*\))|(([A-Za-z]+\s*\d{4}\s*[\-|\s*|]\s*)+\s*|\s\s+)|Page 1 of 3/gmi,'').trim()
   obj.title=exptitle
   }
   //    experience=experience.splice(0,experience.length-2)
// //console.log("!!!!!",duration);
console.log("EEEEEEEEEEEEEEEEEEEE",experience)
let expdur=experience.split('\n').splice(0,5)
let duration = expdur.toString().match(/((([A-Za-z]+(\.|)\s*\d{4}\s*(\-|\s*|\b.*\b)\s*([A-Za-z]+(\.|)\s*\d{4}|present))|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\)|)|([A-Za-z]+(\.|)\s*\d{4}))/gmi)
if(duration != null && duration != undefined){
   if((/.*(\-|\–|\b(to)\b)/img).test(duration.toString())){
   regexDuStart=duration.toString().match(/.*(\-|\–|\b(to)\b)/img)

   regexDuend=duration.toString().match(/(\-|\–|\b(to)\b).*/img)

   obj.startDate=regexDuStart.toString().replace(/(\-|\–|\b(to)\b)/gmi,'');
    obj.endDate=regexDuend.toString().replace(/(\-|\–|\b(to)\b)/gmi,'');
  }else{
      obj.endDate=duration;
  }
}
   let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>))/gm
   let keys2=/^(\s*<p>)\n*.*(\n*\s*<\/p>)?/gm
//    //console.log("eeeeeeeeeeeeeeeeeeeeeeeeee",experience)
   if(keys1.test(experience)){
    let role=experience.match(keys1)
    if(role!=null && role!= undefined){
        //console.log("LLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL",role)
        regex=new RegExp(exptitle,'i');
        regex1=new RegExp(duration,'i');

    role=role.map(ele => {
        ele=ele.toString().replace(/<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|\|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n|<(.*)>|\●|\•|►|\s\s+/gmi,'').trim(',')
     return ele
   });
   role=role.map((element)=>{
          return element.trim()
      })
    }
     role = role.filter(function(x){
        return (x !== (undefined || null ||' '|| ''));
      });
   obj.role=role
   }

   if(keys2.test(experience)){
    let description=experience.match(keys2)
    if(description!=null && description!= undefined){
        //console.log("QQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQQ",description)
        regex=new RegExp(exptitle,'gi');
        regex1=new RegExp(duration,'gi');
      description=description.map((ele)=>ele.replace(/((([A-Za-z]+(\.|)\s*\d{4}\s*(\-|\s*|\b.*\b)\s*([A-Za-z]+(\.|)\s*\d{4}|present))|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\)|)|([A-Za-z]+(\.|)\s*\d{4}))|<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n|\(|\)|\\(.*\\)|job responsibilitie(s|)|key accomplishment|Responsibilitie(s|)|<(.*)>|\s\s+|\●|\•|►|\s*\n*\/gmi,'').trim().trim(','))

    }
     description = description.filter(function(x){
        return (x !== (undefined || null || ''));
      });
   obj.description=description
   }



   final_experience[j]=Object.assign({},obj);


}
return final_experience;
}
}

}


}

}
