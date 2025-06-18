var websiteName = document.getElementById("bookmarkName");
var websiteUrl = document.getElementById("siteUrl");

if (localStorage.getItem("websites") !== null) {
  var websitesArr = JSON.parse(localStorage.getItem("websites"));
  displaywebsites();
} else {
  var websitesArr = [];
}

function isValid(websiteName, websiteUrl) {
  const websiteNameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)$/;
  const websiteUrlRegex =
    /^(https?:\/\/)?(www\.)?[a-zA-Z0-9\-]+(\.[a-zA-Z]{2,})(\/\S*)?$/;

  return websiteNameRegex.test(websiteName) && websiteUrlRegex.test(websiteUrl);
}

function addWebsite() {
  if (isValid(websiteName.value, websiteUrl.value)) {
    var website = {
      name: websiteName.value,
      url: websiteUrl.value,
    };
    websitesArr.push(website);
    localStorage.setItem("websites", JSON.stringify(websitesArr));
    displaywebsites();
    resetForm();
  } else {
    alert("Please enter valid website name and URL.");
  }
}

function displaywebsites() {
  var websitesList = "";
  for (var i = 0; i < websitesArr.length; i++) {
    websitesList += `
        <tr>
            <td>${i + 1}</td>
            <td>${websitesArr[i].name}</td>
            <td>
                <button class="btn btn-success" onclick="visitWebsite(${i})"><i class="fa-solid fa-eye"></i> Visit</button>       
            </td>
            <td>
            <button class="btn btn-danger" onclick="deleteWebsite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>  </td>
        </tr>
        `;
  }
  document.getElementById("tBody").innerHTML = websitesList;
}

function deleteWebsite(index) {
  websitesArr.splice(index, 1);
  displaywebsites();
  localStorage.setItem("websites", JSON.stringify(websitesArr));
}

function visitWebsite(index) {
  let url = websitesArr[index].url.trim();

  // If the URL doesn't start with http:// or https://, add https://
  if (!/^https?:\/\//i.test(url)) {
    url = "https://" + url;
  }

  // Open in the same tab
  window.location.href = url;
}

function resetForm() {
  websiteName.value = "";
  websiteUrl.value = "";
}
