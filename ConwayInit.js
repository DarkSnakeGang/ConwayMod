window.ConwayMod = {};

////////////////////////////////////////////////////////////////////
//RUNCODEBEFORE
////////////////////////////////////////////////////////////////////

window.ConwayMod.runCodeBefore = function () {

    console.log("Thank you for loading Y̶a̶r̶m̶i̶p̶l̶a̶y̶'̶s̶ ̶P̶u̶d̶d̶i̶n̶g̶ ̶M̶o̶d̶!̶ Conway's game of snake. Hope you enjoy :)");
    console.log("Please provide feedback and report bugs in #snake-modding in the Official Google Snake Discord");
    console.log("Google Snake SRC Discord link: https://discord.gg/dDuCTm62EZ");

    window.menuCleaner = function menuCleaner(menuName){
      orig_len = document.querySelector(menuName).children.length
      for (let index = orig_len; index != 1; index--) {
        element = document.querySelector(menuName).children[index - 1];
        document.querySelector(menuName).removeChild(element)
      }
    }

    menu_to_clean = ['#apple', '#trophy', '#speed', '#count', '#size', '#color', '#graphics']
    menu_to_clean.forEach(element => {
      menuCleaner(element)
    });

    window.wholeSnakeObject;//Set to the big snake object that includes everything in snake.
    window.megaWholeSnakeObject;//Contains wholeSnakeObject
  
    window.loadCode = function loadAndRunCodeSynchronous(url) {
        let req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.onload = function () {
          if (this.status === 200) {
            (1, eval)(this.responseText);
          } else {
            console.log(`Loading selected mod returned non-200 status. Received: ${this.status}`);
          }
        };
        req.onerror = function (event) {
          console.error(`Error when attempting to retrieve mod code from ${url}`);
          console.log(event);
        };
        req.send();
      }

  window.getAppleSpawnPointOffset = function() {
    const boardWidth = eval(`window.wholeSnakeObject.${boardDimensions}.width`);
    switch(boardWidth) {
      case 17:
        return {x:-12,y:-7};
      case 10:
        return {x:-7,y:-4};
      case 24:
        return {x:-18,y:-10};
      default:
        throw new Error('Unknown apple offset for board with width: ' + boardWidth);
    }
  }
  
  window.placeAppleAtMouse = function(event) {
    let canvasRect = gameCanvasElMakePattern.getBoundingClientRect();
    const offsetFromBorder = {x:26,y:26};
   // console.log(window.wholeSnakeObject)
    if(window.wholeSnakeObject && tileWidth && window.placeApple) {
      const calculatedTileWidth = eval(`window.wholeSnakeObject.${tileWidth}`);
      mouseX = event.clientX - canvasRect.left - offsetFromBorder.x - calculatedTileWidth/2;
      mouseY = event.clientY - canvasRect.top - offsetFromBorder.y - calculatedTileWidth/2;
      gameCoordX = mouseX / calculatedTileWidth;
      gameCoordY = mouseY / calculatedTileWidth;
  
      
          //Undo offset for spawn point
          var spawnOffset = getAppleSpawnPointOffset();
          gameCoordX += spawnOffset.x; gameCoordY += spawnOffset.y;
          //console.log(gameCoordX,'i think is:',Math.round(gameCoordX), Math.round(gameCoordY));
          window.placeApple(Math.round(gameCoordX), Math.round(gameCoordY), 0) ;
        
    } else {
      console.log('Mouse click happened before proper setup. Ignoring');
    }
  }

  window.placerandomapple = function(event) {
    let canvasRect = gameCanvasElMakePattern.getBoundingClientRect();
    const offsetFromBorder = {x:26,y:26};
    if(window.wholeSnakeObject && tileWidth && window.placeApple) {
      const calculatedTileWidth = eval(`window.wholeSnakeObject.${tileWidth}`);
      
      gameCoordX = Math.random() * (17 ) ;
      gameCoordY = Math.random() * (15 ) ;
      //console.log(Math.round(gameCoordX), Math.round(gameCoordY));
      
       
          //Undo offset for spawn point
          var spawnOffset = getAppleSpawnPointOffset();
          gameCoordX += spawnOffset.x; gameCoordY += spawnOffset.y;
         
          window.placeApple(Math.round(gameCoordX), Math.round(gameCoordY), 0);
          
          
    } else {
      console.log('Mouse click happened before proper setup. Ignoring');
    }
  }

  window.TriggerTick = function(event)
  {
    Apparray= populateapplearray();
    //console.log(Apparray);
    const boardWidth = eval(`window.wholeSnakeObject.${boardDimensions}.width`);
    const boardLength = eval(`window.wholeSnakeObject.${boardDimensions}.height`);
    //console.log('aaaaaa',window.wholeSnakeObject);
    let i,j,k,l;
    //console.log(boardWidth,boardLength);
    var spawnOffset = getAppleSpawnPointOffset();
    //console.log(spawnOffset.x,spawnOffset.y);
    for(i=1;i<boardWidth+1;i++)
    {
        //console.log('what');
        //debugger
        for(j=1;j<boardLength+1;j++)
        {
            //window.placeApple(i-1,j-1,0);
            nearcounter =0;
            
            for(k=i-1;k<i+2;k++)
            {
                for(l=j-1;l<j+2;l++)
                {
                    if(!(k==i && l==j))
                    {
                        nearcounter+=Apparray[k][l];
                    }
                }
            }
            //console.log(nearcounter);
            if(nearcounter==3)
            {
                if(Apparray[i][j]==0)
                {
                    window.placeApple(i-1+ spawnOffset.x,j-1+spawnOffset.y,0);
                   // console.log('apple placed at',i,'and',j)
                }
            }
            else if(nearcounter==2)
            {
                
             }
             else
             {
                if(Apparray[i][j]==1)
                {
                    window.placeApple(i-1+ spawnOffset.x,j-1+spawnOffset.y,0);
                    //console.log('apple placed at',i,'and',j)
                }
             }
            

  }
}
  }


 

  window.populateapplearray = function(aparray){
  
    //Gets array from game
    aparray = window.getapplearray(); 

    //Formats it to be usable (and also adds padding)
    let formattedapparray = [];
    //console.log(aparray);
    const boardWidth = eval(`window.wholeSnakeObject.${boardDimensions}.width`);
    const boardLength = eval(`window.wholeSnakeObject.${boardDimensions}.height`);
    //console.log(boardWidth,boardLength);
    let i,j,k;
    
    for(i=0;i<boardWidth+2;i++)
    {
        formattedapparray[i]= [];
        for(j=0;j<boardLength+2;j++)
        {
            formattedapparray[i][j]= 0;
        }
        
    }
    
    for(i=0;i<boardWidth;i++)
    {
        for(j=0;j<boardLength;j++)
        {
           
           
            for(k=0;k<aparray.length;k++)
            {

             if(aparray[k].pos.x==i && aparray[k].pos.y==j)
             {
                formattedapparray[i+1][j+1]= 1;
                break;
             }
             
             
        }
        }
    }
    
                
             
             
             
        
        
    
//   console.log(formattedapparray);
   return formattedapparray;
    
    
  
  }
  //loadCode("http://127.0.0.1:5500/StealthMod.js");
    console.log("Enabling StealthMod");
    eval("window.StealthMod.runCodeBefore();")
};

////////////////////////////////////////////////////////////////////
//ALTERSNAKECODE
////////////////////////////////////////////////////////////////////

window.ConwayMod.alterSnakeCode = function (code) {
    
    eval("code = window.StealthMod.alterSnakeCode(code);");


  //all_regex = new RegExp(/\"ALL\"\);/);

   //Copied from Pythag
   globalThis.tileWidth = code.assertMatch(/[a-z]\.[$a-zA-Z0-9_]{0,8}\.fillRect\([a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,8}\.([$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}),[a-z]\*[a-z]\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8},[a-z]\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8},[a-z]\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}\)/)[1];//wa

   //setup for being able to move apples
   //Copied from gravity, but adjusted to be global and use code. intead of funcWithEat. and capturing groups adjusted.
   [,globalThis.applePosProperty, globalThis.appleSpeedProperty] = code.assertMatch(/&&\([$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8}\.x&&\([$a-zA-Z0-9_]{0,8}\.([$a-zA-Z0-9_]{0,8})\.x\+=[$a-zA-Z0-9_]{0,8}\.([$a-zA-Z0-9_]{0,8})\.x\),/);
 
   //Lifted from pythag
   globalThis.bodyArray = code.assertMatch(/var [a-z]=this\.[$a-zA-Z0-9_]{0,8}\.([$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8})\[0\]\.clone\(\);/)[1];
 
   globalThis.makeApple = code.assertMatch(/this\.[$a-zA-Z0-9_]{0,8}\.push\(([$a-zA-Z0-9_]{0,8})\(this,-5,-4\)\)/)[1];
   globalThis.appleArray = code.assertMatch(/this\.([$a-zA-Z0-9_]{0,8})\.push\([$a-zA-Z0-9_]{0,8}\(this,-6,-3\)\)/)[1];
 
   //whole snake object has an object which in turn has the appleArray. (It's messy I know)
   globalThis.appleArrayHolderOfWholeSnakeObject = code.assertMatch(/this\.([$a-zA-Z0-9_]{0,8})\.reset\(\);this\.[$a-zA-Z0-9_]{0,8}=!1;/)[1];
 
   //globalThis.coordConstructor = swapInSnakeGlobal(code.assertMatch(/new (_\.[$a-zA-Z0-9_]{0,8})\(1,1\)/)[1]);
   globalThis.coordConstructor = code.assertMatch(/new (_\.[$a-zA-Z0-9_]{0,8})\(1,1\)/)[1];
 
   //Board dimensions - found in wholeSnakeObject, has width, height properties
   globalThis.boardDimensions = code.assertMatch(/x===Math.floor\([a-z]\.[$a-zA-Z0-9_]{0,8}\.([$a-zA-Z0-9_]{0,8}\.[$a-zA-Z0-9_]{0,8})\.width\/2\)&&/)[1];
  
   //Checks whether we are playing a specific mode e.g. VK(this.settings,2) is true if we are playing portal
   let [,modeCheck, settingsProperty] = code.assertMatch(/([$a-zA-Z0-9_]{0,8})\(this\.([$a-zA-Z0-9_]{0,8}),6\)/);
 
   
   //Set snakeGlobalObject every reset
   let funcWithReset, funcWithResetOrig;
   funcWithReset = funcWithResetOrig = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,8}\.prototype\.reset=function\(a\)$/,
   /[$a-zA-Z0-9_]{0,8}=\n?\.66/,
   false);
 
   funcWithReset = assertReplace(funcWithReset,'{','{globalThis.wholeSnakeObject = this;');//This line is changed slightly from varied.js
 
 
   code = code.replace(funcWithResetOrig, funcWithReset);
 
   //Get the object that contains the wholeSnakeObject.
   let funcWithResetState, funcWithResetStateOrig;
   funcWithResetState = funcWithResetStateOrig = findFunctionInCode(code, /[$a-zA-Z0-9_]{0,8}\.prototype\.resetState=function\(a\)$/,
   /void 0===[a-z]\?!0:[a-z];this\.[$a-zA-Z0-9_]{0,8}\.reset\(a\);/);
 
   funcWithResetState = assertReplace(funcWithResetState, '{', '{globalThis.megaWholeSnakeObject = this;');
 
   code = code.replace(funcWithResetStateOrig, funcWithResetState);
 
   ///////////////////////////////////////
   //Taken from level-editor.js
   ///////////////////////////////////////
 
   //Make a function that empties apples
   (0,eval)(`
   function emptyApples() {
     window.wholeSnakeObject.${appleArrayHolderOfWholeSnakeObject}.${appleArray}.length = 0;
   }
   `);
   // code = appendCodeWithinSnakeModule(code, `
   // globalThis.changeboardsize = function()
   // {
   //   window.wholeSnakeObject.${boardDimensions}.width=25
 
   // }
   // `);
 
   code = appendCodeWithinSnakeModule(code, `
   globalThis.getapplearray = function()
   {
     return applearray = window.wholeSnakeObject.${appleArrayHolderOfWholeSnakeObject}.${appleArray};
 
 
   }
   
   `)
   //Make a function to place an apple
   code = appendCodeWithinSnakeModule(code, `
   globalThis.placeApple = function(x,y,type,initialSpeed=undefined,customProperties={}) {
     let apple = ${makeApple}(window.wholeSnakeObject.${appleArrayHolderOfWholeSnakeObject}, x, y);
     //console.log(apple.pos)
     apple.type = type;
     if(initialSpeed) {
       apple[window.appleSpeedProperty].x = initialSpeed.x;
       apple[window.appleSpeedProperty].y = initialSpeed.y;
     }
     Object.assign(apple, customProperties);
     let applearray = window.wholeSnakeObject.${appleArrayHolderOfWholeSnakeObject}.${appleArray};
   
    
     // console.log(applearray[0]);
     // console.log(applearray.length);
      
       let testcx=0;
       let foundapp = 0;
       for(;testcx<applearray.length;testcx++)
       {
          if((apple.pos.x==applearray[testcx].pos.x)&&(apple.pos.y==applearray[testcx].pos.y))
          {
           foundapp =1;
           //console.log('THERES AN APPLE HERE BRUHHH')
           let temparr = applearray[0];
           applearray[0]=applearray[testcx];
           applearray[testcx] = temparr;
           applearray.shift();
           break;
          }
       }
     if(foundapp==0) 
     {window.wholeSnakeObject.${appleArrayHolderOfWholeSnakeObject}.${appleArray}.push(apple);}
     
   }
   `, false);

// This here was meant to handle sizes but doesn't work anymore, I don't need these errors right now to work

   /*
   const sizeHandleFunction = code.match(
    /_\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?function\n?\(\)\n?{\n?var a\n?=\n?_\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?this\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\.\n?canvas\n?\);\n?[^]*?\n?a\n?\)\n?}\n?}/
  )[0];
  const selectedSize = sizeHandleFunction.match(
    /switch\n?\(\n?this\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?{\n?case 2\n?:/
  )[0].match(/this\n?\.\n?settings\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0];
  const sizeHold = sizeHandleFunction.match(
    /f\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?=\n?new _\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\(\n?Math\n?\.\n?floor\n?\(\n?b\n?\/\n?f\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?,\n?Math\n?\.\n?floor\n?\(\n?c\n?\/\n?f\n?\.\n?[a-zA-Z0-9_$]{1,8}\n?\)\n?\)\n?\)\n?;/
  )[0];
  const sizeHolder = sizeHold.match(/f\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0];
  const dim = sizeHold.match(/b\n?\/\n?f\n?\.\n?[a-zA-Z0-9_$]{1,8}/)[0].replace(/b\n?\//, '');
 */ 

  return code;
};

////////////////////////////////////////////////////////////////////
//RUNCODEAFTER
////////////////////////////////////////////////////////////////////

window.ConwayMod.runCodeAfter = function () {

  let modIndicator = document.createElement('div');
  modIndicator.style = 'position:absolute;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;padding-top:4px;padding-left:30px;user-select: none;';
  modIndicator.textContent = "Conway's game of snake - CTRL to toggle - Mouse to place";
  
  let OnIndicator = document.createElement('div');
  OnIndicator.style = 'position:absolute;font-family:Roboto,Arial,sans-serif;color:white;font-size:14px;padding-left:420px;padding-top:4px;user-select: none;';
  OnIndicator.textContent = "Simulation halted  ";

  let canvasNode = document.getElementsByClassName('jNB0Ic')[0];
  document.getElementsByClassName('EjCLSb')[0].insertBefore(modIndicator, canvasNode);
  document.getElementsByClassName('EjCLSb')[0].insertBefore(OnIndicator, canvasNode);
  window.gameCanvasElMakePattern = document.getElementsByClassName('cer0Bd')[0];
  window.canvasthing = document.getElementsByClassName('ahZmw')[0];
  


  gameCanvasElMakePattern.addEventListener('mousedown',placeAppleAtMouse);

  canvasthing.style.visibility='hidden';


 redap = document.createElement("img");
 redap.setAttribute("height",15);
 redap.setAttribute("width",15);
 redap.style.display = 'inline';
  redap.src = 'https://i.postimg.cc/QxCDtqWZ/postimg-apple-00.png'

  greenap=document.createElement("img");
  greenap.setAttribute("height",15);
  greenap.setAttribute("width",15);
  greenap.style.display = 'inline';
  greenap.src = 'https://i.postimg.cc/3rn7YqNZ/postimg-green-apple.png'

  OnIndicator.appendChild(redap);



  let intervalId;
  flag=1
  document.addEventListener('keyup', (event)=> {
    
      
    if (event.key === 'Control'){
      if(flag==1)
    {
      OnIndicator.removeChild(redap);
      
      flag=0;
      OnIndicator.textContent = "Simulation running  ";
      OnIndicator.appendChild(greenap);
      intervalId = window.setInterval(function(){
        TriggerTick();
      }, 300);
    
    }
    else
    {
      flag=1;
      
      
      OnIndicator.textContent = "Simulation halted  ";
      OnIndicator.appendChild(redap);
      clearInterval(intervalId);
    }
    }
    
  });
 
  
};

