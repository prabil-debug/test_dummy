// ================= Reel 017: 3 money things before marriage (30-35 s) =================
let SHOTS=[];
const IT=(i)=>TL.items[i];
const WI=(i,k)=>IT(i).words[k].start-0.05;
const BS=(i)=>IT(i).start-0.1;
function buildShots(){
  SHOTS=[
   {id:"hookA",t0:0,t1:BS(1)},{id:"hookB",t0:BS(1),t1:BS(2)},
   {id:"c1a",t0:BS(2),t1:WI(2,2)},{id:"c1b",t0:WI(2,2),t1:BS(3)},{id:"joint",t0:BS(3),t1:BS(4)},
   {id:"c2a",t0:BS(4),t1:BS(5)},{id:"calc1",t0:BS(5),t1:WI(5,4)},{id:"calc2",t0:WI(5,4),t1:BS(6)},
   {id:"c3a",t0:BS(6),t1:WI(6,2)},{id:"c3b",t0:WI(6,2),t1:BS(7)},{id:"c3c",t0:BS(7),t1:BS(8)},
   {id:"cta",t0:BS(8),t1:IT(8).end+0.15},{id:"end",t0:IT(8).end+0.15,t1:TL.total+1}];
}
