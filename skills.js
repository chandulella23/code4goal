module.exports.skill1=function(data,strongArr,h1Arr,update_arr)
{
    var execu=require("./execution.js")
    var block_array=[];
    //console.log(data);
    let keyUpgrade = `Summary of Qualification(|s)|PROFESSIONAL TRAINING(|&amp;) PROJECTS|Qualitative Skill(|s)|Additional Skill(|s)|Campus Activitie(|s)|ACADEMIC CREDENTIAL(|S)|career summary|key project(|s)|Technical Skill(|s)|ACADEMIC QUALIFICATION(|S)|Professional Summary|PROFESSIONAL TRAINING & PROJECTS|Summary|Professional Objective|Employment Objective|Car(e|r)er Objective|Objective|Career Goal|Five Year Plan|Interests (|and) (|Hobbies)|Employment History|PROFESSIONAL DOSSIER|Work History|Work Experience|(Professional Experience(|s))|Professional Background|Preference(|s)|Additional Experience|Career Related Experience|Related Experience|Industry Experience|Accounting Experience|Freelance Experience|Freelance|Army Experience|Military Experience|Strength(|s)|Military Background|Experience|Academic Background|Academic Experience|Program(|s)|Related Course(|s)|Course(|s)|Education and Training|Education|Educational Background|Educational Qualification(|s)|Educational Training|Academic Training|Professional Training|Training|Course Project Experience|Related Course Project(|s)|Internship Experience|Internship(|s)|Apprenticeship(|s)|College Activitie(|s)|Certification(|s)|Special Training|Training|Activities and Honor(|s)|Affiliation(|s)|Professional Affiliation(|s)|Professional Association(|s)|Association(|s)|Professional Membership(|s)|Membership(|s)|Athletic Involvement|Community Involvement|Civic Activitie(|s)|Extra-Curricular Activitie(|s)|POSITIONS OF RESPONSIBILITY|Reporting|EXTRA CURRICULAR (|ACHIEVEMENT(|s)|Activities)|Extra\\-?curricular|Professional Activitie(|s)|Volunteer Work|Volunteer Experience|Publication(|s)|Presentation(|s)|Convention(|s)|Credential(|s)|Skills (|&|and) Expertise|Qualification(|s)|Areas of Experience|Areas of Expertise|Areas of Knowledge|Career Related Skill(|s)|Professional Skill(|s)|Specialized Skill(|s)|Computer Skill(|s)|Computer Knowledge|Software|Technologie(|s)|Technical Experience|Proficiencie(|s)|Language Competencies and Skill(|s)|Programming Language(|s)|Relevant Skills|Technology Skill(|s)|Skill(|s)|Academic Honor(|s)|Academic(|s)|Honor(|s)|Professional Development|Internship and Research Projects|Accolade(|s)|Endorsement(|s)|Achievement(|s)|Award(|s)|Distinction(|s)|Fellowship(|s)|Scholarship(|s)|Hobbie(|s)|Personal Interest(|s)|Strength(|s)|Interest(|s)|Miscellaneou(|s)|personal project(|s)|Procedures|group project(|s)|other project(|s)|project(|s)|(Language(|s)[ ]Proficiency)|Language(|s)|personal detail(|s)|Accomplishment(|s)|personal information|SAP HCM SKILLS|OTHER EDUCATIONAL QUALIFICATION DETAILS|Declaration|Awards|Honors and Awards`

    // console.log("Data is ********",data);
    // console.log("My strong arr is *******",strongArr);
    // console.log("My h1 array would be ******",h1Arr);
    // console.log("My upated array would be",update_arr);
    var blocks=[];
    var myKeys=[]
    var addSkill=[],addCareer=[],addProject=[],addExp=[],addEdu=[],addLang=[],addSkillextra=[];

    let finalKeys = new RegExp(`(([^\\w*]<strong>|[^\\w*]<p>|[^\\w*]<h[1|3|2]\>)(\\n*|\\s*|\\t*)(${ keyUpgrade })((\\W){1,4})*(\\n*|\\s*\\t*)(<\/strong>|<\/p>|<\/h[1|2|3]>)(\\n*))`, 'gim')
    var myKeys=data.match(finalKeys);
    //console.log("my cv keywords array would be ***",myKeys);

    myKeys = myKeys.map(element => element.trim().replace(/\s+|\n+/g, '\\n*\\s*'))
    console.log("my updated cv keys are : ",myKeys);

    for(let i=0;i<myKeys.length;i++){
      let j=i;
      blocks.length=0;
      let match1,match2,block_regex;
      match1=myKeys[j];
      match2=myKeys[++j];
      if(j==myKeys.length)
      {
        blocks=data.match(new RegExp(`${ match1 }\\n?(.*\\n)+`,'gm'));
        //console.log("&&&&&&&&&&&&&&& in if",blocks);
        block_array=block_array.concat(blocks);
      }
      else{
        block_regex = `(${ match1 })\\n?(.*\\n)+(\\s*${ match2 })`
        let keys1 = new RegExp(block_regex, 'g')
        if(keys1.test(data))
        {
          blocks=data.match(keys1);
          //console.log("&&&&&&&&&&&&&&& in else",blocks);
          block_array=block_array.concat(blocks);
        }
      }
    }
    //console.log(block_array);
    let proFlag=false,skillFlag=false,extraskillFlag=false,careerFlag=false,expFlag=false,eduFlag=false,langFlag=false;
    for(let i=0;i<block_array.length;i++)
    {
      let skillFuc=[],careerFuc=[],projectFuc=[],eduFuc=[],expFuc=[],langFuc=[],extraskillFuc=[];

      let innerArray=block_array[i].split('\n');

      if(skillFuc==null || skillFuc==undefined || skillFuc.length==0)
      {
        let skillreg=['technical skills','technology skills'];
        skillFuc=search(skillreg,innerArray);
        if(skillFuc.length>0)
        {
          skillFlag=true;
        }
        addSkill=addSkill.concat(skillFuc);
      }

      if(extraskillFuc==null || extraskillFuc==undefined || extraskillFuc.length==0)
      {
        let extraskillreg=['qualitative skills','additional skills','areas of expertise','strength'];
        extraskillFuc=search(extraskillreg,innerArray);
        if(extraskillFuc.length>0)
        {
          extraskillFlag=true;
        }
        addSkillextra=addSkillextra.concat(extraskillFuc);
      }

      if(careerFuc==null || careerFuc==undefined || careerFuc.length==0)
      {
        let careerreg=['objective','career','summary'];
        careerFuc=search(careerreg,innerArray);
        if(careerFuc.length>0)
        {
          careerFlag=true;
        }
        addCareer=addCareer.concat(careerFuc);
      }

      if((projectFuc==null || projectFuc==undefined || projectFuc.length==0) && proFlag==false)
      {
        let projectreg=['project','training'];
        projectFuc=search(projectreg,innerArray);
        if(projectFuc.length>0)
        {
          proFlag=true;
        }
        addProject=addProject.concat(projectFuc);
      }

      if(expFuc==null || expFuc==undefined || expFuc.length==0)
      {
        let expreg=['experience'];
        expFuc=search(expreg,innerArray);
        if(expFuc.length>0)
        {
          expFlag=true;
        }
        addExp=addExp.concat(expFuc);
      }

      if(eduFuc==null || eduFuc==undefined || eduFuc.length==0)
      {
        let edureg=['academic','education']
        eduFuc=search(edureg,innerArray);
        if(eduFuc.length>0)
        {
          eduFlag=true;
        }
        addEdu=addEdu.concat(eduFuc);
      }

      if(langFuc==null || langFuc==undefined || langFuc.length==0)
      {

        let langreg=['language']
        langFuc=search(langreg,innerArray);
        if(langFuc.length>0)
        {
          langFlag=true;
        }
        addLang=addLang.concat(langFuc);
      }
    }
     // console.log(addSkill);
     // console.log(addCareer);
     //console.log(addProject);
      console.log(addExp);
     // console.log(addEdu);
     // console.log(addLang);
     // console.log(addSkillextra);

function search(arrayArg,targetArr)
{
  var answer=[];
    var length=arrayArg.length;
    //console.log("length of array",length)
    for(let i=0;i<length;i++)
    {
      //console.log("####",targetArr[0]);
      if((targetArr[0]).toLowerCase().includes(arrayArg[i])){
        //console.log("hello1")
         answer=answer.concat(targetArr);
         break;
       }
       else if((targetArr[1]).toLowerCase().includes(arrayArg[i])){
         //console.log("hello")
         answer=answer.concat(targetArr);
         break;
       }
    }
    //console.log('returned answer',answer);
    return answer;
}
  execu.execu(addSkill,addSkillextra,addCareer,addLang,addProject,addExp,addEdu);


  }
