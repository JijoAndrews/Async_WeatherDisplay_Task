     
    var cartitle=createsimpletag("h1","class","headertitle","Display Countries and Weather Report");
    var frowcontent=createsimpletag("div","class","row","");
    var fcontainer=createsimpletag("div","class","container","");
    var tempelements={};
    
    async function  datafromapi()//country data from rest country api
    {
        try{
        let res=await fetch("https://restcountries.com/v3.1/all");
        let resdata=await res.json();
        console.log(resdata);

            for(var i=0;i<resdata.length;i++)
            {
                let latlong=resdata[i].latlng;
                let name=resdata[i].name.common;
                let region=resdata[i].region;
                let capital=resdata[i].capital;
                let countrycode=resdata[i].cca3;
                let flag=resdata[i].flags.png?resdata[i].flags.png:"";

                console.log(name);
               let val=createonecard(name,capital,region,countrycode,latlong[0],latlong[1],flag);
               contentappend(val);
            }

        }catch(error)
        {
            console.log(error);
        }
    }


    async function  weatherdataapi(lat,lon,content)// using lat and long data to retrive weather data from openweather api.
    {
        try{

       
            let res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=8b6c9f0ccb484c787a419b38e095f2f4`);
            let resdata=await res.json();
            console.log(resdata,resdata.weather[0].main,resdata.main.temp);
            let tempdata={'temp':resdata.main.temp,'weather':resdata.weather[0].main};
            createdisplaybox(resdata.main.temp,resdata.weather[0].main,content,lat,lon);

        }catch(error)
        {
            console.log(error);
        }
    }
    

    function createsimpletag(tag,tagtype,tagval,content)
    {
    
     var tagelement = document.createElement(tag);
     tagelement.setAttribute(tagtype,tagval);
      if(content){
            tagelement.innerHTML=content;
        }
     return tagelement;
    }


    function createbuttontag(tag,tagtype,tagval,id,idval,content)
    {
     var tagelement = document.createElement(tag);
     tagelement.setAttribute(tagtype,tagval);
     tagelement.setAttribute(id,idval);

      if(content){
            tagelement.innerHTML=content;
        }
     return tagelement;
    }
    
    function createbtnwithevent(tag,tagtype,tagval,id,idval,buttyntype,buttnval,content)
    {
     var tagelement = document.createElement(tag);
     tagelement.setAttribute(tagtype,tagval);
     tagelement.setAttribute(buttyntype,buttnval);
     tagelement.setAttribute(id,idval);

      if(content){
            tagelement.innerHTML=content;
        }
     return tagelement;
    }

    function createbtnwithevent2(tag,tagtype,tagval,id,idval,buttyntype,buttnval,buttyntype1,buttnval1,buttyntype2,buttnval2,content)
    {
     var tagelement = document.createElement(tag);
     tagelement.setAttribute(tagtype,tagval);
     tagelement.setAttribute(id,idval);
     tagelement.setAttribute(buttyntype,buttnval);
     tagelement.setAttribute(buttyntype1,buttnval1);
     tagelement.setAttribute(buttyntype2,buttnval2);


     var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
     var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
     return new bootstrap.Popover(popoverTriggerEl)
     })

      if(content){
            tagelement.innerHTML=content;
        }
     return tagelement;
    }


    function createclasstag(tag,tagtype,tagval,styletag,stylename,content)
    {
        var tagelement = document.createElement(tag);
        tagelement.setAttribute(tagtype,tagval);
        tagelement.setAttribute(styletag,stylename);
        if(content){
            tagelement.innerHTML=content;
        }
        return tagelement;
    }

    function createimagetag(tag,tagtype,tagval,styletag,stylename,atribtu0,artribtu0val)
    {
        var tagelement = document.createElement(tag);
        tagelement.setAttribute(tagtype,tagval);
        tagelement.setAttribute(styletag,stylename);
        tagelement.setAttribute(atribtu0,artribtu0val);
        return tagelement;
    }

    function createclastag0(tag,tagtype,tagval,styletag,stylename,idname,idvalue,atribtu0,artribtu0val,atribtu1,artribtu1val)
    {
        var tagelement = document.createElement(tag);
        tagelement.setAttribute(tagtype,tagval);
        tagelement.setAttribute(styletag,stylename);
        tagelement.setAttribute(atribtu0,artribtu0val);
        tagelement.setAttribute(atribtu1,artribtu1val);
        tagelement.setAttribute(idname,idvalue);
        return tagelement;
    }


    function removeelement(id) 
    {
        const element = document.getElementById(id);
        element.remove();
    }


    function createdisplaybox(temp,disc,content,lat,lon)//display temp using lat and long for each country
    {

        var existingele=document.getElementById(`content${lat},${lon}`);;
        var existinxbtn=document.getElementById(`closebtn ${lat},${lon}`);

        removeelement(`${lat},${lon}`);
        var result=createclasstag("h5","class","card-title viewdesign","id",`content${lat},${lon}`,`temperature:${temp}`);
        var xbutn=createsimpletag("h1","class","","x");
        var xbutn1=createbuttontag("button","class","closbtn","id",`closebtn ${lat},${lon}`,"x");
        xbutn1.onclick = function(){ resetdisplaybox(lat,lon,content);}
        tempelements[`${lat},${lon}`]="true";
        result.append(xbutn1);
        content.append(result);
    }


    function resetdisplaybox(lat,lon,bcontent)
    {
        console.log(`the value : ${lat} ${lon}`);
        removeelement(`content${lat},${lon}`);
        var wb1=createbuttontag("button","class","btn btn-primary","id",`${lat},${lon}`,"Display weather");
        wb1.onclick = function() { weatherdataapi(lat,lon,bcontent);}
        bcontent.append(wb1);
    }
    

    function createonecard(name,capital,region,countrycode,lat,long,flag)//create card with all the data dynamically 
    {

        var elements=createsimpletag("div","class","col-lg-4","");
        var elementcol=createsimpletag("div","class","col-sm-12","");

        var carbox=createclasstag("div","class","card","style","width: 18rem","");
        var cardhead=createsimpletag("div","class","card-header","");
        var carbody=createsimpletag("div","class","card-body","");
       //var bodycontent=createsimpletag("div","class","innercontent","");//before
        var bodycontent=createbuttontag("div","class","innercontent","id",`${name}`,"");


        var contenttitle=createsimpletag("h5","class","card-title titledesign",`${name}`);
        var cartitle=createsimpletag("h5","class","card-title",`Region:${region}`);
        var cardcontent0=createsimpletag("p","class","ard-text",`Capital:${capital}`);
        var cardcontent1=createsimpletag("p","class","ard-text",`Country Code:${countrycode}`);
        var cardcontent2=createsimpletag("p","class","ard-text",`Coordinates:${Math.round(lat)},${Math.round(long)}`);


        var refbox=createclasstag("a","href","#","class","btn btn-primary","weather");
        var weatherbttn=createsimpletag("button","class","btn btn-primary","Display weather");
        var wb=createbuttontag("button","class","btn btn-primary","id",`${lat},${long}`,"Display weather");

      

       var wb2=createbtnwithevent2("button","class","btn btn-secondary","data-bs-container","body","data-bs-toggle","popover","data-bs-placement","bottom","data-bs-content","Top popover","btn");

      
        var wb1=createbuttontag("button","class","btn btn-primary","id",`${lat},${long}`,"Display weather");
       // var wb2=createbtnwithevent("button","class","btn btn-primary","data-bs-toggle","modal","data-bs-target","#exampleModal","Display weather");
        console.log(`${lat},${long}`);
        wb1.onclick = function() { weatherdataapi(lat,long,bodycontent);}
      // wb2.onclick = function() { weatherdataapi(lat,long,bodycontent);}

        var weatherbttn1=createsimpletag("button","class","btn btn-primary","Display weather");
        var imgetag=createimagetag("img","src",`${flag}`,"class","card-img-top","alt","");
       
        
        bodycontent.append(imgetag,cartitle,cardcontent0,cardcontent1,cardcontent2,wb1);
        carbody.append(bodycontent);
        cardhead.append(contenttitle); 
        carbox.append(cardhead,carbody);
        elementcol.append(carbox);
        elements.append(elementcol);
        frowcontent.append(elements); 


        return elements;

    }

    
    function contentappend(val)
    {
        frowcontent.append(val);
        fcontainer.append(frowcontent);
    }
    
    datafromapi();
    fcontainer.append(cartitle);
    document.body.append(fcontainer);
    





  

  


