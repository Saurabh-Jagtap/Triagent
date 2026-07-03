"use client";

import { useEffect } from "react";

export default function LandingAnimations() {
    let animationFrame = 0;
    const intervals: number[] = [];
    const timeouts: number[] = [];
    let observer: IntersectionObserver | null = null;

    useEffect(() => {
        // paste original script here
        /* ─ mesh canvas ─ */
        const canvas = document.getElementById("meshCanvas") as HTMLCanvasElement | null;
        const ctx = canvas?.getContext("2d");

        if (!canvas || !ctx) return;
        let mouse = { x: 0.5, y: 0.5 };
        type Point = {
            x: number;
            y: number;
            vx: number;
            vy: number;
        };

        let pts: Point[] = [];
        let W = 0, H = 0;

        function initMesh() {
            if (!canvas || !ctx) return;
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
            pts = [];
            for (let r = 0; r <= 10; r++) {
                for (let c = 0; c <= 18; c++) {
                    pts.push({
                        x: c / 18 + (Math.random() - 0.5) * 0.02,
                        y: r / 10 + (Math.random() - 0.5) * 0.02,
                        vx: (Math.random() - 0.5) * 0.00018,
                        vy: (Math.random() - 0.5) * 0.00018
                    });
                }
            }
        }

        let t = 0;
        function drawMesh() {
            if (!ctx) return;
            t += 0.004;
            ctx.clearRect(0, 0, W, H);
            let mx = mouse.x, my = mouse.y;
            pts.forEach(function (p) {
                let dx = p.x - mx, dy = p.y - my;
                let dist = Math.sqrt(dx * dx + dy * dy);
                let pull = Math.max(0, 0.16 - dist) * 0.005;
                p.x += p.vx + Math.sin(t + p.y * 8) * 0.00012 + dx * pull;
                p.y += p.vy + Math.cos(t + p.x * 8) * 0.00012 + dy * pull;
                p.x = ((p.x % 1) + 1) % 1;
                p.y = ((p.y % 1) + 1) % 1;
            });
            ctx.strokeStyle = 'rgba(74,127,160,0.16)';
            ctx.lineWidth = 0.6;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    let dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    let d = Math.sqrt(dx * dx + dy * dy);
                    if (d < 0.13) {
                        ctx.globalAlpha = (1 - d / 0.13) * 0.5;
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x * W, pts[i].y * H);
                        ctx.lineTo(pts[j].x * W, pts[j].y * H);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 0.6;
            pts.forEach(function (p) {
                ctx.beginPath();
                ctx.arc(p.x * W, p.y * H, 1.1, 0, Math.PI * 2);
                ctx.fillStyle = '#4A7FA0';
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            animationFrame = requestAnimationFrame(drawMesh);
        }

        initMesh();
        drawMesh();
        window.addEventListener('resize', function () {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        });
        window.addEventListener('mousemove', function (e) {
            let rect = canvas.getBoundingClientRect();
            mouse = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
        });

        /* ─ marquee ─ */
        let marqueeItems = ["Gmail integration", "Google Calendar integration", "Secured by OAuth", "AI-drafted replies", "Conversational scheduling", "Meeting summaries", "Inbox triage", "Daily briefing", "Revoke access anytime"];
        const track = document.getElementById('marqueeTrack');

        if (track) {
            let html = '';
            for (let rep = 0; rep < 2; rep++) {
                marqueeItems.forEach(function (t) {
                    html += '<span class="marquee-item"><span class="marquee-dot"></span>' + t + '</span>';
                });
            }
            track.innerHTML = html;
        }

        /* ─ chat demo ─ */
        let convos = [
            { user: "What should I focus on today?", ai: "3 emails need replies. Your 3pm has no agenda. Want me to prioritize them?", action: "Show priorities" },
            { user: "Schedule a call with Priya at 3pm tomorrow.", ai: "Done. Invite drafted for Priya — 3:00–3:30 PM tomorrow. Send it?", action: "Send invite" },
            { user: "Draft a reply to Sarah's roadmap email.", ai: 'Draft ready: "I\'ll review and send feedback before noon. Thanks for flagging."', action: "Send reply" }
        ];

        function runDemo(bodyId: string, stepRef: { idx: number }) {
            const body = document.getElementById(bodyId);
            if (!body) return;
            let idx = stepRef.idx % convos.length;
            let c = convos[idx];
            body.innerHTML = '';

            let userEl = document.createElement('div');
            userEl.className = 'msg-user';
            body.appendChild(userEl);

            let i = 0;
            let tid = setInterval(function () {
                i++;
                userEl.innerHTML = c.user.slice(0, i) + (i < c.user.length ? '<span class="caret"></span>' : '');
                if (i >= c.user.length) {
                    clearInterval(tid);
                    setTimeout(function () {
                        let th = document.createElement('div');
                        th.className = 'thinking';
                        th.innerHTML = '<span style="animation:tgDot 1.2s ease-in-out infinite;opacity:0">●</span><span style="animation:tgDot 1.2s 0.3s ease-in-out infinite;opacity:0">●</span><span style="animation:tgDot 1.2s 0.6s ease-in-out infinite;opacity:0">●</span>';
                        body.appendChild(th);
                        setTimeout(function () {
                            body.removeChild(th);
                            let card = document.createElement('div');
                            card.className = 'ai-card';
                            card.innerHTML = '<div class="ai-label"><span style="color:#4A7FA0">✦</span> Triagent</div><div class="ai-text">' + c.ai + '</div><button class="ai-action">' + c.action + '</button>';
                            body.appendChild(card);
                            setTimeout(function () {
                                stepRef.idx++;
                                runDemo(bodyId, stepRef);
                            }, 4200);
                        }, 1000);
                    }, 400);
                }
            }, 26);
        }

        let step1 = { idx: 0 }, step2 = { idx: 1 };
        runDemo('demoBody1', step1);
        setTimeout(function () { runDemo('demoBody2', step2); }, 1200);

        /* ─ stats counter ─ */
        function countTo(id: string, target: number, suffix: string, speed = 35) {
            let el = document.getElementById(id);
            if (!el) return;
            let cur = 0, step = target / 40;
            let iv = setInterval(function () {
                cur = Math.min(cur + step, target);
                el.textContent = (Number.isInteger(target) ? Math.round(cur) : cur.toFixed(1)) + suffix;
                if (cur >= target) clearInterval(iv);
            }, speed);
        }

        let statsTriggered = false;
        const statEl = document.querySelector(".stats-strip");
        let obs: IntersectionObserver | null = null;

        if (statEl) {
            obs = new IntersectionObserver(
                (entries) => {
                    if (entries[0]?.isIntersecting && !statsTriggered) {
                        statsTriggered = true;
                        countTo("statA", 2.4, "h", 40);
                        countTo("statB", 94, "%", 35);
                        countTo("statC", 30, "s", 30);
                        obs?.disconnect();
                    }
                },
                { threshold: 0.5 }
            );

            obs.observe(statEl);
        }

        /* ─ feature cards ─ */
        let features = [
            { icon: '☀️', title: 'Daily Brief', desc: 'One morning summary of what matters — emails, meetings, what to act on.', ask: 'What\'s on my plate today?', ans: '3 emails, no meetings. Sarah\'s is most urgent.' },
            { icon: '📊', title: 'Priority Emails', desc: 'Sorted into high, medium, low — with a reason for each ranking.', ask: 'Sort my inbox by urgency.', ans: '2 high, 3 medium, rest can wait.' },
            { icon: '📅', title: 'Meeting Scheduler', desc: 'Book calls and draft invites in a single natural-language request.', ask: 'Book 30 min with Priya tomorrow.', ans: 'Booked 3pm. Invite drafted.' },
            { icon: '✏️', title: 'Draft Replies', desc: 'Context-aware reply drafts in your tone, ready to review in seconds.', ask: 'Reply saying I\'ll review by noon.', ans: 'Draft ready to send.' },
            { icon: '🔗', title: 'Gmail Connected', desc: 'Secure OAuth — read access only. Zero password storage. Revoke anytime.', ask: 'What emails need replies?', ans: '4 unread. 2 need action.' },
            { icon: '📆', title: 'Calendar Synced', desc: 'Your schedule pulled alongside your inbox, no app-switching needed.', ask: 'Am I free Thursday afternoon?', ans: 'Yes — 2pm to 5pm is clear.' }
        ];

        let featGrid = document.getElementById('featGrid');
        if (featGrid) {
            features.forEach(function (f, i) {
                let wrap = document.createElement('div');
                wrap.className = 'feat-wrap';
                wrap.innerHTML =
                    '<div class="feat-inner-wrap">' +
                    '<div class="feat-front" style="animation-delay:' + (i * 0.08) + 's">' +
                    '<div class="feat-icon">' + f.icon + '</div>' +
                    '<div class="feat-title">' + f.title + '</div>' +
                    '<div class="feat-desc">' + f.desc + '</div>' +
                    '</div>' +
                    '<div class="feat-back" style="animation-delay:' + (i * 0.08) + 's">' +
                    '<div class="feat-back-label">✦ Try asking</div>' +
                    '<div class="feat-ask">"' + f.ask + '"</div>' +
                    '<div class="feat-ans">→ ' + f.ans + '</div>' +
                    '</div>' +
                    '</div>';
                featGrid.appendChild(wrap);
            });
        }

        return () => {
            cancelAnimationFrame(animationFrame);
            intervals.forEach(clearInterval);
            timeouts.forEach(clearTimeout);
            obs?.disconnect();
        };
    }, []);

    return null;
}
