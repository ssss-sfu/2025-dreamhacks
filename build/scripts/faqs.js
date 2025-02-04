const faqsJson = [
  {
    question: "Why ChaosHacks?",
    answer:
      "We decided on ChaosHacks as the theme because there’s so many ways we interact with chaos in our lives that can be the source of inspiration. From a cluttered computer desktop to an unpredictable bus schedule, we want you to have a look at those chaotic things in your life and think about ways you can eliminate it, control it, or even embrace it! And like with chaos itself,  everyone may start with the same theme but will bring their own interpretations to it that will result in cool and unique projects.",
  },
  {
    question: "Where is the venue?",
    answer:
      "ChaosHacks will take place in the SFU’s state-of-the-art Engineering Building, located in Surrey Central. Opened in 2019, this building is home to SFU’s Mechatronics Systems Engineering, Sustainable Energy Engineering, and Software Systems programs and has the best in campus design SFU has to offer with its lecture theaters, labs, and work spaces.",
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
      "The theme can be interpreted loosely in whatever way you see fit; it is just a prompt to get you thinking. There’s plenty of ways chaos manifests, so you can pretty much take it in whichever way works for you. ",
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

// Create the image for the purple star
var purpleStarImg = document.createElement("img");
purpleStarImg.setAttribute("src", "./assets/images/faqs_purple-star.png");
purpleStarImg.setAttribute("alt", "Leaf");

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

  // Append all elements to the main container
  var faqItem = document.createElement("div");
  faqItem.classList.add("faq-item");

  faqItem.appendChild(checkboxInput);
  faqItem.appendChild(label);
  faqItem.appendChild(contentParagraph);
  faqItem.appendChild(purpleStarImg.cloneNode());

  return faqItem;
};
const faqHtmlList = faqsJson.map((item, index) => toHtml(item, index));
const faqsList = document.querySelector("#faq-list");

faqHtmlList.forEach((faqItem) => {
  faqsList.appendChild(faqItem);
});
