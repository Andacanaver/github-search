'use strict';

const searchURL = "https://api.github.com/users/"

function getRepos() {
  const userName = document.getElementById('js-name-search').value
  const repos = "/repos"
  const url = searchURL + userName + repos
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3>${responseJson[i].name}</h3>
      <p><a href="${responseJson[i].html_url}" target="_blank">${responseJson[i].html_url}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}


$(watchForm);