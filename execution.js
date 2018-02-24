module.exports.execu=function(addSkill,addSkillextra,addCareer,addLang,addProject,addExp,addEdu){
  var words=require("./words.js")
  const tableData = require('./tables').table
  const DomParser = require('dom-parser');
  const parser = new DomParser();

  let skillExecu=activities(addSkill)
  console.log("my skill execu returned array is :",skillExecu);
  if(skillExecu!=undefined){
      words.obj.technicalSkills=skillExecu;
  }

  let extraskillExecu=activities(addSkillextra)
  console.log("my extra skill execu returned array is :",extraskillExecu);
  if(extraskillExecu!=undefined){
      words.obj.skills=extraskillExecu;
  }

  let careerExecu=activities(addCareer)
  console.log("my career execu returned array is :",careerExecu);
  if(careerExecu!=undefined){
      words.obj.careerObjective=careerExecu.toString();
  }

  let langExecu=activities(addLang)
  console.log("my lang execu returned array is :",langExecu);
  if(langExecu!=undefined){
      words.obj.languages=langExecu
  }

  let projectExecu=proexp(addProject)
  console.log("my project execu returned array is :",projectExecu);
  if(projectExecu!=undefined){
      words.obj.project=projectExecu
  }

  let expExecu=experience(addExp)
  console.log("my experience execu returned array is :",expExecu);
  if(expExecu!=undefined){
      words.obj.professionalExperience=expExecu
  }

  let eduExecu=education(addEdu)
  console.log("my education execu returned array is :",eduExecu);
  if(eduExecu!=undefined){
      words.obj.academicQualifications=eduExecu
  }

    function activities(myArr)
    {

      if(myArr==null || myArr == undefined || myArr.length==0){
        console.log("Not present");
        return;
      }
      else{
        var str=myArr.splice(1,myArr.length-2);
        str=str.join('\n');
        var rege = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
        var matchContent=str.match(rege);
        //console.log("Matching content in li's and p's are : ",matchContent);
        if(matchContent==null || matchContent==undefined || matchContent.length==0){
          return;
        }
        else{
          var returnArr=matchContent.toString().replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|Languages|Tools|\t|\:|\n/gmi,'').trim().split(',')
          //console.log("return array would be:",returnArr)
          if(returnArr!=null && returnArr!=undefined){
            for(let i=0;i<returnArr.length;i++)
            {
              returnArr[i]=returnArr[i].trim();
            }
          }
        }
        return returnArr;
      }
    }


  function proexp(myArr)
  {
    if(myArr==null || myArr == undefined || myArr.length==0){
      console.log("Not present");
      return;
    }
    else{
      var blockArray=[];
      var str=myArr.splice(1,myArr.length-2);
      str=str.join('\n');
      var rege = /(^(\s*<h[1|2|3]>|\s*<strong>)\n*(.+)([^(Roles (&amp;|and|)|key|)Responsibilities|^Key Responsibilities Handling|^(Primary|Secondary) Responsibilities(\-|:)?|^Key Accomplishments(:)?|]).*(\n*\s*(<\/h[1|2|3]>|<\/strong>))\n*(((<[a-z]>)\n*\s*((([A-Za-z]+\s*\d{4}\s*[\-|\W ]?\s*[A-Za-z]+\s*(\d{4})?)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?\s*)+)(\\(.*\\))?)\n*\s*(<\/[a-z]+>))?|(^\s*(<[a-z]+><\/[a-z]+>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^\s*(<em><\/em>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^(\s*<p>)\n*\s*([a-z\s*\-\–]+?\d+[a-z\s*\-\–]+?)+)(\n*\s*<\/p>))/gmi

      var subtitles = str.match(rege)
      console.log("match 4",subtitles)

//if we didn't find any heading as titles then the contentwould be in list......So for list
      if(subtitles==null){
        let obj={
            title:null,
            startDate:null,
            endDate:null,
            description:null
        }
        let innerReg = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
        let list=str.match(innerReg);
        let listArr=list.toString().replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|\t|\:|\n/gmi,'').trim().split(',');

        if(listArr!=null && listArr!=undefined){
          for(let i=0;i<listArr.length;i++){
            listArr[i]=listArr[i].trim();
          }
            obj.description=listArr;
        }
        let listArr1=Object.assign({},obj);
        return listArr1;
      }// End of if for list experience and projects
      else if(subtitles.length==1){

        var subtitleRege = subtitles.toString().replace(/\s+|\n+|\t/g, '\\n*\\s*').trim();
        console.log(subtitleRege)
        let duplicateArr=str.match(new RegExp(`${ subtitleRege }\\n?(.*\\n)+`,'gm'))
        blockArray.push(duplicateArr);
      }//end of 1 subtitle
      else{

        console.log("]]]]]",subtitles);
            var regarr = subtitles.map(element => element.trim().replace(/\s+|\n+|\t/gm, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)'))
            // console.log(matches4)
              console.log(regarr)

            for(let i=0;i<regarr.length - 1;i++){
                var j=i;
                var matches6 = regarr[j].trim('\n')
                var matches5 = regarr[++j]

                let regex = `(${ matches6 })\\n?(.*\\n)+\n?(\\s*${ matches5 })`
                keys1 = new RegExp(regex,'gm')
               console.log("$$$$$$$$$$$$$$$$$$$$",keys1)
                // var keys1 = `/(${ matches2 })\\n?(.*\\n)+(${ matches3 })/g`

                if(str.match(keys1))
              {
                var h_i=str.match(keys1);
                h_j=h_i.join('\n').split('\n');
                console.log("h_j",h_j);
                if(h_j.length>5)
                {
                    blockArray.push(h_i);
                    console.log("h_i",h_i);
                }

                  var str_1=h_i.join('\n').trim();
                  console.log(matches5);
                  //    console.log("111111111111111",str_1);
                  // str_1=str_1.replace(/`^\s*${matches5}`/gm,'');
                  //
                  // console.log("00000000000000000000000000",str_1);
                  // // str_1=str_1.replace(/\s+|\n+|\t/g, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)')
                  // //  k_re1 = new RegExp(str_1,'gm');
                  // // str=str.replace(/`${k_re1}`/gm,'');
                  // console.log("after replace",str);

              }
            }
            console.log(matches5);
            blockArray.push(str.match(new RegExp(`${ matches5 }\\n?(.*\\n)+`,'gm')))
      }

        var blockArray = blockArray.filter((x)=>{
          if(x!=null)return x;});

        if(blockArray!=null && blockArray!= undefined){
          var returnArray=[];
          var obj={
              title:null,
              startDate:null,
              endDate:null,
              description:null
          }
          console.log("KKKKKKK",blockArray);
          for(let j=0;j<blockArray.length;j++){
          let experience=blockArray[j].join('\n')
          // console.log(experience)
             let exptitle=experience.split('\n').splice(0,3)
             exptitle=exptitle.toString().replace(/<[a-z\d]+>|<\/[a-z\d]+>|<[a-z\d]+\/>|&amp;|\t|\:|\,|(([A-Za-z]+\s*\d{4}[ \-|\–]?)|\d{2}\/\d{4})|Present|\–|\n/gmi,'').trim()
             obj.title=exptitle
             let duration = experience.toString().match(/((([A-Za-z]+\s*\d{4}\s*[\-|\s*|]\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?/gmi)

             console.log("!!!!!",duration);
          //    if(duration != null && duration != undefined && duration.length > 2){
          //
          //     duration=duration.splice(2,duration.length).replace(/\n/g,'');
          //    console.log("!!!!!!",duration);
          // }
          if(duration!=null && duration!=undefined){
             if((/.*(\-|\–)/img).test(duration.toString())){
             regexDuStart=duration.toString().match(/.*(\-|\–)/img)
              // console.log("kk",regexDuStart);
             regexDuend=duration.toString().match(/(\-|\–).*/img)
             // console.log('nnkk',regexDuend);
             obj.startDate=regexDuStart[0].toString().replace(/(\-|\–)/gmi,'');;
              obj.endDate=regexDuend[0].toString().replace(/(\-|\–)/gmi,'');;
            }else{
                obj.endDate=duration;
            }
          }
             let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
             let description=experience.match(keys1)
             if(description!=null && description!= undefined){
               regex=new RegExp(exptitle,'i');
               regex1=new RegExp(duration,'i');
             description=description.toString().replace(/<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n/gmi,'').replace(/`${regex}`/i,'').replace(/`${regex1}`/i,'').trim().split(',')
           description=description.filter(word => {
            if(word!='')
              return word;

          });
          description=description.map((element)=>{
                 return element.trim()
             })
           }
             obj.description=description
          //    console.log(description.toString().)
             // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$",obj)
             returnArray[j]=Object.assign({},obj);
             // console.log("###########################",final_experience[j]);

          }
          return returnArray;
          }



    }//End of starting else

  }

  function education(edu){
    edu=[edu.toString()]
    let arr = {}
    edu.forEach( (ele,i) => {
        ele = ele.replace( /<\/body>|\s*(Page \d{2}\s*)/gim,'' )
        if ( parser.parseFromString(ele).getElementsByTagName('table') && ele.includes('<table>','</table>') ){
            arr[i] = tableData(ele)
        }else if( parser.parseFromString(ele).getElementsByTagName('ul').length >= 1 ){
            console.log(" 🤷‍♀asnkcnsalkn" )
            arr[i] = listData(ele)
        }else if( parser.parseFromString(ele).getElementsByTagName('strong').length >= 1 ){
            console.log( edu )
            strongList = dommer( ele, 'strong' )
            let strongArr = []
            strongList.forEach( (value, index, ar) => {
                strongArr.push(value.innerHTML)
            } )
            let finalStrong = []
            let flag = false;
            console.log( " 😋", strongArr )
            strongArr.forEach( (el,i) => {
                // console.log( ' 🇿🇼 ', el, new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm'));

                if( strongArr[i+1] === null || strongArr[i+1] === undefined ) return ;
                if (ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')) != null){
                    flag = true;
                    finalStrong.push( ele.match(new RegExp(`\\n*\\s*(${ el })(.*)\\n*\\s*(${ strongArr[i+1] })`,'gm')).join().replace( strongArr[i+1], '').replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
                }
            } )
            if (ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')) != null){
                finalStrong.push( ele.match(new RegExp(`(${ strongArr[(strongArr.length) - 1] })\\n*\\s*(.*)`,'gm')).join().replace(/<\w+>|<\/\w+>/g,'').replace(/(,,+)/g,','))
            }
            // ele = ele.toString().replace(/<\w+>|<\/\w+>/gm,'').trim()
            let listArr = []
            checkData = finalStrong || strongArr
            checkData.forEach( el => {
                var listObj={
                    degree:'',
                    year:'',
                    university:'',
                    marks:''
                }
                listArr.push(breakStrong(el,listObj))
            })
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
        // let dateReg = /((\s*(19[5-9]\d|20[0-4]\d|2050))|(Jan|Apr|May|June|July|Aug|Sep|Oct|Nov|Dec)\s\d{2})/gi
        let dateReg = /(\s*([^\w]|^)(19[5-9]\d|20[0-4]\d|2050))/gi
        let degreeReg = /\s*(Bachelors of Science|MBA|B\.S|PGDCA|B\.Tech|Biotechnology|Diploma|BA|Bachelors of (|commerce)|B(|\W)Tech(|\W)|M(|\W)Tech(|\W)|XII|X|12th|10th)\s/gi
        let universityReg = /(university|Institute|P.S.E.B|college|Vidhalaya|school)/gim
        let marksReg = /((\s*(\d{2}|\d{2}[\.](\d{1,2}))[\%])|(\s*\d{1}\.\d{1,2}\b)|\b(\d{1}|\d{2})\s*(cgpa|grades)\b|((cgpa(\s*:|\s*)|grades(\s*:|\s*)|percentage(\s*:|\s*))\s*((\d{1}.\d{1,2})|(\d{2}[\.](\d{1,2})|\d{2}))))/g
        console.log( " ❌" , ele)
        ele = ele.replace(/\s\s+/gm,' ').split(',').filter( el => el.length > 1 ).map( el => el.replace(/\.$|<\w+>|<\/\w+>/g,'').replace(/\t/g,' '))
        console.log( " ❌" , ele)
        // obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        let f = ele.map( el => dateReg.test(el) ? console.log( " 👳‍♀", el.match(dateReg), ' ::' ,el) : undefined)
        console.log( " 🤼‍♀", f)
        obj.year = ele.map( el => dateReg.test(el) ? el.match(dateReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        // ele.filter( el => replace())
        obj.university = ele.filter( el => el.match(universityReg) != null ? true : false)
        obj.degree = ele.map( el => degreeReg.test( el ) ? el.match(degreeReg) : undefined).filter(el => el != undefined).map( el => el.toString().trim() )
        obj.marks = ele.map( el => marksReg.test(el) ? el.match(marksReg) : undefined).filter( el => el != undefined ).map( el => el.toString().trim())
        console.log( " 🔧", obj)
        if(obj.year.length==0  &&obj.university.length==0  &&obj.marks.length==0 && obj.degree.length==0 ){
          return;
        }
        return obj
    }
    function listData(data){
        var inputList2 = dommer( data, 'ul' )
        let list = []
        console.log(inputList2[0].innerHTML)
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
            console.log( ' 💯', value.innerHTML)
            list.push(breakStrong(value.innerHTML, listObj))
        }
        return list
    }
    // console.log( ' 💯', arr[0] )
    return arr[0]
}


function experience(exp){
  console.log("In experience function",exp)
  if(exp !=null && exp != undefined)
  {

    var str=exp.splice(1,exp.length-2).join('\n')


var keys3 = /(^(\s*<h[1|2|3]>|\s*<strong>)\n*(.+)([^(Roles (&amp;|and|)|key|)Responsibilities|^Key Responsibilities Handling|^(Primary|Secondary) Responsibilities(\-|:)?|^Key Accomplishments(:)?|]).*(\n*\s*(<\/h[1|2|3]>|<\/strong>))\n*(((<[a-z]>)\n*\s*((([A-Za-z]+\s*\d{4}\s*[\-|\W ]?\s*[A-Za-z]+\s*(\d{4})?)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?\s*)+)(\\(.*\\))?)\n*\s*(<\/[a-z]+>))?|(^\s*(<[a-z]+><\/[a-z]+>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^\s*(<em><\/em>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^(\s*<p>)\n*\s*[a-z]+\s([a-z\s*\-\–]+?\d+[a-z\s*\-\–]+?)+)(\n*\s*<\/p>))/gmi

var matches4 = str.match(keys3)


  if(matches4 == null){
    let obj={
        title:"null",
        duration:"null",
        description:""
    }




    var keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
    var c=str.match(keys1)
    var exparr1;
           var exparr=c.toString().replace(/<[a-z]+>|\|\•|<\/[a-z]+>|<[a-z]+\/>|\t|\:|\n/gmi,'').trim().split(',')

           console.log("experiences are:",exparr)
           obj.title="null";
           obj.duration="null";
           obj.description=exparr.toString();
           exparr1=Object.assign({},obj);
           words.obj.professional_experience=exparr1;
           }else{

var b=[];

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
        console.log("h_j",h_j);
        if(h_j.length>5)
        {
            b.push(h_i);
            console.log("h_i",h_i);
        }



      }
    }
    console.log(matches5);
    b.push(str.match(new RegExp(`${ matches5 }\\n?(.*\\n)+`,'gm')))
}else{
    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*'))
    console.log(regarr)
    b.push(str.match(new RegExp(`${ regarr }\\n?(.*\\n)+`,'gm')))
}

var b = b.filter((x)=>{
  if(x!=null)return x;});

console.log("hello b",b)
if(b!=null && b!= undefined){
let c = b.map(element=> element.join('\n').split('\n'))
var final_experience=[];
var obj={
    title:"",

      startDate:"",
      endDate:"",
    description:""
}
for(let j=0;j<b.length;j++){
let experience=b[j].join('\n')
// console.log(experience)
   let exptitle=experience.split('\n').splice(0,3)
   exptitle=exptitle.toString().replace(/<[a-z\d]+>|<\/[a-z\d]+>|<[a-z\d]+\/>|&amp;|\t|\:|\,|(([A-Za-z]+\s*\d{4}[ \-|\–]?)|\d{2}\/\d{4})|Present|\–|\n/gmi,'').trim()
   obj.title=exptitle
   let duration = experience.toString().match(/((([A-Za-z]+\s*\d{4}\s*[\-|\s*|]\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?/gmi)

// console.log("!!!!!",duration);

  if(duration != null|| duration != undefined){

   if((/.*(\-|\–)/img).test(duration.toString())){
   regexDuStart=duration.toString().match(/.*(\-|\–)/img)

   regexDuend=duration.toString().match(/(\-|\–).*/img)

   obj.startDate=regexDuStart.toString().replace(/(\-|\–)/gmi,'');;
    obj.endDate=regexDuend.toString().replace(/(\-|\–)/gmi,'');;
  }else{
      obj.endDate=duration;
  }
}

   let keys1 = /(^(\s*<li>)\n*.*(\n*\s*<\/li>)|^(\s*<p>)\n*.*(\n*\s*<\/p>))/gm
   let description=experience.match(keys1)
   if(description!=null && description!= undefined){
     regex=new RegExp(exptitle,'i');
     regex1=new RegExp(duration,'i');
   description=description.toString().replace(/<[a-z]+>|<\/[a-z]+>|<[a-z]+\/>|&amp;|\t|\–|\-|\:|((([A-Za-z]+\s*\d{4}\s*[\-| ]\s*[a-z]*\s*)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?[a-z]*\s*)+)(\(.*\))?|\n/gmi,'').replace(/`${regex}`/i,'').replace(/`${regex1}`/i,'').trim().split(',')
 description=description.filter(word => {
  if(word!='')
    return word;

});
description=description.map((element)=>{
       return element.trim()
   })
 }
   obj.description=description

   final_experience[j]=Object.assign({},obj);


}
return final_experience;
}
}

}


}






}
