const displayViewPost = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.search);

  const title = params.get("title");
  const body = params.get("body");
  const date = params.get("date");

  const container = document.querySelector(".view-post-section");
  const html = `
  <div class="container card text-bg-light mb-5">
          <div class="card-header d-flex align-items-center flex-column">
            <img
              src="img/defaultProfilePicture.png"
              class="rounded-circle mt-3 mb-1 post-profile-img"
              alt="Profile Picture"
            />
            <p class="mt-2 mb-3 post-date">${date}</p>
          </div>
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">
            ${body}
            </p>
          </div>
        </div>
  `;
  container.innerHTML = html;
};

export { displayViewPost };
