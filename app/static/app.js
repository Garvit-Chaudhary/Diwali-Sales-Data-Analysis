(function () {
  "use strict";

  var inr = function (n) {
    return "₹" + Math.round(n).toLocaleString("en-IN");
  };

  var TOP_OCC = ["IT Sector", "Healthcare", "Aviation"];
  var AGE_ORDER = ["0-17", "18-25", "26-35", "36-45", "46-50", "51-55", "55+"];

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function fillSelect(sel, values, labels) {
    sel.innerHTML = "";
    values.forEach(function (v, i) {
      var o = document.createElement("option");
      o.value = String(v);
      o.textContent = labels ? labels[i] : String(v);
      sel.appendChild(o);
    });
  }

  function barChart(mount, entries, opts) {
    opts = opts || {};
    mount.innerHTML = "";
    var max = Math.max.apply(null, entries.map(function (e) { return e[1]; })) || 1;
    entries.forEach(function (e) {
      var row = el("div", "bar-row");
      row.appendChild(el("span", "lbl", e[0]));
      var track = el("div", "track");
      var fill = el("div", "fill" + (e[2] ? " " + e[2] : ""));
      var pct = Math.max(0.02, (e[1] / max));
      fill.style.setProperty("--w", pct.toFixed(4));
      track.appendChild(fill);
      row.appendChild(track);
      row.appendChild(el("span", "val", opts.fmt ? opts.fmt(e[1]) : inr(e[1])));
      mount.appendChild(row);
    });
  }

  function renderHeat(mount, heat) {
    mount.innerHTML = "";
    mount.appendChild(el("div", "h", ""));
    AGE_ORDER.forEach(function (a) {
      mount.appendChild(el("div", "h", a));
    });
    ["F", "M"].forEach(function (g) {
      mount.appendChild(el("div", "h", g));
      AGE_ORDER.forEach(function (a) {
        var v = heat[g] ? heat[g][a] : null;
        var cell = el("div", "cell", v == null ? "·" : String(Math.round(v / 100) / 10) + "k");
        if (v != null) {
          var t = Math.min(1, Math.max(0, (v - 4000) / 10000));
          cell.style.background = "rgba(212,53,28," + (0.08 + t * 0.72).toFixed(2) + ")";
          if (t > 0.55) cell.style.color = "#fff8f0";
        }
        mount.appendChild(cell);
      });
    });
  }

  function topEntries(obj, n, highlight) {
    var keys = Object.keys(obj).sort(function (a, b) { return obj[b] - obj[a]; });
    if (n) keys = keys.slice(0, n);
    return keys.map(function (k) {
      return [k.replace(/\u00a0/g, " "), obj[k], highlight && highlight(k) ? "" : "muted"];
    });
  }

  function setMetrics(s) {
    document.getElementById("m-rows").textContent = s.rows.toLocaleString("en-IN");
    document.getElementById("m-mean").textContent = inr(s.mean);
    document.getElementById("m-med").textContent = inr(s.median);
  }

  var state = { stats: null, options: null };

  async function boot() {
    try {
      var [stats, opts] = await Promise.all([
        fetch("/api/stats").then(function (r) { return r.json(); }),
        fetch("/api/options").then(function (r) { return r.json(); }),
      ]);
      state.stats = stats;
      state.options = opts;

      setMetrics(stats);

      var genderEntries = Object.keys(stats.gender_sales).map(function (g) {
        var label = g === "F" ? "Female" : g === "M" ? "Male" : g;
        return [label, stats.gender_sales[g], g === "F" ? "" : "muted"];
      });
      barChart(document.getElementById("chart-gender"), genderEntries);

      barChart(
        document.getElementById("chart-age"),
        AGE_ORDER.map(function (a) {
          return [a, stats.age_sales[a] || 0, a === "26-35" ? "" : "muted"];
        })
      );

      barChart(
        document.getElementById("chart-state"),
        topEntries(stats.state_sales, 6, function (k) {
          return k.indexOf("Uttar") === 0 || k.indexOf("Maharashtra") === 0 || k.indexOf("Karnataka") === 0;
        }).map(function (e) {
          e[2] = e[2] === "muted" ? "muted" : "";
          return e;
        })
      );

      barChart(
        document.getElementById("chart-occ"),
        topEntries(stats.occ_sales, 8).map(function (e) {
          var gold = e[0] === "IT Sector" || e[0] === "Healthcare" || e[0] === "Aviation";
          return [e[0], e[1], gold ? "gold" : "muted"];
        })
      );

      barChart(
        document.getElementById("chart-cat"),
        topEntries(stats.cat_sales, 6, function (k) {
          return k.indexOf("Food") === 0 || k.indexOf("Clothing") === 0 || k.indexOf("Electronics") === 0;
        }).map(function (e) {
          var gold = e[0].indexOf("Food") === 0 || e[0].indexOf("Clothing") === 0 || e[0].indexOf("Electronics") === 0;
          return [e[0], e[1], gold ? "gold" : "muted"];
        })
      );

      renderHeat(document.getElementById("chart-heat"), stats.heatmap_gender_age);

      fillSelect(document.getElementById("f-gender"), opts.Gender, opts.Gender.map(function (g) {
        return g === "F" ? "F · female" : g === "M" ? "M · male" : g;
      }));
      fillSelect(document.getElementById("f-age"), opts["Age Group"], opts["Age Group"]);
      fillSelect(document.getElementById("f-state"), opts.State, opts.State.map(function (s) {
        return s.replace(/\u00a0/g, " ");
      }));
      fillSelect(document.getElementById("f-occ"), opts.Occupation, opts.Occupation);
      fillSelect(document.getElementById("f-cat"), opts.Product_Category, opts.Product_Category);

      document.getElementById("f-age").value = "26-35";
      document.getElementById("f-mar").value = "1";
      document.getElementById("f-gender").value = "F";
    } catch (err) {
      showFormError("Could not load dataset stats. Is the FastAPI server running?");
    }
  }

  function showFormError(msg) {
    var n = document.getElementById("form-error");
    n.textContent = msg;
    n.classList.add("show");
  }

  function clearFormError() {
    var n = document.getElementById("form-error");
    n.textContent = "";
    n.classList.remove("show");
  }

  var lastPredicted = null;

  function fmtDelta(v) {
    return (v < 0 ? "−" : "+") + inr(Math.abs(v));
  }

  function renderResult(predicted, peers) {
    var amt = document.getElementById("amt");
    var from = lastPredicted == null ? predicted : lastPredicted;
    amt.innerHTML = "";
    var txt = document.createTextNode(inr(from));
    amt.appendChild(txt);
    amt.appendChild(el("small", null, "Predicted spend standing"));

    var delta = document.createElement("span");
    delta.className = "delta";
    var b = document.createElement("b");
    if (lastPredicted == null) {
      b.textContent = fmtDelta(predicted - peers.median);
      delta.appendChild(b);
      delta.appendChild(document.createTextNode(" vs dataset median"));
    } else if (predicted - lastPredicted === 0) {
      b.textContent = "No change";
      delta.appendChild(b);
      delta.appendChild(document.createTextNode(" vs your last fold"));
    } else {
      b.textContent = fmtDelta(predicted - lastPredicted);
      delta.appendChild(b);
      delta.appendChild(document.createTextNode(" vs your last fold"));
    }
    amt.appendChild(delta);

    amt.classList.remove("stand");
    void amt.offsetWidth;
    amt.classList.add("stand");

    var dur = from === predicted ? 0 : 480;
    if (!dur) {
      txt.nodeValue = inr(predicted);
    } else {
      var start = null;
      var step = function (ts) {
        if (start == null) start = ts;
        var p = Math.min(1, (ts - start) / dur);
        var e = 1 - Math.pow(1 - p, 3);
        txt.nodeValue = inr(from + (predicted - from) * e);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    lastPredicted = predicted;

    var bars = [
      { key: "median", label: "med", hi: false },
      { key: "you", label: "you", hi: true },
      { key: "mean", label: "mean", hi: false },
      { key: "age_peer", label: "peer", hi: false },
    ];
    var values = {
      median: peers.median,
      you: predicted,
      mean: peers.mean,
      age_peer: peers.age_peer,
    };
    var max = Math.max(values.median, values.you, values.mean, values.age_peer, 1);

    var mount = document.getElementById("peer-bars");
    mount.innerHTML = "";
    bars.forEach(function (b) {
      var d = el("div", "pb" + (b.hi ? " hi" : ""));
      var frac = Math.max(0.12, values[b.key] / max);
      var fillbar = el("div", "fillbar");
      fillbar.style.setProperty("--h", frac.toFixed(4));
      d.appendChild(fillbar);
      d.appendChild(el("span", null, b.hi ? (values[b.key] / 1000).toFixed(1) + "k" : ""));
      mount.appendChild(d);
    });

    document.getElementById("result").classList.add("show");
  }

  document.getElementById("pform").addEventListener("submit", async function (e) {
    e.preventDefault();
    clearFormError();
    var btn = document.getElementById("btn-predict");
    btn.disabled = true;
    btn.textContent = "Folding…";

    var payload = {
      Gender: document.getElementById("f-gender").value,
      "Age Group": document.getElementById("f-age").value,
      State: document.getElementById("f-state").value,
      Occupation: document.getElementById("f-occ").value,
      Product_Category: document.getElementById("f-cat").value,
      Marital_Status: parseInt(document.getElementById("f-mar").value, 10),
      Orders: parseInt(document.getElementById("f-orders").value, 10),
    };

    try {
      var res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        var body = await res.json().catch(function () { return {}; });
        throw new Error(body.detail ? JSON.stringify(body.detail) : "Prediction failed (" + res.status + ")");
      }
      var data = await res.json();
      renderResult(data.predicted_amount, data.peers);
    } catch (err) {
      showFormError(err.message || "Prediction failed. Check the server logs.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Final fold →";
    }
  });

  var navLinks = document.querySelectorAll('nav a[href^="#"]');
  var sections = ["finding", "booth", "proof"].map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);

  if ("IntersectionObserver" in window && navLinks.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          navLinks.forEach(function (a) {
            var match = a.getAttribute("href") === "#" + en.target.id;
            if (match) a.setAttribute("aria-current", "page");
            else a.removeAttribute("aria-current");
          });
          document.querySelectorAll(".margin .step").forEach(function (s) {
            var match = s.getAttribute("href") === "#" + en.target.id;
            s.classList.toggle("active", match);
            if (match) s.setAttribute("aria-current", "step");
            else s.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach(function (s) { io.observe(s); });
    ["reels", "model"].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) io.observe(n);
    });
  }

  boot().then(function () {
    if (/[?&]capture=predict/.test(window.location.search)) {
      var form = document.getElementById("pform");
      form.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
      setTimeout(function () {
        var booth = document.getElementById("booth");
        if (booth) booth.scrollIntoView({ block: "start" });
      }, 700);
    }
  });
})();
