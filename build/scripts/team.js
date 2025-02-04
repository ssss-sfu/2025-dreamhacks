const execArray = [
  { name: "Joshua Li", role: "President" },
  { name: "Kevin Chen", role: "Vice President" },
  { name: "Gahee Kim", role: "Secretary" },
  { name: "Mekdim Dereje", role: "Treasurer" },
  { name: "Ethan Chou", role: "Director of Marketing" },
  { name: "Chloe Yip", role: "Director of Activities" },
  { name: "Max Zhang", role: "Director of Activities" },
  { name: "Iris Au-Yeung", role: "Director of Visual Design" },
  { name: "Jamie Chin", role: "External Representative" },
  { name: "Bryan Dang", role: "Internal Representative" },
  { name: "Andy Wang", role: "Fourth Year Representative" },
  { name: "Jerry Deng", role: "Third Year Representative" },
  { name: "Julie Wu", role: "Second Year Representative" },
  { name: "Maria León Campos", role: "First Year Representative" },
  { name: "Gabriel Ma", role: "First Year Representative" },
  { name: "Jennifer Huang", role: "First Year Representative" },
  { name: "Tal Zaloilov", role: "SFSS Council Representative" }
]


// Function to populate HTML under #exec-list
function populateExecList() {
  const execListContainer = document.getElementById('exec-list');

  console.log('test')
  execArray.forEach((entry, index) => {
    const execContainer = document.createElement('div');
    execContainer.className = 'exec-container';
    execContainer.id = `exec-${index + 1}`;

    const execImg = document.createElement('img');
    execImg.className = 'exec-img';
    execImg.src = `./assets/images/execs/${entry.name.split(' ')[0].toLowerCase()}.jpg`; // Assuming images are named accordingly
    console.log(execImg.src)
    execImg.alt = entry.name;

    const execName = document.createElement('p');
    execName.className = 'exec-desc-1';
    execName.textContent = `${entry.name}`;

    const execRole = document.createElement('p');
    execRole.className = 'exec-desc-2';
    execRole.textContent = `${entry.role}`;

    execContainer.appendChild(execImg);
    execContainer.appendChild(execName);
    execContainer.appendChild(execRole);
    execListContainer.appendChild(execContainer);
  });
}

// Call the function to populate the HTML
populateExecList();

const execList = document.querySelector("#exec-list");
console.log("test");
const execs = execList.children;

Array.from(execs).forEach((exec, index) => {
  exec.addEventListener("mouseenter", () => {
    exec.classList.toggle("hovered");
  });

  exec.addEventListener("mouseleave", () => {
    exec.classList.toggle("hovered");
  });
});
