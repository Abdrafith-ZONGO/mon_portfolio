// @ts-nocheck
/* Moteur 3D du portfolio : un seul nuage de particules qui change de forme au défilement.
   États : 0 tableau de chiffres · 1 nom · 2 histogramme · 3 réseau de neurones · 4 orbites (stack) · 5 tunnel (projets) */

export const NET_INPUTS = ['Python', 'PostgreSQL', 'React', 'Docker', 'MongoDB']
export const NET_OUTPUTS = ['e-Bourse UEMOA', 'Mon Atelier Pro', 'FasoPay', 'CardioLogic']
// entrée -> sorties : liens réels entre compétences et projets
const LINKS = { 0: [0, 3], 1: [0], 2: [1], 3: [0, 2, 3], 4: [2] }
// Formes (kinds) : 0 tableau de chiffres · 1 nom · 2 histogramme · 3 réseau · 4 orbites · 5 tunnel · 6 écran d'application · 7 base de données
// Ordre d'apparition au défilement :
export const ORDER = [1, 0, 2, 3, 6, 7, 5, 4]
export const STATES = ORDER.length
export const IDX = ORDER.reduce((m, k, i) => { m[k] = i; return m }, {})
const KINDS = 8

export function createScene(canvas, opts) {
  const gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true })
  if (!gl) return null

  const FOV = (45 * Math.PI) / 180, DIST = 7, TAN = Math.tan(FOV / 2)
  const small = Math.min(window.innerWidth, window.innerHeight) < 700
  const N = small ? 4200 : 9000
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const rnd = Math.random
  const C_LAT = [0.86, 0.3, 0.15], C_OCR = [0.93, 0.62, 0.14], C_CRE = [0.95, 0.89, 0.78], C_SAV = [0.38, 0.68, 0.27], C_IND = [0.3, 0.5, 0.9]
  const mixc = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
  const STOPS = [C_IND, C_SAV, C_OCR, C_LAT]
  const grad = (t) => { const x = Math.max(0, Math.min(0.9999, t)) * 3, i = Math.floor(x); return mixc(STOPS[i], STOPS[i + 1], x - i) }
  const set3 = (arr, i, c) => { arr[i * 3] = c[0]; arr[i * 3 + 1] = c[1]; arr[i * 3 + 2] = c[2] }

  /* ---- réseau ---- */
  const LAYERS = [5, 7, 7, 4], LX = [-2.1, -0.7, 0.7, 2.1]
  const nodes = [], layerStart = []
  for (let l = 0; l < LAYERS.length; l++) {
    layerStart.push(nodes.length)
    const n = LAYERS[l], sp = l === 0 || l === 3 ? 0.72 : 0.56
    for (let i = 0; i < n; i++) {
      const y = (i - (n - 1) / 2) * sp
      const z = l === 1 || l === 2 ? Math.sin(i * 1.9 + l) * 0.55 : Math.cos(i * 1.3) * 0.15
      nodes.push([LX[l], -y, z])
    }
  }
  const NN = nodes.length
  const edges = []
  for (let l = 0; l < LAYERS.length - 1; l++)
    for (let a = 0; a < LAYERS[l]; a++) for (let b = 0; b < LAYERS[l + 1]; b++) edges.push([layerStart[l] + a, layerStart[l + 1] + b])

  /* ---- cibles ---- */
  const pos = [], col = []
  for (let k = 0; k < KINDS; k++) { pos.push(new Float32Array(N * 3)); col.push(new Float32Array(N * 3)) }
  const net = new Float32Array(N * 4), seed = new Float32Array(N)

  const tc = document.createElement('canvas'); tc.width = 1400; tc.height = 440
  const tx = tc.getContext('2d')
  tx.fillStyle = '#fff'; tx.textAlign = 'center'; tx.textBaseline = 'middle'
  const fit = (txt, max, start) => { let s = start; do { tx.font = '900 ' + s + 'px "Arial Black","Helvetica Neue",Arial,sans-serif'; s -= 4 } while (tx.measureText(txt).width > max && s > 40) }
  fit('ABDRAFITH', 1330, 210); tx.fillText('ABDRAFITH', 700, 125)
  fit('ZONGO', 1330, 210); tx.fillText('ZONGO', 700, 325)
  const img = tx.getImageData(0, 0, 1400, 440).data, pix = []
  for (let y = 0; y < 440; y += 2) for (let x = 0; x < 1400; x += 2) if (img[(y * 1400 + x) * 4 + 3] > 128) pix.push(x, y)
  const NPIX = pix.length / 2

  const NB = 13, BASE = -1.35, bh = []; let bsum = 0
  for (let i = 0; i < NB; i++) { const h = 2.7 * Math.exp(-0.5 * Math.pow((i - 6) / 2.5, 2)) + 0.1; bh.push(h); bsum += h }
  const bell = (x) => 2.7 * Math.exp(-0.5 * Math.pow(x / (4.6 / 12) / 2.5, 2)) + 0.1

  // rectangles de l'écran : x, y, largeur, hauteur, profondeur, part de points à l'intérieur, poids, couleur
  const SCREEN = [
    [-2.3, -1.45, 4.6, 2.9, 0, 0, 5, C_CRE],
    [-2.3, 1.05, 4.6, 0.001, 0, 0, 1.6, C_CRE],
    [-2.12, 1.2, 0.1, 0.1, 0, 1, 0.25, C_LAT], [-1.9, 1.2, 0.1, 0.1, 0, 1, 0.25, C_OCR], [-1.68, 1.2, 0.1, 0.1, 0, 1, 0.25, C_SAV],
    [-2.3, -1.45, 0.95, 2.5, 0, 0, 1.4, [0.66, 0.61, 0.54]],
    [-2.1, 0.6, 0.55, 0.12, 0.05, 1, 0.3, C_OCR], [-2.1, 0.3, 0.55, 0.12, 0.05, 1, 0.3, [0.66, 0.61, 0.54]], [-2.1, 0.0, 0.55, 0.12, 0.05, 1, 0.3, [0.66, 0.61, 0.54]], [-2.1, -0.3, 0.55, 0.12, 0.05, 1, 0.3, [0.66, 0.61, 0.54]],
    [-1.1, 0.15, 3.15, 0.7, 0.18, 0.75, 3, C_OCR],
    [-1.1, -1.25, 0.95, 1.15, 0.34, 0.45, 2, C_LAT], [-0.0, -1.25, 0.95, 1.15, 0.34, 0.45, 2, C_SAV], [1.1, -1.25, 0.95, 1.15, 0.34, 0.45, 2, C_IND],
  ]
  const SCREEN_W = SCREEN.reduce((a, r) => a + r[6], 0)
  const COLS = small ? 60 : 110, ROWS = Math.ceil(N / COLS), perm = new Uint32Array(N)
  for (let i = 0; i < N; i++) perm[i] = i
  for (let i = N - 1; i > 0; i--) { const j = (rnd() * (i + 1)) | 0, t = perm[i]; perm[i] = perm[j]; perm[j] = t }
  const GX = small ? 10 : 19, GZ0 = -16, GZ1 = 2.5

  for (let i = 0; i < N; i++) {
    const s = rnd(); seed[i] = s
    // 0 : tableau de chiffres
    const cell = perm[i], gc = cell % COLS, gr = (cell / COLS) | 0
    pos[0][i * 3] = (gc / (COLS - 1) - 0.5) * GX; pos[0][i * 3 + 1] = -1.45; pos[0][i * 3 + 2] = GZ0 + (gr / (ROWS - 1)) * (GZ1 - GZ0)
    set3(col[0], i, mixc(grad(gc / (COLS - 1)), C_CRE, 0.25 + rnd() * 0.25))
    // 1 : accueil — un globe de points (méridiens et parallèles), à droite de la présentation
    {
      const R = 2.35, line = rnd()
      let lat, lon
      if (line < 0.42) { lat = (((rnd() * 9) | 0) - 4) * (Math.PI / 10); lon = rnd() * 6.2832 }
      else if (line < 0.84) { lon = ((rnd() * 14) | 0) * (6.2832 / 14); lat = (rnd() - 0.5) * Math.PI }
      else { const u = rnd() * 2 - 1; lat = Math.asin(u); lon = rnd() * 6.2832 }
      const rr = R * (line < 0.84 ? 1 : 0.985)
      pos[1][i * 3] = rr * Math.cos(lat) * Math.cos(lon); pos[1][i * 3 + 1] = rr * Math.sin(lat); pos[1][i * 3 + 2] = rr * Math.cos(lat) * Math.sin(lon)
      set3(col[1], i, mixc(grad((lat / Math.PI + 0.5)), C_CRE, 0.25).map((v) => v * (line < 0.84 ? 0.85 : 0.35)))
    }
    // 2 : histogramme + courbe en cloche
    if (rnd() < 0.82) {
      let t = rnd() * bsum, bi = 0; while (bi < NB - 1 && t > bh[bi]) { t -= bh[bi]; bi++ }
      const cx = (bi - 6) * (4.6 / 12), hh = bh[bi]
      let fx = rnd() - 0.5, fy = rnd(), fz = rnd() - 0.5; const face = rnd()
      if (face < 0.16) fy = 1; else if (face < 0.42) fz = 0.5; else if (face < 0.56) fx = fx < 0 ? -0.5 : 0.5
      pos[2][i * 3] = cx + fx * 0.27; pos[2][i * 3 + 1] = BASE + fy * hh; pos[2][i * 3 + 2] = fz * 0.5
      const gt = bi / (NB - 1); set3(col[2], i, gt < 0.5 ? mixc(C_LAT, C_OCR, gt * 2) : mixc(C_OCR, C_SAV, (gt - 0.5) * 2))
    } else {
      const xx = (rnd() - 0.5) * 5.4
      pos[2][i * 3] = xx + (rnd() - 0.5) * 0.02; pos[2][i * 3 + 1] = BASE + bell(xx) + 0.2 + (rnd() - 0.5) * 0.03; pos[2][i * 3 + 2] = 0.34 + (rnd() - 0.5) * 0.03
      set3(col[2], i, C_CRE)
    }
    // 3 : réseau de neurones
    if (rnd() < 0.28) {
      const ni = (rnd() * NN) | 0, nd = nodes[ni]
      const u2 = rnd() * 2 - 1, t2 = rnd() * 6.2832, q2 = Math.sqrt(1 - u2 * u2), rr = 0.12 * Math.cbrt(rnd())
      pos[3][i * 3] = nd[0] + rr * q2 * Math.cos(t2); pos[3][i * 3 + 1] = nd[1] + rr * q2 * Math.sin(t2); pos[3][i * 3 + 2] = nd[2] + rr * u2
      net[i * 4] = ni; net[i * 4 + 1] = ni; net[i * 4 + 2] = 0; net[i * 4 + 3] = 0
      set3(col[3], i, ni < layerStart[1] ? C_IND : ni >= layerStart[3] ? C_SAV : C_OCR)
    } else {
      const e = edges[(rnd() * edges.length) | 0], A = nodes[e[0]], B = nodes[e[1]], tt = rnd()
      pos[3][i * 3] = A[0] + (B[0] - A[0]) * tt + (rnd() - 0.5) * 0.02
      pos[3][i * 3 + 1] = A[1] + (B[1] - A[1]) * tt + (rnd() - 0.5) * 0.02
      pos[3][i * 3 + 2] = A[2] + (B[2] - A[2]) * tt + (rnd() - 0.5) * 0.02
      net[i * 4] = e[0]; net[i * 4 + 1] = e[1]; net[i * 4 + 2] = tt; net[i * 4 + 3] = 1
      set3(col[3], i, [0.86, 0.74, 0.52])
    }
    // 4 : orbites autour de la sphère des technologies
    const r4 = rnd()
    if (r4 < 0.45) {
      const u = rnd() * 2 - 1, th = rnd() * 6.2832, q = Math.sqrt(1 - u * u), R = 2.5 + (rnd() - 0.5) * 0.08
      pos[4][i * 3] = R * q * Math.cos(th); pos[4][i * 3 + 1] = R * u; pos[4][i * 3 + 2] = R * q * Math.sin(th)
      set3(col[4], i, mixc(C_CRE, C_OCR, rnd()).map((v) => v * 0.22))
    } else {
      const ring = r4 < 0.65 ? 0 : r4 < 0.83 ? 1 : 2
      const th = rnd() * 6.2832, R = [3.0, 3.3, 2.8][ring] + (rnd() - 0.5) * 0.1, tilt = [0.45, -0.6, 1.25][ring]
      const x = R * Math.cos(th), z = R * Math.sin(th), y = (rnd() - 0.5) * 0.05
      pos[4][i * 3] = x; pos[4][i * 3 + 1] = y * Math.cos(tilt) - z * Math.sin(tilt); pos[4][i * 3 + 2] = y * Math.sin(tilt) + z * Math.cos(tilt)
      set3(col[4], i, [C_OCR, C_SAV, C_IND][ring].map((v) => v * 0.42))
    }
    // 5 : tunnel de points derrière les projets
    const a5 = rnd() * 6.2832, R5 = 3.0 + Math.pow(rnd(), 0.7) * 6.5
    pos[5][i * 3] = Math.cos(a5) * R5 * 1.5; pos[5][i * 3 + 1] = Math.sin(a5) * R5; pos[5][i * 3 + 2] = -30 + rnd() * 34
    set3(col[5], i, mixc(grad(rnd()), C_CRE, 0.3).map((v) => v * 0.55))
    // 6 : écran d'application (fenêtre, menu, bandeau, cartes)
    {
      let t = rnd() * SCREEN_W, k = 0; while (k < SCREEN.length - 1 && t > SCREEN[k][6]) { t -= SCREEN[k][6]; k++ }
      const r = SCREEN[k], fill = rnd() < r[5]
      let x, y
      if (fill) { x = r[0] + rnd() * r[2]; y = r[1] + rnd() * r[3] }
      else { const per = rnd() * 2 * (r[2] + r[3]); if (per < r[2]) { x = r[0] + per; y = r[1] } else if (per < r[2] + r[3]) { x = r[0] + r[2]; y = r[1] + per - r[2] } else if (per < 2 * r[2] + r[3]) { x = r[0] + per - r[2] - r[3]; y = r[1] + r[3] } else { x = r[0]; y = r[1] + per - 2 * r[2] - r[3] } }
      pos[6][i * 3] = x + (rnd() - 0.5) * 0.015; pos[6][i * 3 + 1] = y + (rnd() - 0.5) * 0.015; pos[6][i * 3 + 2] = r[4] + (rnd() - 0.5) * 0.02
      set3(col[6], i, r[7].map((v) => v * (fill ? 0.7 : 1)))
    }
    // 7 : base de données (cylindres empilés) et ses deux copies
    {
      const q = rnd(), stack = q < 0.62 ? 0 : q < 0.78 ? 1 : q < 0.94 ? 2 : 3
      if (stack === 3) { // liaisons vers les copies
        const side = rnd() < 0.5 ? -1 : 1, t = rnd()
        pos[7][i * 3] = side * (1.35 + t * 0.75); pos[7][i * 3 + 1] = 0.1 + Math.sin(t * 3.1416) * 0.25; pos[7][i * 3 + 2] = (rnd() - 0.5) * 0.03
        set3(col[7], i, C_CRE.map((v) => v * 0.6))
      } else {
        const R = stack === 0 ? 1.2 : 0.5, H = stack === 0 ? 0.6 : 0.26, gap = stack === 0 ? 0.2 : 0.09
        const cx = stack === 0 ? 0 : stack === 1 ? -2.6 : 2.6
        const level = (rnd() * 3) | 0, y0 = (1 - level) * (H + gap) - H / 2
        const th = rnd() * 6.2832, part = rnd()
        let rr = R, yy
        if (part < 0.34) yy = y0 + H; else if (part < 0.56) yy = y0; else if (part < 0.86) yy = y0 + rnd() * H; else { yy = y0 + H; rr = R * Math.sqrt(rnd()) }
        pos[7][i * 3] = cx + Math.cos(th) * rr; pos[7][i * 3 + 1] = yy; pos[7][i * 3 + 2] = Math.sin(th) * rr
        set3(col[7], i, (stack === 0 ? mixc([0.31, 0.64, 0.65], C_CRE, level * 0.18) : stack === 1 ? C_SAV : C_OCR).map((v) => v * (part >= 0.56 && part < 0.86 ? 0.55 : 1)))
      }
    }
  }

  /* ---- shaders ---- */
  const VS = `#version 300 es
precision highp float;
in vec3 pA;in vec3 pB;in vec3 cA;in vec3 cB;in vec4 aNet;in float aSeed;
uniform float uSeg,uF,uKA,uKB,uTime,uPx,uMotion,uIntro,uGlow,uS,uFlow;uniform vec3 uTint;
uniform mat4 uModel,uView,uProj;uniform vec2 uMouse;uniform float uHot[${NN}];
out vec3 vCol;out float vGlyph;out float vDigit;
float isK(float k,float v){return 1.-step(0.5,abs(k-v));}
void main(){
 float ff=clamp(uF*1.5-aSeed*0.5,0.,1.);ff=ff*ff*(3.-2.*ff);
 float t=uTime*uMotion;
 float a0=isK(uKA,0.),b0=isK(uKB,0.);
 vec3 g=a0>0.5?pA:pB;
 float wave=sin(g.x*0.55+t*0.9)*0.30+sin(g.z*0.45-t*0.7)*0.28+sin((g.x+g.z)*0.3+t*0.5)*0.18;
 vec3 a=pA;a.y+=wave*a0;
 vec3 b=pB;b.y+=wave*b0;
 float a5=isK(uKA,5.),b5=isK(uKB,5.);
 float flow=uTime*1.4*uMotion+uFlow;
 if(a5>0.5)a.z=mod(a.z+30.+flow,34.)-30.;
 if(b5>0.5)b.z=mod(b.z+30.+flow,34.)-30.;
 float w5=a5*(1.-ff)+b5*ff;
 vec3 pos=mix(a,b,ff);
 float s1=aSeed*43.98;
 float arc=sin(3.14159*ff);
 float ang=arc*(1.1+aSeed*1.7)*mix(1.,0.45,max(a0,b0));
 float cs=cos(ang),sn=sin(ang);
 pos.xz=mat2(cs,-sn,sn,cs)*pos.xz;
 pos*=1.+arc*0.22;
 pos+=vec3(sin(s1),cos(s1*1.3),sin(s1*0.7))*0.32*arc;
 pos=mix(pos*2.6+vec3(sin(s1*3.1),cos(s1*2.3),sin(s1*5.7))*4.5,pos,uIntro);
 float wG=a0*(1.-ff)+b0*ff;
 float wNm=isK(uKA,1.)*(1.-ff)+isK(uKB,1.)*ff;
 float wN=isK(uKA,3.)*(1.-ff)+isK(uKB,3.)*ff;wN*=wN;
 pos+=vec3(sin(t*0.5+s1),cos(t*0.4+s1*1.7),sin(t*0.3+s1*2.3))*0.022*(1.-wG);
 vec4 mv=uView*uModel*vec4(pos,1.);
 vec2 d=mv.xy-uMouse;float dd=dot(d,d);
 mv.xy+=normalize(d+vec2(1e-4))*0.5*exp(-dd*3.2);
 gl_Position=uProj*mv;
 float depth=-mv.z;
 float fog=smoothstep(25.,7.,depth);
 float f0=mix(1.,fog,wG);
 f0*=mix(1.,smoothstep(0.8,4.5,depth)*smoothstep(36.,16.,depth),w5);
 float hot=max(uHot[int(aNet.x+0.5)],uHot[int(aNet.y+0.5)]);
 float pulse=smoothstep(0.10,0.,abs(fract(uTime*0.32+aNet.x*0.37+aNet.y*0.11)-aNet.z));
 float briE=0.34+pulse*1.5+hot*1.2;
 float briN=0.62+hot*1.5;
 float bri=mix(1.,mix(briN,briE,aNet.w),wN);
 float nx=isK(uKA,1.)>0.5?pA.x:pB.x;
 float sweep=0.*nx;
 bri=bri+sweep;
 float glyph=a0*(1.-smoothstep(0.5,0.95,ff))+b0*smoothstep(0.05,0.5,ff);
 float sz=mix(0.026,0.058,fract(aSeed*91.7));
 sz*=mix(1.,mix(0.95+hot*0.45,0.8+pulse*0.5,aNet.w),wN);
 sz*=max(0.5,uS)+0.*wNm;
 sz*=1.+1.3*w5;
 sz=mix(sz,0.17,glyph);
 vec3 c=mix(cA,cB,ff);
 c=mix(c,vec3(0.98,0.86,0.55),clamp(hot*0.6+pulse*0.5*aNet.w+sweep*0.6,0.,1.)*max(wN,wNm));
 c=mix(c,uTint*(0.5+0.5*fract(aSeed*5.3)),0.72*w5);
 float k=mix(0.42,0.62,glyph)*f0*(1.+0.9*w5);
 if(uGlow>0.5){sz*=mix(6.,2.2,glyph);k*=mix(0.05,0.04,glyph);glyph=0.;}
 gl_PointSize=clamp(sz*uPx/depth,1.5,90.);
 vCol=c*bri*k;vGlyph=glyph;
 vDigit=floor(mod(aSeed*97.+floor(uTime*(0.5+fract(aSeed*13.)*2.2)),10.));
}`
  const FS = `#version 300 es
precision mediump float;in vec3 vCol;in float vGlyph;in float vDigit;uniform sampler2D uTex;out vec4 o;
void main(){float r=length(gl_PointCoord-.5);float d=smoothstep(.5,.05,r);d*=d;
 float g=texture(uTex,vec2((vDigit+gl_PointCoord.x)/10.,gl_PointCoord.y)).r;
 float a=mix(d,g,vGlyph);o=vec4(vCol*a,0.);}`
  const LVS = `#version 300 es
precision highp float;in vec3 pos;uniform mat4 uModel,uView,uProj;
void main(){gl_Position=uProj*uView*uModel*vec4(pos,1.);}`
  const LFS = `#version 300 es
precision mediump float;uniform vec4 uColor;out vec4 o;void main(){o=vec4(uColor.rgb*uColor.a,0.);}`

  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s)); return s }
  const prog = (v, f) => { const p = gl.createProgram(); gl.attachShader(p, sh(gl.VERTEX_SHADER, v)); gl.attachShader(p, sh(gl.FRAGMENT_SHADER, f)); gl.linkProgram(p); if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p)); return p }
  const P = prog(VS, FS), L = prog(LVS, LFS)
  const buf = (data) => { const b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW); return b }
  const point = (p, name, b, size) => { const loc = gl.getAttribLocation(p, name); if (loc < 0) return; gl.bindBuffer(gl.ARRAY_BUFFER, b); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0) }

  const posB = pos.map(buf), colB = col.map(buf), netB = buf(net), seedB = buf(seed)
  const vaoP = gl.createVertexArray(); gl.bindVertexArray(vaoP)
  point(P, 'aNet', netB, 4); point(P, 'aSeed', seedB, 1)
  let boundSeg = -1
  const bindSeg = (seg) => { if (seg === boundSeg) return; boundSeg = seg; const a = ORDER[seg], b = ORDER[seg + 1]; point(P, 'pA', posB[a], 3); point(P, 'pB', posB[b], 3); point(P, 'cA', colB[a], 3); point(P, 'cB', colB[b], 3) }

  const ev = new Float32Array(edges.length * 6)
  edges.forEach((e, i) => { ev.set(nodes[e[0]], i * 6); ev.set(nodes[e[1]], i * 6 + 3) })
  const vaoE = gl.createVertexArray(); gl.bindVertexArray(vaoE); point(L, 'pos', buf(ev), 3)
  const ax = [-2.75, BASE, 0.34, 2.75, BASE, 0.34, -2.75, BASE, 0.34, -2.75, BASE + 3.1, 0.34, -2.75, BASE, 0.34, -2.75, BASE, -0.5]
  for (let i = 1; i <= 5; i++) { const yy = BASE + i * 0.58; ax.push(-2.75, yy, 0.34, -2.66, yy, 0.34) }
  for (let i = 0; i < NB; i++) { const xx = (i - 6) * (4.6 / 12); ax.push(xx, BASE, 0.34, xx, BASE - 0.07, 0.34) }
  const av = new Float32Array(ax)
  const vaoA = gl.createVertexArray(); gl.bindVertexArray(vaoA); point(L, 'pos', buf(av), 3)
  gl.bindVertexArray(null)

  const U = (p, n) => gl.getUniformLocation(p, n)
  const u = { Seg: U(P, 'uSeg'), F: U(P, 'uF'), KA: U(P, 'uKA'), KB: U(P, 'uKB'), T: U(P, 'uTime'), Px: U(P, 'uPx'), Mo: U(P, 'uMotion'), M: U(P, 'uModel'), V: U(P, 'uView'), Pr: U(P, 'uProj'), Ms: U(P, 'uMouse'), H: U(P, 'uHot'), I: U(P, 'uIntro'), G: U(P, 'uGlow'), S: U(P, 'uS'), Fl: U(P, 'uFlow'), Ti: U(P, 'uTint'), Tx: U(P, 'uTex') }
  const ul = { M: U(L, 'uModel'), V: U(L, 'uView'), Pr: U(L, 'uProj'), C: U(L, 'uColor') }

  // atlas des chiffres 0-9
  const ac = document.createElement('canvas'); ac.width = 640; ac.height = 64; const a2 = ac.getContext('2d')
  a2.fillStyle = '#000'; a2.fillRect(0, 0, 640, 64); a2.fillStyle = '#fff'; a2.textAlign = 'center'; a2.textBaseline = 'middle'
  a2.font = '700 50px "Consolas","SF Mono","Menlo","Courier New",monospace'
  for (let i = 0; i < 10; i++) a2.fillText(String(i), i * 64 + 32, 35)
  const tex = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, tex)
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, ac); gl.generateMipmap(gl.TEXTURE_2D)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE); gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)

  /* ---- matrices ---- */
  const mul = (a, b) => { const o = new Float32Array(16); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) o[c * 4 + r] = a[r] * b[c * 4] + a[4 + r] * b[c * 4 + 1] + a[8 + r] * b[c * 4 + 2] + a[12 + r] * b[c * 4 + 3]; return o }
  const persp = (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2), o = new Float32Array(16); o[0] = t / asp; o[5] = t; o[10] = (f + n) / (n - f); o[11] = -1; o[14] = (2 * f * n) / (n - f); return o }
  const trans = (x, y, z) => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1])
  const scal = (s) => new Float32Array([s, 0, 0, 0, 0, s, 0, 0, 0, 0, s, 0, 0, 0, 0, 1])
  const rotY = (a) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]) }
  const rotX = (a) => { const c = Math.cos(a), s = Math.sin(a); return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]) }
  const view = trans(0, 0, -DIST), visH = 2 * TAN * DIST
  let proj, W = 1, H = 1, asp = 1, visW = 1
  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    W = canvas.clientWidth; H = canvas.clientHeight
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    asp = W / H; visW = visH * asp; proj = persp(FOV, asp, 0.1, 50)
  }
  window.addEventListener('resize', resize); resize()

  /* ---- étiquettes du réseau ---- */
  const labs = []
  let manual = null, pinned = false
  const mkLab = (txt, kind, idx) => {
    const d = document.createElement('div'); d.className = 'lab ' + kind; d.textContent = txt; opts.labels.appendChild(d)
    const o = { el: d, node: layerStart[kind === 'in' ? 0 : 3] + idx, kind, idx, on: false }; labs.push(o)
    d.addEventListener('mouseenter', () => { if (!pinned) manual = o })
    d.addEventListener('mouseleave', () => { if (!pinned) manual = null })
    d.addEventListener('click', () => { if (pinned && manual === o) { pinned = false; manual = null } else { manual = o; pinned = true } })
  }
  NET_INPUTS.forEach((t, i) => mkLab(t, 'in', i)); NET_OUTPUTS.forEach((t, i) => mkLab(t, 'out', i))
  const hot = new Float32Array(NN), hotT = new Float32Array(NN)
  const setHot = (o) => {
    hotT.fill(0); labs.forEach((l) => { l.on = false })
    if (!o) return
    let ins = [], outs = []
    if (o.kind === 'in') { ins = [o.idx]; outs = LINKS[o.idx] } else { outs = [o.idx]; for (const k in LINKS) if (LINKS[k].indexOf(o.idx) >= 0) ins.push(+k) }
    ins.forEach((i) => { hotT[layerStart[0] + i] = 1 }); outs.forEach((i) => { hotT[layerStart[3] + i] = 1 })
    labs.forEach((l) => { l.on = (l.kind === 'in' ? ins : outs).indexOf(l.idx) >= 0 })
  }

  /* ---- souris ---- */
  let mx = 0, my = 0, mOn = false, smx = 0, smy = 0
  const onMove = (e) => { if (e.pointerType === 'touch') return; mx = (e.clientX / W) * 2 - 1; my = -((e.clientY / H) * 2 - 1); mOn = true }
  const onLeave = () => { mOn = false }
  window.addEventListener('pointermove', onMove); document.addEventListener('pointerleave', onLeave)

  const byState = (v, p) => { const i = Math.min(STATES - 2, Math.floor(p)); let f = p - i; f = f * f * (3 - 2 * f); return v[i] + (v[i + 1] - v[i]) * f }
  const near = (p, i, k) => Math.max(0, Math.min(1, 1 - Math.abs(p - i) * k))

  gl.disable(gl.DEPTH_TEST); gl.enable(gl.BLEND); gl.blendFunc(gl.ONE, gl.ONE)
  const tintS = [0.93, 0.62, 0.14]
  let last = performance.now(), time = 0, uP = 0, raf = 0, alive = true
  const frame = (now) => {
    if (!alive) return
    const dt = Math.min(0.05, (now - last) / 1000); last = now; time += dt
    uP += (opts.getTarget() - uP) * Math.min(1, dt * 9)
    const drift = opts.getDrift ? opts.getDrift() : 0
    smx += ((mOn ? mx : 0) - smx) * Math.min(1, dt * 4); smy += ((mOn ? my : 0) - smy) * Math.min(1, dt * 4)

    const wide = asp > 1.15
    const fitShape = wide ? Math.min(1, (visW * 0.43) / 5.6) : Math.min(1, (visW * 0.92) / 6.3)
    const ox = wide ? visW * 0.17 : 0, oy = wide ? 0 : visH * 0.17
    const mo = reduce ? 0.25 : 1
    // réglages par forme : échelle, position, rotation
    const K = {
      0: [1, 0, 0, 0, 0],
      1: [wide ? fitShape * 1.02 : 0.46, ox, wide ? 0 : visH * 0.26, time * 0.12 * mo, 0.38],
      2: [fitShape, ox, oy, -0.52, 0.3],
      3: [fitShape * (wide ? 0.86 : 0.6), ox, oy, Math.sin(time * 0.22) * 0.28 * mo, 0.06],
      4: [wide ? Math.min(1.25, visW / 9) : 0.5, wide ? visW * 0.2 : 0, wide ? 0 : visH * 0.25, time * 0.08 * mo, 0.5],
      5: [1, 0, 0, 0, 0],
      6: [fitShape * 1.05, ox, oy, -0.42 + Math.sin(time * 0.3) * 0.1 * mo, 0.1],
      7: [fitShape * (wide ? 0.92 : 0.8), ox, oy, time * 0.22 * mo, 0.3],
    }
    const col5 = (n) => ORDER.map((k) => K[k][n])
    const sc = byState(col5(0), uP), tx2 = byState(col5(1), uP), ty = byState(col5(2), uP)
    const ry = byState(col5(3), uP) + smx * 0.16 + drift * 0.34
    const rx = byState(col5(4), uP) - smy * 0.1 + drift * 0.06
    const model = mul(trans(tx2, ty, 0), mul(rotY(ry), mul(rotX(rx), scal(sc))))

    const wN = near(uP, IDX[3], 2.2)
    let cur = manual
    if (!cur && wN > 0.5) cur = labs[Math.floor(time / 2.6) % NET_INPUTS.length]
    setHot(wN > 0.5 ? cur : null)
    for (let i = 0; i < NN; i++) hot[i] += (hotT[i] - hot[i]) * Math.min(1, dt * 6)

    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(L); gl.uniformMatrix4fv(ul.M, false, model); gl.uniformMatrix4fv(ul.V, false, view); gl.uniformMatrix4fv(ul.Pr, false, proj)
    const wA = near(uP, IDX[2], 2.6)
    if (wA > 0.01) { gl.uniform4f(ul.C, 0.95, 0.89, 0.78, 0.34 * wA); gl.bindVertexArray(vaoA); gl.drawArrays(gl.LINES, 0, av.length / 3) }
    const wE = near(uP, IDX[3], 5)
    if (wE > 0.01) { gl.uniform4f(ul.C, 0.89, 0.65, 0.23, 0.085 * wE); gl.bindVertexArray(vaoE); gl.drawArrays(gl.LINES, 0, ev.length / 3) }

    const seg = Math.min(STATES - 2, Math.floor(uP))
    gl.useProgram(P); gl.bindVertexArray(vaoP); bindSeg(seg)
    gl.uniform1f(u.Seg, seg); gl.uniform1f(u.F, uP - seg); gl.uniform1f(u.KA, ORDER[seg]); gl.uniform1f(u.KB, ORDER[seg + 1])
    const tint = opts.getTint ? opts.getTint() : [0.93, 0.62, 0.14]
    for (let i = 0; i < 3; i++) tintS[i] += (tint[i] - tintS[i]) * Math.min(1, dt * 3)
    gl.uniform3f(u.Ti, tintS[0], tintS[1], tintS[2]); gl.uniform1f(u.Fl, opts.getFlow ? opts.getFlow() : 0)
    gl.uniform1f(u.S, sc); gl.uniform1f(u.T, time); gl.uniform1f(u.Mo, mo)
    gl.uniform1f(u.Px, canvas.height / (2 * TAN))
    gl.uniformMatrix4fv(u.M, false, model); gl.uniformMatrix4fv(u.V, false, view); gl.uniformMatrix4fv(u.Pr, false, proj)
    if (mOn) gl.uniform2f(u.Ms, smx * TAN * DIST * asp, smy * TAN * DIST); else gl.uniform2f(u.Ms, 999, 999)
    gl.uniform1fv(u.H, hot)
    let it = Math.min(1, time / 2.2); it = 1 - Math.pow(1 - it, 4); gl.uniform1f(u.I, it)
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(u.Tx, 0)
    gl.uniform1f(u.G, 1); gl.drawArrays(gl.POINTS, 0, (N / 4) | 0)
    gl.uniform1f(u.G, 0); gl.drawArrays(gl.POINTS, 0, N)

    // étiquettes
    const mvp = mul(proj, mul(view, model))
    const project = (nd) => {
      const cx = mvp[0] * nd[0] + mvp[4] * nd[1] + mvp[8] * nd[2] + mvp[12], cy = mvp[1] * nd[0] + mvp[5] * nd[1] + mvp[9] * nd[2] + mvp[13], cw = mvp[3] * nd[0] + mvp[7] * nd[1] + mvp[11] * nd[2] + mvp[15]
      return [((cx / cw) * 0.5 + 0.5) * W, (1 - ((cy / cw) * 0.5 + 0.5)) * H]
    }
    for (const lb of labs) {
      const s = project(nodes[lb.node]), off = wide ? 16 : 9
      lb.el.style.left = (s[0] + (lb.kind === 'in' ? -off : off)).toFixed(1) + 'px'; lb.el.style.top = s[1].toFixed(1) + 'px'
      lb.el.style.opacity = wN.toFixed(3); lb.el.style.pointerEvents = wN > 0.6 ? 'auto' : 'none'
      lb.el.classList.toggle('hot', lb.on && wN > 0.5)
    }
    const c = project([0, 0, 0])
    opts.onFrame({ p: uP, time, dt, W, H, wide, cx: c[0], cy: c[1], radius: (2.3 * sc * H) / visH })
    raf = requestAnimationFrame(frame)
  }
  raf = requestAnimationFrame(frame)

  return {
    destroy() {
      alive = false; cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize); window.removeEventListener('pointermove', onMove); document.removeEventListener('pointerleave', onLeave)
      labs.forEach((l) => l.el.remove())
    },
  }
}
