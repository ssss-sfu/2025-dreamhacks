const faqsJson = [
  {
    question: "Why DreamHacks?",
    answer: 
      "If you can dream it, you can do it - or in this case, build it at DreamHacks! This year is centered around building anything your heart may desire. If you have a project that you have been wanting to create for the longest time, or a project that will help you actually achieve your dreams—the possibilities are endless! This is your opportunity to express any creative vision you have or transform those ideas into the reality that you have been dying to do for the longest time."
  },
  {
    question: "Where is the venue?",
    answer:
      // TODO: CONFIRM VENUE
      "DreamHacks will take place in the SFU’s state-of-the-art Engineering Building, located in Surrey Central. Opened in 2019, this building is home to SFU’s Mechatronics Systems Engineering, Sustainable Energy Engineering, and Software Systems programs and has the best in campus design SFU has to offer with its lecture theaters, labs, and work spaces.",
  },
  {
    question: "What is a hackathon?",
    answer:
      "A hackathon is an event where teams of 2-4 develop (or “hack”) a project in a short period of time. Hackathons are often 24 hours or a weekend, but SystemsHacks is 12 hours to make the experience less imposing for beginners. Hackathons are an opportunity to experiment with new tools, or try new ideas. They are also a great change to make lasting connections with fellow students, mentors, and industry professionals.",
  },
  {
    question: "How can I best participate with no hackathon experience?",
    answer:
      "You are not expected to have any experience to participate; everyone starts somewhere! The goal of the event is to learn something new; don’t worry if the final result is not particularly polished. Mentors will be available to help you work through questions that you may have, and we encourage you and your teammates to teach each other as well. Just remember, the primary goal of a hackathon is to learn!",
  },
  {
    question: "How should the theme be integrated into my project?",
    answer:
      // TODO: UPDATE REQUIRED
      "The theme can be interpreted loosely in whatever way you see fit; it is just a prompt to get you thinking. Dreams come in many shapes and forms, and it's totally up to you on how you want to make them become reality"
    },
  {
    question: "How can I register my team?",
    answer:
      "If you already have a team in mind, each teammate must register individually for SystemsHacks. You do not have to notify the organizers of your team before the event, but projects must be submitted by a group of 2-4 people.",
  },
  {
    question: "What if I don’t have a team?",
    answer:
      "You certainly aren’t the only one, many first-time hackers find themselves in the same situation! On the morning of the event, there will be a team formation event. We will ask all participants without a team to gather somewhere, where you can all form teams on the spot to ensure everyone can participate.",
  },
  {
    question: "What can mentors help me with?",
    answer:
      "Mentors can answer questions and help fix any technical issues that you may have, but they may not directly contribute to your project. They can also help you elaborate your idea in the early stages of the event, so don’t hesitate to ask if they have time to chat about your concept!",
  },
];

// Create the image element for the chevron
var chevronImg = document.createElement("img");
chevronImg.setAttribute("src", "./assets/images/icons/chevron-down.svg");
chevronImg.setAttribute("alt", "Chevron");
chevronImg.width = 20;

// reusing a random asset that already exists, could be changed later
var faqIcon = document.createElement("img");
faqIcon.setAttribute("src", "./assets/images/about_star.webp");
faqIcon.setAttribute("alt", "faq icon");

const getRandomRotation = () => {
  // makes the faq section a little bit less boring by rotating the icon
  // uses hardcoded values because pure randomness looks bad
  const rotations = [30, 90, 270]; 
  return rotations[Math.floor(Math.random() * rotations.length)];
};

// generates an html element that contains one faq 
// this includes an icon, then the question, and the answer
const toHtml = (faq, index) => {
  // Create the checkbox input
  var checkboxInput = document.createElement("input");
  checkboxInput.setAttribute("type", "checkbox");
  checkboxInput.setAttribute("id", `faq-${index}`);

  // Create the label for the checkbox
  var label = document.createElement("label");
  label.setAttribute("for", `faq-${index}`);

  // Create the text content for the label
  var labelText = document.createTextNode(faq.question);

  // Append the text and image to the label
  label.appendChild(labelText);
  label.appendChild(chevronImg.cloneNode());

  // Create the paragraph with the content
  var contentParagraph = document.createElement("p");
  contentParagraph.classList.add("content");
  contentParagraph.textContent = faq.answer;

  // Apply random rotation to the faqIcon
  var rotatedFaqIcon = faqIcon.cloneNode();
  rotatedFaqIcon.style.transform = `rotate(${getRandomRotation()}deg)`;

  // Append all elements to the main container
  var faqItem = document.createElement("div");
  faqItem.classList.add("faq-item");

  faqItem.appendChild(checkboxInput);
  faqItem.appendChild(label);
  faqItem.appendChild(contentParagraph);
  faqItem.appendChild(rotatedFaqIcon);

  return faqItem;
};

const faqHtmlList = faqsJson.map((item, index) => toHtml(item, index));
const faqsList = document.querySelector("#faq-list");

faqHtmlList.forEach((faqItem) => {
  faqsList.appendChild(faqItem);
});