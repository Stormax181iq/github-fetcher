const inputArea = document.getElementById("input-area");
const outputPanel = document.getElementById("output-panel");

inputArea.addEventListener('keydown', function (e) {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    getUser(inputArea.value);
  }
});
inputArea.addEventListener('focusin', function () {
  if (inputArea.value === "Enter a GitHub username") {
    clearArea();
  }
});
inputArea.addEventListener('focusout', function () {
  if (inputArea.value === '') {
    defaultTextArea();
  }
});

function clearArea() {
  inputArea.value = '';
}

function defaultTextArea() {
  inputArea.value = "Enter a GitHub username";
}

function getUser(username) {
  fetch(`https://api.github.com/users/${username}`, {
    method: 'GET'
  }).then(response => {
    if (response.ok) {
      return response.text();
    } else {
      alert("An error occurred. Enter a valid username");
    }
  }).then(data => showResults(data));
}

function showResults(text) {
  const profile = JSON.parse(text);
  console.log(profile)

  outputPanel.innerHTML = `<p>
  <a href="${profile.html_url}">${profile.login} (${profile.name}) 
    <img id="avatar" src="${profile.avatar_url}" alt="avatar"></a></p>
  <p>Bio : ${profile.bio}</p>
  <p>Followers : ${profile.followers} | Location : ${profile.location}</p>
  <p>Created the : ${new Date(profile.created_at)}</p>`
}