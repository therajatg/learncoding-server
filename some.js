const fs = require("fs");

const url =
  "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library";
const videoCSV = [["_id", "title", "thumbnail", "category_id"]];
const categories = [
  {
    _id: 1,
    categoryname: "javascript concepts",
  },
  {
    _id: 2,
    categoryname: "promise in javascript",
  },
  {
    _id: 3,
    categoryname: "react hooks",
  },
  {
    _id: 4,
    categoryname: "react router",
  },
  {
    _id: 5,
    categoryname: "css",
  },
  {
    _id: 6,
    categoryname: "html",
  },
];

const videos = [
  {
    _id: "lluVvNFLx5k",
    title: "promise in JavaScript (basics) - part 1",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_jo1tb3",
    category: "promise in javaScript",
  },
  {
    _id: "AvHIlRFENJs",
    title: "async and defer in script tag in HTML",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/async_and_defer_a6x7d4",
    category: "javascript concepts",
  },

  {
    _id: "Gi7VHfOFxF8",
    title: "React Router (part 1): Everything you need to know",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/react_router_part_1_m0z9lr.png",
    category: "react router",
  },

  {
    _id: "pkI4WoFCVms",
    title:
      "resolve and reject method of Promise in JavaScript - part 2 (Promise)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_1_tewj0p",
    category: "promise in javaScript",
  },
  {
    _id: "IXrB_6PFfxw",
    title: "Event Bubbling and Capturing in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/event_bubbling_and_capturing_2_j0smfp.png",
    category: "javascript concepts",
  },
  {
    _id: "F0mcaclFMb0",
    title: "React Router (part 2): How to get 404 page using React Router",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/react_router_part_2_a8hjyo",
    category: "react router",
  },
  {
    _id: "rP2DFSYwJx4",
    title: "Event Delegation in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/event_delegation_skgv6j.png",
    category: "javascript concepts",
  },
  {
    _id: "lS5HRMW9vCI",
    title: "Promise.all() in JavaScript - part 3 (Promise)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_3_j6ljnz",
    category: "promise in javaScript",
  },
  {
    _id: "9-0VN39ZfJs",
    title:
      "Closure in JavaScript (Everything you need to know to become a closure ninja)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/closure_in_javascript_i7jb0w.png",
    category: "javascript concepts",
  },
  {
    _id: "S4Yb5JHbz-U",
    title: "React Router (part 3): NavLink in React Router",

    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/navlink_react_router_part_3_hjb43l.png",
    category: "react router",
  },
  {
    _id: "U4EsYGl5_t0",
    title: "Debouncing in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/debouncing_jj9now.png",
    category: "javascript concepts",
  },
  {
    _id: "fFy997K6ujU",
    title: "Promise.race() in JavaScript - part 4 (Promise)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_21_hi8vcm",
    category: "promise in javaScript",
  },
  {
    _id: "gc3Mb-_sNvQ",
    title:
      "Map & Filter in JavaScript (with lots of examples to understand better)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/map_and_filter_pzlvvq.png",
    category: "javascript concepts",
  },
  {
    _id: "f_UuoM3fdWU",
    title: "React Router (part 4): useNavigate in React Router",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/useNavigate_react_router_part_4_e7hdno.png",
    category: "react router",
  },
  {
    _id: "rCHGNIyHV-4",
    title: "reduce method in JavaScript: everything you need to know",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/reduce_in_javascript_vdomt3.png",
    category: "javascript concepts",
  },

  {
    _id: "_fE9HHVDTVY",
    title: "Promise.allSettled() in JavaScript - part 5 (Promise)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_6_wij4m4",
    category: "promise in javaScript",
  },
  {
    _id: "6AX57I6OeiQ",
    title: "All you need to know about 'this' keyword in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/this_keyword_in_JavaScript_cwkjzp.png",
    category: "javascript concepts",
  },
  {
    _id: "M0VrCQYWyLQ",
    title: "React Router (part 5): useParams",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/useParams_react_router_part_5_hmrbgp.png",
    category: "react router",
  },
  {
    _id: "pEHutnI61wg",
    title: "'==' VS '===' in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/vs_tuwint.png",
    category: "javascript concepts",
  },

  {
    _id: "8j_A2REHjZw",
    title: "Promise.any() in JavaScript - part 6 (Promise)",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_7_vt1g7s",
    category: "promise in javaScript",
  },
  {
    _id: "icQPcFEAsXk",
    title: "sort() method in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/sort_in_javascript_vc5bck.png",
    category: "javascript concepts",
  },
  {
    _id: "xxZkJKcR5kA",
    title: "Authentication using React Router",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react router/authentication_react_router_part_6_hvmp5x.png",
    category: "react router",
  },

  {
    _id: "Csux_JUbAYs",
    title: "Hoisting and Temporal Dead Zone in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/hoisting_and_tdz_vt2erg.png",
    category: "javascript concepts",
  },

  {
    _id: "5XCSuwzC4lY",
    title: "async-await in JavaScript - part 7 (Promise)",

    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/promise in javascript/Promise_in_JavaScript_9_vmuwup",
    category: "promise in javaScript",
  },
  {
    _id: "POiiaMFHTSI",
    title: "innerText vs textContent in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/innerText_vs_innerContext_z8bzmy.png",
    category: "javascript concepts",
  },
  {
    _id: "hOQR3o9zAOo",
    title: "useState hook in React",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/react hooks/useState_in_react_idqcjs.png",
    category: "react hooks",
  },
  {
    _id: "WwY8dLL1iqc",
    title: "Memoization in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/memoization_yngovl.png",
    category: "javascript concepts",
  },
  {
    _id: "Bvouevo03s4",
    title: "Transition In CSS",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/css/transition_in_css_tumwo9",
    category: "css",
  },
  {
    _id: "dAI_JVvxkxs",
    title: "IIFE (Immediately Invoked Function Expression) in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/IIFE_gmz7u2.png",
    category: "javascript concepts",
  },
  {
    _id: "1zj5mRUSqdY",
    title: "IIFE (Immediately Invoked Function Expression) in JavaScript",
    thumbnail:
      "http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/html/Html_shorthand_pqxne3.png",
    category: "html",
  },
];

videos.forEach((item) => {
  videoCSV.push([
    item._id,
    item.title,
    item.thumbnail,
    categories.find(
      (category) => category.categoryname === item.category.toLowerCase()
    )._id,
  ]);
});

const videoStr = videoCSV.map((arr) => arr.join(",")).join("\n");

fs.writeFile("video.csv", videoStr, "utf8", (err) => console.log(err));

// {
//     _id: "5i1qVAioRfM",
//     title:
//       "4 clear differences between var, let, and const with examples in JavaScript",
//     thumbnail: 'http://res.cloudinary.com/therajatg/image/upload/f_auto,q_auto/video library/javascript concepts/var_let_and_const_hyswxw.png',
//     category: "javascript concepts",
//   }
