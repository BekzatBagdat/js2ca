const API_BASE_URL = "https://api.noroff.dev";
const postURL = `${API_BASE_URL}/api/v1/social/posts`;
/* DOMs */
const postsContainer = document.querySelector(".feed-posts-section");
const tweetBtn = document.querySelector("#createTweetBtn");

const displayPosts = () => {
  postsContainer.innerHTML = "";
  const posts = JSON.parse(localStorage.posts);

  posts.forEach((post) => {
    /*Convert Date*/
    const orgDate = post.created;
    const createdDate = new Date(orgDate);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const day = createdDate.getDate();
    const month = months[createdDate.getMonth()];
    const year = createdDate.getFullYear();

    const formattedDate = `${month}, ${day}, ${year}`;

    /*Saving Post.Id*/
    const postID = post.id;
    /*create HTML*/

    const html = `
      <div class="container card text-bg-light mb-5 tweet-single-post">
            <div class="card-header d-flex align-items-center flex-column">
              <img
                src="img/defaultProfilePicture.png"
                class="rounded-circle mt-3 mb-1 post-profile-img"
                alt="Profile Picture"
              />
              <p class="mt-2 mb-0 post-date">${formattedDate}</p>
              <div class="dropdown-center mt-3 mb-3">

                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                Edit
                </button>
                <!-- Invisible span to store post ID -->
                <ul class="dropdown-menu">
                  <li>
                    <!-- Button trigger modal -->
                    <span class="post-id" data-post-id="${postID}" style="display: none;"></span>
                    <a
                      type="button"
                      id="updateTrigger"
                      class="dropdown-item"
                      data-bs-toggle="modal"
                      data-bs-target="#updateTweetModal"
                      data-post-id="${postID}"
                    >

                      Update
                    </a>
                  </li>
                  <li>
                   <a class="dropdown-item tweet-delete-btn" style="color: red" href="feed.html" data-post-id="${postID}">Delete</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="card-body">
              <h5 class="card-title">
                <a id="postH5" href="post.html?title=${post.title}&body=${post.body}&date=${formattedDate}">${post.title}</a>
              </h5>
              <p class="card-text">
                ${post.body}
              </p>
            </div>
          </div>

      `;
    console.log(postID);
    postsContainer.innerHTML += html;
  });

  /*Delete Func*/
  const deleteBtns = document.querySelectorAll(".tweet-delete-btn");
  deleteBtns.forEach((deleteBtn) => {
    deleteBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = deleteBtn.getAttribute("data-post-id");
      deletePost(postId);
    });
  });
  const deletePost = async (postId) => {
    try {
      const url = `${API_BASE_URL}/api/v1/social/posts/${postId}`;
      const token = localStorage.getItem("accessToken");
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  /*Update Func*/
  const updateBtns = document.querySelectorAll(".update-btns");
  updateBtns.forEach((updateBtn) => {
    updateBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const postId = document
        .querySelector(".post-id")
        .getAttribute("data-post-id");
      updatePost(postId);
    });
  });
  const updatePost = (postId) => {
    const url = `${API_BASE_URL}/api/v1/social/posts/${postId}`;
    console.log(url);
    const title = document.querySelector("#updateTitleInput").value;
    const body = document.querySelector("#updateTweetInput").value;

    /*Saving user input*/
    let tweetData = {
      title: title,
      body: body,
    };
    console.log(tweetData);
    const createApiCall = async (url, tweetData) => {
      try {
        //Get accesstoken
        const token = localStorage.getItem("accessToken");
        //API Call
        const res = await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(tweetData),
        });
        const json = await res.json();
        localStorage.setItem("posts", JSON.stringify(json));
        window.location.reload();

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    createApiCall(url, tweetData);
  };
};

const createPost = () => {
  const title = document.querySelector("#postTweetTitleInput").value;
  const body = document.querySelector("#postTweetInput").value;

  /*Saving user input*/
  let tweetData = {
    title: title,
    body: body,
  };
  const createApiCall = async (url, tweetData) => {
    try {
      //Get accesstoken
      const token = localStorage.getItem("accessToken");
      //API Call
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tweetData),
      });
      const json = await res.json();
      localStorage.setItem("posts", JSON.stringify(json));
      window.location.reload();

      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };
  createApiCall(postURL, tweetData);
};

const getPosts = async (url) => {
  try {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    localStorage.setItem("posts", JSON.stringify(json));
  } catch (error) {
    console.log(error);
  }
  displayPosts();
};

getPosts(postURL);

const runCreatePosts = () => {
  if (tweetBtn) {
    tweetBtn.addEventListener("click", createPost);
  }
};

export { getPosts, runCreatePosts, postURL };
