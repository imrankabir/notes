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

const padTwoDigits = num => num.toString().padStart(2, "0");

const formatDate = (date, dateDiveder = '-') => {
  return (
    [
      date.getFullYear(),
      padTwoDigits(date.getMonth() + 1),
      padTwoDigits(date.getDate()),
    ].join(dateDiveder) +
    " " +
    [
      padTwoDigits(date.getHours()),
      padTwoDigits(date.getMinutes()),
      padTwoDigits(date.getSeconds()),
    ].join(":")
  );
}

async function getVisitorIP() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return 'Unknown IP';
    }
}

async function trackVisitor() {
    const ip = await getVisitorIP();
    const time = formatDate(new Date());
    let visits = JSON.parse(localStorage.getItem(VISITS_KEY)) || [];
    visits.push({ip, time, app});
    localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
    persistVisits();
}

async function persistVisits() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  // headers.append('mode', 'no-cors');
  const response = await fetch('https://enabled-humpback-lively.ngrok-free.app/save-visits.php', {
    method: 'POST',
    body: JSON.stringify(localStorage.getItem(VISITS_KEY)),
    headers
  });

  if (response.ok === true && response.status === 200) {
    console.log(response);
    localStorage.setItem(VISITS_KEY, JSON.stringify([]));
  }

}

trackVisitor();
