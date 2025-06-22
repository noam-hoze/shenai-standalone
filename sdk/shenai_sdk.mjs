import { makeResponseWithLoading } from "./util/index.mjs";
var Module = (() => {
    var _scriptName = import.meta.url;

    return async function (moduleArg = {}) {
        var moduleRtn;

        var g = moduleArg,
            aa,
            ba,
            ca = new Promise((a, b) => {
                aa = a;
                ba = b;
            }),
            da = "object" == typeof window,
            ea = "undefined" != typeof WorkerGlobalScope,
            m = ea && self.name?.startsWith("em-pthread"),
            fa = Object.assign({}, g),
            ha = "",
            ia,
            ja;
        if (da || ea)
            ea
                ? (ha = self.location.href)
                : "undefined" != typeof document &&
                  document.currentScript &&
                  (ha = document.currentScript.src),
                _scriptName && (ha = _scriptName),
                ha.startsWith("blob:")
                    ? (ha = "")
                    : (ha = ha.slice(
                          0,
                          ha.replace(/[?#].*/, "").lastIndexOf("/") + 1
                      )),
                ea &&
                    (ja = (a) => {
                        var b = new XMLHttpRequest();
                        b.open("GET", a, !1);
                        b.responseType = "arraybuffer";
                        b.send(null);
                        return new Uint8Array(b.response);
                    }),
                (ia = async (a) => {
                    a = await fetch(a, { credentials: "same-origin" });
                    if (a.ok) return a.arrayBuffer();
                    throw Error(a.status + " : " + a.url);
                });
        var ka = console.log.bind(console),
            p = console.error.bind(console);
        Object.assign(g, fa);
        fa = null;
        var q,
            la,
            ma = !1,
            na,
            oa,
            pa,
            qa,
            ra,
            sa,
            ta,
            ua,
            va,
            wa,
            xa,
            ya = !1,
            Aa = !1;
        function w() {
            q.buffer != oa.buffer && Ba();
            return oa;
        }
        function x() {
            q.buffer != oa.buffer && Ba();
            return pa;
        }
        function A() {
            q.buffer != oa.buffer && Ba();
            return qa;
        }
        function Ca() {
            q.buffer != oa.buffer && Ba();
            return ra;
        }
        function C() {
            q.buffer != oa.buffer && Ba();
            return sa;
        }
        function F() {
            q.buffer != oa.buffer && Ba();
            return ta;
        }
        function Da() {
            q.buffer != oa.buffer && Ba();
            return ua;
        }
        function Fa() {
            q.buffer != oa.buffer && Ba();
            return xa;
        }
        if (m) {
            var Ga,
                Ha = !1;
            p = function (...b) {
                console.error(b.join(" "));
            };
            self.alert = function (...b) {
                postMessage({ Kf: "alert", text: b.join(" "), Fh: Ia() });
            };
            self.onunhandledrejection = (b) => {
                throw b.reason || b;
            };
            function a(b) {
                try {
                    var c = b.data,
                        d = c.Kf;
                    if ("load" === d) {
                        let e = [];
                        self.onmessage = (f) => e.push(f);
                        self.startWorker = () => {
                            postMessage({ Kf: "loaded" });
                            for (let f of e) a(f);
                            self.onmessage = a;
                        };
                        for (const f of c.ph)
                            if (!g[f] || g[f].proxy)
                                (g[f] = (...h) => {
                                    postMessage({
                                        Kf: "callHandler",
                                        oh: f,
                                        hh: h,
                                    });
                                }),
                                    "print" == f && (ka = g[f]),
                                    "printErr" == f && (p = g[f]);
                        q = c.Hh;
                        Ba();
                        Ga(c.Ih);
                    } else if ("run" === d) {
                        Ja(c.Mf);
                        Ka(c.Mf, 0, 0, 1, 0, 0);
                        La(c);
                        Ma();
                        Na(c.Mf);
                        Ha || (Oa(), (Ha = !0));
                        try {
                            Pa(c.Dh, c.jg);
                        } catch (e) {
                            if ("unwind" != e) throw e;
                        }
                    } else
                        "setimmediate" !== c.target &&
                            ("checkMailbox" === d
                                ? Ha && Qa()
                                : d &&
                                  (p(`worker: received unknown command ${d}`),
                                  p(c)));
                } catch (e) {
                    throw (Ra(), e);
                }
            }
            self.onmessage = a;
        }
      function Ba() {
          var a = q.buffer;
          oa = new Int8Array(a);
          qa = new Int16Array(a);
          pa = new Uint8Array(a);
          ra = new Uint16Array(a);
          sa = new Int32Array(a);
          ta = new Uint32Array(a);
          ua = new Float32Array(a);
          xa = new Float64Array(a);
          va = new BigInt64Array(a);
          wa = new BigUint64Array(a);
      }
      m ||
          ((q = new WebAssembly.Memory({
              initial: 2048,
              maximum:
                  (/iPad|iPhone|iPod/.test(
                      "undefined" !== typeof navigator
                          ? navigator.userAgent
                          : ""
                  )
                      ? 2147483648
                      : 2147483648) / 65536,
              shared: !0,
          })),
          Ba());
      function Sa() {
          ya = !0;
          m ? startWorker(g) : G.bd();
      }
      var Ta = 0,
          Ua = null;  
        m ||
            ((q = new WebAssembly.Memory({
                initial: 2048,
                maximum:
                    (/iPad|iPhone|iPod/.test(
                        "undefined" !== typeof navigator
                            ? navigator.userAgent
                            : ""
                    )
                        ? 536870912
                        : 2147483648) / 65536,
                shared: !0,
            })),
            Ba());
        function Sa() {
            ya = !0;
            m ? startWorker(g) : G.bd();
        }
        var Ta = 0,
            Ua = null;
        function Va() {
            Ta--;
            if (0 == Ta && Ua) {
                var a = Ua;
                Ua = null;
                a();
            }
        }
        function Wa(a) {
            a = "Aborted(" + a + ")";
            p(a);
            ma = !0;
            a += ". Build with -sASSERTIONS for more info.";
            ya && Xa();
            a = new WebAssembly.RuntimeError(a);
            ba(a);
            throw a;
        }
        var Ya;
        async function Za(a) {
            try {
                var b = await ia(a);
                return new Uint8Array(b);
            } catch {}
            if (ja) a = ja(a);
            else throw "both async and sync fetching of the wasm failed";
            return a;
        }
        async function $a(a, b) {
            try {
                var c = await Za(a);
                return await WebAssembly.instantiate(c, b);
            } catch (d) {
                p(`failed to asynchronously prepare wasm: ${d}`), Wa(d);
            }
        }
        async function ab(a) {
            var b = Ya;
            if ("function" == typeof WebAssembly.instantiateStreaming)
                try {
                    var c = fetch(b, { credentials: "same-origin" });
                    return await WebAssembly.instantiateStreaming(
                        makeResponseWithLoading(c),
                        a
                    );
                } catch (d) {
                    p(`wasm streaming compile failed: ${d}`),
                        p("falling back to ArrayBuffer instantiation");
                }
            return $a(b, a);
        }
        function bb() {
            cb = {
                Ya: db,
                Ub: eb,
                fc: fb,
                J: gb,
                yc: hb,
                cc: ib,
                ec: jb,
                Ba: kb,
                wc: lb,
                oc: mb,
                vc: nb,
                $a: ob,
                dc: pb,
                ac: qb,
                xc: rb,
                bc: sb,
                Bc: tb,
                m: ub,
                Va: vb,
                Rb: wb,
                Pb: xb,
                q: yb,
                d: zb,
                Ua: Ab,
                j: Bb,
                R: Cb,
                u: Db,
                Qb: Eb,
                za: Fb,
                C: Gb,
                g: Hb,
                Sb: Ib,
                rc: Jb,
                _b: Kb,
                hc: Lb,
                Wb: Mb,
                Za: Nb,
                qc: Na,
                zc: Ob,
                i: Pb,
                Ha: Qb,
                ea: Rb,
                c: Sb,
                Tb,
                U: Ub,
                f: Vb,
                da: Wb,
                oa: Xb,
                Xa: Yb,
                h: Zb,
                e: $b,
                n: ac,
                kc: bc,
                lc: cc,
                mc: dc,
                ic: ec,
                jc: fc,
                Xb: gc,
                nc: hc,
                ad: ic,
                xb: jc,
                Yc: kc,
                Zc: lc,
                yb: mc,
                zb: nc,
                vb: oc,
                wb: pc,
                _c: qc,
                sb: rc,
                $c: sc,
                ja: tc,
                tb: uc,
                Ac: vc,
                Qa: wc,
                Wc: xc,
                t: yc,
                rb: zc,
                Xc: Ac,
                _a: Bc,
                ab: Cc,
                Ec: Dc,
                Sa: Ec,
                Cc: Fc,
                pb: Gc,
                Ta: Hc,
                Ra: Ic,
                xa: Jc,
                $b: Kc,
                b: Lc,
                Hb: Mc,
                Gb: Nc,
                Ib: Oc,
                wa: Pc,
                ia: Qc,
                Ob: Rc,
                Zb: Sc,
                ya: Tc,
                db: Uc,
                cb: Vc,
                Wa: Wc,
                kb: Xc,
                ib: Yc,
                jb: Zc,
                gb: $c,
                fb: ad,
                hb: bd,
                eb: cd,
                Dc: dd,
                Fc: ed,
                Gc: fd,
                lb: gd,
                gc: hd,
                Nb: jd,
                tc: kd,
                uc: ld,
                Ca: md,
                fa: nd,
                sc: od,
                bb: pd,
                pc: qd,
                Aa: rd,
                Uc: sd,
                Mb: td,
                X: ud,
                Lc: vd,
                p: wd,
                x: xd,
                O: yd,
                y: zd,
                k: Ad,
                La: Bd,
                ga: Cd,
                Sc: Dd,
                H: Ed,
                Ia: Fd,
                Cb: Gd,
                ka: Hd,
                Z: Id,
                Ma: Jd,
                Na: Kd,
                Oc: Ld,
                Mc: Md,
                Qc: Nd,
                va: Od,
                w: Pd,
                na: Qd,
                mb: Rd,
                aa: Sd,
                Ga: Td,
                Q: Ud,
                F: Vd,
                T: Wd,
                ca: Xd,
                Hc: Yd,
                A: Zd,
                G: $d,
                Db: ae,
                Ja: be,
                o: ce,
                E: de,
                N: ee,
                sa: fe,
                ua: ge,
                L: he,
                ma: ie,
                _: je,
                V: ke,
                I: le,
                Tc: me,
                Ic: ne,
                Ea: oe,
                ta: pe,
                W: qe,
                S: re,
                Jc: se,
                nb: te,
                Nc: ue,
                ob: ve,
                l: we,
                z: xe,
                ba: ye,
                Eb: ze,
                Da: Ae,
                Fb: Be,
                qa: Ce,
                $: De,
                Kc: Ee,
                la: Fe,
                Oa: Ge,
                Bb: Ie,
                Ab: Je,
                ra: Ke,
                qb: Le,
                Ka: Me,
                Pc: Ne,
                P: Oe,
                s: Pe,
                ha: Qe,
                B: Re,
                K: Se,
                Fa: Te,
                pa: Ue,
                Rc: Ve,
                Y: We,
                v: Xe,
                r: Ye,
                D: Ze,
                M: $e,
                Lb: af,
                a: q,
                Vb: bf,
                Yb: cf,
                Jb: df,
                ub: ef,
                Kb: ff,
                Pa: gf,
                Vc: hf,
            };
            return { a: cb };
        }
        var kf = {
            15986092: (a, b, c, d) => {
                if ("undefined" == typeof g || !g.fh) return 1;
                a = H(a >>> 0);
                a.startsWith("./") && (a = a.substring(2));
                a = g.fh.get(a);
                if (!a) return 2;
                b >>>= 0;
                c >>>= 0;
                d >>>= 0;
                if (b + c > a.byteLength) return 3;
                try {
                    return x().set(a.subarray(b, b + c), d), 0;
                } catch {
                    return 4;
                }
            },
            15986593: () => (g.MxCaptureRunning ? 1 : 0),
            15986640: (a) => {
                a = H(a).replace(/^#/, "");
                const b = document.getElementById(a),
                    c = document.createElement("canvas");
                c.width = b.width;
                c.height = b.height;
                c.style = b.style;
                b.replaceWith(c);
                c.id = a;
            },
            15986953: () =>
                /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent),
            15987021: () => {
                let a = !0,
                    b = null,
                    c = 0;
                const d = (f) => {
                        (null === b || f > c) &&
                            0 < f &&
                            (null !== b && I(b), (b = K(f)), (c = f));
                    },
                    e = self.onmessage;
                self.onmessage = (f) => {
                    if ("MxStartFrameProcessing" === f.data.cmd) a = !0;
                    else if ("MxFinishFrameProcessing" === f.data.cmd)
                        (a = !1), null !== b && (I(b), (b = null), (c = 0));
                    else if ("MxProcessFrame" === f.data.cmd) {
                        if (a) {
                            var h = f.data.frame,
                                k = f.data.format,
                                l = f.data.width,
                                n = f.data.height,
                                r = f.data.timestamp,
                                v = f.data.facing_user,
                                t = f.data.full_frame_processing;
                            f = f.data.device_id;
                            if (h instanceof ImageData)
                                (h = h.data),
                                    d(h.byteLength),
                                    x().set(h, b),
                                    g._ingestCameraFrame(
                                        b,
                                        h.byteLength,
                                        k,
                                        l,
                                        n,
                                        r,
                                        v,
                                        t,
                                        f
                                    );
                            else {
                                var y = { x: 0, y: 0 };
                                y.width = l;
                                y.height = n;
                                y = { rect: y };
                                var E = h.allocationSize(y);
                                d(E);
                                E = x().subarray(b, b + E);
                                h.copyTo(E, y);
                                g._ingestCameraFrame(
                                    b,
                                    E.byteLength,
                                    k,
                                    l,
                                    n,
                                    r,
                                    v,
                                    t,
                                    f
                                );
                                h.close();
                            }
                        }
                    } else e(f);
                };
            },
            15988915: (a) => {
                const b = a.toString();
                g.MxStartFrameProcessing = () => {
                    jf[b].postMessage({ cmd: "MxStartFrameProcessing" });
                };
                g.MxFinishFrameProcessing = () => {
                    jf[b].postMessage({ cmd: "MxFinishFrameProcessing" });
                };
                g.MxDispatchFrameToThread = (c, d, e, f, h, k, l, n) => {
                    jf[b].postMessage(
                        {
                            cmd: "MxProcessFrame",
                            frame: c,
                            format: d,
                            width: e,
                            height: f,
                            timestamp: h,
                            facing_user: k,
                            full_frame_processing: l,
                            device_id: n,
                        },
                        [c instanceof ImageData ? c.data.buffer : c]
                    );
                };
            },
            15989719: () => {
                g.MxStartFrameProcessing && g.MxStartFrameProcessing();
            },
            15989801: () => {
                g.MxFinishFrameProcessing && g.MxFinishFrameProcessing();
            },
            15989885: () => {
                window.MxClosePreloadDisplay();
            },
            15989924: (a) => {
                a = H(a);
                window.MxUpdatePreloadDisplay(a);
            },
            15989999: (a) => {
                const b = H(a),
                    c = performance.now(),
                    d = () => window.MxUpdatePreloadDisplay(b, c);
                navigator.permissions
                    .query({ name: "camera" })
                    .then((e) => {
                        "prompt" == e.state && d();
                    })
                    .catch(() => {
                        setTimeout(d, 1e3);
                    });
            },
            15990430: (a) => {
                console.log(H(a));
            },
            15990465: (a, b) => {
                fetch("https://telemetry.shen.ai/v1/traces", {
                    method: "POST",
                    body: H(a),
                    headers: {
                        "Content-Type": "application/json",
                        "X-Shen-Telemetry-Transport": "http",
                    },
                    keepalive: b,
                });
            },
        };
        function ic() {
            window.Ff ||
                ((window.Ff = function () {
                    g._handlePagehide();
                }),
                window.addEventListener("pagehide", window.Ff));
        }
        function ef() {
            window.Ff &&
                (window.removeEventListener("pagehide", window.Ff),
                delete window.Ff);
        }
        function hd() {
            navigator.storage &&
                navigator.storage.persist &&
                navigator.storage
                    .persist()
                    .then(function (a) {
                        a ||
                            console.log(
                                "[Shen.AI SDK] Could not obtain persistent storage (storage may be cleared under pressure)."
                            );
                    })
                    .catch(function (a) {
                        console.log(
                            "[Shen.AI SDK] Error requesting persistent storage:",
                            a
                        );
                    });
        }
        function jd() {
            (void 0 === g.MxCaptureRunning
                ? navigator.mediaDevices.getUserMedia({ video: !0 })
                : Promise.resolve()
            )
                .then(() => {
                    navigator.mediaDevices
                        .enumerateDevices()
                        .then((a) => {
                            g.MxVideoDevices = a
                                .filter((b) => "videoinput" == b.kind)
                                .map((b) => ({
                                    id: b.deviceId ?? "",
                                    label: b.label ?? "",
                                }));
                            g._onVideoDevicesEnumerated();
                        })
                        .catch(() => {
                            g._onVideoDevicesEnumerationError();
                        });
                })
                .catch(() => {
                    g._onVideoDevicesEnumerationError();
                });
        }
        function td() {
            const a = JSON.stringify(g.MxVideoDevices),
                b = lf(a) + 1,
                c = K(b);
            M(a, c, b);
            return c;
        }
        function af(a, b, c) {
            function d() {
                navigator.mediaDevices
                    .getUserMedia(v)
                    .then((t) => {
                        const y = t.getVideoTracks()[0];
                        "undefined" !== typeof MediaStreamTrackProcessor
                            ? f(new MediaStreamTrackProcessor({ track: y }), y)
                            : h(t, y);
                        g.MxVideoTrack = y;
                    })
                    .catch((t) => {
                        g.MxCaptureRunning = void 0;
                        g.MxVideoTrack = void 0;
                        g._onCameraInitializationError();
                        console.error("Camera initialization error:", t);
                    });
            }
            function e() {
                void 0 == g.MxCaptureRunning
                    ? ((g.MxCaptureRunning = !1), d())
                    : setTimeout(e, 100);
            }
            function f(t, y) {
                g.MxCaptureRunning = !0;
                g._onCameraInitialized();
                const E = t.readable.getReader(),
                    L = async () => {
                        try {
                            if (g.MxCaptureRunning) {
                                const B = await E.read();
                                if (B.value) {
                                    var z = B.value;
                                    g.MxDispatchFrameToThread
                                        ? g.MxDispatchFrameToThread(
                                              z,
                                              l[z.format] ?? l.unsupported,
                                              z.codedWidth,
                                              z.codedHeight,
                                              BigInt(z.timestamp),
                                              a,
                                              b,
                                              r
                                          )
                                        : z.close();
                                    L();
                                } else setTimeout(L, 1e3 / 30);
                            } else
                                E.releaseLock(),
                                    y.stop(),
                                    (g.MxCaptureRunning = void 0),
                                    (g.MxVideoTrack = void 0);
                        } catch (B) {
                            console.error("Error reading frame", B);
                        }
                    };
                L();
            }
            function h(t, y) {
                const E = new OffscreenCanvas(1, 1),
                    L = E.getContext("2d", { willReadFrequently: !0 }),
                    z = document.createElement("video");
                z.setAttribute("id", "shen-camera-proxy");
                z.setAttribute("playsinline", "");
                z.setAttribute("muted", "");
                z.setAttribute("disablepictureinpicture", "");
                z.style.position = "absolute";
                z.style.top = "0";
                z.style.left = "0";
                z.style.width = "1px";
                z.style.height = "1px";
                document.body.appendChild(z);
                let B = null;
                z.onloadedmetadata = () => {
                    var N = z.videoWidth,
                        u = z.videoHeight;
                    let O = N,
                        D = u,
                        Q = { x: 0, y: 0 };
                    if (!b) {
                        const J = O / D;
                        0.6 > J
                            ? ((D = Math.floor(O / k)),
                              (D -= D & 1),
                              (Q.y = Math.floor((u - D) / 2)))
                            : 0.75 < J &&
                              ((O = Math.floor(D * k)),
                              (O -= O & 1),
                              (Q.x = Math.floor((N - O) / 2)));
                    }
                    B = { width: O, height: D, offset: Q };
                    E.width = B.width;
                    E.height = B.height;
                    z.play();
                };
                z.onplay = () => {
                    g.MxCaptureRunning = !0;
                    g._onCameraInitialized();
                    const N = 1e3 / 30,
                        u = () => {
                            if (g.MxCaptureRunning) {
                                const O = performance.now();
                                if (B) {
                                    L.drawImage(
                                        z,
                                        B.offset.x,
                                        B.offset.y,
                                        B.width,
                                        B.height,
                                        0,
                                        0,
                                        B.width,
                                        B.height
                                    );
                                    try {
                                        const D = L.getImageData(
                                                0,
                                                0,
                                                B.width,
                                                B.height
                                            ),
                                            Q = Math.round(1e3 * O);
                                        g.MxDispatchFrameToThread &&
                                            g.MxDispatchFrameToThread(
                                                D,
                                                l.RGBA,
                                                B.width,
                                                B.height,
                                                BigInt(Q),
                                                a,
                                                b,
                                                r
                                            );
                                    } catch (D) {
                                        console.error(
                                            "Error capturing frame:",
                                            D
                                        );
                                    }
                                }
                                setTimeout(
                                    u,
                                    Math.max(0, N - (performance.now() - O))
                                );
                            } else
                                z.pause(),
                                    y.stop(),
                                    z.parentNode.removeChild(z),
                                    (g.MxCaptureRunning = void 0);
                        };
                    u();
                };
                z.srcObject = t;
            }
            const k = 480 / 720,
                l = {
                    unsupported: 0,
                    I420: 1,
                    I420A: 2,
                    RGBA: 3,
                    RGBX: 4,
                    BGRA: 5,
                    BGRX: 6,
                    NV12: 7,
                },
                n = H(c),
                r = (() => {
                    if ("" == n) return -1;
                    void 0 === g.MxDeviceIdStrToIntMap &&
                        (g.MxDeviceIdStrToIntMap = new Map());
                    let t = g.MxDeviceIdStrToIntMap.get(n);
                    void 0 === t &&
                        ((t = g.MxDeviceIdStrToIntMap.size),
                        g.MxDeviceIdStrToIntMap.set(n, t));
                    return t;
                })(),
                v = {
                    video: (() => {
                        if ("" != n) return { deviceId: { exact: n } };
                        const t = /Mobile|Android|iPhone|iPad/i.test(
                                navigator.userAgent
                            ),
                            y = {
                                ideal: /iPhone|iPad/i.test(navigator.userAgent)
                                    ? 480
                                    : 720,
                                min: 480,
                            },
                            E = { ideal: t ? 1 / k : k };
                        return {
                            frameRate: { ideal: 30 },
                            facingMode: { ideal: a ? "user" : "environment" },
                            aspectRatio: b ? void 0 : E,
                            width: t ? y : void 0,
                            height: t ? void 0 : y,
                            resizeMode: t ? void 0 : { exact: "none" },
                        };
                    })(),
                };
            e();
        }
        function wc() {
            g.MxCaptureRunning && (g.MxCaptureRunning = !1);
        }
        function gf(a) {
            const b = g.MxVideoTrack;
            if (b && "undefined" !== typeof b.getCapabilities) {
                const c = b.getCapabilities();
                b.getSettings();
                const d = { advanced: [] };
                c.whiteBalanceMode &&
                    d.advanced.push({
                        whiteBalanceMode: a ? "manual" : "continuous",
                    });
                0 < d.advanced.length && b.applyConstraints(d).catch(() => {});
            }
        }
        function ff() {
            "wakeLock" in navigator &&
                navigator.wakeLock
                    .request("screen")
                    .then((a) => (g.MxWakeLock = a))
                    .catch(() => {});
        }
        function df() {
            g.MxWakeLock &&
                g.MxWakeLock.release()
                    .then(() => (g.MxWakeLock = null))
                    .catch(() => {});
        }
        function xc() {
            navigator.bluetooth
                ? (console.log(
                      "[PolarH10] Starting doScan... requesting device with name 'Polar H10'"
                  ),
                  g.polar ||
                      (g.polar = {
                          device: null,
                          server: null,
                          pmdService: null,
                          controlChar: null,
                          dataChar: null,
                      }),
                  navigator.bluetooth
                      .requestDevice({
                          filters: [{ namePrefix: "Polar H10" }],
                          optionalServices: [
                              "fb005c80-02e7-f387-1cad-8acd2d8df0c8",
                          ],
                      })
                      .then((a) => {
                          console.log("[PolarH10] Device chosen:", a);
                          g.polar.device = a;
                          return a.gatt.connect();
                      })
                      .then((a) => {
                          console.log("[PolarH10] GATT connected");
                          g.polar.server = a;
                          return a.getPrimaryService(
                              "fb005c80-02e7-f387-1cad-8acd2d8df0c8"
                          );
                      })
                      .then((a) => {
                          console.log("[PolarH10] Found PMD service");
                          g.polar.pmdService = a;
                          return Promise.all([
                              a.getCharacteristic(
                                  "fb005c81-02e7-f387-1cad-8acd2d8df0c8"
                              ),
                              a.getCharacteristic(
                                  "fb005c82-02e7-f387-1cad-8acd2d8df0c8"
                              ),
                          ]);
                      })
                      .then((a) => {
                          const b = a[0];
                          a = a[1];
                          console.log(
                              "[PolarH10] Found control & data characteristics"
                          );
                          g.polar.controlChar = b;
                          g.polar.dataChar = a;
                          return Promise.all([
                              b.startNotifications(),
                              a.startNotifications(),
                          ]);
                      })
                      .then(() => {
                          console.log("[PolarH10] Notifications started");
                          const a = g.polar.dataChar;
                          g.polar.controlChar.addEventListener(
                              "characteristicvaluechanged",
                              (b) => {
                                  b = new Uint8Array(b.target.value.buffer);
                                  const c = K(b.length);
                                  x().set(b, c);
                                  g._onBleControlNotification(c, b.length);
                                  I(c);
                              }
                          );
                          a.addEventListener(
                              "characteristicvaluechanged",
                              (b) => {
                                  b = new Uint8Array(b.target.value.buffer);
                                  const c = K(b.length);
                                  x().set(b, c);
                                  g._onBleDataNotification(c, b.length);
                                  I(c);
                              }
                          );
                          g._onBleDeviceReady();
                      })
                      .catch((a) => {
                          console.error("[PolarH10] doScan() error:", a);
                      }))
                : console.error("Web Bluetooth not supported by this browser");
        }
        function hf(a, b) {
            if (g.polar && g.polar.controlChar) {
                var c = new Uint8Array(b);
                for (let d = 0; d < b; d++) c[d] = x()[a + d];
                g.polar.controlChar
                    .writeValue(c)
                    .then(() => {
                        console.log("[PolarH10] ControlChar write success");
                    })
                    .catch((d) => {
                        console.error("[PolarH10] ControlChar write error:", d);
                    });
            } else console.warn("[PolarH10] No polar.controlChar to write to");
        }
        function sd() {
            var a = navigator.userAgent,
                b = "unknown",
                c = "unknown",
                d = !0,
                e = navigator.language;
            -1 !== a.indexOf("Chrome")
                ? ((b = "Chrome"), (c = a.substr(a.indexOf("Chrome") + 7, 12)))
                : -1 !== a.indexOf("Safari")
                ? ((b = "Safari"), (c = a.substr(a.indexOf("Version") + 8, 8)))
                : -1 !== a.indexOf("Firefox")
                ? ((b = "Firefox"),
                  (c = a.substr(a.indexOf("Firefox") + 8, 12)))
                : -1 !== a.indexOf("Opera") || -1 !== a.indexOf("OPR")
                ? ((b = "Opera"), (c = a.substr(a.indexOf("Version") + 8, 12)))
                : -1 !== a.indexOf("Edge") &&
                  ((b = "Edge"), (c = a.substr(a.indexOf("Edge") + 5, 12)));
            if (-1 !== a.indexOf("Android")) a = "Android";
            else {
                if (
                    "iPad" === navigator.platform ||
                    /\b(iPad)\b/i.test(navigator.userAgent || "")
                )
                    var f = !0;
                else {
                    f =
                        "MacIntel" === navigator.platform &&
                        2 < navigator.maxTouchPoints;
                    var h =
                        "undefined" !== typeof window &&
                        "function" === typeof window.matchMedia
                            ? window.matchMedia(
                                  "(hover: none) and (pointer: coarse)"
                              ).matches
                            : !1;
                    f = f && h;
                }
                f ||
                -1 !== a.indexOf("iPhone") ||
                -1 !== a.indexOf("iPad") ||
                -1 !== a.indexOf("iPod")
                    ? (a = "iOS")
                    : -1 !== a.indexOf("Mobile")
                    ? (a = "Unknown (mobile)")
                    : ((a =
                          -1 !== a.indexOf("Mac OS")
                              ? "Mac OS"
                              : -1 !== a.indexOf("Windows")
                              ? "Windows"
                              : -1 !== a.indexOf("Linux")
                              ? "Linux"
                              : "Unknown (desktop)"),
                      (d = !1));
            }
            b = JSON.stringify({
                browser: b,
                version: c,
                os: a,
                is_mobile: d,
                language: e,
            });
            c = lf(b) + 1;
            d = K(c);
            M(b, d, c);
            return d;
        }
        class mf {
            name = "ExitStatus";
            constructor(a) {
                this.message = `Program terminated with exit(${a})`;
                this.status = a;
            }
        }
        var nf = (a) => {
                a.terminate();
                a.onmessage = () => {};
            },
            of = [],
            sf = (a) => {
                if (0 == pf.length) {
                    var b = new Worker(
                        new URL("shenai_sdk.mjs", import.meta.url),
                        { type: "module", name: "em-pthread" }
                    );
                    pf.push(b);
                    qf();
                }
                b = pf.pop();
                if (!b) return 6;
                rf.push(b);
                jf[a.Mf] = b;
                b.Mf = a.Mf;
                var c = { Kf: "run", Dh: a.Ch, jg: a.jg, Mf: a.Mf };
                c.Tf = a.Tf;
                c.Ag = a.Ag;
                b.postMessage(c, a.$g);
                return 0;
            },
            P = 0,
            R = (a, b, ...c) => {
                for (
                    var d = 2 * c.length,
                        e = tf(),
                        f = uf(8 * d),
                        h = f >> 3,
                        k = 0;
                    k < c.length;
                    k++
                ) {
                    var l = c[k];
                    "bigint" == typeof l
                        ? ((va[h + 2 * k] = 1n), (va[h + 2 * k + 1] = l))
                        : ((va[h + 2 * k] = 0n), (Fa()[h + 2 * k + 1] = l));
                }
                a = vf(a, 0, d, f, b);
                wf(e);
                return a;
            };
        function bf(a) {
            if (m) return R(0, 1, a);
            na = a;
            0 < P || (xf(), (ma = !0));
            throw new mf(a);
        }
        var yf = (a) => {
            if (!(a instanceof mf || "unwind" == a)) throw a;
        };
        function zf(a) {
            if (m) return R(1, 0, a);
            md(a);
        }
        var md = (a) => {
                na = a;
                if (m) throw (zf(a), "unwind");
                if (!(0 < P || m)) {
                    Af();
                    for (var b = Bf; 0 < b.length; ) b.shift()(g);
                    Cf(0);
                    Df[1].length && Ef(1, 10);
                    Df[2].length && Ef(2, 10);
                    xf();
                    Aa = !0;
                }
                bf(a);
            },
            pf = [],
            rf = [],
            Gf = [],
            jf = {},
            xf = () => {
                for (var a of rf) nf(a);
                for (a of pf) nf(a);
                pf = [];
                rf = [];
                jf = {};
            },
            If = (a) => {
                var b = a.Mf;
                delete jf[b];
                pf.push(a);
                rf.splice(rf.indexOf(a), 1);
                a.Mf = 0;
                Hf(b);
            };
        function La(a) {
            "undefined" != typeof Jf &&
                (Object.assign(Kf, a.Ag),
                !g.canvas &&
                    a.Tf &&
                    Kf[a.Tf] &&
                    ((g.canvas = Kf[a.Tf].Lf), (g.canvas.id = a.Tf)));
        }
        function Ma() {
            Gf.forEach((a) => a());
        }
        var qf = () => {
                var a = pf[0];
                new Promise((b) => {
                    a.onmessage = (f) => {
                        f = f.data;
                        var h = f.Kf;
                        if (f.sg && f.sg != Ia()) {
                            var k = jf[f.sg];
                            k
                                ? k.postMessage(f, f.$g)
                                : p(
                                      `Internal error! Worker sent a message "${h}" to target pthread ${f.sg}, but that thread no longer exists!`
                                  );
                        } else if ("checkMailbox" === h) Qa();
                        else if ("spawnThread" === h) sf(f);
                        else if ("cleanupThread" === h) If(jf[f.Eh]);
                        else if ("loaded" === h) (a.loaded = !0), b(a);
                        else if ("alert" === h)
                            alert(`Thread ${f.Fh}: ${f.text}`);
                        else if ("setimmediate" === f.target) a.postMessage(f);
                        else if ("callHandler" === h) g[f.oh](...f.hh);
                        else h && p(`worker sent an unknown command ${h}`);
                    };
                    a.onerror = (f) => {
                        p(
                            `${"worker sent an error!"} ${f.filename}:${
                                f.lineno
                            }: ${f.message}`
                        );
                        throw f;
                    };
                    var c = [],
                        d = [],
                        e;
                    for (e of d) g.propertyIsEnumerable(e) && c.push(e);
                    a.postMessage({ Kf: "load", ph: c, Hh: q, Ih: la });
                });
            },
            Lf,
            Ja = (a) => {
                Ba();
                var b = F()[(a + 52) >> 2];
                a = F()[(a + 56) >> 2];
                Mf(b, b - a);
                wf(b);
            },
            Nf = [],
            Of,
            S = (a) => {
                var b = Nf[a];
                b ||
                    (a >= Nf.length && (Nf.length = a + 1),
                    (Nf[a] = b = Of.get(a)));
                return b;
            },
            Pa = (a, b) => {
                P = 0;
                a = S(a)(b);
                0 < P ? (na = a) : Pf(a);
            },
            Qf = "undefined" != typeof TextDecoder ? new TextDecoder() : void 0,
            Rf = (a, b = 0, c = NaN) => {
                var d = b + c;
                for (c = b; a[c] && !(c >= d); ) ++c;
                if (16 < c - b && a.buffer && Qf)
                    return Qf.decode(
                        a.buffer instanceof ArrayBuffer
                            ? a.subarray(b, c)
                            : a.slice(b, c)
                    );
                for (d = ""; b < c; ) {
                    var e = a[b++];
                    if (e & 128) {
                        var f = a[b++] & 63;
                        if (192 == (e & 224))
                            d += String.fromCharCode(((e & 31) << 6) | f);
                        else {
                            var h = a[b++] & 63;
                            e =
                                224 == (e & 240)
                                    ? ((e & 15) << 12) | (f << 6) | h
                                    : ((e & 7) << 18) |
                                      (f << 12) |
                                      (h << 6) |
                                      (a[b++] & 63);
                            65536 > e
                                ? (d += String.fromCharCode(e))
                                : ((e -= 65536),
                                  (d += String.fromCharCode(
                                      55296 | (e >> 10),
                                      56320 | (e & 1023)
                                  )));
                        }
                    } else d += String.fromCharCode(e);
                }
                return d;
            },
            H = (a, b) => (a ? Rf(x(), a, b) : ""),
            db = (a, b, c, d) =>
                Wa(
                    `Assertion failed: ${H(a)}, at: ` +
                        [
                            b ? H(b) : "unknown filename",
                            c,
                            d ? H(d) : "unknown function",
                        ]
                ),
            eb = (a, b) => S(a)(b);
        function Sf(a, b, c, d) {
            return m ? R(2, 1, a, b, c, d) : fb(a, b, c, d);
        }
        var fb = (a, b, c, d) => {
            if ("undefined" == typeof SharedArrayBuffer) return 6;
            var e = [],
                f = 0,
                h = b ? F()[(b + 40) >> 2] : 0;
            h = (h = 4294967295 == h ? "#canvas" : H(h).trim())
                ? h.split(",")
                : [];
            var k = {},
                l = g.canvas?.id || "";
            for (n of h) {
                var n = n.trim();
                try {
                    if ("#canvas" == n) {
                        if (!g.canvas) {
                            p(
                                `pthread_create: could not find canvas with ID "${n}" to transfer to thread!`
                            );
                            f = 28;
                            break;
                        }
                        n = g.canvas.id;
                    }
                    if (Kf[n]) {
                        var r = Kf[n];
                        Kf[n] = null;
                        g.canvas instanceof OffscreenCanvas &&
                            n === g.canvas.id &&
                            (g.canvas = null);
                    } else if (!m) {
                        var v =
                            g.canvas && g.canvas.id === n
                                ? g.canvas
                                : document.querySelector(n);
                        if (!v) {
                            p(
                                `pthread_create: could not find canvas with ID "${n}" to transfer to thread!`
                            );
                            f = 28;
                            break;
                        }
                        if (v.Yf) {
                            p(
                                `pthread_create: cannot transfer canvas with ID "${n}" to thread, since the current thread does not have control over it!`
                            );
                            f = 63;
                            break;
                        }
                        if (v.transferControlToOffscreen)
                            v.Af ||
                                ((v.Af = K(12)),
                                (C()[v.Af >> 2] = v.width),
                                (C()[(v.Af + 4) >> 2] = v.height),
                                (F()[(v.Af + 8) >> 2] = 0)),
                                (r = {
                                    Lf: v.transferControlToOffscreen(),
                                    Af: v.Af,
                                    id: v.id,
                                }),
                                (v.Yf = !0);
                        else
                            return (
                                p(
                                    `pthread_create: cannot transfer control of canvas "${n}" to pthread, because current browser does not support OffscreenCanvas!`
                                ),
                                p(
                                    "pthread_create: Build with -sOFFSCREEN_FRAMEBUFFER to enable fallback proxying of GL commands from pthread to main thread."
                                ),
                                52
                            );
                    }
                    r && (e.push(r.Lf), (k[r.id] = r));
                } catch (t) {
                    return (
                        p(
                            `pthread_create: failed to transfer control of canvas "${n}" to OffscreenCanvas! Error: ${t}`
                        ),
                        28
                    );
                }
            }
            if (m && (0 === e.length || f)) return Sf(a, b, c, d);
            if (f) return f;
            for (v of Object.values(k)) F()[(v.Af + 8) >> 2] = a;
            a = { Ch: c, Mf: a, jg: d, Tf: l, Ag: k, $g: e };
            return m ? ((a.Kf = "spawnThread"), postMessage(a, e), 0) : sf(a);
        };
        function gb(a, b, c) {
            return m ? R(3, 1, a, b, c) : 0;
        }
        function hb(a, b) {
            if (m) return R(4, 1, a, b);
        }
        var lf = (a) => {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var d = a.charCodeAt(c);
                    127 >= d
                        ? b++
                        : 2047 >= d
                        ? (b += 2)
                        : 55296 <= d && 57343 >= d
                        ? ((b += 4), ++c)
                        : (b += 3);
                }
                return b;
            },
            M = (a, b, c) => {
                var d = x();
                if (0 < c) {
                    var e = b;
                    c = b + c - 1;
                    for (var f = 0; f < a.length; ++f) {
                        var h = a.charCodeAt(f);
                        if (55296 <= h && 57343 >= h) {
                            var k = a.charCodeAt(++f);
                            h = (65536 + ((h & 1023) << 10)) | (k & 1023);
                        }
                        if (127 >= h) {
                            if (b >= c) break;
                            d[b++] = h;
                        } else {
                            if (2047 >= h) {
                                if (b + 1 >= c) break;
                                d[b++] = 192 | (h >> 6);
                            } else {
                                if (65535 >= h) {
                                    if (b + 2 >= c) break;
                                    d[b++] = 224 | (h >> 12);
                                } else {
                                    if (b + 3 >= c) break;
                                    d[b++] = 240 | (h >> 18);
                                    d[b++] = 128 | ((h >> 12) & 63);
                                }
                                d[b++] = 128 | ((h >> 6) & 63);
                            }
                            d[b++] = 128 | (h & 63);
                        }
                    }
                    d[b] = 0;
                    a = b - e;
                } else a = 0;
                return a;
            };
        function ib(a, b) {
            if (m) return R(5, 1, a, b);
        }
        function jb(a, b, c) {
            if (m) return R(6, 1, a, b, c);
        }
        function kb(a, b, c) {
            return m ? R(7, 1, a, b, c) : 0;
        }
        function lb(a, b) {
            if (m) return R(8, 1, a, b);
        }
        function mb(a, b, c) {
            if (m) return R(9, 1, a, b, c);
        }
        function nb(a, b, c, d) {
            if (m) return R(10, 1, a, b, c, d);
        }
        function ob(a, b, c, d) {
            if (m) return R(11, 1, a, b, c, d);
        }
        function pb(a, b, c, d) {
            if (m) return R(12, 1, a, b, c, d);
        }
        function qb(a) {
            if (m) return R(13, 1, a);
        }
        function rb(a, b) {
            if (m) return R(14, 1, a, b);
        }
        function sb(a, b, c) {
            if (m) return R(15, 1, a, b, c);
        }
        var tb = () => Wa(""),
            Tf = {},
            Uf = (a) => {
                for (; a.length; ) {
                    var b = a.pop();
                    a.pop()(b);
                }
            };
        function Vf(a) {
            return this.fromWireType(F()[a >> 2]);
        }
        var Wf = {},
            Xf = {},
            Yf = {},
            Zf,
            ag = (a, b, c) => {
                function d(k) {
                    k = c(k);
                    if (k.length !== a.length)
                        throw new Zf("Mismatched type converter count");
                    for (var l = 0; l < a.length; ++l) $f(a[l], k[l]);
                }
                a.forEach((k) => (Yf[k] = b));
                var e = Array(b.length),
                    f = [],
                    h = 0;
                b.forEach((k, l) => {
                    Xf.hasOwnProperty(k)
                        ? (e[l] = Xf[k])
                        : (f.push(k),
                          Wf.hasOwnProperty(k) || (Wf[k] = []),
                          Wf[k].push(() => {
                              e[l] = Xf[k];
                              ++h;
                              h === f.length && d(e);
                          }));
                });
                0 === f.length && d(e);
            },
            ub = (a) => {
                var b = Tf[a];
                delete Tf[a];
                var c = b.uh,
                    d = b.vh,
                    e = b.Rg,
                    f = e.map((h) => h.nh).concat(e.map((h) => h.Ah));
                ag([a], f, (h) => {
                    var k = {};
                    e.forEach((l, n) => {
                        var r = h[n],
                            v = l.lh,
                            t = l.mh,
                            y = h[n + e.length],
                            E = l.zh,
                            L = l.Bh;
                        k[l.kh] = {
                            read: (z) => r.fromWireType(v(t, z)),
                            write: (z, B) => {
                                var N = [];
                                E(L, z, y.toWireType(N, B));
                                Uf(N);
                            },
                        };
                    });
                    return [
                        {
                            name: b.name,
                            fromWireType: (l) => {
                                var n = {},
                                    r;
                                for (r in k) n[r] = k[r].read(l);
                                d(l);
                                return n;
                            },
                            toWireType: (l, n) => {
                                for (var r in k)
                                    if (!(r in n))
                                        throw new TypeError(
                                            `Missing field: "${r}"`
                                        );
                                var v = c();
                                for (r in k) k[r].write(v, n[r]);
                                null !== l && l.push(d, v);
                                return v;
                            },
                            Hf: bg,
                            readValueFromPointer: Vf,
                            Ef: d,
                        },
                    ];
                });
            },
            cg,
            T = (a) => {
                for (var b = ""; x()[a]; ) b += cg[x()[a++]];
                return b;
            },
            U,
            dg = (a) => {
                throw new U(a);
            };
        function eg(a, b, c = {}) {
            var d = b.name;
            if (!a)
                throw new U(
                    `type "${d}" must have a positive integer typeid pointer`
                );
            if (Xf.hasOwnProperty(a)) {
                if (c.qh) return;
                throw new U(`Cannot register type '${d}' twice`);
            }
            Xf[a] = b;
            delete Yf[a];
            Wf.hasOwnProperty(a) &&
                ((b = Wf[a]), delete Wf[a], b.forEach((e) => e()));
        }
        function $f(a, b, c = {}) {
            return eg(a, b, c);
        }
        var fg = (a, b, c) => {
                switch (b) {
                    case 1:
                        return c ? (d) => w()[d] : (d) => x()[d];
                    case 2:
                        return c ? (d) => A()[d >> 1] : (d) => Ca()[d >> 1];
                    case 4:
                        return c ? (d) => C()[d >> 2] : (d) => F()[d >> 2];
                    case 8:
                        return c ? (d) => va[d >> 3] : (d) => wa[d >> 3];
                    default:
                        throw new TypeError(
                            `invalid integer width (${b}): ${a}`
                        );
                }
            },
            vb = (a, b, c) => {
                b = T(b);
                $f(a, {
                    name: b,
                    fromWireType: (d) => d,
                    toWireType: function (d, e) {
                        if ("bigint" != typeof e && "number" != typeof e)
                            throw (
                                (null === e
                                    ? (e = "null")
                                    : ((d = typeof e),
                                      (e =
                                          "object" === d ||
                                          "array" === d ||
                                          "function" === d
                                              ? e.toString()
                                              : "" + e)),
                                new TypeError(
                                    `Cannot convert "${e}" to ${this.name}`
                                ))
                            );
                        "number" == typeof e && (e = BigInt(e));
                        return e;
                    },
                    Hf: bg,
                    readValueFromPointer: fg(b, c, -1 == b.indexOf("u")),
                    Ef: null,
                });
            },
            bg = 8,
            wb = (a, b, c, d) => {
                b = T(b);
                $f(a, {
                    name: b,
                    fromWireType: function (e) {
                        return !!e;
                    },
                    toWireType: function (e, f) {
                        return f ? c : d;
                    },
                    Hf: bg,
                    readValueFromPointer: function (e) {
                        return this.fromWireType(x()[e]);
                    },
                    Ef: null,
                });
            },
            gg = [],
            hg = [],
            Sb = (a) => {
                9 < a && 0 === --hg[a + 1] && ((hg[a] = void 0), gg.push(a));
            },
            ig = (a) => {
                if (!a) throw new U("Cannot use deleted val. handle = " + a);
                return hg[a];
            },
            jg = (a) => {
                switch (a) {
                    case void 0:
                        return 2;
                    case null:
                        return 4;
                    case !0:
                        return 6;
                    case !1:
                        return 8;
                    default:
                        const b = gg.pop() || hg.length;
                        hg[b] = a;
                        hg[b + 1] = 1;
                        return b;
                }
            },
            kg = {
                name: "emscripten::val",
                fromWireType: (a) => {
                    var b = ig(a);
                    Sb(a);
                    return b;
                },
                toWireType: (a, b) => jg(b),
                Hf: bg,
                readValueFromPointer: Vf,
                Ef: null,
            },
            xb = (a) => $f(a, kg),
            lg = (a, b) => {
                if (void 0 === g[a].Jf) {
                    var c = g[a];
                    g[a] = function (...d) {
                        if (!g[a].Jf.hasOwnProperty(d.length))
                            throw new U(
                                `Function '${b}' called with an invalid number of arguments (${d.length}) - expects one of (${g[a].Jf})!`
                            );
                        return g[a].Jf[d.length].apply(this, d);
                    };
                    g[a].Jf = [];
                    g[a].Jf[c.Lg] = c;
                }
            },
            mg = (a, b, c) => {
                if (g.hasOwnProperty(a)) {
                    if (
                        void 0 === c ||
                        (void 0 !== g[a].Jf && void 0 !== g[a].Jf[c])
                    )
                        throw new U(`Cannot register public name '${a}' twice`);
                    lg(a, a);
                    if (g[a].Jf.hasOwnProperty(c))
                        throw new U(
                            `Cannot register multiple overloads of a function with the same number of arguments (${c})!`
                        );
                    g[a].Jf[c] = b;
                } else (g[a] = b), (g[a].Lg = c);
            },
            ng = (a, b, c) => {
                switch (b) {
                    case 1:
                        return c
                            ? function (d) {
                                  return this.fromWireType(w()[d]);
                              }
                            : function (d) {
                                  return this.fromWireType(x()[d]);
                              };
                    case 2:
                        return c
                            ? function (d) {
                                  return this.fromWireType(A()[d >> 1]);
                              }
                            : function (d) {
                                  return this.fromWireType(Ca()[d >> 1]);
                              };
                    case 4:
                        return c
                            ? function (d) {
                                  return this.fromWireType(C()[d >> 2]);
                              }
                            : function (d) {
                                  return this.fromWireType(F()[d >> 2]);
                              };
                    default:
                        throw new TypeError(
                            `invalid integer width (${b}): ${a}`
                        );
                }
            },
            yb = (a, b, c, d) => {
                function e() {}
                b = T(b);
                e.values = {};
                $f(a, {
                    name: b,
                    constructor: e,
                    fromWireType: function (f) {
                        return this.constructor.values[f];
                    },
                    toWireType: (f, h) => h.value,
                    Hf: bg,
                    readValueFromPointer: ng(b, c, d),
                    Ef: null,
                });
                mg(b, e);
            },
            og = (a, b) => Object.defineProperty(b, "name", { value: a }),
            qg = (a) => {
                a = pg(a);
                var b = T(a);
                I(a);
                return b;
            },
            rg = (a, b) => {
                var c = Xf[a];
                if (void 0 === c)
                    throw ((a = `${b} has unknown type ${qg(a)}`), new U(a));
                return c;
            },
            zb = (a, b, c) => {
                var d = rg(a, "enum");
                b = T(b);
                a = d.constructor;
                d = Object.create(d.constructor.prototype, {
                    value: { value: c },
                    constructor: {
                        value: og(`${d.name}_${b}`, function () {}),
                    },
                });
                a.values[c] = d;
                a[b] = d;
            },
            sg = (a, b) => {
                switch (b) {
                    case 4:
                        return function (c) {
                            return this.fromWireType(Da()[c >> 2]);
                        };
                    case 8:
                        return function (c) {
                            return this.fromWireType(Fa()[c >> 3]);
                        };
                    default:
                        throw new TypeError(`invalid float width (${b}): ${a}`);
                }
            },
            Ab = (a, b, c) => {
                b = T(b);
                $f(a, {
                    name: b,
                    fromWireType: (d) => d,
                    toWireType: (d, e) => e,
                    Hf: bg,
                    readValueFromPointer: sg(b, c),
                    Ef: null,
                });
            };
        function tg(a) {
            for (var b = 1; b < a.length; ++b)
                if (null !== a[b] && void 0 === a[b].Ef) return !0;
            return !1;
        }
        function ug(a) {
            var b = Function;
            if (!(b instanceof Function))
                throw new TypeError(
                    `new_ called with constructor type ${typeof b} which is not a function`
                );
            var c = og(b.name || "unknownFunctionName", function () {});
            c.prototype = b.prototype;
            c = new c();
            a = b.apply(c, a);
            return a instanceof Object ? a : c;
        }
        var vg = (a, b) => {
                for (var c = [], d = 0; d < a; d++)
                    c.push(F()[(b + 4 * d) >> 2]);
                return c;
            },
            wg = (a, b) => {
                a = T(a);
                var c = S(b);
                if ("function" != typeof c)
                    throw new U(
                        `unknown function pointer with signature ${a}: ${b}`
                    );
                return c;
            },
            xg,
            yg = (a, b) => {
                function c(f) {
                    e[f] ||
                        Xf[f] ||
                        (Yf[f] ? Yf[f].forEach(c) : (d.push(f), (e[f] = !0)));
                }
                var d = [],
                    e = {};
                b.forEach(c);
                throw new xg(`${a}: ` + d.map(qg).join([", "]));
            },
            zg = (a) => {
                a = a.trim();
                const b = a.indexOf("(");
                return -1 === b ? a : a.slice(0, b);
            },
            Bb = (a, b, c, d, e, f, h) => {
                var k = vg(b, c);
                a = T(a);
                a = zg(a);
                e = wg(d, e);
                mg(
                    a,
                    function () {
                        yg(`Cannot call ${a} due to unbound types`, k);
                    },
                    b - 1
                );
                ag([], k, (l) => {
                    var n = a;
                    var r = a;
                    l = [l[0], null].concat(l.slice(1));
                    var v = e,
                        t = l.length;
                    if (2 > t)
                        throw new U(
                            "argTypes array size mismatch! Must at least get return value and 'this' types!"
                        );
                    var y = null !== l[1] && !1,
                        E = tg(l),
                        L = "void" !== l[0].name;
                    v = [r, dg, v, f, Uf, l[0], l[1]];
                    for (var z = 0; z < t - 2; ++z) v.push(l[z + 2]);
                    if (!E)
                        for (z = y ? 1 : 2; z < l.length; ++z)
                            null !== l[z].Ef && v.push(l[z].Ef);
                    E = tg(l);
                    z = l.length - 2;
                    var B = [],
                        N = ["fn"];
                    y && N.push("thisWired");
                    for (t = 0; t < z; ++t)
                        B.push(`arg${t}`), N.push(`arg${t}Wired`);
                    B = B.join(",");
                    N = N.join(",");
                    B = `return function (${B}) {\n`;
                    E && (B += "var destructors = [];\n");
                    var u = E ? "destructors" : "null",
                        O =
                            "humanName throwBindingError invoker fn runDestructors retType classParam".split(
                                " "
                            );
                    y &&
                        (B += `var thisWired = classParam['toWireType'](${u}, this);\n`);
                    for (t = 0; t < z; ++t)
                        (B += `var arg${t}Wired = argType${t}['toWireType'](${u}, arg${t});\n`),
                            O.push(`argType${t}`);
                    B += (L || h ? "var rv = " : "") + `invoker(${N});\n`;
                    if (E) B += "runDestructors(destructors);\n";
                    else
                        for (t = y ? 1 : 2; t < l.length; ++t)
                            (y =
                                1 === t
                                    ? "thisWired"
                                    : "arg" + (t - 2) + "Wired"),
                                null !== l[t].Ef &&
                                    ((B += `${y}_dtor(${y});\n`),
                                    O.push(`${y}_dtor`));
                    L &&
                        (B +=
                            "var ret = retType['fromWireType'](rv);\nreturn ret;\n");
                    let [D, Q] = [O, B + "}\n"];
                    D.push(Q);
                    l = ug(D)(...v);
                    r = og(r, l);
                    l = b - 1;
                    if (!g.hasOwnProperty(n))
                        throw new Zf("Replacing nonexistent public symbol");
                    void 0 !== g[n].Jf && void 0 !== l
                        ? (g[n].Jf[l] = r)
                        : ((g[n] = r), (g[n].Lg = l));
                    return [];
                });
            },
            Cb = (a, b, c, d, e) => {
                b = T(b);
                -1 === e && (e = 4294967295);
                e = (k) => k;
                if (0 === d) {
                    var f = 32 - 8 * c;
                    e = (k) => (k << f) >>> f;
                }
                var h = b.includes("unsigned")
                    ? function (k, l) {
                          return l >>> 0;
                      }
                    : function (k, l) {
                          return l;
                      };
                $f(a, {
                    name: b,
                    fromWireType: e,
                    toWireType: h,
                    Hf: bg,
                    readValueFromPointer: fg(b, c, 0 !== d),
                    Ef: null,
                });
            },
            Db = (a, b, c) => {
                function d(f) {
                    var h = F()[f >> 2];
                    f = F()[(f + 4) >> 2];
                    return new e(w().buffer, f, h);
                }
                var e = [
                    Int8Array,
                    Uint8Array,
                    Int16Array,
                    Uint16Array,
                    Int32Array,
                    Uint32Array,
                    Float32Array,
                    Float64Array,
                    BigInt64Array,
                    BigUint64Array,
                ][b];
                c = T(c);
                $f(
                    a,
                    {
                        name: c,
                        fromWireType: d,
                        Hf: bg,
                        readValueFromPointer: d,
                    },
                    { qh: !0 }
                );
            },
            Eb = (a, b) => {
                b = T(b);
                $f(a, {
                    name: b,
                    fromWireType: function (c) {
                        for (
                            var d = F()[c >> 2], e = c + 4, f, h = e, k = 0;
                            k <= d;
                            ++k
                        ) {
                            var l = e + k;
                            if (k == d || 0 == x()[l])
                                (h = H(h, l - h)),
                                    void 0 === f
                                        ? (f = h)
                                        : ((f += String.fromCharCode(0)),
                                          (f += h)),
                                    (h = l + 1);
                        }
                        I(c);
                        return f;
                    },
                    toWireType: function (c, d) {
                        d instanceof ArrayBuffer && (d = new Uint8Array(d));
                        var e = "string" == typeof d;
                        if (
                            !(
                                e ||
                                d instanceof Uint8Array ||
                                d instanceof Uint8ClampedArray ||
                                d instanceof Int8Array
                            )
                        )
                            throw new U(
                                "Cannot pass non-string to std::string"
                            );
                        var f = e ? lf(d) : d.length;
                        var h = K(4 + f + 1),
                            k = h + 4;
                        F()[h >> 2] = f;
                        if (e) M(d, k, f + 1);
                        else if (e)
                            for (e = 0; e < f; ++e) {
                                var l = d.charCodeAt(e);
                                if (255 < l)
                                    throw (
                                        (I(h),
                                        new U(
                                            "String has UTF-16 code units that do not fit in 8 bits"
                                        ))
                                    );
                                x()[k + e] = l;
                            }
                        else for (e = 0; e < f; ++e) x()[k + e] = d[e];
                        null !== c && c.push(I, h);
                        return h;
                    },
                    Hf: bg,
                    readValueFromPointer: Vf,
                    Ef(c) {
                        I(c);
                    },
                });
            },
            Ag =
                "undefined" != typeof TextDecoder
                    ? new TextDecoder("utf-16le")
                    : void 0,
            Bg = (a, b) => {
                var c = a >> 1;
                for (var d = c + b / 2; !(c >= d) && Ca()[c]; ) ++c;
                c <<= 1;
                if (32 < c - a && Ag) return Ag.decode(x().slice(a, c));
                c = "";
                for (d = 0; !(d >= b / 2); ++d) {
                    var e = A()[(a + 2 * d) >> 1];
                    if (0 == e) break;
                    c += String.fromCharCode(e);
                }
                return c;
            },
            Cg = (a, b, c) => {
                c ??= 2147483647;
                if (2 > c) return 0;
                c -= 2;
                var d = b;
                c = c < 2 * a.length ? c / 2 : a.length;
                for (var e = 0; e < c; ++e) {
                    var f = a.charCodeAt(e);
                    A()[b >> 1] = f;
                    b += 2;
                }
                A()[b >> 1] = 0;
                return b - d;
            },
            Dg = (a) => 2 * a.length,
            Eg = (a, b) => {
                for (var c = 0, d = ""; !(c >= b / 4); ) {
                    var e = C()[(a + 4 * c) >> 2];
                    if (0 == e) break;
                    ++c;
                    65536 <= e
                        ? ((e -= 65536),
                          (d += String.fromCharCode(
                              55296 | (e >> 10),
                              56320 | (e & 1023)
                          )))
                        : (d += String.fromCharCode(e));
                }
                return d;
            },
            Fg = (a, b, c) => {
                c ??= 2147483647;
                if (4 > c) return 0;
                var d = b;
                c = d + c - 4;
                for (var e = 0; e < a.length; ++e) {
                    var f = a.charCodeAt(e);
                    if (55296 <= f && 57343 >= f) {
                        var h = a.charCodeAt(++e);
                        f = (65536 + ((f & 1023) << 10)) | (h & 1023);
                    }
                    C()[b >> 2] = f;
                    b += 4;
                    if (b + 4 > c) break;
                }
                C()[b >> 2] = 0;
                return b - d;
            },
            Gg = (a) => {
                for (var b = 0, c = 0; c < a.length; ++c) {
                    var d = a.charCodeAt(c);
                    55296 <= d && 57343 >= d && ++c;
                    b += 4;
                }
                return b;
            },
            Fb = (a, b, c) => {
                c = T(c);
                if (2 === b) {
                    var d = Bg;
                    var e = Cg;
                    var f = Dg;
                    var h = (k) => Ca()[k >> 1];
                } else
                    4 === b &&
                        ((d = Eg),
                        (e = Fg),
                        (f = Gg),
                        (h = (k) => F()[k >> 2]));
                $f(a, {
                    name: c,
                    fromWireType: (k) => {
                        for (
                            var l = F()[k >> 2], n, r = k + 4, v = 0;
                            v <= l;
                            ++v
                        ) {
                            var t = k + 4 + v * b;
                            if (v == l || 0 == h(t))
                                (r = d(r, t - r)),
                                    void 0 === n
                                        ? (n = r)
                                        : ((n += String.fromCharCode(0)),
                                          (n += r)),
                                    (r = t + b);
                        }
                        I(k);
                        return n;
                    },
                    toWireType: (k, l) => {
                        if ("string" != typeof l)
                            throw new U(
                                `Cannot pass non-string to C++ string type ${c}`
                            );
                        var n = f(l),
                            r = K(4 + n + b);
                        F()[r >> 2] = n / b;
                        e(l, r + 4, n + b);
                        null !== k && k.push(I, r);
                        return r;
                    },
                    Hf: bg,
                    readValueFromPointer: Vf,
                    Ef(k) {
                        I(k);
                    },
                });
            },
            Gb = (a, b, c, d, e, f) => {
                Tf[a] = { name: T(b), uh: wg(c, d), vh: wg(e, f), Rg: [] };
            },
            Hb = (a, b, c, d, e, f, h, k, l, n) => {
                Tf[a].Rg.push({
                    kh: T(b),
                    nh: c,
                    lh: wg(d, e),
                    mh: f,
                    Ah: h,
                    zh: wg(k, l),
                    Bh: n,
                });
            },
            Ib = (a, b) => {
                b = T(b);
                $f(a, {
                    sh: !0,
                    name: b,
                    Hf: 0,
                    fromWireType: () => {},
                    toWireType: () => {},
                });
            },
            Jb = (a) => {
                Ka(a, !ea, 1, !da, 2097152, !1);
                Ma();
            },
            Hg = () => {
                if (!(Aa || 0 < P))
                    try {
                        m ? Pf(na) : md(na);
                    } catch (a) {
                        yf(a);
                    }
            },
            Ig = (a) => {
                if (!Aa && !ma)
                    try {
                        a(), Hg();
                    } catch (b) {
                        yf(b);
                    }
            },
            Na = (a) => {
                "function" === typeof Atomics.Gh &&
                    (Atomics.Gh(C(), a >> 2, a).value.then(Qa),
                    (a += 128),
                    Atomics.store(C(), a >> 2, 1));
            },
            Qa = () => {
                var a = Ia();
                a && (Na(a), Ig(Jg));
            },
            Kb = (a, b) => {
                a == b
                    ? setTimeout(Qa)
                    : m
                    ? postMessage({ sg: a, Kf: "checkMailbox" })
                    : (a = jf[a]) && a.postMessage({ Kf: "checkMailbox" });
            },
            Kg = [],
            Lb = (a, b, c, d, e) => {
                d /= 2;
                Kg.length = d;
                e >>= 3;
                for (var f = 0; f < d; f++)
                    Kg[f] = va[e + 2 * f]
                        ? va[e + 2 * f + 1]
                        : Fa()[e + 2 * f + 1];
                a = b ? kf[b] : Lg[a];
                Lf = c;
                c = a(...Kg);
                Lf = 0;
                return c;
            },
            Mb = () => {
                P = 0;
            },
            Nb = (a) => {
                m ? postMessage({ Kf: "cleanupThread", Eh: a }) : If(jf[a]);
            },
            Ob = () => {},
            Mg = (a, b, c) => {
                var d = [];
                a = a.toWireType(d, c);
                d.length && (F()[b >> 2] = jg(d));
                return a;
            },
            Pb = (a, b, c) => {
                a = ig(a);
                b = rg(b, "emval::as");
                return Mg(b, c, a);
            },
            Ng = [],
            Qb = (a, b, c, d) => {
                a = Ng[a];
                b = ig(b);
                return a(null, b, c, d);
            },
            Og = {},
            Pg = (a) => {
                var b = Og[a];
                return void 0 === b ? T(a) : b;
            },
            Rb = (a, b, c, d, e) => {
                a = Ng[a];
                b = ig(b);
                c = Pg(c);
                return a(b, b[c], d, e);
            },
            Qg = () =>
                "object" == typeof globalThis
                    ? globalThis
                    : Function("return this")(),
            Tb = (a) => {
                if (0 === a) return jg(Qg());
                a = Pg(a);
                return jg(Qg()[a]);
            },
            Rg = (a) => {
                var b = Ng.length;
                Ng.push(a);
                return b;
            },
            Sg = (a, b) => {
                for (var c = Array(a), d = 0; d < a; ++d)
                    c[d] = rg(F()[(b + 4 * d) >> 2], "parameter " + d);
                return c;
            },
            Ub = (a, b, c) => {
                b = Sg(a, b);
                var d = b.shift();
                a--;
                var e = "return function (obj, func, destructorsRef, args) {\n",
                    f = 0,
                    h = [];
                0 === c && h.push("obj");
                for (var k = ["retType"], l = [d], n = 0; n < a; ++n)
                    h.push("arg" + n),
                        k.push("argType" + n),
                        l.push(b[n]),
                        (e += `  var arg${n} = argType${n}.readValueFromPointer(args${
                            f ? "+" + f : ""
                        });\n`),
                        (f += b[n].Hf);
                e += `  var rv = ${1 === c ? "new func" : "func.call"}(${h.join(
                    ", "
                )});\n`;
                d.sh ||
                    (k.push("emval_returnValue"),
                    l.push(Mg),
                    (e +=
                        "  return emval_returnValue(retType, destructorsRef, rv);\n"));
                k.push(e + "};\n");
                a = ug(k)(...l);
                c = `methodCaller<(${b.map((r) => r.name).join(", ")}) => ${
                    d.name
                }>`;
                return Rg(og(c, a));
            },
            Vb = (a, b) => {
                a = ig(a);
                b = ig(b);
                return jg(a[b]);
            },
            Wb = (a) => {
                9 < a && (hg[a + 1] += 1);
            },
            Xb = () => jg([]),
            Yb = (a) => {
                a = ig(a);
                for (var b = Array(a.length), c = 0; c < a.length; c++)
                    b[c] = a[c];
                return jg(b);
            },
            Zb = (a) => jg(Pg(a)),
            $b = (a) => {
                var b = ig(a);
                Uf(b);
                Sb(a);
            },
            ac = (a, b) => {
                a = rg(a, "_emval_take_value");
                a = a.readValueFromPointer(b);
                return jg(a);
            };
        function bc(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            a = new Date(1e3 * a);
            C()[b >> 2] = a.getUTCSeconds();
            C()[(b + 4) >> 2] = a.getUTCMinutes();
            C()[(b + 8) >> 2] = a.getUTCHours();
            C()[(b + 12) >> 2] = a.getUTCDate();
            C()[(b + 16) >> 2] = a.getUTCMonth();
            C()[(b + 20) >> 2] = a.getUTCFullYear() - 1900;
            C()[(b + 24) >> 2] = a.getUTCDay();
            a =
                ((a.getTime() -
                    Date.UTC(a.getUTCFullYear(), 0, 1, 0, 0, 0, 0)) /
                    864e5) |
                0;
            C()[(b + 28) >> 2] = a;
        }
        var Tg = (a) => 0 === a % 4 && (0 !== a % 100 || 0 === a % 400),
            Ug = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335],
            Vg = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
        function cc(a, b) {
            a = -9007199254740992 > a || 9007199254740992 < a ? NaN : Number(a);
            a = new Date(1e3 * a);
            C()[b >> 2] = a.getSeconds();
            C()[(b + 4) >> 2] = a.getMinutes();
            C()[(b + 8) >> 2] = a.getHours();
            C()[(b + 12) >> 2] = a.getDate();
            C()[(b + 16) >> 2] = a.getMonth();
            C()[(b + 20) >> 2] = a.getFullYear() - 1900;
            C()[(b + 24) >> 2] = a.getDay();
            var c =
                ((Tg(a.getFullYear()) ? Ug : Vg)[a.getMonth()] +
                    a.getDate() -
                    1) |
                0;
            C()[(b + 28) >> 2] = c;
            C()[(b + 36) >> 2] = -(60 * a.getTimezoneOffset());
            c = new Date(a.getFullYear(), 6, 1).getTimezoneOffset();
            var d = new Date(a.getFullYear(), 0, 1).getTimezoneOffset();
            a = (c != d && a.getTimezoneOffset() == Math.min(d, c)) | 0;
            C()[(b + 32) >> 2] = a;
        }
        function dc(a) {
            var b = new Date(
                    C()[(a + 20) >> 2] + 1900,
                    C()[(a + 16) >> 2],
                    C()[(a + 12) >> 2],
                    C()[(a + 8) >> 2],
                    C()[(a + 4) >> 2],
                    C()[a >> 2],
                    0
                ),
                c = C()[(a + 32) >> 2],
                d = b.getTimezoneOffset(),
                e = new Date(b.getFullYear(), 6, 1).getTimezoneOffset(),
                f = new Date(b.getFullYear(), 0, 1).getTimezoneOffset(),
                h = Math.min(f, e);
            0 > c
                ? (C()[(a + 32) >> 2] = Number(e != f && h == d))
                : 0 < c != (h == d) &&
                  ((e = Math.max(f, e)),
                  b.setTime(b.getTime() + 6e4 * ((0 < c ? h : e) - d)));
            C()[(a + 24) >> 2] = b.getDay();
            c =
                ((Tg(b.getFullYear()) ? Ug : Vg)[b.getMonth()] +
                    b.getDate() -
                    1) |
                0;
            C()[(a + 28) >> 2] = c;
            C()[a >> 2] = b.getSeconds();
            C()[(a + 4) >> 2] = b.getMinutes();
            C()[(a + 8) >> 2] = b.getHours();
            C()[(a + 12) >> 2] = b.getDate();
            C()[(a + 16) >> 2] = b.getMonth();
            C()[(a + 20) >> 2] = b.getYear();
            a = b.getTime();
            return BigInt(isNaN(a) ? -1 : a / 1e3);
        }
        function ec(a, b, c, d, e, f, h) {
            return m ? R(16, 1, a, b, c, d, e, f, h) : -52;
        }
        function fc(a, b, c, d, e, f) {
            if (m) return R(17, 1, a, b, c, d, e, f);
        }
        var Wg = {},
            Lc = () => performance.timeOrigin + performance.now();
        function gc(a, b) {
            if (m) return R(18, 1, a, b);
            Wg[a] && (clearTimeout(Wg[a].id), delete Wg[a]);
            if (!b) return 0;
            var c = setTimeout(() => {
                delete Wg[a];
                Ig(() => Xg(a, performance.timeOrigin + performance.now()));
            }, b);
            Wg[a] = { id: c, gi: b };
            return 0;
        }
        var hc = (a, b, c, d) => {
                var e = new Date().getFullYear(),
                    f = new Date(e, 0, 1).getTimezoneOffset();
                e = new Date(e, 6, 1).getTimezoneOffset();
                var h = Math.max(f, e);
                F()[a >> 2] = 60 * h;
                C()[b >> 2] = Number(f != e);
                b = (k) => {
                    var l = Math.abs(k);
                    return `UTC${0 <= k ? "-" : "+"}${String(
                        Math.floor(l / 60)
                    ).padStart(2, "0")}${String(l % 60).padStart(2, "0")}`;
                };
                a = b(f);
                b = b(e);
                e < f ? (M(a, c, 17), M(b, d, 17)) : (M(a, d, 17), M(b, c, 17));
            },
            gh = (a, b) => {
                Yg = a;
                Zg = b;
                if ($g)
                    if ((ah || ((P += 1), (ah = !0)), 0 == a))
                        bh = function () {
                            setTimeout(
                                ch,
                                Math.max(
                                    0,
                                    dh +
                                        b -
                                        (performance.timeOrigin +
                                            performance.now())
                                ) | 0
                            );
                        };
                    else if (1 == a)
                        bh = function () {
                            eh(ch);
                        };
                    else if (2 == a) {
                        if ("undefined" == typeof fh)
                            if ("undefined" == typeof setImmediate) {
                                var c = [];
                                addEventListener(
                                    "message",
                                    (d) => {
                                        if (
                                            "setimmediate" === d.data ||
                                            "setimmediate" === d.data.target
                                        )
                                            d.stopPropagation(), c.shift()();
                                    },
                                    !0
                                );
                                fh = (d) => {
                                    c.push(d);
                                    ea
                                        ? (g.setImmediates ??
                                              (g.setImmediates = []),
                                          g.setImmediates.push(d),
                                          postMessage({
                                              target: "setimmediate",
                                          }))
                                        : postMessage("setimmediate", "*");
                                };
                            } else fh = setImmediate;
                        bh = function () {
                            fh(ch);
                        };
                    }
            },
            oh = (a, b, c, d, e) => {
                function f() {
                    return h < hh ? (--P, Hg(), !1) : !0;
                }
                $g = a;
                ih = d;
                var h = hh;
                ah = !1;
                ch = function () {
                    if (!ma)
                        if (0 < jh.length) {
                            var k = jh.shift();
                            k.Vh(k.jg);
                            if (kh) {
                                var l = kh,
                                    n = 0 == l % 1 ? l - 1 : Math.floor(l);
                                kh = k.Lh ? n : (8 * l + (n + 0.5)) / 9;
                            }
                            f() && setTimeout(ch, 0);
                        } else if (f())
                            if (
                                ((lh = (lh + 1) | 0),
                                1 == Yg && 1 < Zg && 0 != lh % Zg)
                            )
                                bh();
                            else {
                                0 == Yg &&
                                    (dh =
                                        performance.timeOrigin +
                                        performance.now());
                                a: if (!ma) {
                                    for (k of mh) if (!1 === k()) break a;
                                    Ig(a);
                                    for (l of nh) l();
                                }
                                f() && bh();
                            }
                };
                e || (0 < b ? gh(0, 1e3 / b) : gh(1, 1), bh());
                if (c) throw "unwind";
            },
            ah = !1,
            bh = null,
            hh = 0,
            $g = null,
            ih = 0,
            Yg = 0,
            Zg = 0,
            lh = 0,
            jh = [],
            mh = [],
            nh = [];
        function ph() {
            bh = null;
            hh++;
        }
        var qh = 0;
        function eh(a) {
            if ("function" == typeof requestAnimationFrame)
                requestAnimationFrame(a);
            else {
                var b = Date.now();
                if (0 === qh) qh = b + 1e3 / 60;
                else for (; b + 2 >= qh; ) qh += 1e3 / 60;
                setTimeout(a, Math.max(qh - b, 0));
            }
        }
        var rh = {},
            dh,
            ch,
            fh,
            kh,
            sh = 25,
            th = "Emscripten OpenAL",
            uh = {},
            vh = {},
            V = null,
            wh = {
                0: {
                    id: 0,
                    bg: 0,
                    wf: null,
                    frequency: 0,
                    Pf: 2,
                    channels: 1,
                    length: 0,
                },
            },
            xh = 1,
            yh = [],
            Ah = (a) => {
                if (
                    (1 !== Yg || "visible" == document.visibilityState) &&
                    4114 === a.state
                ) {
                    for (
                        var b = zh(a), c = a.Cf, d = a.Bf, e = a.zf, f = 0;
                        f < a.yf.length;
                        f++
                    ) {
                        var h = a.yf[f];
                        c = h.ig + h.Wf;
                        d = 0;
                        e += h.Kg + 1;
                    }
                    k ||= 0.1;
                    var k = b + k;
                    for (b = 0; c < k; ) {
                        if (e >= a.vf.length)
                            if (a.Of) e %= a.vf.length;
                            else break;
                        f = a.vf[e % a.vf.length];
                        if (0 === f.length) {
                            if ((b++, b === a.vf.length)) break;
                        } else {
                            h = a.context.Df.createBufferSource();
                            h.buffer = f.wf;
                            h.playbackRate.value = a.playbackRate;
                            if (f.wf.hg || f.wf.gg)
                                (h.loopStart = f.wf.hg), (h.loopEnd = f.wf.gg);
                            if (4136 === a.type && a.Of) {
                                var l = Number.POSITIVE_INFINITY;
                                h.loop = !0;
                                f.wf.hg && (h.loopStart = f.wf.hg);
                                f.wf.gg && (h.loopEnd = f.wf.gg);
                            } else l = (f.wf.duration - d) / a.playbackRate;
                            h.gh = d;
                            h.Wf = l;
                            h.Kg = b;
                            b = 0;
                            h.connect(a.gain);
                            "undefined" != typeof h.start
                                ? ((c = Math.max(c, a.context.Df.currentTime)),
                                  h.start(c, d))
                                : "undefined" != typeof h.noteOn &&
                                  ((c = Math.max(c, a.context.Df.currentTime)),
                                  h.noteOn(c));
                            h.ig = c;
                            a.yf.push(h);
                            c += l;
                        }
                        d = 0;
                        e++;
                    }
                }
            },
            zh = (a) => {
                var b = a.context.Df.currentTime;
                if (4114 !== a.state) return b;
                isFinite(a.Cf) ||
                    ((a.Cf = b - a.Bf / a.playbackRate), (a.Bf = 0));
                for (var c; a.yf.length; ) {
                    c = a.yf[0];
                    a.zf += c.Kg;
                    c = c.ig + c.Wf;
                    if (b < c) break;
                    a.yf.shift();
                    a.Cf = c;
                    a.Bf = 0;
                    a.zf++;
                }
                if (a.zf >= a.vf.length && !a.Of) Bh(a, 4116);
                else if (4136 === a.type && a.Of)
                    if (((c = a.vf[0]), 0 === c.length)) a.Bf = 0;
                    else {
                        var d = (b - a.Cf) * a.playbackRate,
                            e = c.wf.hg || 0,
                            f = c.wf.gg || c.wf.duration;
                        f <= e && (f = c.wf.duration);
                        d < f ? (a.Bf = d) : (a.Bf = e + ((d - e) % (f - e)));
                    }
                else if (a.yf[0]) a.Bf = (b - a.yf[0].ig) * a.playbackRate;
                else
                    for (
                        4136 !== a.type &&
                            a.Of &&
                            ((c = Ch(a) / a.playbackRate),
                            0 < c && (a.Cf += Math.floor((b - a.Cf) / c) * c)),
                            d = 0;
                        d < a.vf.length;
                        d++
                    ) {
                        if (a.zf >= a.vf.length)
                            if (a.Of) a.zf %= a.vf.length;
                            else {
                                Bh(a, 4116);
                                break;
                            }
                        c = a.vf[a.zf];
                        if (0 < c.length) {
                            c = a.Cf + c.wf.duration / a.playbackRate;
                            if (b < c) {
                                a.Bf = (b - a.Cf) * a.playbackRate;
                                break;
                            }
                            a.Cf = c;
                        }
                        a.Bf = 0;
                        a.zf++;
                    }
                return b;
            },
            Dh = (a) => {
                for (var b = 0; b < a.yf.length; b++) a.yf[b].stop();
                a.yf.length = 0;
            },
            Bh = (a, b) => {
                if (4114 === b) {
                    if (4114 === a.state || 4116 == a.state)
                        (a.zf = 0), (a.Bf = 0);
                    Dh(a);
                    a.state = 4114;
                    a.Cf = Number.NEGATIVE_INFINITY;
                    Ah(a);
                } else
                    4115 === b
                        ? 4114 === a.state && (zh(a), Dh(a), (a.state = 4115))
                        : 4116 === b
                        ? 4113 !== a.state &&
                          ((a.state = 4116),
                          (a.zf = a.vf.length),
                          (a.Cf = Number.NEGATIVE_INFINITY),
                          (a.Bf = 0),
                          Dh(a))
                        : 4113 === b &&
                          4113 !== a.state &&
                          ((a.state = 4113),
                          (a.zf = 0),
                          (a.Cf = Number.NEGATIVE_INFINITY),
                          (a.Bf = 0),
                          Dh(a));
            },
            Gh = (a) => {
                if (4144 !== a.type) {
                    for (var b = wh[0], c = 0; c < a.vf.length; c++)
                        if (0 !== a.vf[c].id) {
                            b = a.vf[c];
                            break;
                        }
                    1 === a.Dg || (2 === a.Dg && 1 === b.channels)
                        ? a.xf ||
                          ((a.xf = a.context.Df.createPanner()),
                          Eh(a),
                          Fh(a),
                          a.xf.connect(a.context.gain),
                          a.gain.disconnect(),
                          a.gain.connect(a.xf))
                        : a.xf &&
                          (a.xf.disconnect(),
                          a.gain.disconnect(),
                          a.gain.connect(a.context.gain),
                          (a.xf = null));
                }
            },
            Hh = (a) => {
                for (var b in a.sources) Eh(a.sources[b]);
            },
            Eh = (a) => {
                var b = a.xf;
                if (b)
                    switch (
                        ((b.refDistance = a.refDistance),
                        (b.maxDistance = a.maxDistance),
                        (b.rolloffFactor = a.rolloffFactor),
                        (b.panningModel = a.context.Sg ? "HRTF" : "equalpower"),
                        a.context.Zg
                            ? a.distanceModel
                            : a.context.distanceModel)
                    ) {
                        case 0:
                            b.distanceModel = "inverse";
                            b.refDistance = 3.40282e38;
                            break;
                        case 53249:
                        case 53250:
                            b.distanceModel = "inverse";
                            break;
                        case 53251:
                        case 53252:
                            b.distanceModel = "linear";
                            break;
                        case 53253:
                        case 53254:
                            b.distanceModel = "exponential";
                    }
            },
            Fh = (a) => {
                if (a.xf) {
                    var b = a.xf,
                        c = a.position[0],
                        d = a.position[1],
                        e = a.position[2],
                        f = a.direction[0],
                        h = a.direction[1],
                        k = a.direction[2],
                        l = a.context.listener,
                        n = l.position[0],
                        r = l.position[1],
                        v = l.position[2];
                    if (a.Cg) {
                        var t = -l.direction[0],
                            y = -l.direction[1],
                            E = -l.direction[2],
                            L = l.Ig[0],
                            z = l.Ig[1],
                            B = l.Ig[2],
                            N = (Ea, za, He) => {
                                Ea = Math.sqrt(Ea * Ea + za * za + He * He);
                                return Ea < Number.EPSILON ? 0 : 1 / Ea;
                            },
                            u = N(t, y, E);
                        t *= u;
                        y *= u;
                        E *= u;
                        u = N(L, z, B);
                        L *= u;
                        z *= u;
                        B *= u;
                        var O = z * E - B * y,
                            D = B * t - L * E,
                            Q = L * y - z * t;
                        u = N(O, D, Q);
                        O *= u;
                        D *= u;
                        Q *= u;
                        L = y * Q - E * D;
                        z = E * O - t * Q;
                        B = t * D - y * O;
                        N = f;
                        u = h;
                        var J = k;
                        f = N * O + u * L + J * t;
                        h = N * D + u * z + J * y;
                        k = N * Q + u * B + J * E;
                        N = c;
                        u = d;
                        J = e;
                        c = N * O + u * L + J * t + n;
                        d = N * D + u * z + J * y + r;
                        e = N * Q + u * B + J * E + v;
                    }
                    b.positionX
                        ? (c != b.positionX.value && (b.positionX.value = c),
                          d != b.positionY.value && (b.positionY.value = d),
                          e != b.positionZ.value && (b.positionZ.value = e))
                        : b.setPosition(c, d, e);
                    b.orientationX
                        ? (f != b.orientationX.value &&
                              (b.orientationX.value = f),
                          h != b.orientationY.value &&
                              (b.orientationY.value = h),
                          k != b.orientationZ.value &&
                              (b.orientationZ.value = k))
                        : b.setOrientation(f, h, k);
                    b = a.ag;
                    f = a.Nf[0];
                    h = a.Nf[1];
                    k = a.Nf[2];
                    t = l.Nf[0];
                    y = l.Nf[1];
                    l = l.Nf[2];
                    (c === n && d === r && e === v) ||
                    (f === t && h === y && k === l)
                        ? (a.ag = 1)
                        : ((E = a.context.speedOfSound),
                          (L = a.context.dopplerFactor),
                          (c = n - c),
                          (d = r - d),
                          (e = v - e),
                          (v = Math.sqrt(c * c + d * d + e * e)),
                          (a.ag =
                              (E -
                                  L *
                                      Math.min(
                                          (c * t + d * y + e * l) / v,
                                          E / L
                                      )) /
                              (E -
                                  L *
                                      Math.min(
                                          (c * f + d * h + e * k) / v,
                                          E / L
                                      ))));
                    a.ag !== b && Ih(a);
                }
            },
            Ih = (a) => {
                if (4114 === a.state) {
                    zh(a);
                    for (var b = 1; b < a.yf.length; b++) a.yf[b].stop();
                    1 < a.yf.length && (a.yf.length = 1);
                    if ((b = a.yf[0]))
                        (b.Wf =
                            4136 === a.type && a.Of
                                ? Number.POSITIVE_INFINITY
                                : (b.buffer.duration - b.gh) / a.playbackRate),
                            (b.playbackRate.value = a.playbackRate),
                            Ah(a);
                }
            },
            Ch = (a) => {
                for (var b = 0, c = 0; c < a.vf.length; c++) {
                    var d = a.vf[c].wf;
                    b += d ? d.duration : 0;
                }
                return b;
            },
            Jh = (a, b) => {
                var c = 4114 == a.state;
                c && Bh(a, 4113);
                if (null !== a.vf[a.zf].wf) {
                    for (a.zf = 0; b > a.vf[a.zf].wf.duration; )
                        (b -= a.vf[a.zf].wf.duration), a.zf++;
                    a.Bf = b;
                }
                c && Bh(a, 4114);
            },
            Kh = (a, b, c) => {
                if (V)
                    if ((a = V.sources[a]))
                        if (null === c) V.uf = 40962;
                        else
                            switch (b) {
                                case 514:
                                    1 === c
                                        ? ((a.Cg = !0), Fh(a))
                                        : 0 === c
                                        ? ((a.Cg = !1), Fh(a))
                                        : (V.uf = 40963);
                                    break;
                                case 4097:
                                    if (!Number.isFinite(c)) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.coneInnerAngle = c;
                                    a.xf && (a.xf.coneInnerAngle = c % 360);
                                    break;
                                case 4098:
                                    if (!Number.isFinite(c)) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.coneOuterAngle = c;
                                    a.xf && (a.xf.coneOuterAngle = c % 360);
                                    break;
                                case 4099:
                                    if (!Number.isFinite(c) || 0 >= c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    if (a.pitch === c) break;
                                    a.pitch = c;
                                    Ih(a);
                                    break;
                                case 4100:
                                    if (
                                        !Number.isFinite(c[0]) ||
                                        !Number.isFinite(c[1]) ||
                                        !Number.isFinite(c[2])
                                    ) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.position[0] = c[0];
                                    a.position[1] = c[1];
                                    a.position[2] = c[2];
                                    Fh(a);
                                    break;
                                case 4101:
                                    if (
                                        !Number.isFinite(c[0]) ||
                                        !Number.isFinite(c[1]) ||
                                        !Number.isFinite(c[2])
                                    ) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.direction[0] = c[0];
                                    a.direction[1] = c[1];
                                    a.direction[2] = c[2];
                                    Fh(a);
                                    break;
                                case 4102:
                                    if (
                                        !Number.isFinite(c[0]) ||
                                        !Number.isFinite(c[1]) ||
                                        !Number.isFinite(c[2])
                                    ) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.Nf[0] = c[0];
                                    a.Nf[1] = c[1];
                                    a.Nf[2] = c[2];
                                    Fh(a);
                                    break;
                                case 4103:
                                    if (1 === c)
                                        (a.Of = !0),
                                            zh(a),
                                            4136 === a.type &&
                                                0 < a.yf.length &&
                                                ((c = a.yf[0]),
                                                (c.loop = !0),
                                                (c.Wf =
                                                    Number.POSITIVE_INFINITY));
                                    else if (0 === c) {
                                        a.Of = !1;
                                        var d = zh(a);
                                        4136 === a.type &&
                                            0 < a.yf.length &&
                                            ((c = a.yf[0]),
                                            (c.loop = !1),
                                            (c.Wf =
                                                a.vf[0].wf.duration /
                                                a.playbackRate),
                                            (c.ig = d - a.Bf / a.playbackRate));
                                    } else V.uf = 40963;
                                    break;
                                case 4105:
                                    if (4114 === a.state || 4115 === a.state) {
                                        V.uf = 40964;
                                        break;
                                    }
                                    if (0 === c) {
                                        for (d in a.vf) a.vf[d].bg--;
                                        a.vf.length = 1;
                                        a.vf[0] = wh[0];
                                        a.zf = 0;
                                        a.type = 4144;
                                    } else {
                                        var e = wh[c];
                                        if (!e) {
                                            V.uf = 40963;
                                            break;
                                        }
                                        for (d in a.vf) a.vf[d].bg--;
                                        a.vf.length = 0;
                                        e.bg++;
                                        a.vf = [e];
                                        a.zf = 0;
                                        a.type = 4136;
                                    }
                                    Gh(a);
                                    Ah(a);
                                    break;
                                case 4106:
                                    if (!Number.isFinite(c) || 0 > c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.gain.gain.value = c;
                                    break;
                                case 4109:
                                    if (
                                        !Number.isFinite(c) ||
                                        0 > c ||
                                        c > Math.min(a.Ug, 1)
                                    ) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.Vg = c;
                                    break;
                                case 4110:
                                    if (
                                        !Number.isFinite(c) ||
                                        c < Math.max(0, a.Vg) ||
                                        1 < c
                                    ) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.Ug = c;
                                    break;
                                case 4128:
                                    if (!Number.isFinite(c) || 0 > c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.refDistance = c;
                                    a.xf && (a.xf.refDistance = c);
                                    break;
                                case 4129:
                                    if (!Number.isFinite(c) || 0 > c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.rolloffFactor = c;
                                    a.xf && (a.xf.rolloffFactor = c);
                                    break;
                                case 4130:
                                    if (!Number.isFinite(c) || 0 > c || 1 < c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.coneOuterGain = c;
                                    a.xf && (a.xf.coneOuterGain = c);
                                    break;
                                case 4131:
                                    if (!Number.isFinite(c) || 0 > c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.maxDistance = c;
                                    a.xf && (a.xf.maxDistance = c);
                                    break;
                                case 4132:
                                    if (0 > c || c > Ch(a)) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    Jh(a, c);
                                    break;
                                case 4133:
                                    d = Ch(a);
                                    if (0 < d) {
                                        for (var f in a.vf)
                                            if (f) {
                                                e = a.vf[f].frequency;
                                                break;
                                            }
                                        c /= e;
                                    }
                                    if (0 > c || c > d) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    Jh(a, c);
                                    break;
                                case 4134:
                                    d = Ch(a);
                                    if (0 < d) {
                                        for (f in a.vf)
                                            if (f) {
                                                e = a.vf[f];
                                                var h =
                                                    e.frequency *
                                                    e.Pf *
                                                    e.channels;
                                                break;
                                            }
                                        c /= h;
                                    }
                                    if (0 > c || c > d) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    Jh(a, c);
                                    break;
                                case 4628:
                                    if (0 !== c && 1 !== c && 2 !== c) {
                                        V.uf = 40963;
                                        break;
                                    }
                                    a.Dg = c;
                                    Gh(a);
                                    break;
                                case 8201:
                                case 8202:
                                case 8203:
                                    V.uf = 40964;
                                    break;
                                case 53248:
                                    switch (c) {
                                        case 0:
                                        case 53249:
                                        case 53250:
                                        case 53251:
                                        case 53252:
                                        case 53253:
                                        case 53254:
                                            a.distanceModel = c;
                                            V.Zg && Hh(V);
                                            break;
                                        default:
                                            V.uf = 40963;
                                    }
                                    break;
                                default:
                                    V.uf = 40962;
                            }
                    else V.uf = 40961;
            };
        function jc(a, b, c, d, e) {
            if (m) return R(19, 1, a, b, c, d, e);
            if (V)
                if ((a = wh[a]))
                    if (0 >= e) V.uf = 40963;
                    else {
                        var f = null;
                        try {
                            switch (b) {
                                case 4352:
                                    if (0 < d) {
                                        f = V.Df.createBuffer(1, d, e);
                                        for (
                                            var h = f.getChannelData(0), k = 0;
                                            k < d;
                                            ++k
                                        )
                                            h[k] = 0.0078125 * x()[c++] - 1;
                                    }
                                    a.Pf = 1;
                                    a.channels = 1;
                                    a.length = d;
                                    break;
                                case 4353:
                                    if (0 < d)
                                        for (
                                            f = V.Df.createBuffer(1, d >> 1, e),
                                                h = f.getChannelData(0),
                                                c >>= 1,
                                                k = 0;
                                            k < d >> 1;
                                            ++k
                                        )
                                            h[k] = 3.0517578125e-5 * A()[c++];
                                    a.Pf = 2;
                                    a.channels = 1;
                                    a.length = d >> 1;
                                    break;
                                case 4354:
                                    if (0 < d) {
                                        f = V.Df.createBuffer(2, d >> 1, e);
                                        h = f.getChannelData(0);
                                        var l = f.getChannelData(1);
                                        for (k = 0; k < d >> 1; ++k)
                                            (h[k] = 0.0078125 * x()[c++] - 1),
                                                (l[k] =
                                                    0.0078125 * x()[c++] - 1);
                                    }
                                    a.Pf = 1;
                                    a.channels = 2;
                                    a.length = d >> 1;
                                    break;
                                case 4355:
                                    if (0 < d)
                                        for (
                                            f = V.Df.createBuffer(2, d >> 2, e),
                                                h = f.getChannelData(0),
                                                l = f.getChannelData(1),
                                                c >>= 1,
                                                k = 0;
                                            k < d >> 2;
                                            ++k
                                        )
                                            (h[k] = 3.0517578125e-5 * A()[c++]),
                                                (l[k] =
                                                    3.0517578125e-5 * A()[c++]);
                                    a.Pf = 2;
                                    a.channels = 2;
                                    a.length = d >> 2;
                                    break;
                                case 65552:
                                    if (0 < d)
                                        for (
                                            f = V.Df.createBuffer(1, d >> 2, e),
                                                h = f.getChannelData(0),
                                                c >>= 2,
                                                k = 0;
                                            k < d >> 2;
                                            ++k
                                        )
                                            h[k] = Da()[c++];
                                    a.Pf = 4;
                                    a.channels = 1;
                                    a.length = d >> 2;
                                    break;
                                case 65553:
                                    if (0 < d)
                                        for (
                                            f = V.Df.createBuffer(2, d >> 3, e),
                                                h = f.getChannelData(0),
                                                l = f.getChannelData(1),
                                                c >>= 2,
                                                k = 0;
                                            k < d >> 3;
                                            ++k
                                        )
                                            (h[k] = Da()[c++]),
                                                (l[k] = Da()[c++]);
                                    a.Pf = 4;
                                    a.channels = 2;
                                    a.length = d >> 3;
                                    break;
                                default:
                                    V.uf = 40963;
                                    return;
                            }
                            a.frequency = e;
                            a.wf = f;
                        } catch (n) {
                            V.uf = 40963;
                        }
                    }
                else V.uf = 40963;
        }
        function kc(a, b) {
            if (m) return R(20, 1, a, b);
            if (V) {
                for (var c = 0; c < a; ++c) {
                    var d = C()[(b + 4 * c) >> 2];
                    if (0 !== d) {
                        if (!wh[d]) {
                            V.uf = 40961;
                            return;
                        }
                        if (wh[d].bg) {
                            V.uf = 40964;
                            return;
                        }
                    }
                }
                for (c = 0; c < a; ++c)
                    (d = C()[(b + 4 * c) >> 2]),
                        0 !== d &&
                            (uh[wh[d].deviceId]--, delete wh[d], yh.push(d));
            }
        }
        function pc(a, b, c) {
            if (m) return R(22, 1, a, b, c);
            switch (b) {
                case 514:
                case 4097:
                case 4098:
                case 4103:
                case 4105:
                case 4128:
                case 4129:
                case 4131:
                case 4132:
                case 4133:
                case 4134:
                case 4628:
                case 8201:
                case 8202:
                case 53248:
                    Kh(a, b, c);
                    break;
                default:
                    Kh(a, b, null);
            }
        }
        function lc(a, b) {
            if (m) return R(21, 1, a, b);
            if (V) {
                for (var c = 0; c < a; ++c) {
                    var d = C()[(b + 4 * c) >> 2];
                    if (!V.sources[d]) {
                        V.uf = 40961;
                        return;
                    }
                }
                for (c = 0; c < a; ++c)
                    (d = C()[(b + 4 * c) >> 2]),
                        Bh(V.sources[d], 4116),
                        pc(d, 4105, 0),
                        delete V.sources[d],
                        yh.push(d);
            }
        }
        function mc(a, b) {
            if (m) return R(23, 1, a, b);
            if (V)
                for (var c = 0; c < a; ++c) {
                    var d = {
                        deviceId: V.deviceId,
                        id: 0 < yh.length ? yh.pop() : xh++,
                        bg: 0,
                        wf: null,
                        frequency: 0,
                        Pf: 2,
                        channels: 1,
                        length: 0,
                    };
                    uh[d.deviceId]++;
                    wh[d.id] = d;
                    C()[(b + 4 * c) >> 2] = d.id;
                }
        }
        function nc(a, b) {
            if (m) return R(24, 1, a, b);
            if (V)
                for (var c = 0; c < a; ++c) {
                    var d = V.Df.createGain();
                    d.connect(V.gain);
                    d = {
                        context: V,
                        id: 0 < yh.length ? yh.pop() : xh++,
                        type: 4144,
                        state: 4113,
                        vf: [wh[0]],
                        yf: [],
                        Of: !1,
                        pitch: 1,
                        ag: 1,
                        gain: d,
                        Vg: 0,
                        Ug: 1,
                        xf: null,
                        zf: 0,
                        Cf: Number.NEGATIVE_INFINITY,
                        Bf: 0,
                        Cg: !1,
                        refDistance: 1,
                        maxDistance: 3.40282e38,
                        rolloffFactor: 1,
                        position: [0, 0, 0],
                        Nf: [0, 0, 0],
                        direction: [0, 0, 0],
                        coneOuterGain: 0,
                        coneInnerAngle: 360,
                        coneOuterAngle: 360,
                        distanceModel: 53250,
                        Dg: 2,
                        get playbackRate() {
                            return this.pitch * this.ag;
                        },
                    };
                    V.sources[d.id] = d;
                    C()[(b + 4 * c) >> 2] = d.id;
                }
        }
        function oc(a) {
            if (m) return R(25, 1, a);
            V && ((a = V.sources[a]) ? Bh(a, 4114) : (V.uf = 40961));
        }
        function qc(a) {
            if (m) return R(26, 1, a);
            if (!(a in uh) || 0 < uh[a]) return 0;
            delete uh[a];
            yh.push(a);
            return 1;
        }
        var Lh = (a, b, c) => {
                a.addEventListener(b, c, { once: !0 });
            },
            Mh = (a) => {
                var b;
                b ||= [document, document.getElementById("canvas")];
                ["keydown", "mousedown", "touchstart"].forEach((c) => {
                    b.forEach((d) => {
                        d &&
                            Lh(d, c, () => {
                                "suspended" === a.state && a.resume();
                            });
                    });
                });
            };
        function rc(a, b) {
            if (m) return R(27, 1, a, b);
            if (!(a in uh)) return 0;
            var c = null,
                d = [],
                e = null;
            if ((b >>= 2))
                for (var f = 0, h = 0; ; ) {
                    f = C()[b++];
                    d.push(f);
                    if (0 === f) break;
                    h = C()[b++];
                    d.push(h);
                    switch (f) {
                        case 4103:
                            c ||= {};
                            c.sampleRate = h;
                            break;
                        case 4112:
                        case 4113:
                            break;
                        case 6546:
                            switch (h) {
                                case 0:
                                    e = !1;
                                    break;
                                case 1:
                                    e = !0;
                                    break;
                                case 2:
                                    break;
                                default:
                                    return 0;
                            }
                            break;
                        case 6550:
                            if (0 !== h) return 0;
                            break;
                        default:
                            return 0;
                    }
                }
            f = window.AudioContext || window.webkitAudioContext;
            b = null;
            try {
                b = c ? new f(c) : new f();
            } catch (n) {
                return 0;
            }
            Mh(b);
            "undefined" == typeof b.createGain &&
                (b.createGain = b.createGainNode);
            c = b.createGain();
            c.connect(b.destination);
            var k = {
                deviceId: a,
                id: 0 < yh.length ? yh.pop() : xh++,
                Jh: d,
                Df: b,
                listener: {
                    position: [0, 0, 0],
                    Nf: [0, 0, 0],
                    direction: [0, 0, 0],
                    Ig: [0, 0, 0],
                },
                sources: [],
                interval: setInterval(() => {
                    var n = k;
                    if (1 !== Yg || "visible" == document.visibilityState)
                        for (var r in n.sources) Ah(n.sources[r]);
                }, sh),
                gain: c,
                distanceModel: 53250,
                speedOfSound: 343.3,
                dopplerFactor: 1,
                Zg: !1,
                Sg: e || !1,
                ug: 0,
                get uf() {
                    return this.ug;
                },
                set uf(n) {
                    if (0 === this.ug || 0 === n) this.ug = n;
                },
            };
            uh[a]++;
            vh[k.id] = k;
            if (null !== e)
                for (var l in vh)
                    (d = vh[l]), d.deviceId === a && ((d.Sg = e), Hh(d));
            return k.id;
        }
        function sc(a) {
            if (m) return R(28, 1, a);
            var b = vh[a];
            V !== b &&
                (vh[a].interval && clearInterval(vh[a].interval),
                uh[b.deviceId]--,
                delete vh[a],
                yh.push(a));
        }
        function tc(a) {
            if (m) return R(29, 1, a);
            0 === a ? (V = null) : (V = vh[a]);
            return 1;
        }
        function uc(a) {
            return m
                ? R(30, 1, a)
                : a && H(a) !== th
                ? 0
                : "undefined" != typeof AudioContext ||
                  "undefined" != typeof webkitAudioContext
                ? ((a = 0 < yh.length ? yh.pop() : xh++), (uh[a] = 0), a)
                : 0;
        }
        var Cc = () => Date.now(),
            Nh = 1;
        function vc(a, b, c) {
            if (!(0 <= a && 3 >= a)) return 28;
            if (0 === a) a = Date.now();
            else if (Nh) a = performance.timeOrigin + performance.now();
            else return 52;
            va[c >> 3] = BigInt(Math.round(1e6 * a));
            return 0;
        }
        var Oh = [],
            yc = (a, b, c) => {
                Oh.length = 0;
                for (var d; (d = x()[b++]); ) {
                    var e = 105 != d;
                    e &= 112 != d;
                    c += e && c % 8 ? 4 : 0;
                    Oh.push(
                        112 == d
                            ? F()[c >> 2]
                            : 106 == d
                            ? va[c >> 3]
                            : 105 == d
                            ? C()[c >> 2]
                            : Fa()[c >> 3]
                    );
                    c += e ? 8 : 4;
                }
                return kf[a](...Oh);
            },
            Ph = (a, b) => {
                P += 1;
                setTimeout(() => {
                    --P;
                    Ig(a);
                }, b);
            },
            Qh = (a) => {
                P += 1;
                eh(() => {
                    --P;
                    Ig(a);
                });
            },
            zc = (a, b, c) => {
                var d = () => S(a)(b);
                0 <= c ? Ph(d, c) : Qh(d);
            },
            Ac = () => {
                ph();
                $g = null;
            },
            Bc = () => {},
            Dc = (a, b) => p(H(a, b)),
            Ec = () => {
                P += 1;
                throw "unwind";
            };
        function Fc(a) {
            if (Rh.has(a)) {
                var b = Rh.get(a),
                    c = Rh;
                c.Ff[a] = void 0;
                c.eh.push(a);
                0 < b.readyState && 4 > b.readyState && b.abort();
            }
        }
        function Gc(a) {
            if (m) return R(31, 1, a);
            P = 0;
            md(a);
        }
        var Bf = [];
        function Sh(a) {
            var b = W.If[a];
            b.target.removeEventListener(b.Rf, b.Pg, b.eg);
            W.If.splice(a, 1);
        }
        function Th() {
            if (
                navigator.userActivation
                    ? navigator.userActivation.isActive
                    : W.xg && W.ih.vg
            ) {
                var a = W.Qf;
                W.Qf = [];
                for (var b of a) b.Fg(...b.Mg);
            }
        }
        function Uh(a) {
            if (!a.target) return -4;
            if (a.kg)
                (a.Pg = function (c) {
                    ++W.xg;
                    W.ih = a;
                    Th();
                    a.ng(c);
                    Th();
                    --W.xg;
                }),
                    a.target.addEventListener(a.Rf, a.Pg, a.eg),
                    W.If.push(a),
                    W.yh || (Bf.unshift(W.wh), (W.yh = !0));
            else
                for (var b = 0; b < W.If.length; ++b)
                    W.If[b].target == a.target && W.If[b].Rf == a.Rf && Sh(b--);
            return 0;
        }
        function Vh(a) {
            switch (a) {
                case 1:
                    return 0;
                case 2:
                    return Lf;
                default:
                    return a;
            }
        }
        var W = {
                Kh: 0,
                Wh: 0,
                yg: 0,
                rg: 0,
                Jg: 0,
                hi: 0,
                Th: 0,
                Ph: 0,
                bi: 0,
                Oh: 0,
                Uh: 0,
                ci: 0,
                ii: 0,
                Gg: 0,
                Zh(a, b, c) {
                    w().set(w().subarray(b, b + c), a);
                },
                wh() {
                    for (; W.If.length; ) Sh(W.If.length - 1);
                    W.Qf = [];
                },
                xg: 0,
                Qf: [],
                Nh(a, b, c) {
                    function d(f, h) {
                        if (f.length != h.length) return !1;
                        for (var k in f) if (f[k] != h[k]) return !1;
                        return !0;
                    }
                    for (var e of W.Qf) if (e.Fg == a && d(e.Mg, c)) return;
                    W.Qf.push({ Fg: a, Yg: b, Mg: c });
                    W.Qf.sort((f, h) => f.Yg < h.Yg);
                },
                ei(a) {
                    W.Qf = W.Qf.filter((b) => b.Fg != a);
                },
                If: [],
                xh: (a, b) => {
                    for (var c = 0; c < W.If.length; ++c)
                        W.If[c].target != a ||
                            (b && b != W.If[c].Rf) ||
                            Sh(c--);
                },
                Xh(a) {
                    return a
                        ? a == window
                            ? "#window"
                            : a == screen
                            ? "#screen"
                            : a?.nodeName || ""
                        : "";
                },
                fullscreenEnabled() {
                    return (
                        document.fullscreenEnabled ||
                        document.webkitFullscreenEnabled
                    );
                },
            },
            X,
            Wh = (a) => {
                var b =
                    "EXT_color_buffer_float EXT_conservative_depth EXT_disjoint_timer_query_webgl2 EXT_texture_norm16 NV_shader_noperspective_interpolation WEBGL_clip_cull_distance EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(
                        " "
                    );
                return (a.getSupportedExtensions() || []).filter((c) =>
                    b.includes(c)
                );
            },
            Xh = 1,
            Yh = [],
            Zh = [],
            $h = [],
            ai = [],
            bi = [],
            ci = [],
            di = [],
            ei = {},
            Kf = {},
            fi = [1, 1, 2, 2, 4, 4, 4, 2, 3, 4, 8],
            gi = 4,
            hi = 0,
            ii = (a) => {
                for (var b = Xh++, c = a.length; c < b; c++) a[c] = null;
                for (; a[b]; ) b = Xh++;
                return b;
            },
            ji = (a, b, c, d) => {
                for (var e = 0; e < a; e++) {
                    var f = X[c](),
                        h = f && ii(d);
                    f ? ((f.name = h), (d[h] = f)) : (Y ||= 1282);
                    C()[(b + 4 * e) >> 2] = h;
                }
            },
            ki = (a) => {
                a = 32 - Math.clz32(0 === a ? 0 : a - 1);
                var b = Z.Uf[a];
                if (b) return b;
                b = X.getParameter(34965);
                Z.Uf[a] = X.createBuffer();
                X.bindBuffer(34963, Z.Uf[a]);
                X.bufferData(34963, 1 << a, 35048);
                X.bindBuffer(34963, b);
                return Z.Uf[a];
            },
            mi = (a) => {
                li = !1;
                for (var b = 0; b < Z.zg; ++b) {
                    var c = Z.Xf[b];
                    if (c.lg && c.enabled) {
                        li = !0;
                        var d = c.Eg;
                        d = 0 < d ? a * d : c.size * fi[c.type - 5120] * a;
                        var e = 32 - Math.clz32(0 === d ? 0 : d - 1);
                        var f = Z.Vf[e],
                            h = Z.Sf[e];
                        Z.Sf[e] = (Z.Sf[e] + 1) & 63;
                        var k = f[h];
                        k
                            ? (e = k)
                            : ((k = X.getParameter(34964)),
                              (f[h] = X.createBuffer()),
                              X.bindBuffer(34962, f[h]),
                              X.bufferData(34962, 1 << e, 35048),
                              X.bindBuffer(34962, k),
                              (e = f[h]));
                        X.bindBuffer(34962, e);
                        X.bufferSubData(34962, 0, x().subarray(c.Bg, c.Bg + d));
                        c.dh.call(X, b, c.size, c.type, c.Wg, c.Eg, 0);
                    }
                }
            },
            ni = (a) => {
                a ||= Z;
                if (!a.rh) {
                    a.rh = !0;
                    var b = a.Gf;
                    b.ai = b.getExtension("WEBGL_multi_draw");
                    b.Sh = b.getExtension("EXT_polygon_offset_clamp");
                    b.Rh = b.getExtension("EXT_clip_control");
                    b.ji = b.getExtension("WEBGL_polygon_mode");
                    b.Qh = b.getExtension(
                        "WEBGL_draw_instanced_base_vertex_base_instance"
                    );
                    b.Yh = b.getExtension(
                        "WEBGL_multi_draw_instanced_base_vertex_base_instance"
                    );
                    2 <= a.version &&
                        (b.Ng = b.getExtension(
                            "EXT_disjoint_timer_query_webgl2"
                        ));
                    if (2 > a.version || !b.Ng)
                        b.Ng = b.getExtension("EXT_disjoint_timer_query");
                    Wh(b).forEach((c) => {
                        c.includes("lose_context") ||
                            c.includes("debug") ||
                            b.getExtension(c);
                    });
                }
            },
            Jf = {},
            Y,
            Z,
            li,
            oi = (a) => {
                a = 2 < a ? H(a) : a;
                return (
                    Kf[a.slice(1)] ||
                    ("canvas" == a && Object.keys(Kf)[0]) ||
                    ("undefined" != typeof document &&
                        document.querySelector(a))
                );
            },
            pi = (a, b, c) => {
                var d = oi(a);
                if (!d) return -4;
                if (d.Af)
                    (a = C()[d.Af >> 2]),
                        (d = C()[(d.Af + 4) >> 2]),
                        (C()[b >> 2] = a),
                        (C()[c >> 2] = d);
                else if (d.Lf)
                    (C()[b >> 2] = d.Lf.width), (C()[c >> 2] = d.Lf.height);
                else {
                    if (d.Yf) return -4;
                    C()[b >> 2] = d.width;
                    C()[c >> 2] = d.height;
                }
                return 0;
            };
        function qi(a, b, c) {
            return m ? R(32, 1, a, b, c) : pi(a, b, c);
        }
        var Hc = (a, b, c) => (oi(a) ? pi(a, b, c) : qi(a, b, c));
        function Ic() {
            return m ? R(33, 1) : devicePixelRatio;
        }
        var ri = [
                0,
                "undefined" != typeof document ? document : 0,
                "undefined" != typeof window ? window : 0,
            ],
            si = (a) => {
                a = 2 < a ? H(a) : a;
                return (
                    ri[a] ||
                    ("undefined" != typeof document
                        ? document.querySelector(a)
                        : null)
                );
            },
            ti = (a) =>
                0 > ri.indexOf(a)
                    ? a.getBoundingClientRect()
                    : { left: 0, top: 0 };
        function Jc(a, b, c) {
            if (m) return R(34, 1, a, b, c);
            a = si(a);
            if (!a) return -4;
            a = ti(a);
            Fa()[b >> 3] = a.width;
            Fa()[c >> 3] = a.height;
            return 0;
        }
        var Kc = () =>
            /iPad|iPhone|iPod/.test(navigator.userAgent)
                ? 536870912
                : 2147483648;
        function ui() {
            if ("undefined" != typeof indexedDB) return indexedDB;
            var a = null;
            "object" == typeof window &&
                (a =
                    window.indexedDB ||
                    window.mozIndexedDB ||
                    window.webkitIndexedDB ||
                    window.msIndexedDB);
            assert(a, "IDBStore used, but indexedDB not supported");
            return a;
        }
        var vi = {};
        function wi(a, b) {
            var c = vi[a];
            if (c) b(null, c);
            else {
                try {
                    var d = ui().open(a, 22);
                } catch (e) {
                    b(e);
                    return;
                }
                d.onupgradeneeded = (e) => {
                    var f = e.target.result;
                    e = e.target.transaction;
                    f.objectStoreNames.contains("FILE_DATA")
                        ? e.objectStore("FILE_DATA")
                        : f.createObjectStore("FILE_DATA");
                };
                d.onsuccess = () => {
                    c = d.result;
                    vi[a] = c;
                    b(null, c);
                };
                d.onerror = function (e) {
                    b(e.target.error || "unknown error");
                    e.preventDefault();
                };
            }
        }
        function xi(a, b, c) {
            wi(a, (d, e) => {
                if (d) return c(d);
                d = e.transaction(["FILE_DATA"], b);
                d.onerror = (f) => {
                    c(f.target.error || "unknown error");
                    f.preventDefault();
                };
                d = d.objectStore("FILE_DATA");
                c(null, d);
            });
        }
        function yi(a, b, c) {
            xi(a, "readonly", (d, e) => {
                if (d) return c(d);
                d = e.get(b);
                d.onsuccess = (f) =>
                    (f = f.target.result)
                        ? c(null, f)
                        : c(`file ${b} not found`);
                d.onerror = c;
            });
        }
        function zi(a, b, c, d) {
            xi(a, "readwrite", (e, f) => {
                if (e) return d(e);
                e = f.put(c, b);
                e.onsuccess = () => d();
                e.onerror = d;
            });
        }
        function Ai(a, b, c) {
            xi(a, "readwrite", (d, e) => {
                if (d) return c(d);
                d = e.delete(b);
                d.onsuccess = () => c();
                d.onerror = c;
            });
        }
        function Bi(a, b, c) {
            xi(a, "readonly", (d, e) => {
                if (d) return c(d);
                d = e.count(b);
                d.onsuccess = (f) => c(null, 0 < f.target.result);
                d.onerror = c;
            });
        }
        var Mc = (a, b, c, d, e) => {
                P += 1;
                Ai(H(a), H(b), (f) => {
                    --P;
                    Ig(() => {
                        f ? e && S(e)(c) : d && S(d)(c);
                    });
                });
            },
            Nc = (a, b, c, d, e) => {
                P += 1;
                Bi(H(a), H(b), (f, h) => {
                    --P;
                    Ig(() => {
                        f ? e && S(e)(c) : d && S(d)(c, h);
                    });
                });
            },
            Oc = (a, b, c, d, e) => {
                P += 1;
                yi(H(a), H(b), (f, h) => {
                    --P;
                    Ig(() => {
                        if (f) e && S(e)(c);
                        else {
                            var k = K(h.length);
                            x().set(h, k);
                            S(d)(c, k, h.length);
                            I(k);
                        }
                    });
                });
            },
            Pc = (a, b, c, d, e, f, h) => {
                P += 1;
                zi(H(a), H(b), new Uint8Array(x().subarray(c, c + d)), (k) => {
                    --P;
                    Ig(() => {
                        k ? h && S(h)(e) : f && S(f)(e);
                    });
                });
            },
            Qc = () => navigator.hardwareConcurrency,
            Rc = (a, b) => {
                function c(d) {
                    S(a)(d, b) && requestAnimationFrame(c);
                }
                return requestAnimationFrame(c);
            },
            Sc = (a) => {
                var b = x().length;
                a >>>= 0;
                if (a <= b) return !1;
                var c = /iPad|iPhone|iPod/.test(navigator.userAgent)
                    ? 536870912
                    : 2147483648;
                if (a > c) return !1;
                for (var d = 1; 4 >= d; d *= 2) {
                    var e = b * (1 + 0.2 / d);
                    e = Math.min(e, a + 100663296);
                    a: {
                        e =
                            ((Math.min(
                                c,
                                65536 * Math.ceil(Math.max(a, e) / 65536)
                            ) -
                                q.buffer.byteLength +
                                65535) /
                                65536) |
                            0;
                        try {
                            q.grow(e);
                            Ba();
                            var f = 1;
                            break a;
                        } catch (h) {}
                        f = void 0;
                    }
                    if (f) return !0;
                }
                return !1;
            },
            Di = (a, b, c) => {
                var d = oi(a);
                if (!d) return -4;
                d.Af && ((C()[d.Af >> 2] = b), (C()[(d.Af + 4) >> 2] = c));
                if (d.Lf || !d.Yf)
                    d.Lf && (d = d.Lf),
                        (a = !1),
                        d.fg?.Gf &&
                            ((a = d.fg.Gf.getParameter(2978)),
                            (a =
                                a instanceof Int32Array && 4 === a.length
                                    ? 0 === a[0] &&
                                      0 === a[1] &&
                                      a[2] === d.width &&
                                      a[3] === d.height
                                    : !0)),
                        (d.width = b),
                        (d.height = c),
                        a && d.fg.Gf.viewport(0, 0, b, c);
                else {
                    if (d.Af) {
                        d = F()[(d.Af + 8) >> 2];
                        a = a ? H(a) : "";
                        var e = 0;
                        if (a) {
                            e = lf(a) + 1;
                            var f = K(e);
                            f && M(a, f, e);
                            e = f;
                        }
                        Ci(d, e, b, c);
                        return 1;
                    }
                    return -4;
                }
                return 0;
            };
        function Ei(a, b, c) {
            return m ? R(35, 1, a, b, c) : Di(a, b, c);
        }
        var Tc = (a, b, c) => (oi(a) ? Di(a, b, c) : Ei(a, b, c)),
            Gi = (a, b, c, d, e, f, h) => {
                h = Vh(h);
                W.yg || (W.yg = K(160));
                a = {
                    target: si(a),
                    Rf: f,
                    kg: d,
                    ng: (k) => {
                        var l = h ? K(160) : W.yg;
                        Fa()[l >> 3] = k.timeStamp;
                        var n = l >> 2;
                        C()[n + 2] = k.location;
                        w()[l + 12] = k.ctrlKey;
                        w()[l + 13] = k.shiftKey;
                        w()[l + 14] = k.altKey;
                        w()[l + 15] = k.metaKey;
                        w()[l + 16] = k.repeat;
                        C()[n + 5] = k.charCode;
                        C()[n + 6] = k.keyCode;
                        C()[n + 7] = k.which;
                        M(k.key || "", l + 32, 32);
                        M(k.code || "", l + 64, 32);
                        M(k.char || "", l + 96, 32);
                        M(k.locale || "", l + 128, 32);
                        h
                            ? Fi(h, d, e, l, b)
                            : S(d)(e, l, b) && k.preventDefault();
                    },
                    eg: c,
                };
                return Uh(a);
            };
        function Uc(a, b, c, d, e) {
            return m
                ? R(36, 1, a, b, c, d, e)
                : Gi(a, b, c, d, 2, "keydown", e);
        }
        function Vc(a, b, c, d, e) {
            return m ? R(37, 1, a, b, c, d, e) : Gi(a, b, c, d, 3, "keyup", e);
        }
        var Wc = (a, b, c) => {
                a = S(a);
                oh(a, b, c);
            },
            Hi = (a, b, c) => {
                Fa()[a >> 3] = b.timeStamp;
                var d = a >> 2;
                C()[d + 2] = b.screenX;
                C()[d + 3] = b.screenY;
                C()[d + 4] = b.clientX;
                C()[d + 5] = b.clientY;
                w()[a + 24] = b.ctrlKey;
                w()[a + 25] = b.shiftKey;
                w()[a + 26] = b.altKey;
                w()[a + 27] = b.metaKey;
                A()[2 * d + 14] = b.button;
                A()[2 * d + 15] = b.buttons;
                C()[d + 8] = b.movementX;
                C()[d + 9] = b.movementY;
                a = ti(c);
                C()[d + 10] = b.clientX - (a.left | 0);
                C()[d + 11] = b.clientY - (a.top | 0);
            },
            Ii = (a, b, c, d, e, f, h) => {
                h = Vh(h);
                W.rg || (W.rg = K(64));
                a = si(a);
                return Uh({
                    target: a,
                    vg:
                        "mousemove" != f &&
                        "mouseenter" != f &&
                        "mouseleave" != f,
                    Rf: f,
                    kg: d,
                    ng: (k = event) => {
                        Hi(W.rg, k, a);
                        if (h) {
                            var l = K(64);
                            Hi(l, k, a);
                            Fi(h, d, e, l, b);
                        } else S(d)(e, W.rg, b) && k.preventDefault();
                    },
                    eg: c,
                });
            };
        function Xc(a, b, c, d, e) {
            return m
                ? R(38, 1, a, b, c, d, e)
                : Ii(a, b, c, d, 5, "mousedown", e);
        }
        function Yc(a, b, c, d, e) {
            return m
                ? R(39, 1, a, b, c, d, e)
                : Ii(a, b, c, d, 8, "mousemove", e);
        }
        function Zc(a, b, c, d, e) {
            return m
                ? R(40, 1, a, b, c, d, e)
                : Ii(a, b, c, d, 6, "mouseup", e);
        }
        var Ji = (a, b, c, d, e, f, h) => {
            h = Vh(h);
            W.Gg || (W.Gg = K(1552));
            a = si(a);
            return Uh({
                target: a,
                vg: "touchstart" == f || "touchend" == f,
                Rf: f,
                kg: d,
                ng: (k) => {
                    var l = {},
                        n = k.touches;
                    for (var r of n) (r.Tg = r.Xg = 0), (l[r.identifier] = r);
                    for (var v of k.changedTouches)
                        (v.Tg = 1), (l[v.identifier] = v);
                    for (var t of k.targetTouches) l[t.identifier].Xg = 1;
                    n = h ? K(1552) : W.Gg;
                    Fa()[n >> 3] = k.timeStamp;
                    w()[n + 12] = k.ctrlKey;
                    w()[n + 13] = k.shiftKey;
                    w()[n + 14] = k.altKey;
                    w()[n + 15] = k.metaKey;
                    r = n + 16;
                    v = ti(a);
                    t = 0;
                    for (let y of Object.values(l))
                        if (
                            ((l = r >> 2),
                            (C()[l] = y.identifier),
                            (C()[l + 1] = y.screenX),
                            (C()[l + 2] = y.screenY),
                            (C()[l + 3] = y.clientX),
                            (C()[l + 4] = y.clientY),
                            (C()[l + 5] = y.pageX),
                            (C()[l + 6] = y.pageY),
                            (w()[r + 28] = y.Tg),
                            (w()[r + 29] = y.Xg),
                            (C()[l + 8] = y.clientX - (v.left | 0)),
                            (C()[l + 9] = y.clientY - (v.top | 0)),
                            (r += 48),
                            31 < ++t)
                        )
                            break;
                    C()[(n + 8) >> 2] = t;
                    h ? Fi(h, d, e, n, b) : S(d)(e, n, b) && k.preventDefault();
                },
                eg: c,
            });
        };
        function $c(a, b, c, d, e) {
            return m
                ? R(41, 1, a, b, c, d, e)
                : Ji(a, b, c, d, 23, "touchend", e);
        }
        function ad(a, b, c, d, e) {
            return m
                ? R(42, 1, a, b, c, d, e)
                : Ji(a, b, c, d, 24, "touchmove", e);
        }
        function bd(a, b, c, d, e) {
            return m
                ? R(43, 1, a, b, c, d, e)
                : Ji(a, b, c, d, 22, "touchstart", e);
        }
        var Ki = (a, b, c, d, e) => {
            e = Vh(e);
            W.Jg || (W.Jg = K(96));
            return Uh({
                target: a,
                vg: !0,
                Rf: "wheel",
                kg: d,
                ng: (f = event) => {
                    var h = e ? K(96) : W.Jg;
                    Hi(h, f, a);
                    Fa()[(h + 64) >> 3] = f.deltaX;
                    Fa()[(h + 72) >> 3] = f.deltaY;
                    Fa()[(h + 80) >> 3] = f.deltaZ;
                    C()[(h + 88) >> 2] = f.deltaMode;
                    e ? Fi(e, d, 9, h, b) : S(d)(9, h, b) && f.preventDefault();
                },
                eg: c,
            });
        };
        function cd(a, b, c, d, e) {
            return m
                ? R(44, 1, a, b, c, d, e)
                : (a = si(a))
                ? "undefined" != typeof a.onwheel
                    ? Ki(a, b, c, d, e)
                    : -1
                : -4;
        }
        function Li(a) {
            var b = Rh,
                c = b.eh.pop() || b.Ff.length;
            b.Ff[c] = a;
            return c;
        }
        class Mi {
            Ff = [void 0];
            eh = [];
            get(a) {
                return this.Ff[a];
            }
            has(a) {
                return void 0 !== this.Ff[a];
            }
        }
        function Ni(a, b) {
            try {
                var c = indexedDB.open("emscripten_filesystem", 1);
            } catch (d) {
                b(d);
                return;
            }
            c.onupgradeneeded = (d) => {
                d = d.target.result;
                d.objectStoreNames.contains("FILES") &&
                    d.deleteObjectStore("FILES");
                d.createObjectStore("FILES");
            };
            c.onsuccess = (d) => a(d.target.result);
            c.onerror = b;
        }
        var Rh, Oi;
        function Pi(a, b, c, d, e) {
            function f() {
                var D = 0,
                    Q = 0;
                u.response &&
                    B &&
                    0 === F()[(a + 12) >> 2] &&
                    (Q = u.response.byteLength);
                0 < Q && ((D = K(Q)), x().set(new Uint8Array(u.response), D));
                F()[(a + 12) >> 2] = D;
                Qi(a + 16, Q);
                Qi(a + 24, 0);
                (D = u.response ? u.response.byteLength : 0) && Qi(a + 32, D);
                A()[(a + 40) >> 1] = u.readyState;
                A()[(a + 42) >> 1] = u.status;
                u.statusText && M(u.statusText, a + 44, 64);
            }
            var h = F()[(a + 8) >> 2];
            if (h) {
                var k = H(h),
                    l = a + 108,
                    n = H(l + 0);
                n ||= "GET";
                var r = F()[(l + 56) >> 2],
                    v = F()[(l + 68) >> 2],
                    t = F()[(l + 72) >> 2];
                h = F()[(l + 76) >> 2];
                var y = F()[(l + 80) >> 2],
                    E = F()[(l + 84) >> 2],
                    L = F()[(l + 88) >> 2],
                    z = F()[(l + 52) >> 2],
                    B = !!(z & 1),
                    N = !!(z & 2);
                z = !!(z & 64);
                v = v ? H(v) : void 0;
                t = t ? H(t) : void 0;
                var u = new XMLHttpRequest();
                u.withCredentials = !!x()[l + 60];
                u.open(n, k, !z, v, t);
                z || (u.timeout = r);
                u.Ff = k;
                u.responseType = "arraybuffer";
                y && ((k = H(y)), u.overrideMimeType(k));
                if (h)
                    for (;;) {
                        l = F()[h >> 2];
                        if (!l) break;
                        k = F()[(h + 4) >> 2];
                        if (!k) break;
                        h += 8;
                        l = H(l);
                        k = H(k);
                        u.setRequestHeader(l, k);
                    }
                var O = Li(u);
                F()[a >> 2] = O;
                h = E && L ? x().slice(E, E + L) : null;
                u.onload = (D) => {
                    Rh.has(O) &&
                        (f(),
                        200 <= u.status && 300 > u.status
                            ? b?.(a, u, D)
                            : c?.(a, u, D));
                };
                u.onerror = (D) => {
                    Rh.has(O) && (f(), c?.(a, u, D));
                };
                u.ontimeout = (D) => {
                    Rh.has(O) && c?.(a, u, D);
                };
                u.onprogress = (D) => {
                    if (Rh.has(O)) {
                        var Q =
                                B && N && u.response
                                    ? u.response.byteLength
                                    : 0,
                            J = 0;
                        0 < Q &&
                            B &&
                            N &&
                            ((J = K(Q)),
                            x().set(new Uint8Array(u.response), J));
                        F()[(a + 12) >> 2] = J;
                        Qi(a + 16, Q);
                        Qi(a + 24, D.loaded - Q);
                        Qi(a + 32, D.total);
                        A()[(a + 40) >> 1] = u.readyState;
                        3 <= u.readyState &&
                            0 === u.status &&
                            0 < D.loaded &&
                            (u.status = 200);
                        A()[(a + 42) >> 1] = u.status;
                        u.statusText && M(u.statusText, a + 44, 64);
                        d?.(a, u, D);
                        J && I(J);
                    }
                };
                u.onreadystatechange = (D) => {
                    Rh.has(O)
                        ? ((A()[(a + 40) >> 1] = u.readyState),
                          2 <= u.readyState && (A()[(a + 42) >> 1] = u.status),
                          e?.(a, u, D))
                        : --P;
                };
                try {
                    u.send(h);
                } catch (D) {
                    c?.(a, u, D);
                }
            } else c(a, 0, "no url specified!");
        }
        var Qi = (a, b) => {
            F()[a >> 2] = b;
            var c = F()[a >> 2];
            F()[(a + 4) >> 2] = (b - c) / 4294967296;
        };
        function Ri(a, b, c, d) {
            var e = Oi;
            if (e) {
                var f = a + 108;
                (f = F()[(f + 64) >> 2]) || (f = F()[(a + 8) >> 2]);
                var h = H(f);
                try {
                    var k = e
                        .transaction(["FILES"], "readwrite")
                        .objectStore("FILES")
                        .put(b, h);
                    k.onsuccess = () => {
                        A()[(a + 40) >> 1] = 4;
                        A()[(a + 42) >> 1] = 200;
                        M("OK", a + 44, 64);
                        c(a, 0, h);
                    };
                    k.onerror = (l) => {
                        A()[(a + 40) >> 1] = 4;
                        A()[(a + 42) >> 1] = 413;
                        M("Payload Too Large", a + 44, 64);
                        d(a, 0, l);
                    };
                } catch (l) {
                    d(a, 0, l);
                }
            } else d(a, 0, "IndexedDB not available!");
        }
        function Si(a, b, c) {
            var d = Oi;
            if (d) {
                var e = a + 108;
                (e = F()[(e + 64) >> 2]) || (e = F()[(a + 8) >> 2]);
                e = H(e);
                try {
                    var f = d
                        .transaction(["FILES"], "readonly")
                        .objectStore("FILES")
                        .get(e);
                    f.onsuccess = (h) => {
                        if (h.target.result) {
                            h = h.target.result;
                            var k = h.byteLength || h.length,
                                l = K(k);
                            x().set(new Uint8Array(h), l);
                            F()[(a + 12) >> 2] = l;
                            Qi(a + 16, k);
                            Qi(a + 24, 0);
                            Qi(a + 32, k);
                            A()[(a + 40) >> 1] = 4;
                            A()[(a + 42) >> 1] = 200;
                            M("OK", a + 44, 64);
                            b(a, 0, h);
                        } else
                            (A()[(a + 40) >> 1] = 4),
                                (A()[(a + 42) >> 1] = 404),
                                M("Not Found", a + 44, 64),
                                c(a, 0, "no data");
                    };
                    f.onerror = (h) => {
                        A()[(a + 40) >> 1] = 4;
                        A()[(a + 42) >> 1] = 404;
                        M("Not Found", a + 44, 64);
                        c(a, 0, h);
                    };
                } catch (h) {
                    c(a, 0, h);
                }
            } else c(a, 0, "IndexedDB not available!");
        }
        function Ti(a, b, c) {
            var d = Oi;
            if (d) {
                var e = a + 108;
                (e = F()[(e + 64) >> 2]) || (e = F()[(a + 8) >> 2]);
                e = H(e);
                try {
                    var f = d
                        .transaction(["FILES"], "readwrite")
                        .objectStore("FILES")
                        .delete(e);
                    f.onsuccess = (h) => {
                        h = h.target.result;
                        F()[(a + 12) >> 2] = 0;
                        Qi(a + 16, 0);
                        Qi(a + 24, 0);
                        Qi(a + 32, 0);
                        A()[(a + 40) >> 1] = 4;
                        A()[(a + 42) >> 1] = 200;
                        M("OK", a + 44, 64);
                        b(a, 0, h);
                    };
                    f.onerror = (h) => {
                        A()[(a + 40) >> 1] = 4;
                        A()[(a + 42) >> 1] = 404;
                        M("Not Found", a + 44, 64);
                        c(a, 0, h);
                    };
                } catch (h) {
                    c(a, 0, h);
                }
            } else c(a, 0, "IndexedDB not available!");
        }
        function dd(a, b, c, d, e) {
            function f(J) {
                t ? J() : Ig(J);
            }
            P += 1;
            var h = a + 108,
                k = F()[(h + 36) >> 2],
                l = F()[(h + 40) >> 2],
                n = F()[(h + 44) >> 2],
                r = F()[(h + 48) >> 2],
                v = F()[(h + 52) >> 2],
                t = !!(v & 64),
                y = (J) => {
                    --P;
                    f(() => {
                        k ? S(k)(J) : b?.(J);
                    });
                },
                E = (J) => {
                    f(() => {
                        n ? S(n)(J) : d?.(J);
                    });
                },
                L = (J) => {
                    --P;
                    f(() => {
                        l ? S(l)(J) : c?.(J);
                    });
                },
                z = (J) => {
                    f(() => {
                        r ? S(r)(J) : e?.(J);
                    });
                },
                B = (J) => {
                    Pi(J, y, L, E, z);
                },
                N = (J, Ea) => {
                    Ri(
                        J,
                        Ea.response,
                        (za) => {
                            --P;
                            f(() => {
                                k ? S(k)(za) : b?.(za);
                            });
                        },
                        (za) => {
                            --P;
                            f(() => {
                                k ? S(k)(za) : b?.(za);
                            });
                        }
                    );
                },
                u = (J) => {
                    Pi(J, N, L, E, z);
                },
                O = H(h + 0),
                D = !!(v & 16),
                Q = !!(v & 4);
            v = !!(v & 32);
            if ("EM_IDB_STORE" === O)
                (B = F()[(h + 84) >> 2]),
                    (h = F()[(h + 88) >> 2]),
                    Ri(a, x().slice(B, B + h), y, L);
            else if ("EM_IDB_DELETE" === O) Ti(a, y, L);
            else if (D) {
                if (v) return 0;
                Pi(a, Q ? N : y, L, E, z);
            } else Si(a, y, v ? L : Q ? u : B);
            return a;
        }
        var Ui = ["default", "low-power", "high-performance"],
            ed = (a, b) => {
                var c = b >> 2,
                    d = C()[c + 2];
                c = {
                    alpha: !!w()[b + 0],
                    depth: !!w()[b + 1],
                    stencil: !!w()[b + 2],
                    antialias: !!w()[b + 3],
                    premultipliedAlpha: !!w()[b + 4],
                    preserveDrawingBuffer: !!w()[b + 5],
                    powerPreference: Ui[d],
                    failIfMajorPerformanceCaveat: !!w()[b + 12],
                    th: C()[c + 4],
                    $h: C()[c + 5],
                    Og: w()[b + 24],
                    Qg: w()[b + 25],
                    di: C()[c + 7],
                    fi: w()[b + 32],
                };
                a = oi(a);
                a?.canvas && (a = a.canvas);
                if (!a) return 0;
                a.Lf && (a = a.Lf);
                if (c.Qg) {
                    if (
                        !(
                            a.transferControlToOffscreen ||
                            ("undefined" != typeof OffscreenCanvas &&
                                a instanceof OffscreenCanvas)
                        )
                    )
                        return 0;
                    if (a.transferControlToOffscreen) {
                        if (!a.Yf)
                            (Kf[a.id] = {
                                canvas: a.transferControlToOffscreen(),
                                Af: K(12),
                                id: a.id,
                            }),
                                (a.Yf = !0);
                        else if (!Kf[a.id]) return 0;
                        a = Kf[a.id].canvas;
                    }
                }
                if ((d = a.getContext("webgl2", c))) {
                    a = K(8);
                    F()[(a + 4) >> 2] = Ia();
                    b = { handle: a, attributes: c, version: c.th, Gf: d };
                    d.canvas && (d.canvas.fg = b);
                    ei[a] = b;
                    ("undefined" == typeof c.Og || c.Og) && ni(b);
                    b.zg = b.Gf.getParameter(34921);
                    b.Xf = [];
                    for (c = 0; c < b.zg; c++)
                        b.Xf[c] = {
                            enabled: !1,
                            lg: !1,
                            size: 0,
                            type: 0,
                            Wg: 0,
                            Eg: 0,
                            Bg: 0,
                            dh: null,
                        };
                    b.Sf = [];
                    b.tg = [];
                    b.Sf.length = b.tg.length = 22;
                    b.Vf = [];
                    b.cg = [];
                    b.Vf.length = b.cg.length = 22;
                    b.Uf = [];
                    b.Uf.length = 22;
                    for (c = 0; 21 >= c; ++c) {
                        b.Uf[c] = null;
                        b.Sf[c] = b.tg[c] = 0;
                        b.Vf[c] = [];
                        b.cg[c] = [];
                        d = b.Vf[c];
                        var e = b.cg[c];
                        d.length = e.length = 64;
                        for (var f = 0; 64 > f; ++f) d[f] = e[f] = null;
                    }
                } else a = 0;
                return a;
            };
        function fd(a) {
            Z == a && (Z = 0);
            Z === ei[a] && (Z = null);
            "object" == typeof W && W.xh(ei[a].Gf.canvas);
            ei[a]?.Gf.canvas && (ei[a].Gf.canvas.fg = void 0);
            I(ei[a].handle);
            ei[a] = null;
        }
        var gd = (a) => {
                Z = ei[a];
                g.ctx = X = Z?.Gf;
                return !a || X ? 0 : -5;
            },
            Vi = {},
            Xi = () => {
                if (!Wi) {
                    var a = {
                            USER: "web_user",
                            LOGNAME: "web_user",
                            PATH: "/",
                            PWD: "/",
                            HOME: "/home/web_user",
                            LANG:
                                (
                                    ("object" == typeof navigator &&
                                        navigator.languages &&
                                        navigator.languages[0]) ||
                                    "C"
                                ).replace("-", "_") + ".UTF-8",
                            _: "./this.program",
                        },
                        b;
                    for (b in Vi)
                        void 0 === Vi[b] ? delete a[b] : (a[b] = Vi[b]);
                    var c = [];
                    for (b in a) c.push(`${b}=${a[b]}`);
                    Wi = c;
                }
                return Wi;
            },
            Wi;
        function kd(a, b) {
            if (m) return R(45, 1, a, b);
            var c = 0;
            Xi().forEach((d, e) => {
                var f = b + c;
                e = F()[(a + 4 * e) >> 2] = f;
                for (f = 0; f < d.length; ++f) w()[e++] = d.charCodeAt(f);
                w()[e] = 0;
                c += d.length + 1;
            });
            return 0;
        }
        function ld(a, b) {
            if (m) return R(46, 1, a, b);
            var c = Xi();
            F()[a >> 2] = c.length;
            var d = 0;
            c.forEach((e) => (d += e.length + 1));
            F()[b >> 2] = d;
            return 0;
        }
        function nd(a) {
            return m ? R(47, 1, a) : 52;
        }
        function od(a, b) {
            if (m) return R(48, 1, a, b);
            var c = 0;
            if (0 == a) c = 2;
            else if (1 == a || 2 == a) c = 64;
            w()[b] = 2;
            A()[(b + 2) >> 1] = 1;
            va[(b + 8) >> 3] = BigInt(c);
            va[(b + 16) >> 3] = BigInt(0);
            return 0;
        }
        function pd(a, b, c, d) {
            return m ? R(49, 1, a, b, c, d) : 52;
        }
        function qd(a, b, c, d) {
            return m ? R(50, 1, a, b, c, d) : 70;
        }
        var Df = [null, [], []],
            Ef = (a, b) => {
                var c = Df[a];
                0 === b || 10 === b
                    ? ((1 === a ? ka : p)(Rf(c)), (c.length = 0))
                    : c.push(b);
            };
        function rd(a, b, c, d) {
            if (m) return R(51, 1, a, b, c, d);
            for (var e = 0, f = 0; f < c; f++) {
                var h = F()[b >> 2],
                    k = F()[(b + 4) >> 2];
                b += 8;
                for (var l = 0; l < k; l++) Ef(a, x()[h + l]);
                e += k;
            }
            F()[d >> 2] = e;
            return 0;
        }
        var ud = (a) => X.activeTexture(a),
            vd = (a, b) => {
                X.attachShader(Zh[a], ci[b]);
            },
            wd = (a, b) => {
                if (b && !Yh[b]) {
                    var c = X.createBuffer();
                    c.name = b;
                    Yh[b] = c;
                }
                34962 == a ? (X.Zf = b) : 34963 == a && (X.$f = b);
                35051 == a ? (X.wg = b) : 35052 == a && (X.mg = b);
                X.bindBuffer(a, Yh[b]);
            },
            xd = (a, b) => {
                X.bindFramebuffer(a, $h[b]);
            },
            yd = (a, b) => {
                X.bindRenderbuffer(a, ai[b]);
            },
            zd = (a, b) => {
                X.bindTexture(a, bi[b]);
            },
            Ad = (a) => {
                X.bindVertexArray(di[a]);
                a = X.getParameter(34965);
                X.$f = a ? a.name | 0 : 0;
            },
            Bd = (a, b) => X.blendFunc(a, b),
            Cd = (a, b, c, d) => X.blendFuncSeparate(a, b, c, d),
            Dd = (a, b, c, d, e, f, h, k, l, n) =>
                X.blitFramebuffer(a, b, c, d, e, f, h, k, l, n),
            Ed = (a, b, c, d) => {
                c && b ? X.bufferData(a, x(), d, c, b) : X.bufferData(a, b, d);
            },
            Fd = (a, b, c, d) => {
                c && X.bufferSubData(a, b, x(), d, c);
            },
            Gd = (a) => X.checkFramebufferStatus(a),
            Hd = (a) => X.clear(a),
            Id = (a, b, c, d) => X.clearColor(a, b, c, d),
            Jd = (a) => X.clearDepth(a),
            Kd = (a, b, c, d) => {
                X.colorMask(!!a, !!b, !!c, !!d);
            },
            Ld = (a) => {
                X.compileShader(ci[a]);
            },
            Md = () => {
                var a = ii(Zh),
                    b = X.createProgram();
                b.name = a;
                b.qg = b.og = b.pg = 0;
                b.Hg = 1;
                Zh[a] = b;
                return a;
            },
            Nd = (a) => {
                var b = ii(ci);
                ci[b] = X.createShader(a);
                return b;
            },
            Od = (a) => X.cullFace(a),
            Pd = (a, b) => {
                for (var c = 0; c < a; c++) {
                    var d = C()[(b + 4 * c) >> 2],
                        e = Yh[d];
                    e &&
                        (X.deleteBuffer(e),
                        (e.name = 0),
                        (Yh[d] = null),
                        d == X.Zf && (X.Zf = 0),
                        d == X.$f && (X.$f = 0),
                        d == X.wg && (X.wg = 0),
                        d == X.mg && (X.mg = 0));
                }
            },
            Qd = (a, b) => {
                for (var c = 0; c < a; ++c) {
                    var d = C()[(b + 4 * c) >> 2],
                        e = $h[d];
                    e && (X.deleteFramebuffer(e), (e.name = 0), ($h[d] = null));
                }
            },
            Rd = (a) => {
                if (a) {
                    var b = Zh[a];
                    b
                        ? (X.deleteProgram(b), (b.name = 0), (Zh[a] = null))
                        : (Y ||= 1281);
                }
            },
            Sd = (a, b) => {
                for (var c = 0; c < a; c++) {
                    var d = C()[(b + 4 * c) >> 2],
                        e = ai[d];
                    e &&
                        (X.deleteRenderbuffer(e), (e.name = 0), (ai[d] = null));
                }
            },
            Td = (a) => {
                if (a) {
                    var b = ci[a];
                    b ? (X.deleteShader(b), (ci[a] = null)) : (Y ||= 1281);
                }
            },
            Ud = (a, b) => {
                for (var c = 0; c < a; c++) {
                    var d = C()[(b + 4 * c) >> 2],
                        e = bi[d];
                    e && (X.deleteTexture(e), (e.name = 0), (bi[d] = null));
                }
            },
            Vd = (a, b) => {
                for (var c = 0; c < a; c++) {
                    var d = C()[(b + 4 * c) >> 2];
                    X.deleteVertexArray(di[d]);
                    di[d] = null;
                }
            },
            Wd = (a) => X.depthFunc(a),
            Xd = (a) => {
                X.depthMask(!!a);
            },
            Yd = (a, b) => {
                X.detachShader(Zh[a], ci[b]);
            },
            Zd = (a) => X.disable(a),
            $d = (a, b, c) => {
                mi(b + c);
                X.drawArrays(a, b, c);
                li && X.bindBuffer(34962, Yh[X.Zf]);
            },
            Yi = [],
            ae = (a, b) => {
                for (var c = Yi[a], d = 0; d < a; d++)
                    c[d] = C()[(b + 4 * d) >> 2];
                X.drawBuffers(c);
            },
            be = (a, b, c, d) => {
                var e = 0;
                if (!X.$f) {
                    var f = 1 * fi[c - 5120] * b;
                    var h = ki(f);
                    X.bindBuffer(34963, h);
                    X.bufferSubData(34963, 0, x().subarray(d, d + f));
                    if (0 < b)
                        for (h = 0; h < Z.zg; ++h)
                            if (((f = Z.Xf[h]), f.lg && f.enabled)) {
                                switch (c) {
                                    case 5121:
                                        e = Uint8Array;
                                        break;
                                    case 5123:
                                        e = Uint16Array;
                                        break;
                                    case 5125:
                                        e = Uint32Array;
                                        break;
                                    default:
                                        Y ||= 1282;
                                        return;
                                }
                                e =
                                    new e(x().buffer, d, b).reduce((k, l) =>
                                        Math.max(k, l)
                                    ) + 1;
                                break;
                            }
                    d = 0;
                }
                mi(e);
                X.drawElements(a, b, c, d);
                li && X.bindBuffer(34962, Yh[X.Zf]);
                X.$f || X.bindBuffer(34963, null);
            },
            ce = (a) => X.enable(a),
            de = (a) => {
                Z.Xf[a].enabled = !0;
                X.enableVertexAttribArray(a);
            },
            ee = (a, b, c, d) => {
                X.framebufferRenderbuffer(a, b, c, ai[d]);
            },
            fe = (a, b, c, d, e) => {
                X.framebufferTexture2D(a, b, c, bi[d], e);
            },
            ge = (a) => X.frontFace(a),
            he = (a, b) => {
                ji(a, b, "createBuffer", Yh);
            },
            ie = (a, b) => {
                ji(a, b, "createFramebuffer", $h);
            },
            je = (a, b) => {
                ji(a, b, "createRenderbuffer", ai);
            },
            ke = (a, b) => {
                ji(a, b, "createTexture", bi);
            },
            le = (a, b) => {
                ji(a, b, "createVertexArray", di);
            },
            me = (a) => X.generateMipmap(a),
            ne = (a, b, c, d) => {
                a = X.getAttachedShaders(Zh[a]);
                var e = a.length;
                e > b && (e = b);
                C()[c >> 2] = e;
                for (b = 0; b < e; ++b)
                    (c = ci.indexOf(a[b])), (C()[(d + 4 * b) >> 2] = c);
            },
            oe = (a, b) => X.getAttribLocation(Zh[a], H(b)),
            Zi = () => {
                var a = Wh(X);
                return (a = a.concat(a.map((b) => "GL_" + b)));
            },
            $i = (a, b, c) => {
                if (b) {
                    var d = void 0;
                    switch (a) {
                        case 36346:
                            d = 1;
                            break;
                        case 36344:
                            0 != c && 1 != c && (Y ||= 1280);
                            return;
                        case 34814:
                        case 36345:
                            d = 0;
                            break;
                        case 34466:
                            var e = X.getParameter(34467);
                            d = e ? e.length : 0;
                            break;
                        case 33309:
                            if (2 > Z.version) {
                                Y ||= 1282;
                                return;
                            }
                            d = Zi().length;
                            break;
                        case 33307:
                        case 33308:
                            if (2 > Z.version) {
                                Y ||= 1280;
                                return;
                            }
                            d = 33307 == a ? 3 : 0;
                    }
                    if (void 0 === d)
                        switch (((e = X.getParameter(a)), typeof e)) {
                            case "number":
                                d = e;
                                break;
                            case "boolean":
                                d = e ? 1 : 0;
                                break;
                            case "string":
                                Y ||= 1280;
                                return;
                            case "object":
                                if (null === e)
                                    switch (a) {
                                        case 34964:
                                        case 35725:
                                        case 34965:
                                        case 36006:
                                        case 36007:
                                        case 32873:
                                        case 34229:
                                        case 36662:
                                        case 36663:
                                        case 35053:
                                        case 35055:
                                        case 36010:
                                        case 35097:
                                        case 35869:
                                        case 32874:
                                        case 36389:
                                        case 35983:
                                        case 35368:
                                        case 34068:
                                            d = 0;
                                            break;
                                        default:
                                            Y ||= 1280;
                                            return;
                                    }
                                else {
                                    if (
                                        e instanceof Float32Array ||
                                        e instanceof Uint32Array ||
                                        e instanceof Int32Array ||
                                        e instanceof Array
                                    ) {
                                        for (a = 0; a < e.length; ++a)
                                            switch (c) {
                                                case 0:
                                                    C()[(b + 4 * a) >> 2] =
                                                        e[a];
                                                    break;
                                                case 2:
                                                    Da()[(b + 4 * a) >> 2] =
                                                        e[a];
                                                    break;
                                                case 4:
                                                    w()[b + a] = e[a] ? 1 : 0;
                                            }
                                        return;
                                    }
                                    try {
                                        d = e.name | 0;
                                    } catch (f) {
                                        Y ||= 1280;
                                        p(
                                            `GL_INVALID_ENUM in glGet${c}v: Unknown object returned from WebGL getParameter(${a})! (error: ${f})`
                                        );
                                        return;
                                    }
                                }
                                break;
                            default:
                                Y ||= 1280;
                                p(
                                    `GL_INVALID_ENUM in glGet${c}v: Native code calling glGet${c}v(${a}) and it returns ${e} of type ${typeof e}!`
                                );
                                return;
                        }
                    switch (c) {
                        case 1:
                            Qi(b, d);
                            break;
                        case 0:
                            C()[b >> 2] = d;
                            break;
                        case 2:
                            Da()[b >> 2] = d;
                            break;
                        case 4:
                            w()[b] = d ? 1 : 0;
                    }
                } else Y ||= 1281;
            },
            pe = (a, b) => $i(a, b, 4),
            qe = () => {
                var a = X.getError() || Y;
                Y = 0;
                return a;
            },
            re = (a, b) => $i(a, b, 0),
            se = (a, b, c, d) => {
                a = X.getProgramInfoLog(Zh[a]);
                null === a && (a = "(unknown error)");
                b = 0 < b && d ? M(a, d, b) : 0;
                c && (C()[c >> 2] = b);
            },
            te = (a, b, c) => {
                if (c)
                    if (a >= Xh) Y ||= 1281;
                    else if (((a = Zh[a]), 35716 == b))
                        (a = X.getProgramInfoLog(a)),
                            null === a && (a = "(unknown error)"),
                            (C()[c >> 2] = a.length + 1);
                    else if (35719 == b) {
                        if (!a.qg) {
                            var d = X.getProgramParameter(a, 35718);
                            for (b = 0; b < d; ++b)
                                a.qg = Math.max(
                                    a.qg,
                                    X.getActiveUniform(a, b).name.length + 1
                                );
                        }
                        C()[c >> 2] = a.qg;
                    } else if (35722 == b) {
                        if (!a.og)
                            for (
                                d = X.getProgramParameter(a, 35721), b = 0;
                                b < d;
                                ++b
                            )
                                a.og = Math.max(
                                    a.og,
                                    X.getActiveAttrib(a, b).name.length + 1
                                );
                        C()[c >> 2] = a.og;
                    } else if (35381 == b) {
                        if (!a.pg)
                            for (
                                d = X.getProgramParameter(a, 35382), b = 0;
                                b < d;
                                ++b
                            )
                                a.pg = Math.max(
                                    a.pg,
                                    X.getActiveUniformBlockName(a, b).length + 1
                                );
                        C()[c >> 2] = a.pg;
                    } else C()[c >> 2] = X.getProgramParameter(a, b);
                else Y ||= 1281;
            },
            ue = (a, b, c, d) => {
                a = X.getShaderInfoLog(ci[a]);
                null === a && (a = "(unknown error)");
                b = 0 < b && d ? M(a, d, b) : 0;
                c && (C()[c >> 2] = b);
            },
            ve = (a, b, c) => {
                c
                    ? 35716 == b
                        ? ((a = X.getShaderInfoLog(ci[a])),
                          null === a && (a = "(unknown error)"),
                          (a = a ? a.length + 1 : 0),
                          (C()[c >> 2] = a))
                        : 35720 == b
                        ? ((a = (a = X.getShaderSource(ci[a]))
                              ? a.length + 1
                              : 0),
                          (C()[c >> 2] = a))
                        : (C()[c >> 2] = X.getShaderParameter(ci[a], b))
                    : (Y ||= 1281);
            },
            aj = (a) => "]" == a.slice(-1) && a.lastIndexOf("["),
            we = (a, b) => {
                b = H(b);
                if ((a = Zh[a])) {
                    var c = a,
                        d = c.dg,
                        e = c.bh,
                        f;
                    if (!d) {
                        c.dg = d = {};
                        c.ah = {};
                        var h = X.getProgramParameter(c, 35718);
                        for (f = 0; f < h; ++f) {
                            var k = X.getActiveUniform(c, f);
                            var l = k.name;
                            k = k.size;
                            var n = aj(l);
                            n = 0 < n ? l.slice(0, n) : l;
                            var r = c.Hg;
                            c.Hg += k;
                            e[n] = [k, r];
                            for (l = 0; l < k; ++l) (d[r] = l), (c.ah[r++] = n);
                        }
                    }
                    c = a.dg;
                    d = 0;
                    e = b;
                    f = aj(b);
                    0 < f &&
                        ((d = parseInt(b.slice(f + 1)) >>> 0),
                        (e = b.slice(0, f)));
                    if (
                        (e = a.bh[e]) &&
                        d < e[0] &&
                        ((d += e[1]),
                        (c[d] = c[d] || X.getUniformLocation(a, b)))
                    )
                        return d;
                } else Y ||= 1281;
                return -1;
            },
            xe = (a) => ((a = Yh[a]) ? X.isBuffer(a) : 0),
            ye = (a) => X.isEnabled(a),
            ze = (a) => ((a = $h[a]) ? X.isFramebuffer(a) : 0),
            Ae = (a) => ((a = Zh[a]) ? X.isProgram(a) : 0),
            Be = (a) => ((a = ai[a]) ? X.isRenderbuffer(a) : 0),
            Ce = (a) => ((a = ci[a]) ? X.isShader(a) : 0),
            De = (a) => ((a = bi[a]) ? X.isTexture(a) : 0),
            Ee = (a) => {
                a = Zh[a];
                X.linkProgram(a);
                a.dg = 0;
                a.bh = {};
            },
            Fe = (a, b) => {
                3317 == a ? (gi = b) : 3314 == a && (hi = b);
                X.pixelStorei(a, b);
            },
            Ge = (a, b) => X.polygonOffset(a, b),
            Ie = (a) => X.readBuffer(a),
            bj = (a) => {
                a -= 5120;
                return 0 == a
                    ? w()
                    : 1 == a
                    ? x()
                    : 2 == a
                    ? A()
                    : 4 == a
                    ? C()
                    : 6 == a
                    ? Da()
                    : 5 == a ||
                      28922 == a ||
                      28520 == a ||
                      30779 == a ||
                      30782 == a
                    ? F()
                    : Ca();
            },
            cj = (a, b, c, d, e) => {
                a = bj(a);
                b =
                    d *
                    (((hi || c) *
                        ({
                            5: 3,
                            6: 4,
                            8: 2,
                            29502: 3,
                            29504: 4,
                            26917: 2,
                            26918: 2,
                            29846: 3,
                            29847: 4,
                        }[b - 6402] || 1) *
                        a.BYTES_PER_ELEMENT +
                        gi -
                        1) &
                        -gi);
                return a.subarray(
                    e >>> (31 - Math.clz32(a.BYTES_PER_ELEMENT)),
                    (e + b) >>> (31 - Math.clz32(a.BYTES_PER_ELEMENT))
                );
            },
            Je = (a, b, c, d, e, f, h) => {
                if (X.wg) X.readPixels(a, b, c, d, e, f, h);
                else {
                    var k = bj(f);
                    h >>>= 31 - Math.clz32(k.BYTES_PER_ELEMENT);
                    X.readPixels(a, b, c, d, e, f, k, h);
                }
            },
            Ke = (a, b, c, d) => X.renderbufferStorage(a, b, c, d),
            Le = (a, b, c, d, e) =>
                X.renderbufferStorageMultisample(a, b, c, d, e),
            Me = (a, b, c, d) => X.scissor(a, b, c, d),
            Ne = (a, b, c, d) => {
                for (var e = "", f = 0; f < b; ++f) {
                    var h = d ? F()[(d + 4 * f) >> 2] : void 0;
                    e += H(F()[(c + 4 * f) >> 2], h);
                }
                X.shaderSource(ci[a], e);
            },
            Oe = (a, b, c, d, e, f, h, k, l) => {
                if (X.mg) X.texImage2D(a, b, c, d, e, f, h, k, l);
                else if (l) {
                    var n = bj(k);
                    l >>>= 31 - Math.clz32(n.BYTES_PER_ELEMENT);
                    X.texImage2D(a, b, c, d, e, f, h, k, n, l);
                } else
                    (n = l ? cj(k, h, d, e, l) : null),
                        X.texImage2D(a, b, c, d, e, f, h, k, n);
            },
            Pe = (a, b, c) => X.texParameteri(a, b, c),
            Qe = (a, b, c, d, e, f, h, k, l) => {
                if (X.mg) X.texSubImage2D(a, b, c, d, e, f, h, k, l);
                else if (l) {
                    var n = bj(k);
                    X.texSubImage2D(
                        a,
                        b,
                        c,
                        d,
                        e,
                        f,
                        h,
                        k,
                        n,
                        l >>> (31 - Math.clz32(n.BYTES_PER_ELEMENT))
                    );
                } else
                    (l = l ? cj(k, h, e, f, l) : null),
                        X.texSubImage2D(a, b, c, d, e, f, h, k, l);
            },
            dj = (a) => {
                var b = X.jh;
                if (b) {
                    var c = b.dg[a];
                    "number" == typeof c &&
                        (b.dg[a] = c =
                            X.getUniformLocation(
                                b,
                                b.ah[a] + (0 < c ? `[${c}]` : "")
                            ));
                    return c;
                }
                Y ||= 1282;
            },
            Re = (a, b) => {
                X.uniform1f(dj(a), b);
            },
            Se = (a, b) => {
                X.uniform1i(dj(a), b);
            },
            Te = (a, b, c) => {
                b && X.uniform2fv(dj(a), Da(), c >> 2, 2 * b);
            },
            Ue = (a, b, c) => {
                b && X.uniform3fv(dj(a), Da(), c >> 2, 3 * b);
            },
            Ve = (a, b, c, d, e) => {
                X.uniform4f(dj(a), b, c, d, e);
            },
            We = (a, b, c) => {
                b && X.uniform4fv(dj(a), Da(), c >> 2, 4 * b);
            },
            Xe = (a, b, c, d) => {
                b && X.uniformMatrix4fv(dj(a), !!c, Da(), d >> 2, 16 * b);
            },
            Ye = (a) => {
                a = Zh[a];
                X.useProgram(a);
                X.jh = a;
            },
            Ze = (a, b, c, d, e, f) => {
                var h = Z.Xf[a];
                X.Zf
                    ? ((h.lg = !1), X.vertexAttribPointer(a, b, c, !!d, e, f))
                    : ((h.size = b),
                      (h.type = c),
                      (h.Wg = d),
                      (h.Eg = e),
                      (h.Bg = f),
                      (h.lg = !0),
                      (h.dh = function (k, l, n, r, v, t) {
                          this.vertexAttribPointer(k, l, n, r, v, t);
                      }));
            },
            $e = (a, b, c, d) => X.viewport(a, b, c, d),
            ej = () => (a) =>
                a.set(crypto.getRandomValues(new Uint8Array(a.byteLength))),
            fj = (a) => {
                (fj = ej())(a);
            },
            cf = (a, b) => {
                fj(x().subarray(a, a + b));
                return 0;
            },
            gj = (a, b, c, d) => {
                var e = {
                    string: (n) => {
                        var r = 0;
                        if (null !== n && void 0 !== n && 0 !== n) {
                            r = lf(n) + 1;
                            var v = uf(r);
                            M(n, v, r);
                            r = v;
                        }
                        return r;
                    },
                    array: (n) => {
                        var r = uf(n.length);
                        w().set(n, r);
                        return r;
                    },
                };
                a = g["_" + a];
                var f = [],
                    h = 0;
                if (d)
                    for (var k = 0; k < d.length; k++) {
                        var l = e[c[k]];
                        l
                            ? (0 === h && (h = tf()), (f[k] = l(d[k])))
                            : (f[k] = d[k]);
                    }
                c = a(...f);
                return (c = (function (n) {
                    0 !== h && wf(h);
                    return "string" === b ? H(n) : "boolean" === b ? !!n : n;
                })(c));
            };
        m ||
            of.unshift(() => {
                Ta++;
                Va();
            });
        Zf = g.InternalError = class extends Error {
            constructor(a) {
                super(a);
                this.name = "InternalError";
            }
        };
        for (var hj = Array(256), ij = 0; 256 > ij; ++ij)
            hj[ij] = String.fromCharCode(ij);
        cg = hj;
        U = g.BindingError = class extends Error {
            constructor(a) {
                super(a);
                this.name = "BindingError";
            }
        };
        hg.push(0, 1, void 0, 1, null, 1, !0, 1, !1, 1);
        g.count_emval_handles = () => hg.length / 2 - 5 - gg.length;
        xg = g.UnboundTypeError = ((a, b) => {
            var c = og(b, function (d) {
                this.name = b;
                this.message = d;
                d = Error(d).stack;
                void 0 !== d &&
                    (this.stack =
                        this.toString() +
                        "\n" +
                        d.replace(/^Error(:[^\n]*)?\n/, ""));
            });
            c.prototype = Object.create(a.prototype);
            c.prototype.constructor = c;
            c.prototype.toString = function () {
                return void 0 === this.message
                    ? this.name
                    : `${this.name}: ${this.message}`;
            };
            return c;
        })(Error, "UnboundTypeError");
        g.requestAnimationFrame = eh;
        g.pauseMainLoop = ph;
        g.resumeMainLoop = function () {
            hh++;
            var a = Yg,
                b = Zg,
                c = $g;
            $g = null;
            oh(c, 0, !1, ih, !0);
            gh(a, b);
            bh();
        };
        var jj = () => {
            if (Z) {
                var a = Z.Vf;
                Z.Vf = Z.cg;
                Z.cg = a;
                a = Z.Sf;
                Z.Sf = Z.tg;
                Z.tg = a;
                for (a = 0; 21 >= a; ++a) Z.Sf[a] = 0;
            }
        };
        "undefined" != typeof rh && mh.push(jj);
        Rh = new Mi();
        m ||
            (Ta++,
            Ni(
                (a) => {
                    Oi = a;
                    Va();
                },
                () => {
                    Oi = !1;
                    Va();
                }
            ));
        var kj = () => {
            Z && !Jf.Mh && !Z.attributes.Qg && Z.Gf.commit && Z.Gf.commit();
        };
        "undefined" != typeof rh && mh.push(kj);
        for (var lj = 0; 32 > lj; ++lj) Yi.push(Array(lj));
        var Lg = [
                bf,
                zf,
                Sf,
                gb,
                hb,
                ib,
                jb,
                kb,
                lb,
                mb,
                nb,
                ob,
                pb,
                qb,
                rb,
                sb,
                ec,
                fc,
                gc,
                jc,
                kc,
                lc,
                pc,
                mc,
                nc,
                oc,
                qc,
                rc,
                sc,
                tc,
                uc,
                Gc,
                qi,
                Ic,
                Jc,
                Ei,
                Uc,
                Vc,
                Xc,
                Yc,
                Zc,
                $c,
                ad,
                bd,
                cd,
                kd,
                ld,
                nd,
                od,
                pd,
                qd,
                rd,
            ],
            cb,
            G;
        (async function () {
            function a(d, e) {
                G = d.exports;
                Gf.push(G.ef);
                Of = G.ff;
                la = e;
                Va();
                return G;
            }
            Ta++;
            var b = bb();
            if (m)
                return new Promise((d) => {
                    Ga = (e) => {
                        var f = new WebAssembly.Instance(e, bb());
                        d(a(f, e));
                    };
                });
            Ya ??= g.locateFile
                ? ha + "shenai_sdk.wasm"
                : new URL("shenai_sdk.wasm", import.meta.url).href;
            try {
                var c = await ab(b);
                return a(c.instance, c.module);
            } catch (d) {
                return ba(d), Promise.reject(d);
            }
        })();
        var pg = (a) => (pg = G.cd)(a),
            Oa = () => (Oa = G.dd)(),
            Fi = (a, b, c, d, e) => (Fi = G.ed)(a, b, c, d, e),
            Ci = (a, b, c, d) => (Ci = G.fd)(a, b, c, d);
        g.__ZN4shen10InitializeENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES6_NS_23initialization_settingsE =
            (a, b, c) =>
                (g.__ZN4shen10InitializeENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEES6_NS_23initialization_settingsE =
                    G.gd)(a, b, c);
        g.__ZN4shen13IsInitializedEv = () =>
            (g.__ZN4shen13IsInitializedEv = G.hd)();
        g.__ZN4shen12DeinitializeEv = () =>
            (g.__ZN4shen12DeinitializeEv = G.id)();
        g.__ZN4shen15FinalizeTracingEv = () =>
            (g.__ZN4shen15FinalizeTracingEv = G.jd)();
        g.__ZN4shen18GetSDKConfigStringEv = (a) =>
            (g.__ZN4shen18GetSDKConfigStringEv = G.kd)(a);
        g.__ZN4shen14ApplySDKConfigENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE =
            (a) =>
                (g.__ZN4shen14ApplySDKConfigENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE =
                    G.ld)(a);
        g.__ZN4shen16SetOperatingModeENS_13OperatingModeE = (a) =>
            (g.__ZN4shen16SetOperatingModeENS_13OperatingModeE = G.md)(a);
        g.__ZN4shen16GetOperatingModeEv = () =>
            (g.__ZN4shen16GetOperatingModeEv = G.nd)();
        g.__ZN4shen9SetScreenENS_6ScreenE = (a) =>
            (g.__ZN4shen9SetScreenENS_6ScreenE = G.od)(a);
        g.__ZN4shen9GetScreenEv = () => (g.__ZN4shen9GetScreenEv = G.pd)();
        g.__ZN4shen16SetPrecisionModeENS_13PrecisionModeE = (a) =>
            (g.__ZN4shen16SetPrecisionModeENS_13PrecisionModeE = G.qd)(a);
        g.__ZN4shen16GetPrecisionModeEv = () =>
            (g.__ZN4shen16GetPrecisionModeEv = G.rd)();
        g.__ZN4shen20SetMeasurementPresetENS_17MeasurementPresetE = (a) =>
            (g.__ZN4shen20SetMeasurementPresetENS_17MeasurementPresetE = G.sd)(
                a
            );
        g.__ZN4shen20GetMeasurementPresetEv = () =>
            (g.__ZN4shen20GetMeasurementPresetEv = G.td)();
        g.__ZN4shen22SetBpCalibrationOffsetEdd = (a, b) =>
            (g.__ZN4shen22SetBpCalibrationOffsetEdd = G.ud)(a, b);
        g.__ZN4shen26GetCustomMeasurementConfigEv = (a) =>
            (g.__ZN4shen26GetCustomMeasurementConfigEv = G.vd)(a);
        g.__ZN4shen26SetCustomMeasurementConfigENS_25custom_measurement_configE =
            (a) =>
                (g.__ZN4shen26SetCustomMeasurementConfigENS_25custom_measurement_configE =
                    G.wd)(a);
        g.__ZN4shen19SetCustomColorThemeENS_18custom_color_themeE = (a) =>
            (g.__ZN4shen19SetCustomColorThemeENS_18custom_color_themeE = G.xd)(
                a
            );
        g.__ZN4shen19GetCustomColorThemeEv = (a) =>
            (g.__ZN4shen19GetCustomColorThemeEv = G.yd)(a);
        g.__ZN4shen13SetCameraModeENS_10CameraModeE = (a) =>
            (g.__ZN4shen13SetCameraModeENS_10CameraModeE = G.zd)(a);
        g.__ZN4shen13GetCameraModeEv = () =>
            (g.__ZN4shen13GetCameraModeEv = G.Ad)();
        g.__ZN4shen22SelectCameraByDeviceIdENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEENS0_8optionalIbEE =
            (a, b) =>
                (g.__ZN4shen22SelectCameraByDeviceIdENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEENS0_8optionalIbEE =
                    G.Bd)(a, b);
        g.__ZN4shen20SetShowUserInterfaceEb = (a) =>
            (g.__ZN4shen20SetShowUserInterfaceEb = G.Cd)(a);
        g.__ZN4shen20GetShowUserInterfaceEv = () =>
            (g.__ZN4shen20GetShowUserInterfaceEv = G.Dd)();
        g.__ZN4shen29SetShowFacePositioningOverlayEb = (a) =>
            (g.__ZN4shen29SetShowFacePositioningOverlayEb = G.Ed)(a);
        g.__ZN4shen29GetShowFacePositioningOverlayEv = () =>
            (g.__ZN4shen29GetShowFacePositioningOverlayEv = G.Fd)();
        g.__ZN4shen21SetShowVisualWarningsEb = (a) =>
            (g.__ZN4shen21SetShowVisualWarningsEb = G.Gd)(a);
        g.__ZN4shen21GetShowVisualWarningsEv = () =>
            (g.__ZN4shen21GetShowVisualWarningsEv = G.Hd)();
        g.__ZN4shen19SetEnableCameraSwapEb = (a) =>
            (g.__ZN4shen19SetEnableCameraSwapEb = G.Id)(a);
        g.__ZN4shen19GetEnableCameraSwapEv = () =>
            (g.__ZN4shen19GetEnableCameraSwapEv = G.Jd)();
        g.__ZN4shen15SetShowFaceMaskEb = (a) =>
            (g.__ZN4shen15SetShowFaceMaskEb = G.Kd)(a);
        g.__ZN4shen15GetShowFaceMaskEv = () =>
            (g.__ZN4shen15GetShowFaceMaskEv = G.Ld)();
        g.__ZN4shen16SetShowBloodFlowEb = (a) =>
            (g.__ZN4shen16SetShowBloodFlowEb = G.Md)(a);
        g.__ZN4shen16GetShowBloodFlowEv = () =>
            (g.__ZN4shen16GetShowBloodFlowEv = G.Nd)();
        g.__ZN4shen26SetEnableStartAfterSuccessEb = (a) =>
            (g.__ZN4shen26SetEnableStartAfterSuccessEb = G.Od)(a);
        g.__ZN4shen26GetEnableStartAfterSuccessEv = () =>
            (g.__ZN4shen26GetEnableStartAfterSuccessEv = G.Pd)();
        g.__ZN4shen17SetHideShenaiLogoEb = (a) =>
            (g.__ZN4shen17SetHideShenaiLogoEb = G.Qd)(a);
        g.__ZN4shen17GetHideShenaiLogoEv = () =>
            (g.__ZN4shen17GetHideShenaiLogoEv = G.Rd)();
        g.__ZN4shen33SetShowOutOfRangeResultIndicatorsEb = (a) =>
            (g.__ZN4shen33SetShowOutOfRangeResultIndicatorsEb = G.Sd)(a);
        g.__ZN4shen33GetShowOutOfRangeResultIndicatorsEv = () =>
            (g.__ZN4shen33GetShowOutOfRangeResultIndicatorsEv = G.Td)();
        g.__ZN4shen24SetShowTrialMetricLabelsEb = (a) =>
            (g.__ZN4shen24SetShowTrialMetricLabelsEb = G.Ud)(a);
        g.__ZN4shen24GetShowTrialMetricLabelsEv = () =>
            (g.__ZN4shen24GetShowTrialMetricLabelsEv = G.Vd)();
        g.__ZN4shen17SetShowSignalTileEb = (a) =>
            (g.__ZN4shen17SetShowSignalTileEb = G.Wd)(a);
        g.__ZN4shen17GetShowSignalTileEv = () =>
            (g.__ZN4shen17GetShowSignalTileEv = G.Xd)();
        g.__ZN4shen29SetShowSignalQualityIndicatorEb = (a) =>
            (g.__ZN4shen29SetShowSignalQualityIndicatorEb = G.Yd)(a);
        g.__ZN4shen29GetShowSignalQualityIndicatorEv = () =>
            (g.__ZN4shen29GetShowSignalQualityIndicatorEv = G.Zd)();
        g.__ZN4shen12GetFaceStateEv = () =>
            (g.__ZN4shen12GetFaceStateEv = G._d)();
        g.__ZN4shen21GetNormalizedFaceBboxEv = (a) =>
            (g.__ZN4shen21GetNormalizedFaceBboxEv = G.$d)(a);
        g.__ZN4shen19GetMeasurementStateEv = () =>
            (g.__ZN4shen19GetMeasurementStateEv = G.ae)();
        g.__ZN4shen32GetMeasurementProgressPercentageEv = () =>
            (g.__ZN4shen32GetMeasurementProgressPercentageEv = G.be)();
        g.__ZN4shen15GetHeartRate10sEv = (a) =>
            (g.__ZN4shen15GetHeartRate10sEv = G.ce)(a);
        g.__ZN4shen14GetHeartRate4sEv = (a) =>
            (g.__ZN4shen14GetHeartRate4sEv = G.de)(a);
        g.__ZN4shen20GetRealtimeHeartRateEv = (a) =>
            (g.__ZN4shen20GetRealtimeHeartRateEv = G.ee)(a);
        g.__ZN4shen18GetRealtimeHrvSdnnEv = (a) =>
            (g.__ZN4shen18GetRealtimeHrvSdnnEv = G.fe)(a);
        g.__ZN4shen24GetRealtimeCardiacStressEv = (a) =>
            (g.__ZN4shen24GetRealtimeCardiacStressEv = G.ge)(a);
        g.__ZN4shen18GetRealtimeMetricsEf = (a, b) =>
            (g.__ZN4shen18GetRealtimeMetricsEf = G.he)(a, b);
        g.__ZN4shen21GetMeasurementResultsEv = (a) =>
            (g.__ZN4shen21GetMeasurementResultsEv = G.ie)(a);
        g.__ZN4shen28GetMeasurementResultsHistoryEv = (a) =>
            (g.__ZN4shen28GetMeasurementResultsHistoryEv = G.je)(a);
        g.__ZN4shen21GetHealthRisksFactorsEv = (a) =>
            (g.__ZN4shen21GetHealthRisksFactorsEv = G.ke)(a);
        g.__ZN4shen14GetHealthRisksEv = (a) =>
            (g.__ZN4shen14GetHealthRisksEv = G.le)(a);
        g.__ZN4shen18ComputeHealthRisksERKN2mx12health_risks12RisksFactorsE = (
            a,
            b
        ) =>
            (g.__ZN4shen18ComputeHealthRisksERKN2mx12health_risks12RisksFactorsE =
                G.me)(a, b);
        g.__ZN4shen15GetMaximalRisksERKN2mx12health_risks12RisksFactorsE = (
            a,
            b
        ) =>
            (g.__ZN4shen15GetMaximalRisksERKN2mx12health_risks12RisksFactorsE =
                G.ne)(a, b);
        g.__ZN4shen15GetMinimalRisksERKN2mx12health_risks12RisksFactorsE = (
            a,
            b
        ) =>
            (g.__ZN4shen15GetMinimalRisksERKN2mx12health_risks12RisksFactorsE =
                G.oe)(a, b);
        g.__ZN4shen17GetReferenceRisksERKN2mx12health_risks12RisksFactorsE = (
            a,
            b
        ) =>
            (g.__ZN4shen17GetReferenceRisksERKN2mx12health_risks12RisksFactorsE =
                G.pe)(a, b);
        g.__ZN4shen21GetRealtimeHeartbeatsENSt3__28optionalIfEE = (a, b) =>
            (g.__ZN4shen21GetRealtimeHeartbeatsENSt3__28optionalIfEE = G.qe)(
                a,
                b
            );
        g.__ZN4shen11GetFacePoseEv = (a) =>
            (g.__ZN4shen11GetFacePoseEv = G.re)(a);
        g.__ZN4shen19SetRecordingEnabledEb = (a) =>
            (g.__ZN4shen19SetRecordingEnabledEb = G.se)(a);
        g.__ZN4shen19GetRecordingEnabledEv = () =>
            (g.__ZN4shen19GetRecordingEnabledEv = G.te)();
        g.__ZN4shen24GetTotalBadSignalSecondsEv = () =>
            (g.__ZN4shen24GetTotalBadSignalSecondsEv = G.ue)();
        g.__ZN4shen29GetCurrentSignalQualityMetricEv = () =>
            (g.__ZN4shen29GetCurrentSignalQualityMetricEv = G.ve)();
        g.__ZN4shen22GetSignalQualityMapPngEv = (a) =>
            (g.__ZN4shen22GetSignalQualityMapPngEv = G.we)(a);
        g.__ZN4shen17GetFaceTexturePngEv = (a) =>
            (g.__ZN4shen17GetFaceTexturePngEv = G.xe)(a);
        g.__ZN4shen25GetMetaPredictionImagePngEv = (a) =>
            (g.__ZN4shen25GetMetaPredictionImagePngEv = G.ye)(a);
        g.__ZN4shen16GetFullPPGSignalEv = (a) =>
            (g.__ZN4shen16GetFullPPGSignalEv = G.ze)(a);
        g.__ZN4shen10GetTraceIDEv = (a) =>
            (g.__ZN4shen10GetTraceIDEv = G.Ae)(a);
        g.__ZN4shen16GetMeasurementIDEv = (a) =>
            (g.__ZN4shen16GetMeasurementIDEv = G.Be)(a);
        g.__ZN4shen11SetLanguageENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE =
            (a) =>
                (g.__ZN4shen11SetLanguageENSt3__212basic_stringIcNS0_11char_traitsIcEENS0_9allocatorIcEEEE =
                    G.Ce)(a);
        g.__ZN4shen19GetSelectedLanguageEv = (a) =>
            (g.__ZN4shen19GetSelectedLanguageEv = G.De)(a);
        g.__ZN4shen14GetPricingPlanEv = (a) =>
            (g.__ZN4shen14GetPricingPlanEv = G.Ee)(a);
        g.__ZN4shen28GetEnableFullFrameProcessingEv = () =>
            (g.__ZN4shen28GetEnableFullFrameProcessingEv = G.Fe)();
        g.__ZN4shen28SetEnableFullFrameProcessingEb = (a) =>
            (g.__ZN4shen28SetEnableFullFrameProcessingEb = G.Ge)(a);
        g.__ZN4shen22GetEnableSummaryScreenEv = () =>
            (g.__ZN4shen22GetEnableSummaryScreenEv = G.He)();
        g.__ZN4shen22SetEnableSummaryScreenEb = (a) =>
            (g.__ZN4shen22SetEnableSummaryScreenEb = G.Ie)(a);
        g.__ZN4shen20GetEnableHealthRisksEv = () =>
            (g.__ZN4shen20GetEnableHealthRisksEv = G.Je)();
        g.__ZN4shen20SetEnableHealthRisksEb = (a) =>
            (g.__ZN4shen20SetEnableHealthRisksEb = G.Ke)(a);
        g.__ZN4shen17GetOnboardingModeEv = () =>
            (g.__ZN4shen17GetOnboardingModeEv = G.Le)();
        g.__ZN4shen17SetOnboardingModeENS_14OnboardingModeE = (a) =>
            (g.__ZN4shen17SetOnboardingModeENS_14OnboardingModeE = G.Me)(a);
        g.__ZN4shen19GetCalibrationStateEv = () =>
            (g.__ZN4shen19GetCalibrationStateEv = G.Ne)();
        g.__ZN4shen10GetVersionEv = (a) =>
            (g.__ZN4shen10GetVersionEv = G.Oe)(a);
        g.__ZN4shen18GetCalibrationDataEv = (a) =>
            (g.__ZN4shen18GetCalibrationDataEv = G.Pe)(a);
        g.__ZN4shen23GetSbpCalibrationOffsetEv = () =>
            (g.__ZN4shen23GetSbpCalibrationOffsetEv = G.Qe)();
        g.__ZN4shen23GetDbpCalibrationOffsetEv = () =>
            (g.__ZN4shen23GetDbpCalibrationOffsetEv = G.Re)();
        var Ia = () => (Ia = G.Se)();
        g._handlePagehide = () => (g._handlePagehide = G.Te)();
        var mj = (g._main = (a, b) => (mj = g._main = G.Ue)(a, b)),
            K = (a) => (K = G.Ve)(a);
        g._onVideoDevicesEnumerated = () =>
            (g._onVideoDevicesEnumerated = G.We)();
        g._onVideoDevicesEnumerationError = () =>
            (g._onVideoDevicesEnumerationError = G.Xe)();
        g._onCameraInitialized = () => (g._onCameraInitialized = G.Ye)();
        g._onCameraInitializationError = () =>
            (g._onCameraInitializationError = G.Ze)();
        g._ingestCameraFrame = (a, b, c, d, e, f, h, k, l) =>
            (g._ingestCameraFrame = G._e)(a, b, c, d, e, f, h, k, l);
        var I = (a) => (I = G.$e)(a);
        g._onBleDeviceReady = () => (g._onBleDeviceReady = G.af)();
        g._onBleControlNotification = (a, b) =>
            (g._onBleControlNotification = G.bf)(a, b);
        g._onBleDataNotification = (a, b) =>
            (g._onBleDataNotification = G.cf)(a, b);
        var Cf = (a) => (Cf = G.df)(a),
            Af = () => (Af = G.gf)(),
            Ka = (a, b, c, d, e, f) => (Ka = G.hf)(a, b, c, d, e, f),
            Ra = () => (Ra = G.jf)(),
            vf = (a, b, c, d, e) => (vf = G.kf)(a, b, c, d, e),
            Hf = (a) => (Hf = G.lf)(a),
            Pf = (a) => (Pf = G.mf)(a),
            Xg = (a, b) => (Xg = G.nf)(a, b),
            Jg = () => (Jg = G.of)(),
            Xa = () => (Xa = G.pf)(),
            Mf = (a, b) => (Mf = G.qf)(a, b),
            wf = (a) => (wf = G.rf)(a),
            uf = (a) => (uf = G.sf)(a),
            tf = () => (tf = G.tf)();
        g.ccall = gj;
        g.cwrap = (a, b, c, d) => {
            var e = !c || c.every((f) => "number" === f || "boolean" === f);
            return "string" !== b && e && !d
                ? g["_" + a]
                : (...f) => gj(a, b, c, f, d);
        };
        function nj() {
            if (0 < Ta) Ua = nj;
            else if (m) aa(g), Sa();
            else {
                for (; 0 < of.length; ) of.shift()(g);
                if (0 < Ta) Ua = nj;
                else if (((g.calledRun = !0), !ma)) {
                    Sa();
                    aa(g);
                    var a = mj;
                    try {
                        var b = a(0, 0);
                        md(b, !0);
                    } catch (c) {
                        yf(c);
                    }
                }
            }
        }
        nj();
        moduleRtn = ca;

        return moduleRtn;
    };
})();
export default Module;
var isPthread = globalThis.self?.name?.startsWith("em-pthread");
// When running as a pthread, construct a new instance on startup
isPthread && Module();
