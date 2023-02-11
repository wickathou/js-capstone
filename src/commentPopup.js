import { addComment, getComments, countComments } from './comment.js';

const commentPopup = async (popupComment, movie, num) => {
  popupComment.innerHTML += `
    <div class="popup">
    <span id="close-btn">X</span>
        <div class="popup-content">
            
            <img src="${movie.image}"/>
            <h1>${movie.name}</h1>
            <div class="popup-detail">
            </div>
            <h4 class='count-display'>Comments ${num} </h4>
            <div class='comments-div' id="com-div">

            </div>
            <h4>Add a comment</h4>
            <input type="text" placeholder="Your name" name="name" class="comment-input"/>
            <input type="textarea" placeholder="Your insights" name="comment" class="comment-input"/>
            <button class="comment-btn add-comment" id=${movie.id}>Comment</button>
        </div>
        </div>
    `;
  document.body.appendChild(popupComment);
};

const commentClicked = async (show) => {
  // console.log('show: ', show);

  const popupComment = document.createElement('div');
  popupComment.classList.add('popup-window');
  popupComment.style.display = 'block';

  let comments = await getComments(show.id);
  const num = countComments(comments);

  commentPopup(popupComment, show, num);

  const closeBtn = document.getElementById('close-btn');
  closeBtn.addEventListener('click', () => {
    popupComment.style.display = 'none';
  });

  const commentDiv = document.querySelector('#com-div');
  comments.forEach((com) => {
    const p = document.createElement('p');
    p.innerHTML = `${com.creation_date} ${com.username}: ${com.comment}`;
    commentDiv.appendChild(p);
  });

  const addCommentBtn = document.querySelector('.add-comment');
  addCommentBtn.addEventListener('click', async () => {
    const commentInput = addCommentBtn.previousElementSibling;
    const nameInput = commentInput.previousElementSibling;
    if (commentInput.value !== '' && nameInput.value !== '') {
      addComment(show.id, nameInput.value, commentInput.value);
      nameInput.value = '';
      commentInput.value = '';
    }
    comments = await getComments(show.id);
    window.document.location.reload();
  });
};

export default commentClicked;



// import { addComment, getComments, countComments } from './comment.js';

// const commentPopup = async (popupComment, movie, num) => {
//   popupComment.innerHTML += `
//     <div class="popup">
//     <span id="close-btn">X</span>
//         <div class="popup-content">
            
//             <img src="${movie.image}"/>
//             <h1>${movie.name}</h1>
//             <div class="popup-detail">
//             </div>
//             <h4 class='count-display'>Comments ${num} </h4>
//             <div class='comments-div' id="com-div">

//             </div>
//             <h4>Add a comment</h4>
//             <input type="text" placeholder="Your name" name="name" class="comment-input"/>
//             <input type="textarea" placeholder="Your insights" name="comment" class="comment-input"/>
//             <button class="comment-btn add-comment" id=${movie.id}>Comment</button>
//         </div>
//         </div>
//     `;
//   document.body.appendChild(popupComment);
// };

// const commentClicked = async (show) => {
//   console.log('show: ', show);
//   // btns.forEach((btn) => {
//   //   btn.addEventListener('click', async () => {
//       const popupComment = document.createElement('div');
//       popupComment.classList.add('popup-window');
//       // popupComment.style.display = 'none';

//       if (popupComment.style.display === 'none') {
//         popupComment.style.display = 'block';
//       } else if (popupComment.style.display === 'block') {
//         popupComment.style.display = 'none';
//       }

//       let comments = await getComments(show.id);
      
//       const num = countComments(comments);

//       commentPopup(popupComment, show, 2);

//       const closeBtn = document.getElementById('close-btn');
//         closeBtn.addEventListener('click', () => {
//           popupComment.style.display = 'none';
//         });


//       const commentDiv = document.querySelectorAll('.comments-div');
//       comments.forEach((com) => {
//         const p = document.createElement('p');
//         p.innerHTML = `${com.creation_date} ${com.username}: ${com.comment}`;
//         // commentDiv.forEach((div) => {
//           // div.appendChild(p);
//         // });
//       });

//       const addCommentBtn = document.querySelectorAll('.add-comment');
//       addCommentBtn.forEach((btn) => {
//         btn.addEventListener('click', async () => {
//           const commentInput = btn.previousElementSibling;
//           const nameInput = commentInput.previousElementSibling;
//           if (commentInput.value !== '' && nameInput.value !== '') {
//             addComment(show.id, nameInput.value, commentInput.value);
//             nameInput.value = '';
//             commentInput.value = '';
//           }
//           comments = await getComments(show.id);
//           window.document.location.reload();
//         });
//       });
//     // });
//   // });
// };

// export default commentClicked;


// const commentClicked = (btns, movies) => {
//   btns.forEach((btn) => {
//     btn.addEventListener('click', async () => {
//       const popupComment = document.createElement('div');
//       popupComment.classList.add('popup-window');

//       if (popupComment.style.display === 'none') {
//         popupComment.style.display = 'block';
//       } else if (popupComment.style.display === 'block') {
//         popupComment.style.display = 'none';
//       }

//       let comments = await getComments(btn.id);
//       const num = countComments(comments);

//       movies.forEach((movie) => {
//         if (movie.show.id === Number(btn.id)) {
//           commentPopup(popupComment, movie.show, num);
//         }
//       });

//       const closeBtn = document.querySelectorAll('.close-btn');
//       closeBtn.forEach((closeBt) => {
//         closeBt.addEventListener('click', () => {
//           popupComment.style.display = 'none';
//         });
//       });

//       const commentDiv = document.querySelectorAll('.comments-div');
//       comments.forEach((com) => {
//         const p = document.createElement('p');
//         p.innerHTML = `${com.creation_date} ${com.username}: ${com.comment}`;
//         commentDiv.forEach((div) => {
//           div.appendChild(p);
//         });
//       });

//       const addCommentBtn = document.querySelectorAll('.add-comment');
//       addCommentBtn.forEach((btn) => {
//         btn.addEventListener('click', async () => {
//           const commentInput = btn.previousElementSibling;
//           const nameInput = commentInput.previousElementSibling;
//           if (commentInput.value !== '' && nameInput.value !== '') {
//             addComment(btn.id, nameInput.value, commentInput.value);
//             nameInput.value = '';
//             commentInput.value = '';
//           }
//           comments = await getComments(btn.id);
//           window.document.location.reload();
//         });
//       });
//     });
//   });
// };

// export default commentClicked;