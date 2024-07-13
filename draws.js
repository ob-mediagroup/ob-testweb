let testcanvas = document.createElement('canvas');
let testcontext = testcanvas.getContext('2d');
testcanvas.style.width = testcanvas.style.height ='60vh';
testcanvas.width = 500; testcanvas.height = 500;

let buildControl = document.getElementById("nbuildings");
let speedControl = document.getElementById("speed");
let buildColorControl = document.getElementById('buildingColor');
let sky1Control = document.getElementById("skycolor1");
let sky2Control = document.getElementById("skycolor2");



//drawHeart(testcontext,[],'blue','red',testcanvas.width,testcanvas.height ,10,85,68,3,15);
//drawArrow(testcontext,[],'blue','red',testcanvas.width,testcanvas.height ,10,78,10,85,6,64,3,60,3,30,10,30,85);
//drawBezier(testcontext,[0,0],'blue',testcanvas.width,testcanvas.height);
//drawTreeLogo(testcontext,[0,0],'blue',testcanvas.width,testcanvas.height);
drawBuildLogo(testcontext,[0,0],'blue',testcanvas.width,testcanvas.height);
//drawObi(testcontext,[0,0],'purple','blue',testcanvas.width,testcanvas.height,10,210,30,45,5,40);
//drawPolygon(testcontext,[0,0],'purple','blue',testcanvas.width,testcanvas.height,4,50,8);
//drawStar(testcontext,[0,0],'purple','blue',testcanvas.width,testcanvas.height,4,50,5);
//drawAdd(testcontext,[0,0],'green','black',testcanvas.width,testcanvas.height,4,65,6);
//drawBuilding(testcontext,[0.5*(testcanvas.width),testcanvas.height],'blue','yellow','black',0.80*(testcanvas.width),0.80*(testcanvas.height),5);

let mydiv = document.getElementById('testCanvas');
mydiv.appendChild(testcanvas);

let drawState = false;
let mouseCoordsArray = []; let drawnShapes = [];

let logocanv = document.getElementById('logoCanvas'); let logctx = logocanv.getContext('2d');
logocanv.width = logocanv.clientWidth; logocanv.height = logocanv.clientWidth;
drawObi(logctx,[0,0],'white','blue',logocanv.width,logocanv.height,10,210,30,65,5,40);

let nav = document.querySelector('nav:first-of-type');
let anidiv =  document.getElementById('animation');
if(nav){
    anidiv.style.top = ''+ nav.clientHeight+'px'; anidiv.style.left = '0%';
    anidiv.style.marginBottom = ''+ nav.clientHeight+'px';
}
let animcanv = document.getElementById('drawAnim'); let anictx = animcanv.getContext('2d');
animcanv.width = anidiv.clientWidth; animcanv.height = anidiv.clientHeight;

//canvas control section
let canvases = document.querySelectorAll('#shapegroup canvas');
let funcgroup = [drawHeart,drawArrow,drawPolygon,drawStar];
let drawDivArea = document.querySelector('#shapegroup');
let groupheight = drawDivArea.clientHeight;


let shapeconfig = document.querySelector('#shapeconfig'); let sconfigheight = shapeconfig.clientHeight;
let shapeconfigcanv = []; let sconfigcounter = 0;
let btnconfigarray = [];


let colinput1 = document.querySelector('#colorgroup input[type="color"]');
let data1 = colinput1.dataset.pos; 
let colgroup = document.querySelector('#colorgroup');
let colarray = [data1]; let colvalarray = [colinput1.value];
let addcanv = document.createElement('canvas'); let divaddcanv = document.createElement('div');
divaddcanv.setAttribute('id','divaddcanv');
let addcanvtext = document.createElement('p'); addcanvtext.textContent = 'ADD'
addcanv.width = colinput1.parentElement.clientWidth; addcanv.height = 0.70*(colinput1.parentElement.clientHeight);
let addcanvctx = addcanv.getContext('2d');
drawAdd(addcanvctx,[0,0],'lightseagreen','lightseagreen',addcanv.width,addcanv.height,1,60,3);
colinput1.onchange = function(evt){
    if(colvalarray.length != 0){
        for(let j=0;j<=(colvalarray.length-1);j++){
            if(evt.target.dataset.pos == (j+1)){
                colvalarray[j] = evt.target.value; break;
            }
        }
    }
};
divaddcanv.appendChild(addcanv); divaddcanv.appendChild(addcanvtext);
colgroup.appendChild(divaddcanv);


let dialog1 = document.getElementById('config');
let canvdisplay = document.getElementById('canvdisplay');
let canvdiv1 = document.getElementById('canvdiv1');
let optdiv1 = document.getElementById('optdiv1'); let topdisplay = document.getElementById('topdisplay');
//canvdisplay.height = topdisplay.clientHeight; canvdisplay.width = 0.60*(dialog1.clientWidth);

canvdisplayctx = canvdisplay.getContext('2d');
let optdivlist = []; let inplist = [];

addcanv.onclick = addcanvtext.onclick = function(evt){
    
    if(colgroup.children.length < 4){
        let newdiv = document.createElement('div'); let newcanvt = document.createElement('input');
        newcanvt.setAttribute('type','color');  newcanvt.setAttribute('data-pos',''+ (colarray.length+1));
        newcanvt.setAttribute('value','#20b2aa');
        let data2 = newcanvt.dataset.pos; colarray.push(data2); colvalarray.push(newcanvt.value);
        newdiv.appendChild(newcanvt);
        colgroup.insertBefore(newdiv,divaddcanv);
        newcanvt.onchange = function(evt){
            if(colvalarray.length != 0){
                for(let j=0;j<=(colvalarray.length-1);j++){
                    if(evt.target.dataset.pos == (j+1)){
                        colvalarray[j] = evt.target.value;
                        break;
                    }
                }
            }
        };
    }
    else if(colgroup.children.length == 4){
        let newdiv = document.createElement('div'); let newcanvt = document.createElement('input');
        newcanvt.setAttribute('type','color');  newcanvt.setAttribute('data-pos',''+ (colarray.length+1));
        newcanvt.setAttribute('value','#20b2aa');
        let data2 = newcanvt.dataset.pos; colarray.push(data2); colvalarray.push(newcanvt.value);
        newdiv.appendChild(newcanvt); colgroup.appendChild(newdiv);
        newcanvt.onchange = function(evt){
            if(colvalarray.length != 0){
                for(let j=0;j<=(colvalarray.length-1);j++){
                    if(evt.target.dataset.pos == (j+1)){
                        colvalarray[j] = evt.target.value; break;
                    }
                }
            }
        };
        //colgroup.insertBefore(newdiv,divaddcanv);
        colgroup.removeChild(divaddcanv); 
    }
    

    
};






function generateConfig(counter,sconfigcanv,currentfunc,arglist,number){
    let rootparent = document.querySelector('#shapeconfig');
     
     //currentcanv.width = rootparent.clientWidth; currentcanv.height = 0.80*rootparent.clientHeight;
    // 
     
     if(counter==0){
        
        let existcanv = document.querySelector('#shapeconfig canvas');
        existcanv.height = rootparent.clientHeight;
        let ww = existcanv.width, hh = existcanv.height;
        let ctx = existcanv.getContext('2d');
        
        let parent = existcanv.parentElement;  existcanv.width = parent.clientWidth;
        let cfgButton = document.createElement('button'); cfgButton.textContent = 'Configure';
        cfgButton.style.backgroundColor = 'lightseagreen'; cfgButton.style.color = 'white';
        cfgButton.setAttribute('data-number',''+number); let oldnum = 0;
        cfgButton.setAttribute('data-btnno',''+oldnum);
        
        btnconfigarray.push({number,btnno:oldnum,currentfunc,arglist}); 
        

        parent.appendChild(cfgButton);

        let windex = arglist[2]; //arglist[2] = ww;
        let hindex = arglist[3]; //arglist[3] = hh;
        let newdiv = document.createElement('div'); let newcanv = document.createElement('canvas');
        newdiv.appendChild(newcanv); rootparent.appendChild(newdiv);
        
        currentfunc(ctx,[0,0],...arglist);

        cfgButton.onclick = function(evt){
            let butobjindex = evt.target.dataset.btnno;
            for(let h=0;h<=(btnconfigarray.length-1);h++){
                if(btnconfigarray[h].btnno == butobjindex){
                   let btn = btnconfigarray[h];
                   dialog1.showModal();
                   canvdisplay.height = canvdisplay.parentElement.clientHeight;
                   canvdisplay.width = canvdisplay.parentElement.clientWidth;
                   
                   
                   dialogFill(evt,canvdisplayctx,btn.arglist,btn.number,btn.btnno,btnconfigarray,funcgroup,optdiv1,canvdisplay.width,canvdisplay.height);
                   evt.stopPropagation();
                }
            }
        };
        sconfigcanv.push(existcanv);
        sconfigcanv.push(newcanv); newcanv.setAttribute('data-id',`${sconfigcanv.length}`);
     }
     else if(counter > 0){
        let rootcanv = (document.querySelectorAll('#shapeconfig canvas'))[0]; 
        let existcanv = rootparent.querySelector('canvas[data-id="'+counter+'"]');
        existcanv.height = rootcanv.clientHeight;
        let ww = existcanv.width, hh = existcanv.height;
        let ctx = existcanv.getContext('2d'); 
        
        let parent = existcanv.parentElement; existcanv.width = parent.clientWidth;
        

        let windex = arglist[2]; arglist[2] = rootcanv.clientWidth;
        let hindex = arglist[3]; arglist[3] = rootcanv.clientHeight;
        let newdiv = document.createElement('div'); let newcanv = document.createElement('canvas');
        newdiv.appendChild(newcanv); rootparent.appendChild(newdiv);
        
        currentfunc(ctx,[0,0],...arglist); 
        let oldnum = btnconfigarray.length;
        let cfgButton = document.createElement('button'); cfgButton.textContent = 'Configure';
        cfgButton.style.backgroundColor = 'lightseagreen'; cfgButton.style.color = 'white';

        cfgButton.setAttribute('data-number',''+number);
        cfgButton.setAttribute('data-btnno',''+oldnum);
        
        
        btnconfigarray.push({number,btnno:oldnum,currentfunc,arglist});
        console.log(btnconfigarray.length);
        cfgButton.onclick = function(evt){
            let butobjindex = evt.target.dataset.btnno;
            for(let h=0;h<=(btnconfigarray.length-1);h++){
                if(btnconfigarray[h].btnno == butobjindex){
                   let btn = btnconfigarray[h];
                   dialog1.showModal();
                   canvdisplay.height = canvdisplay.parentElement.clientHeight;
                   canvdisplay.width = canvdisplay.parentElement.clientWidth;
                   
                   
                   dialogFill(evt,canvdisplayctx,btn.arglist,btn.number,btn.btnno,btnconfigarray,funcgroup,optdiv1,canvdisplay.width,canvdisplay.height);
                   evt.stopPropagation();
                }
            }
        };
        parent.appendChild(cfgButton);
        sconfigcanv.push(newcanv); newcanv.setAttribute('data-id',`${sconfigcanv.length}`);
     }
}

generateDrawings(canvases,funcgroup,'lightseagreen','rgb(53,107,58)',canvases[0].parentElement.clientWidth,groupheight,3,50,5);

function generateDrawings(canvlist,funclist,fill,stroke,width,height,lineWidth,radius,sides){
    let pa = [85,68,3,15]; let pb = [78,10,85,6,64,3,60,3,30,10,30,85];
    let arg1 = ['lightseagreen',stroke,width,height,lineWidth];
    let arg2 = [...arg1,...pa];
    let arg3 = [...arg1,...pb];
    let arg4 = [...arg1,radius,sides];

    for(let i=0;i<=(canvlist.length-1);i++){
        let canvctx = canvlist[i].getContext('2d'); canvlist[i].width = width;canvlist[i].height = height;
        canvlist[i].onmouseover = function(evt){
            evt.target.style.border = 'solid thick lightseagreen';
        };
        canvlist[i].onmouseout = function(evt){
            evt.target.style.border = 'solid thin gray';
        };

        if(i == 0){
            funclist[i](canvctx,[0,0],...arg2);
            
            canvlist[i].onclick = function(evt){
                let indices = isArrayMember(funclist[i],funclist)[1];
                generateConfig(shapeconfigcanv.length,shapeconfigcanv,funclist[i],[...arg1,85,68,3,15],indices);
                
                evt.stopPropagation();
            };
        }
        else if(i == 1){
            funclist[i](canvctx,[0,0],...arg3);
            canvlist[i].onclick = function(evt){
                let indices = isArrayMember(funclist[i],funclist)[1];
                generateConfig(shapeconfigcanv.length,shapeconfigcanv,funclist[i],[...arg1,78,10,85,6,64,3,60,3,30,10,30,85],indices);
                
                evt.stopPropagation();
            };
        }
        else if(i > 1){
            funclist[i](canvctx,[0,0],...arg4);
            canvlist[i].onclick = function(evt){
                let indices = isArrayMember(funclist[i],funclist)[1];
                generateConfig(shapeconfigcanv.length,shapeconfigcanv,funclist[i],[...arg1,50,5],indices);
                
                evt.stopPropagation();
            };
        }
    }
    
}


/*
let cfgbtns = document.querySelectorAll('button[data-btnno]');
for(let k=0;k<=(cfgbtns.length-1);k++){
    cfgbtns[k].onclick = function(evt){
        let butobjindex = evt.target.dataset.btnno;
        for(let h=0;h<=(btnconfigarray.length-1);h++){
            if(btnconfigarray[h].btnno == butobjindex){
               let btn = btnconfigarray[h];
               dialogFill(evt,canvdisplayctx,btn.arglist,btn.number,btn.btnno,btnconfigarray,btn.funclist,optdiv1,canvdisplay.width,canvdisplay.height);
               dialog1.showModal();
            }
        }
    };
}    */


//Colour and Shape Configuration 
let shapepattern = 'linear'; let colorpattern = 'linear';
let shapekids = document.querySelectorAll('input[name="PatternShape"]');
let colorkids = document.querySelectorAll('input[name="PatternColor"]');
for(let j=0;j<=(shapekids.length-1);j++){
    shapekids[j].onchange = function(evt){
        for(let k=0;k<=(shapekids.length-1);k++){
            if(shapekids[k].checked){shapepattern = shapekids[k].value; }
            
        }
    };
}
for(let j=0;j<=(colorkids.length-1);j++){
    colorkids[j].onchange = function(evt){
        for(let k=0;k<=(colorkids.length-1);k++){
            if(colorkids[k].checked){colorpattern = colorkids[k].value; }
            
        }
    };
}


//BUTTONS FOR CLOSING DIALOGS
let closebtn1 = document.querySelectorAll('#bottomdisplay button')[1];
let okbtn1 = document.querySelectorAll('#bottomdisplay button')[0];
closebtn1.onclick = (evt)=>{dialog1.close();}

okbtn1.onclick = (evt)=>{
    let btnno = optdiv1.querySelectorAll('input[data-btnno]')[0].dataset.btnno; let obj;
    let diagram; let inps = optdiv1.querySelectorAll('input[data-btnno]');
    
    if(btnno){
        for(let k=0;k<=(btnconfigarray.length-1);k++){
            if(btnconfigarray[k].btnno == btnno){
                obj = btnconfigarray[k];
                let iternum = btnconfigarray[k].arglist.length - 5;
                for(let g=5;g<=(obj.arglist.length-1);g++){
                    let idx = g - (obj.arglist.length-iternum);
                    if(btnconfigarray[k].arglist[g]) btnconfigarray[k].arglist[g] = inps[idx].value;
                }
                
                let spbtn = document.querySelector('#shapeconfig button[data-btnno="'+btnno+'"]');
                if(spbtn){
                    let canver = spbtn.parentElement.firstElementChild;
                    let ctx = canver.getContext('2d');
                    ctx.clearRect(0,0,canver.width,canver.height);
                    
                    btnconfigarray[k].arglist[2] = canver.width; btnconfigarray[k].arglist[3] = canver.height;
                    btnconfigarray[k].currentfunc(ctx,[0,0],...btnconfigarray[k].arglist);
                    
                }
                break;
            }
        }
    }
    dialog1.close();
}

function dialogFill(evt,ctx,arglist,datanumber,btnno,btncfgarray,funclist,parentdiv,width,height){
    let func = btncfgarray[btnno].currentfunc; let funcindex = (isArrayMember(func,funclist))[1];
    
    let iternum = arglist.length - 5;
    let heart = [{bottom:'y'},{side:'x'},{side:'y'},{top:'y'}];
    let arrow = [{bottom:'y1'},{bottom:'x2'},{bottom:'y2'},{bottom:'x3'},{bottom:'y3'},{length:'x1'},{length:'y1'},{length:'x2'},{length:'y2'},{top:'x1'},{top:'y1'},{top:'y2'}];
    let poly1 = [{radius:'radius'},{sides:'sides'}];
    let poly2 = [{radius:'radius'},{sides:'sides'}];

    let choice = [heart,arrow,poly1,poly2];
    let argser = arglist; argser[2] = width; argser[3] = height;
    
    
    let texter = []; let labeller;
    
    for(let j=0;j<=(funclist.length-1);j++){
        if((func == funclist[j]) && (funcindex == j)){ labeller = choice[j];}
    }
    ctx.clearRect(0,0,width,height);
    if(isArrayMember(func,funclist)[0]){
        funclist[funcindex](ctx,[0,0],...argser);
    }
    let kids = parentdiv.children; 
    if(kids.length != 0){
        
        if((parentdiv.firstElementChild.getAttribute('id')) == btnno){
            for(let i=5;i<=(argser.length-1);i++){
                let k = i - (argser.length-iternum);
                let sample = document.querySelectorAll('#optdiv1 input[type="number"]');
                if(sample[k]) sample[k].setAttribute('value',''+argser[i]);
                
            }
        }
        else if((parentdiv.firstElementChild.getAttribute('id')) != btnno){
            let tester = false;
            for(let l=0;l<=(optdivlist.length-1);l++){
                if(optdivlist[l].getAttribute('id') == btnno){
                   tester = true; 
                }
                
            }
           if(tester){let currentdiv = optdivlist[l];

            parentdiv.removeChild(parentdiv.firstElementChild);
            parentdiv.appendChild(currentdiv);
            for(let i=5;i<=(argser.length-1);i++){
                let k = i - (argser.length-iternum);
                let sample = document.querySelectorAll('#optdiv1 input[type="number"]');
                if(sample[k]) sample[k].setAttribute('value',''+argser[i]);
            }
            return ;
           }
           else{
            
            let containerdiv = document.createElement('div'); containerdiv.setAttribute('id',''+btnno);
            let fields = document.createElement('fieldset');
            for(let i=5;i<=(argser.length-1);i++){
                let k = i - (argser.length-iternum);
                for(let key in labeller[k]){
                     if(texter.length==0){
                        texter.push(key);
                        let legend = document.createElement('legend'); legend.textContent = key;
                        fields.appendChild(legend);
                        let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                        dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                        inplist.push(1);
                        dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                        dinput.setAttribute('data-btnno',''+btnno);
                        dinput.setAttribute('id',''+inplist.length+argser[i]);

                        dinput.onchange = function(evt){
                            let id = evt.target.dataset.btnno;
                            let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                            let funct = obj.currentfunc;
                            let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                            if(isArrayMember(evt.target,allkids)[0]){
                                let indx = isArrayMember(evt.target,allkids)[1];
                                let iternum = arrgs.length - 5;
                                for(let b=5;b<=(arrgs.length-1);b++){
                                    let kk = b - (arrgs.length - iternum);
                                    if(kk == indx) arrgs[b] = evt.target.value;

                                }
                                canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                                funct(canvdisplayctx,[0,0],...arrgs);
                                
                            }

                        };
                        let label = document.createElement('label');label.textContent = labeller[k][key];
                        label.setAttribute('for',''+dinput.getAttribute('id'));
                        let wrapdiv = document.createElement('div');
                        wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                        fields.appendChild(wrapdiv);
                        containerdiv.appendChild(fields);
                        
                     }
                     else if(texter.length!=0){
                        if(isArrayMember(key,texter)[0]){
                            let searchkids = containerdiv.children;
                            //console.log(searchkids);
                            for(let b=0;b<=(searchkids.length-1);b++){
                                if(searchkids[b].firstElementChild.textContent == key){
                                    let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                                    dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                                    inplist.push(1);
                                    dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                                    dinput.setAttribute('data-btnno',''+btnno);
                                    dinput.setAttribute('id',''+inplist.length+argser[i]);
                                    dinput.onchange = function(evt){
                                        let id = evt.target.dataset.btnno;
                                        let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                                        let funct = obj.currentfunc;
                                        let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                                        if(isArrayMember(evt.target,allkids)[0]){
                                            let indx = isArrayMember(evt.target,allkids)[1];
                                            let iternum = arrgs.length - 5;
                                            for(let b=5;b<=(arrgs.length-1);b++){
                                                let kk = b - (arrgs.length - iternum);
                                                if(kk == indx) arrgs[b] = evt.target.value;
            
                                            }
                                            canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                                            funct(canvdisplayctx,[0,0],...arrgs);
                                            
                                        }
            
                                    };
                                    
                                    let label = document.createElement('label');label.textContent = labeller[k][key];
                                    label.setAttribute('for',''+dinput.getAttribute('id'));
                                    let wrapdiv = document.createElement('div');
                                    wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                                    
                                    containerdiv.children[b].appendChild(wrapdiv);

                                }
                            }
                        }
                        else if(!isArrayMember(key,texter)[0]){
                            let fields1 = document.createElement('fieldset');
                            texter.push(key);
                            let legend = document.createElement('legend'); legend.textContent = key;
                            fields1.appendChild(legend);
                            let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                            dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                            inplist.push(1);
                            dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                            dinput.setAttribute('data-btnno',''+btnno);
                            dinput.setAttribute('id',''+inplist.length+argser[i]);
                            dinput.onchange = function(evt){
                                let id = evt.target.dataset.btnno;
                                let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                                let funct = obj.currentfunc;
                                let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                                if(isArrayMember(evt.target,allkids)[0]){
                                    let indx = isArrayMember(evt.target,allkids)[1];
                                    let iternum = arrgs.length - 5;
                                    for(let b=5;b<=(arrgs.length-1);b++){
                                        let kk = b - (arrgs.length - iternum);
                                        if(kk == indx) arrgs[b] = evt.target.value;
    
                                    }
                                    canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                                    funct(canvdisplayctx,[0,0],...arrgs);
                                    
                                }
    
                            };
                            let label = document.createElement('label');label.textContent = labeller[k][key];
                            label.setAttribute('for',''+dinput.getAttribute('id'));
                            let wrapdiv = document.createElement('div');
                            wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                            fields1.appendChild(wrapdiv);
                            containerdiv.appendChild(fields1);
                        }
                     }
                }
            }
            parentdiv.removeChild(parentdiv.firstElementChild);
            parentdiv.appendChild(containerdiv); 
           } 
        
        }
        
        
    }
    else if(kids.length == 0){
        
        let containerdiv = document.createElement('div'); containerdiv.setAttribute('id',''+btnno);
        let fields = document.createElement('fieldset');
        for(let i=5;i<=(argser.length-1);i++){
            let k = i - (argser.length-iternum);
            for(let key in labeller[k]){
                if(texter.length==0){
                   texter.push(key);
                   let legend = document.createElement('legend'); legend.textContent = key;
                   fields.appendChild(legend);
                   let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                   dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                   inplist.push(1);
                   dinput.setAttribute('data-btnno',''+btnno);
                   dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                   dinput.setAttribute('id',''+inplist.length+argser[i]);
                   dinput.onchange = function(evt){
                    let id = evt.target.dataset.btnno;
                    let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                    let funct = obj.currentfunc;
                    console.log(obj);
                    let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                    if(isArrayMember(evt.target,allkids)[0]){
                        let indx = isArrayMember(evt.target,allkids)[1]; 
                        let iternum = arrgs.length - 5;
                        for(let b=5;b<=(arrgs.length-1);b++){
                            let kk = b - (arrgs.length - iternum); 
                            if(kk == indx){
                                arrgs[b] = evt.target.value; 
                                
                            }
                        
                        }
                        canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                        funct(canvdisplayctx,[0,0],...arrgs);
                        
                    }

                };
                   let label = document.createElement('label');label.textContent = labeller[k][key];
                   label.setAttribute('for',''+dinput.getAttribute('id'));
                   let wrapdiv = document.createElement('div');
                   wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                   fields.appendChild(wrapdiv);
                   containerdiv.appendChild(fields);
                   
                }
                else if(texter.length!=0){
                    
                    if(isArrayMember(key,texter)[0]){
                       let searchkids = containerdiv.children;
                       for(let b=0;b<=(searchkids.length-1);b++){
                           if(searchkids[b].firstElementChild.textContent == key){
                               let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                               dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                               inplist.push(1);
                               dinput.setAttribute('data-btnno',''+btnno);
                               dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                               dinput.setAttribute('id',''+inplist.length+argser[i]);
                               dinput.onchange = function(evt){
                                let id = evt.target.dataset.btnno;
                                let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                                let funct = obj.currentfunc;
                                let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                                if(isArrayMember(evt.target,allkids)[0]){
                                    let indx = isArrayMember(evt.target,allkids)[1];
                                    let iternum = arrgs.length - 5;
                                    for(let b=5;b<=(arrgs.length-1);b++){
                                        let kk = b - (arrgs.length - iternum);
                                        if(kk == indx) arrgs[b] = evt.target.value;
    
                                    }
                                    canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                                    funct(canvdisplayctx,[0,0],...arrgs);
                                    
                                }
    
                            };
                               let label = document.createElement('label');label.textContent = labeller[k][key];
                               label.setAttribute('for',''+dinput.getAttribute('id'));
                               let wrapdiv = document.createElement('div');
                               wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                               containerdiv.children[b].appendChild(wrapdiv);

                           }
                       }
                   }
                   else if(!isArrayMember(key,texter)[0]){
                    
                       let fields1 = document.createElement('fieldset');
                       texter.push(key);
                       let legend = document.createElement('legend'); legend.textContent = key;
                       fields1.appendChild(legend);
                       let dinput = document.createElement('input'); dinput.setAttribute('type','number');
                       dinput.setAttribute('data-btnno',''+btnno);
                       dinput.setAttribute('step','1'); dinput.setAttribute('min',''+(argser[i]-3));
                       inplist.push(1);
                       dinput.setAttribute('max',''+(argser[i]+25)); dinput.setAttribute('value',''+argser[i]);
                       dinput.setAttribute('id',''+inplist.length+argser[i]);

                       dinput.onchange = function(evt){
                        let id = evt.target.dataset.btnno;
                        let obj = btnconfigarray[id]; let arrgs = obj.arglist;
                        let funct = obj.currentfunc;
                        let allkids = document.querySelectorAll('#optdiv1 input[type="number"]');
                        if(isArrayMember(evt.target,allkids)[0]){
                            let indx = isArrayMember(evt.target,allkids)[1];
                            let iternum = arrgs.length - 5;
                            for(let b=5;b<=(arrgs.length-1);b++){
                                let kk = b - (arrgs.length - iternum);
                                if(kk == indx) arrgs[b] = evt.target.value;

                            }
                            canvdisplayctx.clearRect(0,0,arrgs[2],arrgs[3]);
                            funct(canvdisplayctx,[0,0],...arrgs);
                            
                        }

                    };
                       let label = document.createElement('label');label.textContent = labeller[k][key];
                       label.setAttribute('for',''+dinput.getAttribute('id'));
                       let wrapdiv = document.createElement('div');
                       wrapdiv.appendChild(label); wrapdiv.appendChild(dinput);
                       fields1.appendChild(wrapdiv);
                       containerdiv.appendChild(fields1);
                       
                   }
                }
           }
        }
        parentdiv.appendChild(containerdiv);
    }


    
   
    
    
    
   
    
}


//Config input settings


let currentShapePos = 0; let currentColorPos = 0; let cindexfwd = 0; let cindexfiller = [];
let canvdrawer = document.getElementById('drawer'); let cindexfwdcol = 0; let cindexfillercol = [];
canvdrawer.width = canvdrawer.clientWidth; canvdrawer.height = canvdrawer.clientHeight;
let drawWidth = 0.15 * canvdrawer.width; let drawHeight = 0.15 * canvdrawer.width;
let canvdrawerctx = canvdrawer.getContext('2d');


function positionCycleSetter(cindex,garray){
    let lengther = garray.length; let nextindex = cindex + 1;

    return (nextindex%lengther);
}
function positionCycleSetter1(cindex,garray){
    let lengther = garray.length-1; let nextindex = cindex + 1;

    return (nextindex%lengther);
}

function fwdReverseSetter(cindex,garray){
    let lengther =  garray.length - 1; let nextindex = cindex + 1;
    
    return Math.round(-(Math.abs(nextindex-lengther)) + lengther);
}

function randomPosSetter(garray){
    let lengther =  garray.length - 1;
    return (Math.floor(Math.random()*(lengther + 1)));
}

function recordInitials(evt){
    let xcoord = evt.clientX - evt.target.getBoundingClientRect().x; let ycoord = evt.clientY - evt.target.getBoundingClientRect().y;
    mouseCoordsArray.push([xcoord,ycoord]);
    let offcanver = document.createElement('canvas');
    offcanver.width = offcanver.height = canvdrawer.height;
    let offcvctx = offcanver.getContext('2d');
    
    console.log(currentShapePos+' is shape pos'); console.log(currentColorPos+' is colour pos');
    currentDrawPos = btnconfigarray[currentShapePos]; currentFill = colvalarray[currentColorPos];
    currentDrawPos.arglist[0] = currentFill; currentDrawPos.arglist[2] = offcanver.width;
    currentDrawPos.arglist[3] = offcanver.height;
    //currentDrawPos.currentfunc(canvdrawerctx,[xcoord-(drawWidth/2),ycoord-(drawHeight/2)],...currentDrawPos.arglist );
    currentDrawPos.currentfunc(offcvctx,[0,0],...currentDrawPos.arglist);
    canvdrawerctx.drawImage(offcanver,xcoord-(drawWidth/2),ycoord-(drawHeight/2),drawWidth,drawHeight);
    
    for(let j=0;j<=(2*(btnconfigarray.length-1));j++){
        cindexfiller[j] = j;
    }
    for(let j=0;j<=(2*(colvalarray.length-1));j++){
        cindexfillercol[j] = j;
    }
    switch(shapepattern){
        case 'linear': {currentShapePos = positionCycleSetter(currentShapePos,btnconfigarray); break;}
        case 'forwardreverse': {currentShapePos = fwdReverseSetter(cindexfwd,btnconfigarray); break;}
        case 'random': {currentShapePos = randomPosSetter(btnconfigarray); break;}
    }
    switch(colorpattern){
        case 'linear': {currentColorPos = positionCycleSetter(currentColorPos,colvalarray); break;}
        case 'forwardreverse': {currentColorPos = fwdReverseSetter(cindexfwdcol,colvalarray); break;}
        case 'random': {currentColorPos = randomPosSetter(colvalarray); break;}
    }
    cindexfwdcol = positionCycleSetter1(cindexfwdcol,cindexfillercol);
    cindexfwd = positionCycleSetter1(cindexfwd,cindexfiller);
}

function drawAlong(evt){
    let xcoord = evt.clientX - evt.target.getBoundingClientRect().x; let ycoord = evt.clientY - evt.target.getBoundingClientRect().y;
    if(mouseCoordsArray.length != 0){
       let firstm = mouseCoordsArray[0]; let current = [xcoord,ycoord];
       if((Math.floor(vectorLength(firstm,current) - drawWidth) > 1) && (mouseCoordsArray.length == 1)){
          mouseCoordsArray.push(current);
       }
       else if((Math.floor(vectorLength(firstm,current) - drawWidth) > 1) && (mouseCoordsArray.length != 1)){
         let last = mouseCoordsArray[mouseCoordsArray.length - 1];
         if((mouseCoordsArray.length == 2) && (dotProduct(vectorSubtract(firstm,last),vectorSubtract(firstm,current)) == 1)){
            mouseCoordsArray.pop(); mouseCoordsArray.push(current);
         }
         else if((mouseCoordsArray.length == 2) && (dotProduct(vectorSubtract(firstm,last),vectorSubtract(firstm,current)) != 1)){
            mouseCoordsArray.push(current);
         }
         else if((mouseCoordsArray.length > 2) && (Math.floor(vectorLength(last,current) - drawWidth) > 1) && (dotProduct(vectorSubtract(mouseCoordsArray[mouseCoordsArray.length-2],last),vectorSubtract(mouseCoordsArray[mouseCoordsArray.length-2],current)) == 1)){
            mouseCoordsArray.pop(); mouseCoordsArray.push(current);
         }
         else if((mouseCoordsArray.length > 2) && (Math.floor(vectorLength(last,current) - drawWidth) > 1) && (dotProduct(vectorSubtract(mouseCoordsArray[mouseCoordsArray.length-2],last),vectorSubtract(mouseCoordsArray[mouseCoordsArray.length-2],current)) != 1)){
            mouseCoordsArray.push(current);
         }
       }
    }
}
function resetcanvas(evt){
    if(mouseCoordsArray.length == 1) mouseCoordsArray = [];
    else if(mouseCoordsArray.length != 1){
        
        for(let i=0;i<=(mouseCoordsArray.length-1);i++){
            if(i != mouseCoordsArray.length-1){
                let current = mouseCoordsArray[i]; let next = mouseCoordsArray[i+1];
                let vlength = vectorLength(current,next); let veccheck = vectorSubtract(current,next);
                let dir1 = normalize(veccheck); let vecfinal = [drawWidth*dir1[0],drawWidth*dir1[1]];
                let ntimes = Math.floor(vlength/drawWidth); console.log('ntime is '+ ntimes);
                if((ntimes != 0) && (ntimes > 1)){
                    for(let k=0;k<=(ntimes-1);k++){
                        if(k != ntimes-1){
                            let point = vectorAdd(current,[(k+1)*vecfinal[0],(k+1)*vecfinal[1]]);
                            
                            
                            let offcanver = document.createElement('canvas');
                            offcanver.width = offcanver.height = canvdrawer.height;
                            let offcvctx = offcanver.getContext('2d');
                            currentDrawPos = btnconfigarray[currentShapePos]; currentFill = colvalarray[currentColorPos];
                            currentDrawPos.arglist[0] = currentFill; currentDrawPos.arglist[2] = offcanver.width;
                            currentDrawPos.arglist[3] = offcanver.height;

                            currentDrawPos.currentfunc(offcvctx,[0,0],...currentDrawPos.arglist);
                            canvdrawerctx.drawImage(offcanver,point[0]-(drawWidth/2),point[1]-(drawHeight/2),drawWidth,drawHeight);
                            for(let j=0;j<=(2*(btnconfigarray.length-1));j++){
                                cindexfiller[j] = j;
                            }
                            for(let j=0;j<=(2*(colvalarray.length-1));j++){
                                cindexfillercol[j] = j;
                            }
                            switch(shapepattern){
                                case 'linear': {currentShapePos = positionCycleSetter(currentShapePos,btnconfigarray); break;}
                                case 'forwardreverse': {currentShapePos = fwdReverseSetter(cindexfwd,btnconfigarray); break;}
                                case 'random': {currentShapePos = randomPosSetter(btnconfigarray); break;}
                            }
                            switch(colorpattern){
                                case 'linear': {currentColorPos = positionCycleSetter(currentColorPos,colvalarray); break;}
                                case 'forwardreverse': {currentColorPos = fwdReverseSetter(cindexfwdcol,colvalarray); break;}
                                case 'random': {currentColorPos = randomPosSetter(colvalarray); break;}
                            }
                            cindexfwdcol = positionCycleSetter1(cindexfwdcol,cindexfillercol);
                            cindexfwd = positionCycleSetter1(cindexfwd,cindexfiller);
                        }
                    }
                }
                else if((ntimes != 0) && (ntimes == 1)){
                    for(let k=0;k<=(ntimes-1);k++){
                        if(k == ntimes-1){
                            let point = vectorAdd(current,[(k+1)*vecfinal[0],(k+1)*vecfinal[1]]);
                            
                            
                            let offcanver = document.createElement('canvas');
                            offcanver.width = offcanver.height = canvdrawer.height;
                            let offcvctx = offcanver.getContext('2d');
                            currentDrawPos = btnconfigarray[currentShapePos]; currentFill = colvalarray[currentColorPos];
                            currentDrawPos.arglist[0] = currentFill; currentDrawPos.arglist[2] = offcanver.width;
                            currentDrawPos.arglist[3] = offcanver.height;

                            currentDrawPos.currentfunc(offcvctx,[0,0],...currentDrawPos.arglist);
                            canvdrawerctx.drawImage(offcanver,point[0]-(drawWidth/2),point[1]-(drawHeight/2),drawWidth,drawHeight);
                            for(let j=0;j<=(2*(btnconfigarray.length-1));j++){
                                cindexfiller[j] = j;
                            }
                            for(let j=0;j<=(2*(colvalarray.length-1));j++){
                                cindexfillercol[j] = j;
                            }
                            switch(shapepattern){
                                case 'linear': {currentShapePos = positionCycleSetter(currentShapePos,btnconfigarray); break;}
                                case 'forwardreverse': {currentShapePos = fwdReverseSetter(cindexfwd,btnconfigarray); break;}
                                case 'random': {currentShapePos = randomPosSetter(btnconfigarray); break;}
                            }
                            switch(colorpattern){
                                case 'linear': {currentColorPos = positionCycleSetter(currentColorPos,colvalarray); break;}
                                case 'forwardreverse': {currentColorPos = fwdReverseSetter(cindexfwdcol,colvalarray); break;}
                                case 'random': {currentColorPos = randomPosSetter(colvalarray); break;}
                            }
                            cindexfwdcol = positionCycleSetter1(cindexfwdcol,cindexfillercol);
                            cindexfwd = positionCycleSetter1(cindexfwd,cindexfiller);
                        }
                    }
                }
            }
        }
        mouseCoordsArray = [];
    }
}

 
function initiateDraw(){
    canvdrawer.addEventListener('mousedown',recordInitials);
    canvdrawer.addEventListener('mousemove',drawAlong);
    canvdrawer.addEventListener('mouseup',resetcanvas);
}
function endDraw(){
    canvdrawer.removeEventListener('mousedown',recordInitials);
    canvdrawer.removeEventListener('mousemove',drawAlong);
    canvdrawer.removeEventListener('mouseup',resetcanvas);
    currentShapePos = 0;currentColorPos = 0; cindexfwd = 0; cindexfiller = [];
    cindexfwdcol = 0; cindexfillercol = []; 
}

let bgsetter = document.querySelector('#maincontrols input[type="color"]');
bgsetter.onchange = (evt)=>{(document.getElementById('drawer')).style.backgroundColor = bgsetter.value;};

let buttonlist = document.querySelectorAll('#maincontrols button');
buttonlist[2].onclick = (evt)=>{
    let dcanv = document.getElementById('drawer'), dcanvctx = dcanv.getContext('2d');
    dcanvctx.clearRect(0,0,dcanv.width,dcanv.height);
}

buttonlist[3].onclick = (evt)=>{
    let maindiv = document.querySelector('#shapeconfig'); let kids = maindiv.children;
    while(kids.length > 1){ maindiv.removeChild(maindiv.lastElementChild);}
    shapeconfigcanv = [];
    let ncanv = maindiv.querySelector('#shapeconfig canvas'); let btn = maindiv.querySelector('#shapeconfig button');
    (ncanv.getContext('2d')).clearRect(0,0,ncanv.width,ncanv.height); 
    btn.parentElement.removeChild(btn);
    btnconfigarray = [];
}
buttonlist[4].onclick = (evt)=>{
    let kids = colgroup.children;
    while(kids.length > 1){ colgroup.removeChild(colgroup.lastElementChild);}
    colinput1.value = '#20b2aa'; colarray = [data1]; colvalarray = [colinput1.value];
    colgroup.appendChild(divaddcanv);
}
buttonlist[1].onclick = (evt)=>{
    drawState = !drawState;
    if(drawState){
        evt.target.textContent = 'End Draw';
        initiateDraw();
    }
    else if(!drawState){
        evt.target.textContent = 'Draw';
        endDraw();
    }
}






function drawcity(ctx,center,fill,windowfill,stroke,skycolor1,skycolor2,width,height,buildnumber){
    let skygrad = ctx.createLinearGradient(...[0.5*(width),0],...[0.5*(width),height]);
    skygrad.addColorStop(0.0,skycolor1); skygrad.addColorStop(0.5,skycolor2);
    ctx.fillStyle = skygrad;
    ctx.fillRect(...center,width,height);
    let diameter = 0.40*(height);let moonradius = 0.50*diameter; let moonstart = [(width/4),0.08*height];
    let moongrad = ctx.createLinearGradient(moonstart[0],moonstart[1],moonstart[0],moonstart[1]+diameter);
    moongrad.addColorStop(0.0,'rgb(206, 171, 56)'); moongrad.addColorStop(0.6,'rgb(179, 121, 45)');
    ctx.fillStyle = moongrad;
    let moonpath = new Path2D();
    moonpath.arc(moonstart[0],moonstart[1]+moonradius,moonradius,0,2*(Math.PI),true);
    ctx.fill(moonpath);

    let buildwidth = width/buildnumber;
    for(let j=0;j<=(buildnumber-1);j++){
       let  centerx = ((j*buildwidth) + ((j+1)*buildwidth))/2;
       let centery = height;
       drawBuilding(ctx,[centerx,centery],fill,windowfill,stroke,buildwidth,0.90*height,5);
    }
}



let imageAnim = new Image(animcanv.width,animcanv.height);
window.onload = (evt)=>{
    drawcity(anictx,[0,0],'rgb(22, 71, 90)','rgb(187, 185, 62)','black','rgb(112, 197, 169)','rgb(57, 70, 65)',animcanv.width,animcanv.height,14);
    let im1src = animcanv.toDataURL();
    imageAnim.src = im1src;
    
    //ANIMATE LOADING OF ELEMENTS
    let animevt = new Event('animevt'); let dt = 0;
    let helem = document.querySelector('#heading>h1'); let helemp = helem.parentElement;
    let helempos; let hdv; let hk1 = ''; let chiti,dicar;
    let helem4 = document.querySelector('#heading>h4');
    let helem4pos; let hdv2; let hk2 = ''; let chiti2,dicar2;
    if(helem){
              
              helempos = helem.style.left; hdv = helemp.clientWidth; 
              let kuj = helempos.split(''); 
              for(let k=0;k<=(kuj.length-3);k++){hk1 = hk1+kuj[k];}
              chiti = Number(hk1);  
              dicar = chiti - (2*hdv);
    }
    if(helem4){
              
        helem4pos = helem4.style.left; hdv2 = helemp.clientWidth;
        let kuj = helempos.split(''); 
        for(let k=0;k<=(kuj.length-3);k++){hk2 = hk2+kuj[k];}
        chiti2 = Number(hk2);  
        dicar2 = chiti2 - (2*hdv2);
}

    let anidivpos = anidiv.style.top; 
    let mimi = anidivpos.split(''); let jd = '';
    for(let k=0;k<=(mimi.length-3);k++){jd = jd+mimi[k];} 
    let dvon = Number(jd);
    let displaceranim = dvon - 2*nav.clientHeight;
    let anidivtimer = setInterval(function(){
           if((dt<25)){
            anidiv.style.top = `${((dvon-displaceranim)/25)*dt + displaceranim}px`;
            anidiv.style.opacity = `${4*dt}%`; 

           }
           if((dt<31)){
            helem.style.left = `${((chiti - dicar)/30)*dt + dicar}px`;

           }
           if((dt<36)){
            helem4.style.left = `${((chiti2 - dicar2)/35)*dt + dicar2}px`;

           }
           
           
           if(dt==36) anidiv.dispatchEvent(animevt);
           if(anidivpos == anidiv.style.top){ anidiv.style.top = anidivpos}
           dt+=1; 
    },33.33);
    anidiv.addEventListener('animevt',function(){clearInterval(anidivtimer);});
}



let offcanv1 = document.createElement('canvas'); offcanv1.width = animcanv.width; offcanv1.height = animcanv.height;
let offcanv1ctx = offcanv1.getContext('2d');

offcanv1ctx.save();
//offcanv1ctx.globalCompositeOperation = 'destination-in';
drawObi3(offcanv1ctx,[0,0],'white','black',offcanv1.width,offcanv1.height,10,210,30,45,5,40);
innerOffcanv(offcanv1ctx,[0,0],offcanv1.width,offcanv1.height);
offcanv1ctx.restore();
anictx.drawImage(offcanv1,0,0);

let buildccontrol = 0, sky1ccontrol = 0,sky2ccontrol = 0, speedcont = 0, nbuildcont = 0;

function redraw(time){
    let width1 = animcanv.width; let height1 = animcanv.height;

    let width ; let height;
    if(width1<=400) width = 0.25*width1;
    else if((width1>400) && (width1<=1000)) width = 0.19*width1;
    else if((width1>1000)) width = 0.18*width1;

    let outerRadius;// = 0.85*(width/2);
    if(width1<=400) outerRadius = 0.85*(width/2);
    else if((width1>400) && (width1<=1000)) outerRadius = 0.75*(width/2);
    else if((width1>1000)) outerRadius = 0.70*(width/2);

    let heightcorrect = (0.5*height1) - outerRadius;
   /* offcanv1ctx.save();
    offcanv1ctx.clearRect(0,0,width1,height1);
    drawObi3(offcanv1ctx,[0,0 + heightcorrect*Math.sin(2*(time/1000))],'white','black',offcanv1.width,offcanv1.height,10,210,30,45,5,40);
    innerOffcanv(offcanv1ctx,[0,0],offcanv1.width,offcanv1.height);
    offcanv1ctx.restore(); */

    anictx.clearRect(0,0,width1,height1);
    anictx.drawImage(imageAnim,0,0)
    
    anictx.drawImage(offcanv1,0,0 + heightcorrect*Math.sin(2*(time/1000)));

    buildControl.onchange = function(evt){
        let correctvalue = evt.target.value;
        nbuildcont+=1;
        animredraw(anictx,[0,0],buildColorControl.value,'rgb(187, 185, 62)','black',sky1Control.value,sky2Control.value,width1,height1,correctvalue,speedControl.value,heightcorrect,time);
    }
    speedControl.onchange = function(evt){
        let correctvalue = evt.target.value;
        speedcont +=1;
        animredraw(anictx,[0,0],buildColorControl.value,'rgb(187, 185, 62)','black',sky1Control.value,sky2Control.value,width1,height1,buildControl.value,correctvalue,heightcorrect,time);
    }
    buildColorControl.onchange = function(evt){
        let correctvalue = evt.target.value;
        buildccontrol +=1;
        animredraw(anictx,[0,0],correctvalue,'rgb(187, 185, 62)','black',sky1Control.value,sky2Control.value,width1,height1,buildControl.value,speedControl.value,heightcorrect,time);
    }
    sky1Control.onchange = function(evt){
        let correctvalue = evt.target.value;
        sky1ccontrol +=1;
        animredraw(anictx,[0,0],buildColorControl.value,'rgb(187, 185, 62)','black',correctvalue,sky2Control.value,width1,height1,buildControl.value,speedControl.value,heightcorrect,time);
    }
    sky2Control.onchange = function(evt){
        let correctvalue = evt.target.value;
        sky2ccontrol +=1;
        animredraw(anictx,[0,0],buildColorControl.value,'rgb(187, 185, 62)','black',sky1Control.value,correctvalue,width1,height1,buildControl.value,speedControl.value,heightcorrect,time);
    }
    requestAnimationFrame(redraw);
}

requestAnimationFrame(redraw);

function animredraw(ctx,center,fill,windowfill,stroke,skycolor1,skycolor2,width,height,buildnumber,speed,amplitude,time){
    
    let newbuildccontrol, newsky1ccontrol, newsky2ccontrol, newspeedcont, newnbuildcont;
    newbuildccontrol = (buildccontrol>0)?fill:'rgb(22, 71, 90)';
    newsky1ccontrol = (sky1ccontrol>0)?skycolor1:'rgb(112, 197, 169)';
    newsky2ccontrol = (sky2ccontrol>0)?skycolor2:'rgb(57, 70, 65)';
    newspeedcont = (speedcont>0)?speed:2.0;  console.log(newspeedcont);
    newnbuildcont = (nbuildcont>0)?buildnumber:14;

    let width1 = animcanv.width; let height1 = animcanv.height;
    ctx.clearRect(0,0,width1,height1);

    let offcanv2 = document.createElement('canvas'); offcanv2.width = animcanv.width; offcanv2.height = animcanv.height;
    let offcanv2ctx = offcanv2.getContext('2d');

    drawcity(offcanv2ctx,center,newbuildccontrol,windowfill,stroke,newsky1ccontrol,newsky2ccontrol,width1,height1,buildnumber);
    imageAnim.src = offcanv2.toDataURL();
    ctx.drawImage(imageAnim,0,0)
    ctx.drawImage(offcanv1,0,0 + amplitude*Math.sin(newspeedcont*(time/1000)));
}

function innerOffcanv(ctx,center,width,height){
    //ctx.save();
    //ctx.restore();
    let radius = (0.85*height) - (0.5*height);
    let mygrad = ctx.createLinearGradient(...[(0.5*width),(0.5*height)-radius],...[(0.5*width),(0.5*height)+radius]);
    let mygrad2 =ctx.createLinearGradient(...[(0.5*width),0],...[(0.5*width),height]);
    mygrad.addColorStop(0.0,'rgb(236, 188, 86)');  mygrad.addColorStop(0.5,'rgb(202, 114, 55)');
    mygrad2.addColorStop(0.0,'rgb(202, 101, 55)'); mygrad2.addColorStop(0.7,'rgb(148, 59, 18');
    ctx.fillStyle = mygrad2; ctx.fillRect(0,0,width,height);

    ctx.fillStyle = mygrad;
    let mycircle = new Path2D();
    mycircle.moveTo(...[(0.5*width),(0.5*height)]);
    mycircle.arc(...[(0.5*width),(0.5*height)],radius,0,2*(Math.PI),true);
    ctx.fill(mycircle);
    ctx.restore();

}

//scene logos
let scenedivs1 =  document.querySelectorAll('#canvobjs div');
if(scenedivs1){
    for(let j=0;j<=(scenedivs1.length-1);j++){
        let ww = scenedivs1[j].clientWidth;
        scenedivs1[j].style.height = `${ww}px`;
    }
}
let scenelogbtns = document.querySelectorAll('#canvobjs canvas');
if(scenelogbtns){
    for(let j=0;j<=(scenelogbtns.length-1);j++){
        scenelogbtns[j].width = scenelogbtns[j].parentElement.clientWidth;
        scenelogbtns[j].height = scenelogbtns[j].parentElement.clientHeight;
        let ctx = scenelogbtns[j].getContext('2d'); let w = scenelogbtns[j].width, h = scenelogbtns[j].height;
        if(j==0){drawTreeLogo(ctx,[0,0],'lightseagreen',w,h);}
        else{drawBuildLogo(ctx,[0,0],'lightseagreen',w,h);}
    }
}

//draw tree
function drawTreeLogo(ctx,center,fill,width,height){
    let drawHeight = 0.70*height; let textHeight = 0.30*height;
    ctx.save();
    ctx.strokeStyle = fill; ctx.lineWidth = 3;
    ctx.fillStyle = fill; let majorbranch = 0.10*width; let auxbranch = 0.04*width;
    let leaf = 0.09*width;
    let maintreewidth = 0.80*width, maintreeheight = 0.80*drawHeight;
    ctx.transform(1,0,0,-1,0.5*width,0.5*height);
    let p1 = [center[0]+ (majorbranch/2),center[1]-(0.20*(height/2))];
    let p2 = [center[0]+ (majorbranch/2),center[1]];
    let p3 = [center[0]+ (0.80*(maintreewidth/2)),center[1]+ (0.15*(height/2))] ;
    let p4 = perpFromLine(p2,p3,auxbranch,false)[1];
    let p5 = vectorAdd(p4,vectorSubtract(p3,p2));
    let p6 = [center[0]-(0.08*(width/2)),center[1]+((80/100)*(0.72*(height/2)))];
    let p7 = perpFromLine(p5,p6,auxbranch,false)[1];
    let p8 = [p5[0]-auxbranch,p5[1]]; let p9 = [center[0]-(0.48*(width/2)),center[1]+ (0.17*(height/2))];
    let p10 = perpFromLine(p8,p9,auxbranch,false)[1]; let p11 = [center[0]- (majorbranch/2),center[1]-(0.03*(height/2))];
    let p12 = [p1[0]-majorbranch,p1[1]];
    
    let px1 = vectorAdd(pointOnLine(0.5,...p3,...p4),scalarmul(leaf,normalize(vectorSubtract(p2,p3))));
    let px2 = vectorAdd(pointOnLine(0.4,...p6,...p7),scalarmul(leaf,normalize(vectorSubtract(p5,p6))));
    let px3 = vectorAdd(pointOnLine(0.55,...p9,...p10),scalarmul(leaf,normalize(vectorSubtract(p8,p9))));

    ctx.beginPath();ctx.moveTo(...p3);
    ctx.bezierCurveTo(...addControlPoints(p3,px1,false,55,3,true,true,0.68)[0],...addControlPoints(p3,px1,false,55,3,true,true,0.68)[1],...px1);
    ctx.bezierCurveTo(...addControlPoints(px1,p4,false,55,3,true,true,0.68)[0],...addControlPoints(px1,p4,false,55,3,true,true,0.68)[1],...p4);
    ctx.lineTo(...p3); ctx.fill();

    ctx.beginPath();ctx.moveTo(...p6);
    ctx.bezierCurveTo(...addControlPoints(p6,px2,false,55,3,true,true,0.69)[0],...addControlPoints(p6,px2,false,55,3,true,true,0.69)[1],...px2);
    ctx.bezierCurveTo(...addControlPoints(px2,p7,false,45,3,true,true,0.65)[0],...addControlPoints(px2,p7,false,45,3,true,true,0.65)[1],...p7);
    ctx.lineTo(...p6); ctx.fill();

    ctx.beginPath();ctx.moveTo(...p9);
    ctx.bezierCurveTo(...addControlPoints(p9,px3,false,55,3,true,true,0.63)[0],...addControlPoints(p9,px3,false,55,3,true,true,0.63)[1],...px3);
    ctx.bezierCurveTo(...addControlPoints(px3,p10,false,55,3,true,true,0.65)[0],...addControlPoints(px3,p10,false,55,3,true,true,0.65)[1],...p10);
    ctx.lineTo(...p9); ctx.fill();


    ctx.beginPath();
    ctx.moveTo(...p1); ctx.bezierCurveTo(...addControlPoints(p1,p2,true,27,3,false,true,0.30)[0],...addControlPoints(p1,p2,true,27,3,false,true,0.30)[1],...p2);
    ctx.bezierCurveTo(...addControlPoints(p2,p3,true,13,8,true,true,0.36)[0],...addControlPoints(p2,p3,true,13,8,true,true,0.36)[1],...p3);
    ctx.lineTo(...p4);
    ctx.bezierCurveTo(...addControlPoints(p4,p5,false,4,4,true,true,0.35)[0],...addControlPoints(p4,p5,false,4,4,true,true,0.35)[1],...p5);
    ctx.bezierCurveTo(...addControlPoints(p5,p6,false,6,6,true,true,0.34)[0],...addControlPoints(p5,p6,false,6,6,true,true,0.34)[1],...p6);
    ctx.lineTo(...p7);
    ctx.bezierCurveTo(...addControlPoints(p7,p8,true,16,6,true,true,0.35)[0],...addControlPoints(p7,p8,true,16,6,true,true,0.35)[1],...p8);
    ctx.bezierCurveTo(...addControlPoints(p8,p9,false,6,6,true,true,0.36)[0],...addControlPoints(p8,p9,false,6,6,true,true,0.36)[1],...p9);
    ctx.lineTo(...p10);
    ctx.bezierCurveTo(...addControlPoints(p10,p11,true,6,56,false,true,0.30)[0],...addControlPoints(p10,p11,true,6,56,false,true,0.30)[1],...p11);
    ctx.bezierCurveTo(...addControlPoints(p11,p12,false,13,2,false,true,0.30)[0],...addControlPoints(p11,p12,false,13,2,false,true,0.30)[1],...p12);
    ctx.lineTo(...p1);
    ctx.fill();
    ctx.strokeRect(center[0]-(width/2),center[1]+(height/2),width,0.70*height);
    

    ctx.restore();
    ctx.save(); ctx.translate(0.5*width,0.5*height); ctx.fillStyle = fill;
    ctx.font = `bold ${0.30*(height)}px serif`; 
    ctx.textAlign = 'start'; ctx.textBaseline = 'top';
    ctx.fillText('Add Tree',center[0]-(width/2),center[1]+(0.20*(height/2)),width);
    ctx.restore();
}

function drawBuildLogo(ctx,center,fill,width,height){
    ctx.save();
    ctx.strokeStyle = fill;
    ctx.fillStyle = fill; let houseW = 0.60*width; let buildW = 0.75*width; let buildH = 0.25*height;
    ctx.transform(1,0,0,-1,0.5*width,0.5*height);
    let p1 = [center[0],center[1]-(0.10*height)]; let p2 = [p1[0]+(houseW/2),p1[1]];
    let p3 = [p2[0],p2[1]+buildH]; let p4 = [p3[0]+((buildW/2)-(houseW/2)),p3[1]];
    let p5 = [p3[0],center[1]+(0.20*height)]; let p6 = [p5[0],p5[1]+(0.20*height)];
    let p7 = [p6[0]-(0.25*(houseW/2)),p6[1]];
    let p8 = rayIntersection(p7,vectorSubtract(p7,vectorAdd(center,vectorSubtract([center[0],p7[1]],p7))),p4,vectorSubtract(p4,[center[0],center[1]+(0.45*height)]));
    let p9 = [center[0],center[1]+(0.45*height)]; let p10 = [p4[0]-buildW,p4[1]]; let p11 = [p4[0]-(buildW-((buildW/2)-(houseW/2))),p4[1]];
    let p12 = [p2[0]-houseW,p2[1]]; 

    let p13 = [center[0]+(0.5*(houseW/2)),center[1]]; let p14 = [p13[0],p13[1]+ (0.13*height)];
    let p15 = [p14[0]-(houseW/2),p14[1]]; let p16 = [p13[0]-(houseW/2),p13[1]];

    let bg = new Path2D();
    bg.moveTo(...p1); bg.lineTo(...p2); bg.lineTo(...p3); bg.lineTo(...p4); bg.lineTo(...p5);
    bg.lineTo(...p6); bg.lineTo(...p7); bg.lineTo(...p8); bg.lineTo(...p9); bg.lineTo(...p10);
    bg.lineTo(...p11); bg.lineTo(...p12); bg.lineTo(...p1);

    bg.moveTo(...p13); bg.lineTo(...p16); bg.lineTo(...p15); bg.lineTo(...p14); bg.lineTo(...p13);
    ctx.fill(bg,'nonzero');

    ctx.restore();
    ctx.strokeStyle = fill;
    ctx.fillStyle = fill;
    ctx.translate(0.5*width,0.5*height); ctx.textAlign = 'start'; ctx.textBaseline = 'top';
    ctx.font = `bold ${0.30*height}px serif`;
    ctx.fillText('Add Building',center[0]-(0.5*width),center[1]+(0.20*(height/2)),width);
    ctx.restore();
}
// SCENE BUILDER APP
let windowObj = function(winWidth,winHeight,winBase,panelWidth,horzPanCount,vertPanCount,panelCol,glasCol,inheritColor,wallcolor){
    this.winWidth = winWidth; this.winHeight = winHeight; this.winBase = winBase; this.panelWidth = panelWidth;
    this.horzPanCount = horzPanCount; this.vertPanCount = vertPanCount; this.panelCol = panelCol;
    this.glasCol = glasCol; this.glasWidth = 0.70*winWidth; this.siding = 0.05*winHeight;
    this.winSide = 0.15*winWidth;
};

let doorObj = function(doorWidth,doorHeight,doorBase,panelWidth,horzPanCount,vertPanCount,panelCol,glasCol,inheritColor,wallcolor){
    this.doorWidth = doorWidth; this.doorHeight = doorHeight; this.doorBase = doorBase; this.panelWidth = panelWidth;
    this.horzPanCount = horzPanCount; this.vertPanCount = vertPanCount; this.panelCol = panelCol;
    this.glasCol = glasCol; this.glasWidth = 0.70*doorWidth; this.siding = 0.05*doorHeight;
    this.doorSide = 0.15*doorWidth;
};

let sectionObj = function(sectWidth,winWidth,doorWidth,leftWallWidth,rightWallWidth,wallWidth,wallcolor){
    this.sectWidth = sectWidth; this.winWidth = winWidth; this.doorWidth = doorWidth; this.leftWallWidth = leftWallWidth;
    this.rightWallWidth = rightWallWidth; this.doors = []; this.windows = []; this.composition = [];
    this.wallcolor = wallcolor;this.walls = []; this.wallWidth = wallWidth;
};

let wallObj = function(sectionObj){
    this.width = sectionObj.wallWidth;
};

let floorObj = function(propHeight,baseHeight){
    this.propHeight = propHeight; this.baseHeight = baseHeight;
    this.floorheight = propHeight + baseHeight;
    this.sections = [];
};

let roofObj = function(baseHeight,topHeight,rooftype,roofColor,extWidth){
    this.baseHeight = baseHeight; this.topHeight = topHeight; this.rooftype = rooftype;
    this.roofColor = roofColor; this.extWidth = extWidth;
}

let buildObj = function(roofObj,floorarray){
    this.roofObj = roofObj; this.floorarray = floorarray; this.actualWidth;
    
}

function drawWindow(ctx,center,windowObj,floorheight,sectionObj){
    ctx.translate((sectionObj.winWidth/2),0);
    ctx.lineWidth = 1;
    if(windowObj.inheritColor){
        ctx.fillStyle = sectionObj.wallcolor;
    }
    else if(!windowObj.inheritColor){
        ctx.fillStyle = windowObj.wallcolor;
    }
    //left wall
    let p1 = [center[0]-(windowObj.glasWidth/2),center[1]-(floorheight/2)];
    let p2 = [p1[0],p1[1]+floorheight]; let p3 = [p2[0]-(windowObj.winSide),p2[1]];
    let p4 = [p3[0],p3[1]-floorheight];
    //right wall
    let p5 = [center[0]+(windowObj.glasWidth/2),center[1]-(floorheight/2)];
    let p6 = [p5[0]+(windowObj.winSide),p5[1]]; let p7 = [p6[0],p6[1]+floorheight];
    let p8 = [p7[0]-(windowObj.winSide),p7[1]];
    //main window
    //base
    windowObj.winBase = Math.min(windowObj.winBase,floorheight-(windowObj.winHeight-(2*windowObj.siding)));
    windowObj.winHeight = Math.min(windowObj.winHeight,floorheight-windowObj.winBase);
   
    let p9 = [p5[0],p5[1]+windowObj.winBase]; let p10 = [p9[0]-windowObj.glasWidth,p9[1]];
    //window siding
    let p11 = [p9[0],p9[1]+windowObj.siding]; let p12 = [p11[0]-windowObj.glasWidth,p11[1]]; //bottom siding
    let p13 = [p12[0],p12[1]+(windowObj.winHeight-(2*windowObj.siding))];
    let p14 = [p13[0]+windowObj.glasWidth,p13[1]]; let p15 = [p14[0],p14[1]+windowObj.siding];
    let p16 = [p15[0]-windowObj.glasWidth,p15[1]];
    
    ctx.fillRect(...p3,windowObj.winSide,floorheight); //left wall
    ctx.fillRect(...p8,windowObj.winSide,floorheight); //right wall
    ctx.fillRect(...p10,windowObj.glasWidth,windowObj.winBase); //window base
    ctx.fillRect(...p12,windowObj.glasWidth,windowObj.siding);  //bottom siding
    ctx.strokeRect(...p12,windowObj.glasWidth,windowObj.siding)
    ctx.fillRect(...p16,windowObj.glasWidth,windowObj.siding);  //top siding
    ctx.strokeRect(...p16,windowObj.glasWidth,windowObj.siding);
    ctx.fillRect(...p2,windowObj.glasWidth,floorheight-(windowObj.winHeight + windowObj.winBase));//top wall

    ctx.fillStyle = windowObj.glasCol;
    ctx.fillRect(...p13,windowObj.glasWidth,windowObj.winHeight-(2*windowObj.siding)); //glass

    //panel algorithm
    ctx.fillStyle = windowObj.panelCol;
    if(windowObj.horzPanCount >= 1){
        let gh = windowObj.winHeight-(2*windowObj.siding);
        let divh = (gh - (windowObj.horzPanCount*windowObj.panelWidth))/(windowObj.horzPanCount + 1);
        for(let j=1;j<=windowObj.horzPanCount;j++){
            ctx.fillRect(p13[0],p13[1]-((j*divh) + (j-1)*windowObj.panelWidth),windowObj.glasWidth,windowObj.panelWidth);
        }
    }
    if(windowObj.vertPanCount >= 1){
        let gh = windowObj.glasWidth; let gg = windowObj.winHeight-(2*windowObj.siding);
        let divh = (gh - (windowObj.vertPanCount*windowObj.panelWidth))/(windowObj.vertPanCount + 1);
        for(let j=1;j<=windowObj.vertPanCount;j++){
            ctx.fillRect(p13[0]+((j*divh) + (j-1)*windowObj.panelWidth),p13[1],windowObj.panelWidth,gg);
        }
    }
    ctx.translate((sectionObj.winWidth/2),0);
}
function drawDoor(ctx,center,doorObj,floorheight,sectionObj){
    ctx.translate((sectionObj.doorWidth/2),0);
    ctx.lineWidth = 1;
    if(doorObj.inheritColor){
        ctx.fillStyle = sectionObj.wallcolor;
    }
    else if(!doorObj.inheritColor){
        ctx.fillStyle = doorObj.wallcolor;
    }
    //left wall
    let p1 = [center[0]-(doorObj.glasWidth/2),center[1]-(floorheight/2)];
    let p2 = [p1[0],p1[1]+floorheight]; let p3 = [p2[0]-(doorObj.doorSide),p2[1]];
    let p4 = [p3[0],p3[1]-floorheight];
    //right wall
    let p5 = [center[0]+(doorObj.glasWidth/2),center[1]-(floorheight/2)];
    let p6 = [p5[0]+(doorObj.doorSide),p5[1]]; let p7 = [p6[0],p6[1]+floorheight];
    let p8 = [p7[0]-(doorObj.doorSide),p7[1]];
    //main window
    //base
    doorObj.doorBase = Math.min(doorObj.doorBase,floorheight-(doorObj.doorHeight-(2*doorObj.siding)));
    doorObj.doorHeight = Math.min(doorObj.doorHeight,floorheight-doorObj.doorBase);
   
    let p9 = [p5[0],p5[1]+doorObj.doorBase]; let p10 = [p9[0]-doorObj.glasWidth,p9[1]];
    //window siding
    let p11 = [p9[0],p9[1]+doorObj.siding]; let p12 = [p11[0]-doorObj.glasWidth,p11[1]]; //bottom siding
    let p13 = [p12[0],p12[1]+(doorObj.doorHeight-(2*doorObj.siding))];
    let p14 = [p13[0]+doorObj.glasWidth,p13[1]]; let p15 = [p14[0],p14[1]+doorObj.siding];
    let p16 = [p15[0]-doorObj.glasWidth,p15[1]];
    
    ctx.fillRect(...p3,doorObj.doorSide,floorheight); //left wall
    ctx.fillRect(...p8,doorObj.doorSide,floorheight); //right wall
    ctx.fillRect(...p10,doorObj.glasWidth,doorObj.doorBase); //window base
    ctx.fillRect(...p12,doorObj.glasWidth,doorObj.siding);  //bottom siding
    ctx.strokeRect(...p12,doorObj.glasWidth,doorObj.siding)
    ctx.fillRect(...p16,doorObj.glasWidth,doorObj.siding);  //top siding
    ctx.strokeRect(...p16,doorObj.glasWidth,doorObj.siding);
    ctx.fillRect(...p2,doorObj.glasWidth,floorheight-(doorObj.doorHeight + doorObj.doorBase));//top wall

    ctx.fillStyle = doorObj.glasCol;
    ctx.fillRect(...p13,doorObj.glasWidth,doorObj.doorHeight-(2*doorObj.siding)); //glass

    //panel algorithm
    ctx.fillStyle = doorObj.panelCol;
    if(doorObj.horzPanCount >= 1){
        let gh = doorObj.doorHeight-(2*doorObj.siding);
        let divh = (gh - (doorObj.horzPanCount*doorObj.panelWidth))/(doorObj.horzPanCount + 1);
        for(let j=1;j<=doorObj.horzPanCount;j++){
            ctx.fillRect(p13[0],p13[1]-((j*divh) + (j-1)*doorObj.panelWidth),doorObj.glasWidth,doorObj.panelWidth);
        }
    }
    if(doorObj.vertPanCount >= 1){
        let gh = doorObj.glasWidth; let gg = doorObj.doorHeight-(2*doorObj.siding);
        let divh = (gh - (doorObj.vertPanCount*doorObj.panelWidth))/(doorObj.vertPanCount + 1);
        for(let j=1;j<=doorObj.vertPanCount;j++){
            ctx.fillRect(p13[0]+((j*divh) + (j-1)*doorObj.panelWidth),p13[1],doorObj.panelWidth,gg);
        }
    }
    ctx.translate((sectionObj.doorWidth/2),0);
}
function drawWall(ctx,center,wallObj,floorheight,sectionObj){
      ctx.translate(wallObj.width/2,0); ctx.fillStyle = sectionObj.wallcolor;
      ctx.fillRect(center[0]-(wallObj.width/2),center[1]+(floorheight/2),wallObj.width,floorheight);
      ctx.translate(wallObj.width/2,0);
}
function drawRoof(ctx,center,roofObj,sectionObj,buildObj){
    ctx.fillStyle = sectionObj.wallcolor; ctx.lineWidth = 1;
    ctx.translate(-buildObj.actualWidth/2,((buildObj.floorarray[buildObj.floorarray.length-1]).propHeight)/2);
    let p1 = [center[0]+(buildObj.actualWidth/2),center[1]]; let p2 = [p1[0],p1[1]+(roofObj.baseHeight)];
    let p3 = [p2[0]-(buildObj.actualWidth),p2[1]]; let p4 = [p3[0],p3[1]-(roofObj.baseHeight)];
    //hip roof points
    let p5 = [p2[0]+roofObj.extWidth,p2[1]]; let p6 = [p2[0],p2[1]+(roofObj.topHeight)] ;
    let p7 = [p6[0]-(buildObj.actualWidth),p6[1]]; let p8 = [p5[0]-(buildObj.actualWidth+(2*roofObj.extWidth)),p5[1]];

    //gable roof points
    let p9 = [pointOnLine(0.5,...p8,...p5)[0],pointOnLine(0.5,...p8,...p5)[1] + roofObj.topHeight]; 
    let p10 = [p9[0],p9[1]-(roofObj.extWidth)];

    //flat roof points
    let p11 = [p5[0],p5[1]+roofObj.topHeight]; let p12 = [p11[0]-(buildObj.actualWidth+(2*roofObj.extWidth)),p11[1]];
    //draw base
    ctx.fillRect(...p3,buildObj.actualWidth,roofObj.baseHeight);
    if(roofObj.rooftype == 'gable'){
        ctx.beginPath();
        ctx.moveTo(...p10); ctx.lineTo(...p3); ctx.lineTo(...p2); ctx.lineTo(...p10);
        ctx.fill();
        ctx.fillStyle = roofObj.roofColor;
        ctx.beginPath(); ctx.moveTo(...p10); ctx.lineTo(...p2); ctx.lineTo(...p5); ctx.lineTo(...p9);
        ctx.lineTo(...p8); ctx.lineTo(...p3); ctx.lineTo(...p10);
        ctx.fill(); ctx.stroke();
    }
    if(roofObj.rooftype == 'flat'){
        ctx.beginPath(); ctx.fillStyle = roofObj.roofColor;
        ctx.moveTo(...p5); ctx.lineTo(...p11); ctx.lineTo(...p12); ctx.lineTo(...p8);
        ctx.lineTo(...p5);
        ctx.fill(); ctx.stroke();
    }
    if(roofObj.rooftype == 'hip'){
        ctx.beginPath(); ctx.fillStyle = roofObj.roofColor;
        ctx.moveTo(...p5); ctx.lineTo(...p6); ctx.lineTo(...p7); ctx.lineTo(...p8); ctx.lineTo(...p5);
        ctx.fill(); ctx.stroke();
        let p1mid = pointOnLine(0.5,...p7,...p6); let v1p1mid;
        let p1start = {p:p7,v:vectorSubtract(p7,p8)}; let p1end = {p:p6,v:vectorSubtract(p6,p5)};
        let p2line = {p:p8,v:vectorSubtract(p8,p5)};
        let p2mid = pointOnLine(0.5,...p8,...p5); v1p1mid = vectorSubtract(p1mid,p2mid);
        
        //zinc lines algorithm
        let vl1 = vectorLength(p7,p1mid); let vl1width = vl1/6;
        for(let j=0;j<=6;j++){
            let ptop = [p7[0]+(j*vl1width),p7[1]]; let t = (vectorLength(p7,ptop))/vl1;
            let vline = vectorInterpolate(t,p1start.v,v1p1mid); let pbottom = vectorAdd(ptop,vline);
            ctx.beginPath(); ctx.moveTo(...ptop); ctx.lineTo(...pbottom);
            ctx.stroke();
        }
        let vl2 = vectorLength(p1mid,p6); let vl2width = vl2/6;
        for(let j=0;j<=6;j++){
            let ptop = [p1mid[0]+(j*vl2width),p1mid[1]]; let t = (vectorLength(p1mid,ptop))/vl2;
            let vline = vectorInterpolate(t,v1p1mid,p1end.v); let pbottom = vectorAdd(ptop,vline);
            ctx.beginPath(); ctx.moveTo(...ptop); ctx.lineTo(...pbottom);
            ctx.stroke();
        }
    }
}

function chooseDraw(sec,ctx,center,buildObj,floorObj){
    let comp = sec.composition;
    for(let i=0;i<=(comp.length-1);i++){
        switch(comp[i]){
            case 'door': {drawDoor(ctx,center,sec.doors[0],floorObj.floorheight,sec); break}
            case 'wall': {drawWall(ctx,center,sec.walls[2],floorObj.floorheight,sec); break}
            case 'wallLeft': {drawWall(ctx,center,sec.walls[0],floorObj.floorheight,sec); break}
            case 'wallRight': {drawWall(ctx,center,sec.walls[1],floorObj.floorheight,sec); break}
            case 'roof': {drawRoof(ctx,center,buildObj.roofObj,sec,buildObj); break}
            case 'window':{drawWindow(ctx,center,sec.windows[0],floorObj.floorheight,sec); break}
        }
    }
}

function drawHouse(ctx,center,width,height,buildObj){
    let mfloors = buildObj.floorarray;
    let offcanv = document.createElement('canvas'); let offcanvctx = offcanv.getContext('2d');
    offcanv.width = width; offcanv.height = height;
    let firstFloor = mfloors[0];
    let center2 = [0,0]; 
    let summ = 0;
    for(let i=0;i<=((mfloors.sections.length)-1);i++){
        let secwidth = mfloors.sections[i].actualWidth;
        summ += secwidth;
    }
    buildObj.actualWidth = summ; 
    offcanvctx.fillStyle = mfloors[mfloors.length-1].sections[0].wallcolor;
    // draw for each floor
    offcanvctx.translate(center[0],center[1]);
    for(let k=0;k<=(mfloors.length-1);k++){
        if((k=0) || (k!=(mfloors.length-1))){
            offcanvctx.fillRect(center2[0]-((summ/2)+buildObj.roofObj.extWidth),center2[1]+(buildObj.floorarray[0].baseHeight),(summ+(2*buildObj.roofObj.extWidth)),buildObj.floorarray[0].baseHeight);
            offcanvctx.translate(-(summ/2),((buildObj.floorarray[0].baseHeight)+((buildObj.floorarray[0].propHeight)/2)));
            for(let j=0;j<=(mfloors[k].sections.length-1);j++){
                chooseDraw(mfloors[k].sections[j],offcanvctx,[0,0],buildObj,mfloors[k]);
            }
            offcanvctx.translate(-(summ/2),(mfloors[k].propHeight)/2);
        }
        else if(k = (mfloors.length-1)){
            offcanvctx.fillRect(center2[0]-((summ/2)+buildObj.roofObj.extWidth),center2[1]+(buildObj.floorarray[k].baseHeight),(summ+(2*buildObj.roofObj.extWidth)),buildObj.floorarray[0].baseHeight);
            offcanvctx.translate(-(summ/2),((buildObj.floorarray[k].baseHeight)+((buildObj.floorarray[k].propHeight)/2)));
            for(let j=0;j<=(mfloors[k].sections.length-1);j++){
                chooseDraw(mfloors[k].sections[j],offcanvctx,[0,0],buildObj,mfloors[k]);
            }
        }
        else{
            offcanvctx.fillRect(center2[0]-((summ/2)+buildObj.roofObj.extWidth),center2[1]+(buildObj.floorarray[k].baseHeight),(summ+(2*buildObj.roofObj.extWidth)),buildObj.floorarray[k].baseHeight);
            offcanvctx.translate(-(summ/2),((buildObj.floorarray[k].baseHeight)+((buildObj.floorarray[k].propHeight)/2)));
            for(let j=0;j<=(mfloors[k].sections.length-1);j++){
                chooseDraw(mfloors[k].sections[j],offcanvctx,[0,0],buildObj,mfloors[k]);
            }
            offcanvctx.translate(-(summ/2),(mfloors[k].propHeight)/2);
        }
       
    }
    
   drawRoof(offcanvctx,[0,0],buildObj.roofObj,buildObj.floorarray[buildObj.floorarray.length-1].sections[0],buildObj);
   ctx.drawImage(offcanv,0,0);
   let imagine = document.createElement('img');
   imagine.src = offcanv.toDataURL();
   return imagine;
}
//tree object
function treeObj(treelightcol,treeleafcol,maxtrunkwidth,mintrunkwidth,mainbranchpercentage,mainbranchlengthvariation,childbranchpercent,lengthcurvetype,trunklength,pruneextent){
    this.treelightcol = treelightcol; this.treeleafcol = treeleafcol; this.maxtrunkwidth = maxtrunkwidth;
    this.mintrunkwidth = mintrunkwidth; this.mainbranchpercentage = mainbranchpercentage;
    this.mainbranchlengthvariation = mainbranchlengthvariation; this.childbranchpercent = childbranchpercent;
    this.trunklength = trunklength; this.pruneextent = pruneextent;
    this.lengthcurvetype = lengthcurvetype;
}

function drawTrunk(ctx,pos,dirVector,maxlengthy,maxwidth,minwidth,trunktype,baseObj){
    let unitTangent = normalize(baseObj.tangent);  let unitNormal = normalize(baseObj.normal);
    let p0 = vectorAdd(pos,scalarmul(maxwidth/2,unitTangent));
    let dirRad = degToRad(dirVector);      let p2,p3;
    let leftn1 = mat2Transform(...unitNormal,Math.cos(dirRad),-Math.sin(dirRad),Math.sin(dirRad),Math.cos(dirRad));
    let rightn1 = mat2Transform(...unitNormal,Math.cos(dirRad),Math.sin(dirRad),-Math.sin(dirRad),Math.cos(dirRad));
    let dirArray = [leftn1,unitNormal,rightn1];   let randf = Math.floor(3*Math.random());
    let correctVector = dirArray[randf];
    let centralTop = vectorAdd(pos,scalarmul(maxlengthy,correctVector));
    let leftT1 = mat2Transform(...unitTangent,Math.cos(dirRad),-Math.sin(dirRad),Math.sin(dirRad),Math.cos(dirRad));
    let rightT1 = mat2Transform(...unitTangent,Math.cos(dirRad),Math.sin(dirRad),-Math.sin(dirRad),Math.cos(dirRad));
    let TArray = [leftT1,unitTangent,rightT1]; let correctTangent = TArray[randf];
    if((minwidth != 0) && (trunktype != 'maintrunk')){
        p2 = vectorAdd(centralTop,scalarmul(minwidth/2,correctTangent));
        p3 = vectorAdd(centralTop,scalarmul(-(minwidth/2),correctTangent));
    }
    else if((minwidth != 0) && (trunktype == 'maintrunk')){
        if(baseObj.trunkAngled){
            p2 = vectorAdd(centralTop,scalarmul(minwidth/2,correctTangent));
            p3 = vectorAdd(centralTop,scalarmul(-(minwidth/2),correctTangent));
        }
        else if(!baseObj.trunkAngled){
            let newCenterTop = vectorAdd(pos,scalarmul(maxlengthy,unitNormal));
            p2 = vectorAdd(newCenterTop,scalarmul(minwidth/2,TArray[1]));
            p3 = vectorAdd(newCenterTop,scalarmul(-(minwidth/2),TArray[1]));
        }
    }
    else if((minwidth == 0) && (trunktype != 'maintrunk')){ p2 = centralTop;}
    else if((minwidth == 0) && (trunktype == 'maintrunk')){
        if(baseObj.trunkAngled){
            p2 = centralTop;            
        }
        else if(!baseObj.trunkAngled){p2 = vectorAdd(pos,scalarmul(maxlengthy,unitNormal));}
    }

    let widthinterpolate = ((1-0.4)*maxwidth) + ((0.4)*minwidth);
    let p1 = vectorAdd((pointOnLine(0.4,pos,scalarmul(maxlengthy,unitNormal))),scalarmul(widthinterpolate,unitTangent));
    let p4 = vectorAdd((pointOnLine(0.4,pos,scalarmul(maxlengthy,unitNormal))),scalarmul(-widthinterpolate,unitTangent));
    let p5 = vectorAdd(pos,scalarmul(-(maxwidth/2),unitTangent));

    //Control points
    let c0,c1,c2,c3,c4,c5,c6,c7,c8,c9; //c0,c1 for p0 to p1
    if(correctVector == dirArray[0]){
        c0 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[0];
        c1 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[1];
        c2 = addControlPoints(p1,p2,false,3,15,false,true,0.4)[0];
        c3 = addControlPoints(p1,p2,false,3,15,false,true,0.4)[1];
        if(p3){
            c4 = vectorAdd(p3,vectorSubtract(p2,c3));
            c8 = addControlPoints(p2,p3,false,8,8,true,true,0.4)[0];
            c9 = addControlPoints(p2,p3,false,8,8,true,true,0.4)[1];
        }
        c5 = vectorAdd(p4,vectorSubtract(p1,c2));
        c6 = addControlPoints(p4,p5,true,3,15,false,true,0.4)[0];
        c7 = addControlPoints(p4,p5,true,3,15,false,true,0.4)[1];
    }
    else if(correctVector == dirArray[2]){
        c0 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[0];
        c1 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[1];
        c2 = vectorAdd(p1,[-(vectorSubtract(p1,c1)[0]),-(vectorSubtract(p1,c1)[1])]);
        c3 = addControlPoints(p1,p2,true,3,15,false,true,0.4)[1];
        if(p3){
            c4 = vectorAdd(p3,vectorSubtract(p2,c3));
            c8 = addControlPoints(p2,p3,false,8,8,true,true,0.4)[0];
            c9 = addControlPoints(p2,p3,false,8,8,true,true,0.4)[1];
        }
        c5 = vectorAdd(p4,vectorSubtract(p1,c2));
        c6 = addControlPoints(p4,p5,true,3,15,false,true,0.4)[0];
        c7 = addControlPoints(p4,p5,true,3,15,false,true,0.4)[1];
    }
    else if(correctVector == dirArray[1]){
        c0 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[0];
        c1 = addControlPoints(p0,p1,true,15,3,false,true,0.4)[1];
    }
}


function drawTree(ctx,center,width,height,treeObj){
    let offcanv = document.createElement('canvas'); let offcanvctx = offcanv.getContext('2d');
    let canvheight = (60/100)*height; offcanv.width = offcanv.height = canvheight;
    offcanvctx.translate(canvheight/2,canvheight);
    
}

function drawAdd(ctx,center,fill,stroke,width1,height1,linewidth,radius,offset){
    ctx.save();
    ctx.strokeStyle = fill;
    ctx.fillStyle = fill;
    ctx.lineWidth = linewidth;
    ctx.transform(1,0,0,-1,0.5*width1,0.5*height1); let radius1 = (radius/100)*(0.5*height1);
    radius = Math.min(radius1,0.85*(0.5*height1)); 
    let theta = (2*(Math.PI))/4; let radvec = [radius - center[0],radius - center[1]];
    let p1 = [(center[0]+radvec[0])*Math.cos(0 + offset),(center[0]+radvec[0])*Math.sin(0 + offset)];
    let p3 = [(center[0]+radvec[0])*Math.cos(theta - offset),(center[0]+radvec[0])*Math.sin(theta - offset)];
    let p2 = rayIntersection(p1,[-1,0],p3,[0,-1]);
    let p4 = [(center[0]+radvec[0])*Math.cos(theta + offset),(center[0]+radvec[0])*Math.sin(theta + offset)];
    let p6 = [(center[0]+radvec[0])*Math.cos((2*theta) - offset),(center[0]+radvec[0])*Math.sin((2*theta) - offset)];
    let p5 = rayIntersection(p6,[1,0],p4,[0,-1]);
    let p7 = [(center[0]+radvec[0])*Math.cos((2*theta) + offset),(center[0]+radvec[0])*Math.sin((2*theta) + offset)];
    let p9 = [(center[0]+radvec[0])*Math.cos((3*theta) - offset),(center[0]+radvec[0])*Math.sin((3*theta) - offset)];
    let p8 = rayIntersection(p7,[1,0],p9,[0,1]);
    let p10 = [(center[0]+radvec[0])*Math.cos((3*theta) + offset),(center[0]+radvec[0])*Math.sin((3*theta) + offset)];
    let p12 = [(center[0]+radvec[0])*Math.cos((4*theta) - offset),(center[0]+radvec[0])*Math.sin((4*theta) - offset)];
    let p11 = rayIntersection(p12,[-1,0],p10,[0,1]);

    let crosspath = new Path2D(); let cpath = new Path2D();
    crosspath.moveTo(...p1);
    crosspath.lineTo(...p2);
    crosspath.lineTo(...p3);
    crosspath.lineTo(...p4);
    crosspath.lineTo(...p5);  crosspath.lineTo(...p6);  crosspath.lineTo(...p7); crosspath.lineTo(...p8);
    crosspath.lineTo(...p9);  crosspath.lineTo(...p10); crosspath.lineTo(...p11); crosspath.lineTo(...p12);
    crosspath.lineTo(...p1);
    ctx.fill(crosspath);
    cpath.arc(...center,radius,0,2*Math.PI,true); ctx.stroke(cpath);
}




function drawObi3(ctx,center,fill,stroke,width1,height1,linewidth,startAngle1,endAngle1,radiusOffset,spacing,innerOffset){
    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = linewidth;
    let width ; let height;
    if(width1<=400) width = 0.25*width1;
    else if((width1>400) && (width1<=1000)) width = 0.19*width1;
    else if((width1>1000)) width = 0.18*width1;
    ctx.transform(1,0,0,-1,0.5*width1,0.5*height1);
    
    let outerRadius;// = 0.85*(width/2);
    if(width1<=400) outerRadius = 0.85*(width/2);
    else if((width1>400) && (width1<=1000)) outerRadius = 0.75*(width/2);
    else if((width1>1000)) outerRadius = 0.70*(width/2);

    let newOffset = (radiusOffset/100)*outerRadius;
    let innerRadius = outerRadius - newOffset;
    let radSA = degToRad(startAngle1),radEA = degToRad(endAngle1);
    
    let startAngle2 = endAngle1 + spacing; let radSA2 = degToRad(startAngle2);
    let endAngle2 = startAngle1 - spacing; let radEA2 = degToRad(endAngle2);
    let obipath = new Path2D();
    
    obipath.arc(center[0],center[1],outerRadius,radSA,radEA,false);
    obipath.arc(center[0],center[1],innerRadius,radEA,radSA,true);
    ctx.fill(obipath,'evenodd');
    let bpath = new Path2D();
    
    bpath.arc(center[0],center[1],outerRadius,radSA2,radEA2,false);
    bpath.arc(center[0],center[1],innerRadius,radEA2,radSA2,true);
    ctx.fill(bpath,'evenodd');

    let bRad = innerRadius - 8;
    let midB = 0.50*bRad;
    let midangleDEG = startAngle1 + 90;
    let midangle = degToRad(midangleDEG);
    let p1 = [bRad*Math.cos(radSA),bRad*Math.sin(radSA)];
    let p5 = [bRad*Math.cos(radEA),bRad*Math.sin(radEA)];
    let p1vector = [p1[0]-center[0],p1[1]-center[1]];
    let p5vector = [p5[0]-center[0],p5[1]-center[1]];
    let p3 = [midB*Math.cos(midangle),midB*Math.sin(midangle)];
    let p2 = [p3[0]+p1vector[0],p3[1]+p1vector[1]];
    let p4 = [p3[0]+p5vector[0],p3[1]+p5vector[1]];
    let midp2p3 = pointOnLine(0.5,...p2,...p3);let p3vector = [p3[0]-center[0],p3[1]-center[1]];
    let cp1 = [midp2p3[0]+p3vector[0],midp2p3[1]+p3vector[1]];
    let midp3p4 = pointOnLine(0.5,...p3,...p4);
    let cp2 = [midp3p4[0]+p3vector[0],midp3p4[1]+p3vector[1]];

    //inner B
    let midop1 = pointOnLine(0.5,...center,...p1);
    let midop1CP1 = vectorSubtract(midop1,cp1); //vector 4rm mid of op1 to cp1
    let mid1 = pointOnLine(0.5,...midop1,...cp1); let lengthMid1 = vectorLength(mid1,midop1);
    let innerBRad = (innerOffset/100)*vectorLength(midop1,cp1);
    let tp6p7 = (innerBRad)/lengthMid1; let midp6p71 = pointOnLine(tp6p7,...midop1CP1,...midop1);

    let vec1 = vectorSubtract(mid1,midp6p71);  //points upwards
    let vec2 = mat2Transform(...vec1,Math.cos(degToRad(180)),-Math.sin(degToRad(180)),Math.sin(degToRad(180)),Math.cos(degToRad(180)));
    

    let tinnerBRadOnOP1 = (innerBRad)/bRad;
    let tinnerp = pointOnLine(tinnerBRadOnOP1,...center,...p1);let traceVector = vectorSubtract(center,tinnerp);
    let p6 = vectorAdd(midp6p71,traceVector); let negativeTraceVector = mat2Transform(...traceVector,Math.cos(degToRad(180)),-Math.sin(degToRad(180)),Math.sin(degToRad(180)),Math.cos(degToRad(180)));
    let p7 = vectorAdd(midp6p71,negativeTraceVector);
    
    let properDownVec = [((innerBRad*0.5) + 0.5)*(normalize(vec2)[0]),((innerBRad*0.5) + 0.5)*(normalize(vec2)[1])];
    let cp3 = vectorAdd(mid1,properDownVec);
   

    let vecOP7 = vectorSubtract(center,p7);
    let vecOP1 = vectorSubtract(center,p1);
    let projP7P1 = [(dotProduct(vecOP1,vecOP7)/vectorLength([0,0],vecOP1))*(normalize(vecOP1)[0]),(dotProduct(vecOP1,vecOP7)/vectorLength([0,0],vecOP1))*(normalize(vecOP1)[1])];
    let vecSimilar = vectorSubtract(vectorAdd(center,projP7P1),p7); let nproj = [-projP7P1[0],-projP7P1[1]];
    let vecp7p6 = vectorSubtract(p7,p6); let nvecp7p6 = [-vecp7p6[0],-vecp7p6[1]];
    
    let p8 = vectorAdd(vecSimilar,vectorAdd(center,nproj));
    let p9 = vectorAdd(p8,nvecp7p6); let midp8p9 = pointOnLine(0.5,...p8,...p9);
    let midp7p6 = pointOnLine(0.5,...p7,...p6); let vecP76CP3 = vectorSubtract(midp7p6,cp3);
    let cp4 = vectorAdd(midp8p9,vecP76CP3);

    let innpath = new Path2D();
    innpath.moveTo(...p1);
    innpath.lineTo(...p2);
    innpath.quadraticCurveTo(...cp1,...p3);
    innpath.quadraticCurveTo(...cp2,...p4);
    innpath.lineTo(...p5);
    innpath.lineTo(...p1);
    
    //inner part
    innpath.moveTo(...p7);
    innpath.quadraticCurveTo(...cp3,...p6);
    innpath.lineTo(...p7); 

    innpath.moveTo(...p9);
    innpath.quadraticCurveTo(...cp4,...p8);
    innpath.lineTo(...p9);

    ctx.fill(innpath,'evenodd');
    obipath.addPath(bpath);
    obipath.addPath(innpath);
    ctx.clip(obipath);
    ctx.transform(1,0,0,-1,-0.5*width1,0.5*height1);
   // ctx.restore();
    
}










function drawHeart(ctx,center,fill,stroke,width,height,linewidth,p1inp,p2ainp,p2binp,p3inp){
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = linewidth;
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let p1arg = p1inp/100; p1arg = Math.min(p1arg,0.85);
        let p2aarg = p2ainp/100; p2aarg = Math.min(p2aarg,0.75);
        let p2barg = p2binp/100; p2barg = Math.min(p2barg,0.15);
        let p3arg = p3inp/100; p3arg = Math.min(p3arg,0.25);


        let p1 = [0,-p1arg*(height/2)];
        let p2 = [p2aarg*(width/2),-p2barg*(height/2)];
        let p3 = [0,p3arg*(height/2)];
        let p4 = mat2Transform(p2[0],p2[1],-1,0,0,1);

        let heartpath = new Path2D();
        heartpath.moveTo(0,-0.85*(height/2));
        let phalf1 = pointOnLine(0.3,...p1,...p2);
        
        let p1vector =  vectorSubtract(p1,phalf1);
        let dir1 = mat2Transform(p1vector[0],p1vector[1],Math.cos(degToRad(8)),-Math.sin(degToRad(8)),Math.sin(degToRad(8)),Math.cos(degToRad(8)));
        //console.log(dir1);
        let cp1a =  vectorAdd(p1,dir1);
        let cp2a = pointOnLine(0.65,...p1,...p2);
        heartpath.bezierCurveTo(cp1a[0],cp1a[1],cp2a[0],cp2a[1],...p2);

        let dir2 = vectorSubtract(cp2a,p2);
        let  cp1b =  vectorAdd(p2,dir2); //vectorAdd(p2,[-dir2[0],-dir2[1]]);
        let phalf2 = pointOnLine(0.5,p3[0],p3[1],p2[0],p2[1]);
        let p2vector =  vectorSubtract(p3,phalf2);
        let dir4 = mat2Transform(p2vector[0],p2vector[1],Math.cos(degToRad(110)),-Math.sin(degToRad(110)),Math.sin(degToRad(110)),Math.cos(degToRad(110)));
        let cp1c =  vectorAdd(p3,dir4);
        
        heartpath.bezierCurveTo(cp1b[0],cp1b[1],cp1c[0],cp1c[1],...p3);

        let oppositeCPIC = mat2Transform(cp1c[0],cp1c[1],-1,0,0,1);
        
        let oppositeCPIB = mat2Transform(cp1b[0],cp1b[1],-1,0,0,1);
        
        let oppositeCP2A = mat2Transform(cp2a[0],cp2a[1],-1,0,0,1);
        let oppositeCP1A = mat2Transform(cp1a[0],cp1a[1],-1,0,0,1);

        heartpath.bezierCurveTo(oppositeCPIC[0],oppositeCPIC[1],oppositeCPIB[0],oppositeCPIB[1],p4[0],p4[1]);
        heartpath.bezierCurveTo(oppositeCP2A[0],oppositeCP2A[1],oppositeCP1A[0],oppositeCP1A[1],p1[0],p1[1]);

        ctx.fill(heartpath);
        ctx.restore();
        
}

function drawArrow(ctx,center,fill,stroke,width,height,linewidth,p1a,p2a,p2b,p3a,p3b,p4a,p4b,p5a,p5b,p6a,p6b,p7b){
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = linewidth;
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let p1arg = p1a/100; p1arg = Math.min(p1arg,0.80); let p2aarg = p2a/100; p2aarg = Math.min(p2aarg,0.15);
        let p2barg = p2b/100; p2barg = Math.min(p2barg,0.85); let p3aarg = p3a/100; p3aarg = Math.min(p3aarg,0.10);
        let p3barg = p3b/100; p3barg = Math.min(p3barg,0.75); let p4aarg = p4a/100; p4aarg = Math.min(p4aarg,0.10);
        let p4barg = p4b/100; p4barg = Math.min(p4barg,0.75); let p5aarg = p5a/100; p5aarg = Math.min(p5aarg,0.10);
        let p5barg = p5b/100; p5barg = Math.min(p5barg,0.45);
        let p6aarg = p6a/100; p6aarg = Math.min(p6aarg,0.15); let p6barg = p6b/100; p6barg = Math.min(p6barg,0.45);
        let p7barg = p7b/100; p7barg = Math.min(p7barg,0.85);


        let p1 = [0,-p1arg*(height/2)],p2 = [p2aarg*(width/2),-p2barg*(height/2)],p3 = [p3aarg*(width/2),-p3barg*(height/2)];
        let p4 = [p4aarg*(width/2),-p4barg*(height/2)],p5 = [p5aarg*(width/2),p5barg*(height/2)],p6 = [p6aarg*(width/2),p6barg*(height/2)];
        let p7 = [0,p7barg*(height/2)],p8 = mat2Transform(p6[0],p6[1],-1,0,0,1),p9 = mat2Transform(p5[0],p5[1],-1,0,0,1);
        let p10 = mat2Transform(p4[0],p4[1],-1,0,0,1),p11 = mat2Transform(p3[0],p3[1],-1,0,0,1);
        let p12 = mat2Transform(p2[0],p2[1],-1,0,0,1);
        let midp6p7 = pointOnLine(0.4,p6[0],p6[1],p7[0],p7[1]); let vecp6p7 = [midp6p7[0]-p6[0],midp6p7[1]-p6[1]];
        let cp6 = mat2Transform(vecp6p7[0],vecp6p7[1],Math.cos(degToRad(25)),-Math.sin(degToRad(25)),Math.sin(degToRad(25)),Math.cos(degToRad(25)));
        let midp6p7b = pointOnLine(0.7,p6[0],p6[1],p7[0],p7[1]); let vecp6p7b = [midp6p7b[0]-p7[0],midp6p7b[1]-p7[1]];
        let cp7 = mat2Transform(vecp6p7b[0],vecp6p7b[1],Math.cos(degToRad(10)),Math.sin(degToRad(10)),-Math.sin(degToRad(10)),Math.cos(degToRad(10)));
        let cp6true = [p6[0] + cp6[0],p6[1] + cp6[1]],cp7true = [p7[0] + cp7[0],p7[1] + cp7[1]];
        let oppositeCP6 = mat2Transform(cp6true[0],cp6true[1],-1,0,0,1);
        let oppositeCP7 = mat2Transform(cp7true[0],cp7true[1],-1,0,0,1);

        let arrowPath = new Path2D();
        arrowPath.moveTo(...p1);
        arrowPath.lineTo(...p2);
        arrowPath.lineTo(...p3);
        arrowPath.lineTo(...p4);
        arrowPath.lineTo(...p5);
        arrowPath.lineTo(...p6);
        arrowPath.bezierCurveTo(...cp6true,...cp7true,p7[0],p7[1]);
        arrowPath.bezierCurveTo(...oppositeCP7,...oppositeCP6,p8[0],p8[1]);
        arrowPath.lineTo(...p9);
        arrowPath.lineTo(...p10);
        arrowPath.lineTo(...p11);
        arrowPath.lineTo(...p12);
        arrowPath.lineTo(...p1);
        ctx.fill(arrowPath);
        ctx.restore();
}

function drawObi(ctx,center,fill,stroke,width,height,linewidth,startAngle1,endAngle1,radiusOffset,spacing,innerOffset){
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = linewidth;
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let outerRadius = 0.85*(width/2);
        let newOffset = (radiusOffset/100)*outerRadius;
        let innerRadius = outerRadius - newOffset;
        let radSA = degToRad(startAngle1),radEA = degToRad(endAngle1);
        
        let startAngle2 = endAngle1 + spacing; let radSA2 = degToRad(startAngle2);
        let endAngle2 = startAngle1 - spacing; let radEA2 = degToRad(endAngle2);
        ctx.beginPath();
        ctx.arc(center[0],center[1],outerRadius,radSA,radEA,false);
        ctx.arc(center[0],center[1],innerRadius,radEA,radSA,true);
        ctx.fill('evenodd');
        ctx.beginPath();
        ctx.arc(center[0],center[1],outerRadius,radSA2,radEA2,false);
        ctx.arc(center[0],center[1],innerRadius,radEA2,radSA2,true);
        ctx.fill('evenodd');

        let bRad = innerRadius - 8;
        let midB = 0.50*bRad;
        let midangleDEG = startAngle1 + 90;
        let midangle = degToRad(midangleDEG);
        let p1 = [bRad*Math.cos(radSA),bRad*Math.sin(radSA)];
        let p5 = [bRad*Math.cos(radEA),bRad*Math.sin(radEA)];
        let p1vector = [p1[0]-center[0],p1[1]-center[1]];
        let p5vector = [p5[0]-center[0],p5[1]-center[1]];
        let p3 = [midB*Math.cos(midangle),midB*Math.sin(midangle)];
        let p2 = [p3[0]+p1vector[0],p3[1]+p1vector[1]];
        let p4 = [p3[0]+p5vector[0],p3[1]+p5vector[1]];
        let midp2p3 = pointOnLine(0.5,...p2,...p3);let p3vector = [p3[0]-center[0],p3[1]-center[1]];
        let cp1 = [midp2p3[0]+p3vector[0],midp2p3[1]+p3vector[1]];
        let midp3p4 = pointOnLine(0.5,...p3,...p4);
        let cp2 = [midp3p4[0]+p3vector[0],midp3p4[1]+p3vector[1]];

        //inner B
        let midop1 = pointOnLine(0.5,...center,...p1);
        let midop1CP1 = vectorSubtract(midop1,cp1); //vector 4rm mid of op1 to cp1
        let mid1 = pointOnLine(0.5,...midop1,...cp1); let lengthMid1 = vectorLength(mid1,midop1);
        let innerBRad = (innerOffset/100)*vectorLength(midop1,cp1);
        let tp6p7 = (innerBRad)/lengthMid1; let midp6p71 = pointOnLine(tp6p7,...midop1CP1,...midop1);

        let vec1 = vectorSubtract(mid1,midp6p71);  //points upwards
        let vec2 = mat2Transform(...vec1,Math.cos(degToRad(180)),-Math.sin(degToRad(180)),Math.sin(degToRad(180)),Math.cos(degToRad(180)));
        

        let tinnerBRadOnOP1 = (innerBRad)/bRad;
        let tinnerp = pointOnLine(tinnerBRadOnOP1,...center,...p1);let traceVector = vectorSubtract(center,tinnerp);
        let p6 = vectorAdd(midp6p71,traceVector); let negativeTraceVector = mat2Transform(...traceVector,Math.cos(degToRad(180)),-Math.sin(degToRad(180)),Math.sin(degToRad(180)),Math.cos(degToRad(180)));
        let p7 = vectorAdd(midp6p71,negativeTraceVector);
        
        let properDownVec = [((innerBRad*0.5) + 0.5)*(normalize(vec2)[0]),((innerBRad*0.5) + 0.5)*(normalize(vec2)[1])];
        let cp3 = vectorAdd(mid1,properDownVec);
       

        let vecOP7 = vectorSubtract(center,p7);
        let vecOP1 = vectorSubtract(center,p1);
        let projP7P1 = [(dotProduct(vecOP1,vecOP7)/vectorLength([0,0],vecOP1))*(normalize(vecOP1)[0]),(dotProduct(vecOP1,vecOP7)/vectorLength([0,0],vecOP1))*(normalize(vecOP1)[1])];
        let vecSimilar = vectorSubtract(vectorAdd(center,projP7P1),p7); let nproj = [-projP7P1[0],-projP7P1[1]];
        let vecp7p6 = vectorSubtract(p7,p6); let nvecp7p6 = [-vecp7p6[0],-vecp7p6[1]];
        
        let p8 = vectorAdd(vecSimilar,vectorAdd(center,nproj));
        let p9 = vectorAdd(p8,nvecp7p6); let midp8p9 = pointOnLine(0.5,...p8,...p9);
        let midp7p6 = pointOnLine(0.5,...p7,...p6); let vecP76CP3 = vectorSubtract(midp7p6,cp3);
        let cp4 = vectorAdd(midp8p9,vecP76CP3);

        ctx.beginPath();
        ctx.moveTo(...p1);
        ctx.lineTo(...p2);
        ctx.quadraticCurveTo(...cp1,...p3);
        ctx.quadraticCurveTo(...cp2,...p4);
        ctx.lineTo(...p5);
        ctx.lineTo(...p1);
        
        //inner part
       ctx.moveTo(...p7);
       ctx.quadraticCurveTo(...cp3,...p6);
       ctx.lineTo(...p7); 

       ctx.moveTo(...p9);
       ctx.quadraticCurveTo(...cp4,...p8);
       ctx.lineTo(...p9);

        ctx.fill('evenodd');
        ctx.restore();
        
}



function drawPolygon(ctx,center,fill,stroke,width,height,lineWidth,radius,sides){
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = lineWidth;
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let theta = (2*Math.PI)/sides;
        let radAdjust = (radius/100)*(0.5*width);
        let correctRad = Math.min(radAdjust,(85/100)*(0.5*width));
        let polypath = new Path2D();
        let radvec = vectorAdd(center,[correctRad,correctRad]);
        polypath.moveTo(...center);
        for(let i=0;i<=(sides-1);i++){
            if(sides<3){break}
            else if(sides >= 3){
                if(i==0){
                    polypath.moveTo(radvec[0]*Math.cos(theta*i),radvec[0]*Math.sin(theta*i));
                    polypath.lineTo(radvec[0]*Math.cos(theta*(i+1)),radvec[0]*Math.sin(theta*(i+1)));
                }
                else if((i != 0) && (i<(sides-1))){
                    polypath.lineTo(radvec[0]*Math.cos(theta*(i+1)),radvec[0]*Math.sin(theta*(i+1)));
                }
                else if(i == (sides-1)){
                    polypath.lineTo(radvec[0]*Math.cos(0),radvec[0]*Math.sin(0));
                }
            }
        }
        ctx.fill(polypath);
        ctx.restore();
}


function drawStar(ctx,center,fill,stroke,width,height,linewidth,radius,sides){
        ctx.save();
        ctx.strokeStyle = stroke;
        ctx.fillStyle = fill;
        ctx.lineWidth = linewidth;
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let theta = (2*Math.PI)/sides;
        let theta2 = 0.5*theta;
        let radAdjust = (radius/100)*(0.5*width);
        let correctRad = Math.min(radAdjust,(85/100)*(0.5*width));
        let halfrad = correctRad/2;
        let starpath = new Path2D();
        let radvec1 = vectorAdd(center,[correctRad,correctRad]);
        let radvec2 = vectorAdd(center,[halfrad,halfrad]);
        starpath.moveTo(...center);
        for(let i=0;i<=(sides-1);i++){
            if(sides<3){break}
            else if(sides >= 3){
                if(i==0){
                    starpath.moveTo(radvec1[0]*Math.cos(theta*i),radvec1[0]*Math.sin(theta*i));
                    starpath.lineTo(radvec2[0]*Math.cos(((theta*i)+(theta*(i+1)))/2),radvec2[0]*Math.sin(((theta*i)+(theta*(i+1)))/2));
                    starpath.lineTo(radvec1[0]*Math.cos(theta*(i+1)),radvec1[0]*Math.sin(theta*(i+1)));
                }
                else if((i != 0) && (i<(sides-1))){
                    starpath.lineTo(radvec2[0]*Math.cos(((theta*i)+(theta*(i+1)))/2),radvec2[0]*Math.sin(((theta*i)+(theta*(i+1)))/2));
                    starpath.lineTo(radvec1[0]*Math.cos(theta*(i+1)),radvec1[0]*Math.sin(theta*(i+1)));
                }
                else if(i == (sides-1)){
                    starpath.lineTo(radvec2[0]*Math.cos(((theta*i)+(2*Math.PI))/2),radvec2[0]*Math.sin(((theta*i)+(2*Math.PI))/2));
                    starpath.lineTo(radvec1[0]*Math.cos(0),radvec1[0]*Math.sin(0));
                }
            }
        }
        ctx.fill(starpath);
        ctx.restore();
}

function drawBezier(ctx,center,fill,width,height){
        ctx.save();
        ctx.strokeStyle = fill;
        ctx.fillStyle = fill;
        
        ctx.transform(1,0,0,-1,0.5*width,0.5*height);
        let parray = [[center[0]-(0.70*(width/2)),center[1]-(0.80*(height/2))],[center[0]+(0.25*(width/2)),center[1]-(0.75*(height/2))]];
        ctx.beginPath();
        ctx.moveTo(...parray[0]);
        for(let j=0;j<=(parray.length-2);j++){
            let c1 = addControlPoints(parray[j],parray[j+1],true,15,15,false,true,0.35)[0];
            let c2 = addControlPoints(parray[j],parray[j+1],true,15,15,false,true,0.35)[1];
            ctx.bezierCurveTo(...c1,...c2,...parray[j+1]);
        }
        ctx.stroke();
        ctx.fillRect(...center,6,6); console.log(degToRad(1));
        for(let j=0;j<=(parray.length-1);j++){
            ctx.fillRect(...parray[j],6,6);
        }
        ctx.fillStyle = 'magenta';
        for(let j=0;j<=(parray.length-2);j++){
            ctx.fillRect(...(addControlPoints(parray[j],parray[j+1],true,15,15,false,true,0.35)[0]),6,6);
            ctx.fillStyle = 'red';
            ctx.fillRect(...(addControlPoints(parray[j],parray[j+1],true,15,15,false,true,0.35)[1]),6,6);
        }
        ctx.fillRect(...(pointOnLine(0.35,...parray[0],...parray[1])),10,10);
        
        ctx.restore();

}

function drawBuilding(ctx,center,fill,windowfill,stroke,width,height,linewidth){
    let heightarray = [0.50*(height),0.65*(height),0.75*(height),0.85*(height)];
    let roofarray = ['triangleroof','squareroof','polygon1roof','polygon2roof'];
    let randheight = Math.ceil(Math.random()*(heightarray.length-1));
    let randroof = Math.ceil(Math.random()*(roofarray.length-1));
    let buildheight = heightarray[randheight]; let roof = roofarray[randroof];
    let p1 = [center[0]+(0.40*width),center[1]]; let p2 = [center[0]+(0.40*width),center[1]-(0.90*buildheight)];
    
    let p3 = [center[0]-(0.40*width),center[1]-(0.90*buildheight)]; let p4 = [center[0]-(0.40*width),center[1]];
    //roofpoints
    let p5 = [center[0],center[1]-(buildheight)]; //triangle roof
    let p6 = [center[0]+(0.40*width),center[1]-(buildheight)],p7 = [center[0]-(0.40*width),center[1]-(buildheight)];// squuare roof
    let p8 = [center[0]+(0.40*width),center[1]-(0.96*buildheight)]; 
    let p9 = [center[0]+(0.10*width),center[1]-(buildheight)];
    let p10 = [center[0]-(0.10*width),center[1]-(buildheight)];
    let p11 = [center[0]-(0.40*width),center[1]-(0.96*buildheight)]; //polygon1roof

    let p12 = [center[0]+(0.10*width),center[1]-(0.96*buildheight)];
    let p13 = [center[0]+(0.10*width),center[1]-(buildheight)];
    let p14 = [center[0]-(0.10*width),center[1]-(buildheight)];
    let p15 = [center[0]-(0.10*width),center[1]-(0.96*buildheight)]; //polygon2roof
    
    let nstorey;
    if(buildheight <= 0.65*(height)) nstorey = 2;
    if(buildheight > 0.65*(height)) nstorey = 4;
    let floorheight = (0.96*buildheight)/nstorey; let wallspaceh = 0.20*(floorheight),wallspacew = 0.20*(width);

    //drawing
    //draw main building
    //ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    ctx.lineWidth = linewidth;
    let buildpath = new Path2D();
    buildpath.moveTo(...p1);
    buildpath.lineTo(...p2);
    buildpath.lineTo(...p3);
    buildpath.lineTo(...p4);
    buildpath.lineTo(...p1);
    ctx.fill(buildpath);
    //draw windows
    let w = 0.40*width; let h = 0.60*floorheight;
    ctx.fillStyle = windowfill;
    for(let i=0;i<=(nstorey-1);i++){
        let winpath = new Path2D();
        winpath.moveTo(center[0]-(0.80*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        winpath.lineTo(center[0]-(0.20*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        winpath.lineTo(center[0]-(0.20*w),center[1]-((0.80*floorheight)+(floorheight*i)));
        winpath.lineTo(center[0]-(0.80*w),center[1]-((0.80*floorheight)+(floorheight*i)));
        winpath.lineTo(center[0]-(0.80*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        ctx.fill(winpath);

        let winpath2 = new Path2D();
        winpath2.moveTo(center[0]+(0.80*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        winpath2.lineTo(center[0]+(0.20*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        winpath2.lineTo(center[0]+(0.20*w),center[1]-((0.80*floorheight)+(floorheight*i)));
        winpath2.lineTo(center[0]+(0.80*w),center[1]-((0.80*floorheight)+(floorheight*i)));
        winpath2.lineTo(center[0]+(0.80*w),center[1]-((0.20*floorheight)+(floorheight*i)));
        ctx.fill(winpath2);
    }
    ctx.fillStyle = fill;
    if(roof == 'triangleroof'){
        let roofpath = new Path2D();
        roofpath.moveTo(...p2);
        roofpath.lineTo(...p5);
        roofpath.lineTo(...p3);
        roofpath.lineTo(...p2);
        ctx.fill(roofpath);
    }
    else if(roof == 'squareroof'){
        let roofpath = new Path2D();
        roofpath.moveTo(...p2);
        roofpath.lineTo(...p6);
        roofpath.lineTo(...p7);
        roofpath.lineTo(...p3);
        roofpath.lineTo(...p2);
        ctx.fill(roofpath);
    }
    else if(roof == 'polygon1roof'){
        let roofpath = new Path2D();
        roofpath.moveTo(...p2);
        roofpath.lineTo(...p8);
        roofpath.lineTo(...p9);
        roofpath.lineTo(...p10);
        roofpath.lineTo(...p11);
        roofpath.lineTo(...p3);
        roofpath.lineTo(...p2);
        ctx.fill(roofpath);
    }
    else if(roof == 'polygon2roof'){
        let roofpath = new Path2D();
        roofpath.moveTo(...p2);
        roofpath.lineTo(...p12);
        roofpath.lineTo(...p13);
        roofpath.lineTo(...p14);
        roofpath.lineTo(...p15);
        roofpath.lineTo(...p3);
        roofpath.lineTo(...p2);
        ctx.fill(roofpath);
    }
}




function mat2Transform(x,y,a,b,c,d){
    return [(a*x)+(b*y),(c*x)+(d*y)];
}

function pointOnLine(t,x1,y1,x2,y2){
    return [(1-t)*x1 + t*x2,(1-t)*y1 + t*y2];
}
function degToRad(theta){
    return (theta*Math.PI)/180;
}
function positionOnLine(p,p1,p2){
    let t1 = (p[0]-p1[0])/(p2[0]-p1[0]);
    let t2 = (p[1]-p1[1]/(p2[1]-p1[1]));
    return (t1==t2)?t1:null;
}
function normalize(v){
    let mag = Math.sqrt(Math.pow(v[0],2) + Math.pow(v[1],2));
    return [v[0]/mag,v[1]/mag];
}

function vectorAdd(a,b){
    return [a[0]+b[0],a[1]+b[1]];
}

function vectorSubtract(a,b){
    return [b[0]-a[0],b[1]-a[1]];
}
function vectorLength(a,b){
    return Math.sqrt(Math.pow((b[0]-a[0]),2) + Math.pow((b[1]-a[1]),2));
}
function dotProduct(a,b){return (a[0]*b[0])+(a[1]*b[1]);}

function matMulVec2(mat,vec){
    return [(mat[0][0]*vec[0])+(mat[0][1]*vec[1]),(mat[1][0]*vec[0])+(mat[1][1]*vec[1])];
}

function perpFromLine(p1,p2,extent,clockwise){
    let dir = vectorSubtract(p1,p2); let magvec = [extent*(normalize(dir)[0]),extent*(normalize(dir)[1])];
    let pos = (vectorLength(p1,vectorAdd(p1,magvec)))/vectorLength(p1,p2);
    let po3 = pointOnLine(pos,...p1,...p2); let po3vec = vectorSubtract(p1,po3);
    
    if(clockwise){
        let endvec = [-po3vec[1],-po3vec[0]];
        return [p2,vectorAdd(p2,endvec)];
    }
    else if(!clockwise){
        let endvec = [-po3vec[1],po3vec[0]];
        return [p2,vectorAdd(p2,endvec)];
    }
}
function scalarmul(scal,vec){return [scal*vec[0],scal*vec[1]];}

function addControlPoints(p1,p2,left,extent,extent2,even,cubic,vl){
    let linevec1 = vectorSubtract(p1,p2), linevec2 = vectorSubtract(p2,p1);
    let ccwMatext1 = [[Math.cos(degToRad(extent)),-Math.sin(degToRad(extent))],[Math.sin(degToRad(extent)),Math.cos(degToRad(extent))]];
    let cwMatext1 = [[Math.cos(degToRad(extent)),Math.sin(degToRad(extent))],[-Math.sin(degToRad(extent)),Math.cos(degToRad(extent))]];
    let ccwMatext2 = [[Math.cos(degToRad(extent2)),-Math.sin(degToRad(extent2))],[Math.sin(degToRad(extent2)),Math.cos(degToRad(extent2))]];
    let cwMatext2 = [[Math.cos(degToRad(extent2)),Math.sin(degToRad(extent2))],[-Math.sin(degToRad(extent2)),Math.cos(degToRad(extent2))]];
    if(even){
        if((left)&&(cubic)){
            //for forward point
            let po3 = pointOnLine(vl,...p1,...p2);
            let po3vec = vectorSubtract(p1,po3);
            let cp1 =  vectorAdd(p1,matMulVec2(ccwMatext1,po3vec));

            //for reverse point
            let po32 = pointOnLine(vl,...p2,...p1); let po32vec = vectorSubtract(p2,po32);
            let cp2 =  vectorAdd(p2,matMulVec2(cwMatext1,po32vec));
            return [cp1,cp2];
        }
        else if((left)&& !(cubic)){
            //for forward point
            let po5 = pointOnLine(0.5,...p1,...p2); let po5vec = vectorSubtract(p1,po5);
            let cp1 = vectorAdd(p1,matMulVec2(ccwMatext1,po5vec));
            return cp1;
        }
        else if(!(left)&&(cubic)){
            //for forward point
            let po3 = pointOnLine(vl,...p1,...p2);
            let po3vec = vectorSubtract(p1,po3);
            let cp1 = vectorAdd(p1,matMulVec2(cwMatext1,po3vec));
            //for reverse point
            let po32 = pointOnLine(vl,...p2,...p1); let po32vec = vectorSubtract(p2,po32);
            let cp2 =  vectorAdd(p2,matMulVec2(ccwMatext1,po32vec));
            return [cp1,cp2];
        }
        else if(!(left)&& !(cubic)){
            //for forward point
            let po5 = pointOnLine(0.5,...p1,...p2); let po5vec = vectorSubtract(p1,po5);
            let cp1 = vectorAdd(p1,matMulVec2(cwMatext1,po5vec));
            return cp1;
        }
    }
    else if(!even){
        if(left){
            //for forward point
            let po3 = pointOnLine(vl,...p1,...p2);
            let po3vec = vectorSubtract(p1,po3);
            let cp1 = vectorAdd(p1,matMulVec2(ccwMatext1,po3vec));
            //for reverse point
            let po32 = pointOnLine(vl,...p2,...p1); let po32vec = vectorSubtract(p2,po32);
            if(extent2 >= 0){
                let cp2 = vectorAdd(p2,matMulVec2(cwMatext2,po32vec));
                return [cp1,cp2];
            }
            if(extent2 < 0){
                let cp2 = vectorAdd(p2,matMulVec2(ccwMatext2,po32vec));
                return [cp1,cp2];
            }
        }
        else if(!left){
            //for forward point
            let po3 = pointOnLine(vl,...p1,...p2);
            let po3vec = vectorSubtract(p1,po3);
            let cp1 = vectorAdd(p1,matMulVec2(cwMatext1,po3vec));
            //for reverse point
            let po32 = pointOnLine(vl,...p2,...p1); let po32vec = vectorSubtract(p2,po32);
            if(extent2 >= 0){
                let cp2 = vectorAdd(p2,matMulVec2(ccwMatext2,po32vec));
                return [cp1,cp2];
            }
            if(extent2 < 0){
                let cp2 = vectorAdd(p2,matMulVec2(cwMatext2,po32vec));
                return [cp1,cp2];
            }
        }
    }
}
function vectorInterpolate(t,v1,v2){
    let v1norm = normalize(v1); let v2norm = normalize(v2);
    let angle = dotProduct(v1norm,v2norm); let theta = Math.acos(angle);
    theta = degToRad(theta);
    if((theta != 0)&&(theta != (Math.PI))){
        return vectorAdd(scalarmul((Math.sin((1-t)*theta))/Math.sin(theta),v1),scalarmul((Math.sin((t)*theta))/Math.sin(theta),v2));
    }

}
function isArrayMember(item,garray){
    for(let k=0;k<=(garray.length-1);k++){
        if(garray[k] != item) continue;
        else if(garray[k] == item) return [true,k];
    }
    return [false];
}

function rayIntersection(p1,v1,p2,v2){
    let t = ((v2[0]*(p1[1]-p2[1]))-(v2[1]*(p1[0]-p2[0])))/((v2[1]*v1[0])-(v2[0]*v1[1]));
    let px = p1[0] + (t*v1[0]), py = p1[1] + (t*v1[1]);
    return [px,py];
}