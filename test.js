function experience(exp){
  console.log("In experience function",exp)
  if(exp !=null && exp != undefined)
  {

    var str=exp.splice(1,exp.length-2).join('\n')
    console.log(str)

var keys3 = /(^(\s*<h[1|2|3]>|\s*<strong>)\n*(.+)([^(Roles (&amp;|and|)|key|)Responsibilities|^Key Responsibilities Handling|^(Primary|Secondary) Responsibilities(\-|:)?|^Key Accomplishments(:)?|]).*(\n*\s*(<\/h[1|2|3]>|<\/strong>))\n*(((<[a-z]>)\n*\s*((([A-Za-z]+\s*\d{4}\s*[\-|\W ]?\s*[A-Za-z]+\s*(\d{4})?)+\s*)|(\d{2}\s*[\/]\s*\d{4}\s*[\-]?\s*)+)(\\(.*\\))?)\n*\s*(<\/[a-z]+>))?|(^\s*(<[a-z]+><\/[a-z]+>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^\s*(<em><\/em>)(\s*<h[1|2|3]>|\s*<strong>)\n*.*(\n*\s*(<\/h[1|2|3]>|<\/strong>)))|(^(\s*<p>)\n*\s*[a-z]+\s([a-z\s*\-\–]+?\d+[a-z\s*\-\–]+?)+)(\n*\s*<\/p>))/gmi

var matches4 = str.match(keys3)
console.log("hhhhhhHHHHHHHHHHHHHHHHHHHHH",matches4)
 //var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/g, '\\n*\\s*'))
// console.log(matches4)
//   console.log(regarr)
  if(matches4 == null){
    let obj={
        title:"null",
        duration:"null",
        description:""
    }


    // var str=matches4.toString()

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
console.log("]]]]]",matches4);
    var regarr = matches4.map(element => element.trim().replace(/\s+|\n+|\t/gm, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)'))
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
            b.push(h_i);
            console.log("h_i",h_i);
        }

          var str_1=h_i.join('\n').trim();
          console.log(matches5);
             console.log("111111111111111",str_1);
          str_1=str_1.replace(/`^\s*${matches5}`/gm,'');

          console.log("00000000000000000000000000",str_1);
          str_1=str_1.replace(/\s+|\n+|\t/g, '\\n*\\s*').replace(/\(/gm,'\\(').replace(/\)/gm,'\\)')
           k_re1 = new RegExp(str_1,'gm');
          str=str.replace(/`${k_re1}`/gm,'');
          console.log("after replace",str);

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

console.log("!!!!!",duration);
//    if(duration != null && duration != undefined && duration.length > 2){
//
//     duration=duration.splice(2,duration.length).replace(/\n/g,'');
//    console.log("!!!!!!",duration);
// }

   if((/.*(\-|\–)/img).test(duration.toString())){
   regexDuStart=duration.toString().match(/.*(\-|\–)/img)
    // console.log("kk",regexDuStart);
   regexDuend=duration.toString().match(/(\-|\–).*/img)
   // console.log('nnkk',regexDuend);
   obj.startDate=regexDuStart.toString().replace(/(\-|\–)/gmi,'');;
    obj.endDate=regexDuend.toString().replace(/(\-|\–)/gmi,'');;
  }else{
      obj.endDate=duration;
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
   final_experience[j]=Object.assign({},obj);
   // console.log("###########################",final_experience[j]);

}
words.obj.professional_experience=final_experience;
}
}
           // console.log(final_experience);
  // words.obj.professional_experience=final_experience;
}
  //console.log(final_experience);

}
