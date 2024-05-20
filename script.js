const form=document.querySelector("form");
const text=document.getElementById("text");
const section=document.querySelector("section");
const MYword=document.getElementById("MYword");
const voiceBtn=document.getElementById("voiceBtn");
const error=document.querySelector(".error");
const loading=document.getElementById("loading");
let audio=new Audio( );

// form
form.addEventListener('submit',(e)=>{
    e.preventDefault( );

    getData(text.value); // 
    text.value="";
    section.innerHTML="";
    error.innerHTML="";
    audio.src="";
})

getData("yes");

// get data
async function getData(word){
    try{
        loading.style.display="flex";
        const URL=`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(URL);
        const data = await response.json( );
        loading.style.display="none";
        showData(data); //
    } catch{
        error.innerHTML=`<span class="text-rose-500 uppercase">${word}</span><br> not found 😵`;
        MYword.innerHTML="---";
    }
}


// show data
function showData(data){
    MYword.innerHTML=data[0].word;

    // AUDIO 
    voiceBtn.addEventListener('click',( )=>{
        audio.src=data[0].phonetics[data[0].phonetics.length -1].audio;
        audio.play( );
    })

    data[0].meanings.forEach(x=>{
        // making set
        const set=document.createElement("div");
        set.classList.add("set");
        section.append(set); // 

        // making brownBox for set heading
        const brownBox=document.createElement("div");
        brownBox.classList.add("brownBox");
        brownBox.innerHTML=x.partOfSpeech;
        set.append(brownBox); //

        // making item to store definitions
        x.definitions.forEach(y=>{
            const item=document.createElement("li");
            item.classList.add("item");
            item.innerHTML="🟫 "+ y.definition;

            set.append(item); // 
        })

    })
}