import json, subprocess, numpy as np, soundfile as sf
D="/tmp/claude-0/-home-user-test-dummy/47e1ffcc-1af7-5e8e-bef1-43b065556665/scratchpad/build15"
SR=48000
subprocess.run(["ffmpeg","-y","-v","error","-i",D+"/narr_raw.wav","-af","highpass=f=70,acompressor=threshold=-24dB:ratio=3:attack=5:release=80:makeup=3","-ar",str(SR),"-ac","1",D+"/narr48.wav"],check=True)
voice,_=sf.read(D+"/narr48.wav",dtype="float32"); voice=voice if voice.ndim==1 else voice[:,0]
ev=json.load(open(D+"/events.json")); TT=ev["T"]
N=int((TT+0.5)*SR); out=np.zeros(N,dtype=np.float32); t=np.arange(N)/SR
rs=np.random.RandomState(13)
def lp(x,k): return np.convolve(x,np.ones(k)/k,mode="same")
def hp(x,k): return x-lp(x,k)
def add(sig,at,g):
    a=int(at*SR)
    if a<0 or a>=N: return
    b=min(N,a+len(sig)); out[a:b]+=sig[:b-a].astype(np.float32)*g
def whoosh(d=0.32):
    n=int(d*SR); w=rs.randn(n); tt=np.arange(n)/SR; sw=np.zeros(n)
    for k in (300,900,2400): sw+=lp(w,max(2,int(SR/k)))*(1 if k<1000 else 0.6)
    return sw*np.sin(np.pi*tt/d)**2*0.9
def tink(f=2400):
    n=int(0.5*SR); tt=np.arange(n)/SR; return (np.sin(2*np.pi*f*tt)+0.45*np.sin(2*np.pi*f*2.76*tt))*np.exp(-tt*14)*0.6
def rustle(d=0.45):
    n=int(d*SR); w=hp(rs.randn(n),30); m=np.abs(lp(rs.randn(n),800))*6; return w*np.clip(m,0,1)*np.sin(np.pi*np.arange(n)/n)*0.8
def thud():
    n=int(0.35*SR); tt=np.arange(n)/SR; f=95-50*tt/0.35; return (np.sin(2*np.pi*np.cumsum(f)/SR)+0.3*lp(rs.randn(n),60))*np.exp(-tt*16)
def tick():
    n=int(0.03*SR); tt=np.arange(n)/SR; return (np.sin(2*np.pi*1800*tt)+0.5*rs.randn(n)*0.3)*np.exp(-tt*140)*0.5
def pop():
    n=int(0.12*SR); tt=np.arange(n)/SR; f=500+900*np.exp(-tt*40); return np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*30)
def ding():
    n=int(0.8*SR); tt=np.arange(n)/SR; return (np.sin(2*np.pi*1318.5*tt)+0.4*np.sin(2*np.pi*1318.5*2.76*tt)+0.3*np.sin(2*np.pi*1975*tt))*np.exp(-tt*5)*0.6
def sms():
    n=int(0.7*SR); tt=np.arange(n)/SR; a=np.sin(2*np.pi*1046*tt)*np.exp(-tt*9)*(tt<0.18); b=np.sin(2*np.pi*1568*np.maximum(tt-0.14,0))*np.exp(-np.maximum(tt-0.14,0)*8)*(tt>=0.14); return (a+b)*0.7
def debit():
    n=int(0.7*SR); tt=np.arange(n)/SR; a=np.sin(2*np.pi*1568*tt)*np.exp(-tt*9)*(tt<0.18); b=np.sin(2*np.pi*987*np.maximum(tt-0.14,0))*np.exp(-np.maximum(tt-0.14,0)*8)*(tt>=0.14); return (a+b)*0.7
def chain():
    n=int(0.25*SR); tt=np.arange(n)/SR; f=rs.choice([2800,3400,4100]); return (np.sin(2*np.pi*f*tt)+0.5*np.sin(2*np.pi*f*1.5*tt)+hp(rs.randn(n),10)*0.4)*np.exp(-tt*28)*0.5
def padclick():
    n=int(0.22*SR); tt=np.arange(n)/SR; return (hp(rs.randn(n),20)*0.6*np.exp(-tt*120)+np.sin(2*np.pi*900*tt)*np.exp(-tt*40)*0.8)
def coin():
    n=int(0.6*SR); tt=np.arange(n)/SR; f=rs.choice([3100,3500,3900]); return (np.sin(2*np.pi*f*tt)+0.6*np.sin(2*np.pi*f*1.41*tt))*np.exp(-tt*9)*0.5
def cash():
    n=int(1.0*SR); tt=np.arange(n)/SR; bell=(np.sin(2*np.pi*2093*tt)+0.5*np.sin(2*np.pi*2093*2.4*tt))*np.exp(-tt*5); drawer=hp(rs.randn(n),20)*np.exp(-tt*30)*0.8; return bell*0.6+drawer*0.5
def flutter():
    n=int(0.16*SR); w=hp(rs.randn(n),20)*np.abs(np.sin(np.arange(n)/SR*90)); return w*np.sin(np.pi*np.arange(n)/n)*0.7
def sad():
    n=int(0.9*SR); tt=np.arange(n)/SR; s=np.sin(2*np.pi*(293.66*(tt<0.35)+220*(tt>=0.35))*tt)*0.5; return lp(s,3)*np.minimum(1,tt/0.03)*np.exp(-tt*2.6)
# ambience: city/room tone with slow swell
amb=lp(rs.randn(N),160)*1.4+lp(rs.randn(N),900)*0.22
amb*=0.55+0.45*(0.7+0.3*np.sin(2*np.pi*t/9.0)+0.1*np.sin(2*np.pi*t/3.1))
out+=amb*0.03
chords=[[261.63,329.63,392.0],[220.0,261.63,329.63],[174.61,220.0,261.63],[196.0,246.94,293.66]]
bed=np.zeros(N,dtype=np.float32); seg=8.0
for i,ch in enumerate(chords*14):
    a,b=int(i*seg*SR),int(min(N,(i+1)*seg*SR))
    if a>=N: break
    tt=t[a:b]-t[a]; e=np.minimum(1,tt/2.0)*np.minimum(1,(seg-tt)/2.0); s=np.zeros(b-a,dtype=np.float32)
    for f in ch:
        for det in (-0.6,0.6): s+=np.sin(2*np.pi*(f+det)*tt)*0.3+np.sin(2*np.pi*(f*2+det)*tt)*0.08
    bed[a:b]+=s*e*0.1
bed*=0.4
vv=np.zeros(N,dtype=np.float32); vv[:min(N,len(voice))]=voice[:N]
win=SR//20; rms=np.sqrt(np.convolve(vv**2,np.ones(win)/win,mode="same"))
duck=1.0-0.55*np.clip(rms/0.05,0,1); duck=np.convolve(duck,np.ones(SR//5)/(SR//5),mode="same")
out+=vv+bed*duck
out-=amb*0.03*0.35*np.clip(rms/0.05,0,1)
G={"whoosh":(whoosh,0.16),"tink":(tink,0.10),"rustle":(rustle,0.20),"thud":(thud,0.30),"tick":(tick,0.14),"pop":(pop,0.12),"ding":(ding,0.10),"sms":(sms,0.12),"debit":(debit,0.12),"chain":(chain,0.16),"padclick":(padclick,0.22),"coin":(coin,0.10),"cash":(cash,0.12),"flutter":(flutter,0.16),"sad":(sad,0.07)}
for k,(fn,g) in G.items():
    for x in ev.get(k,[]): add(fn(),x,g)
out=np.clip(out,-1,1); sf.write(D+"/mix_pre.wav",out,SR)
subprocess.run(["ffmpeg","-y","-v","error","-i",D+"/mix_pre.wav","-af",f"atrim=start={ev['T0']}:end={ev['T1']},asetpts=PTS-STARTPTS,loudnorm=I=-14:TP=-1.5:LRA=5","-ar","48000",D+"/mix_final.wav"],check=True)
print("mix ok")
