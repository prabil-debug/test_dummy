// ================= Reel 015: when to buy a home (3 checks) =================
let SHOTS=[];
const IT=(i)=>TL.items[i];
const WI=(i,k)=>IT(i).words[k].start-0.05;
const BS=(i)=>IT(i).start-0.1;
function buildShots(){
  SHOTS=[
   {id:"shares700",t0:0,t1:BS(1)},{id:"wonder",t0:BS(1),t1:WI(1,3)},{id:"askRamu",t0:WI(1,3),t1:BS(2)},
   {id:"missed",t0:BS(2),t1:WI(2,5)},{id:"three",t0:WI(2,5),t1:BS(3)},
   {id:"c1a",t0:BS(3),t1:WI(3,2)},{id:"c1b",t0:WI(3,2),t1:BS(4)},
   {id:"c2a",t0:BS(4),t1:WI(4,3)},{id:"c2b",t0:WI(4,3),t1:BS(5)},
   {id:"c3a",t0:BS(5),t1:WI(5,2)},{id:"c3b",t0:WI(5,2),t1:BS(6)},
   {id:"allOk",t0:BS(6),t1:BS(7)},
   {id:"rentKeys",t0:BS(7),t1:WI(7,4)},{id:"sip",t0:WI(7,4),t1:BS(8)},
   {id:"yourTurn",t0:BS(8),t1:BS(9)},{id:"choice",t0:BS(9),t1:BS(10)},{id:"comments",t0:BS(10),t1:IT(10).end+0.25},
   {id:"end",t0:IT(10).end+0.25,t1:TL.total+1}];
}
