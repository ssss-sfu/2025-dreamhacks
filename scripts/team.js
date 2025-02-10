const execArray = [
  { name: "Mekdim Dereje", role: "President" },
  { name: "Randy Le Tran", role: "Vice President" },
  { name: "Max Zhang", role: "Secretary" },
  { name: "Andrew La Grange", role: "Treasurer" },
  { name: "Ethan Chou", role: "Director of Marketing" },
  { name: "Jennifer Huang", role: "Director of Activities" },
  { name: "Dagem Dereje", role: "Director of Activities" },
  { name: "Maria León Campos", role: "Director of Visual Design" },
  { name: "Damon Yiu", role: "External Representative" },
  { name: "Ash Aung", role: "Internal Representative" },
  { name: "Julie Wu", role: "Third Year Representative" },
  { name: "Jaycie Say", role: "Second Year Representative" },
  { name: "Aleeza Ahmed", role: "First Year Representative" },
  { name: "Swara Bhate", role: "First Year Representative" },
  { name: "Fabian Jonathan Siswanto", role: "SFSS Council Representative" }
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
