const app = 'Notes';
const VISITS_KEY = 'notes-visits';

const setDimensions = e => {
    const iframe = document.querySelector("#iframe");
    iframe.width = window.innerWidth + "px";
    // iframe.height = window.innerHeight + 'px';
    // iframe.width = (window.innerWidth - 15) + 'px';
    iframe.height = window.innerHeight - 5 + "px";
};

setDimensions();

window.onresize = e => setDimensions();

// trackVisitor();
