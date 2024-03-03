//spinner
window.addEventListener('load', () => {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    setTimeout(function () {
        spinner.style.display = 'none';
    }, 2000);

});

//fetch discuss post data
const loadAllPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    const discussPostArray = data.posts;
    displayPosts(discussPostArray);
}

//show discussion posts
const displayPosts = (discussPostArray) => {
    const discussLeft = document.getElementById('discuss-left');

    discussPostArray.forEach(discuss => {
        // console.log(discuss);
        let badgeColor = 'badge-success';
        const checkActiveStatus = discuss.isActive;
        if (checkActiveStatus === false) {
            badgeColor = 'badge-error';
        }

        const discussCard = document.createElement('div');
        discussCard.classList = 'flex flex-col lg:flex-row gap-4 lg:gap-6 rounded-3xl p-5 lg:p-10 bg-[#797DFC1A] border border-[#797DFC] mb-6';
        discussCard.innerHTML = `
        <div class="indicator">
            <span id="active-indicator" class="indicator-item badge ${badgeColor}"></span>
            <img class="w-20 h-20 rounded-2xl place-items-center" src="${discuss.image}" alt="">
        </div>

        <div class="w-full">
            <div class="flex gap-5">
                <h5 class="font-inter text-sm font-medium text-[#12132DCC]"># <span>${discuss.category}</span></h5>
                <h5 class="font-inter text-sm font-medium text-[#12132DCC]">Author : <span>${discuss.author.name}</span>
                </h5>
            </div>
            <h2 class="text-lg lg:text-xl font-bold text-[#12132D]">${discuss.title}</h2>
            <p class="font-inter text-[#12132D99] pt-2 pb-5">${discuss.description}</p>
            <!-- discussion card icons -->
            <div class="flex justify-between pt-5 border-t-2 border-dashed">
                <div class="flex gap-7">
                    <div class="flex space-x-1 lg:space-x-3 text-[#12132D99] font-inter">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                        </svg>
                        <h4>${discuss.comment_count}</h4>
                    </div>
                    <div class="flex space-x-3 text-[#12132D99] font-inter">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                        <h4>${discuss.view_count}</h4>
                    </div>
                    <div class="flex space-x-3 text-[#12132D99] font-inter">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        <h4><span>${discuss.posted_time}</span> min</h4>
                    </div>
                </div>
                <div class="bg-[#10B981] rounded-full p-2 cursor-pointer ">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                        class="w-6 h-6 text-white">
                        <path
                            d="M19.5 22.5a3 3 0 0 0 3-3v-8.174l-6.879 4.022 3.485 1.876a.75.75 0 1 1-.712 1.321l-5.683-3.06a1.5 1.5 0 0 0-1.422 0l-5.683 3.06a.75.75 0 0 1-.712-1.32l3.485-1.877L1.5 11.326V19.5a3 3 0 0 0 3 3h15Z" />
                        <path
                            d="M1.5 9.589v-.745a3 3 0 0 1 1.578-2.642l7.5-4.038a3 3 0 0 1 2.844 0l7.5 4.038A3 3 0 0 1 22.5 8.844v.745l-8.426 4.926-.652-.351a3 3 0 0 0-2.844 0l-.652.351L1.5 9.589Z" />
                    </svg>
                </div>
            </div>
        </div>
        `;
        discussLeft.appendChild(discussCard);

        //mark as read btn functionality
        let secondInnerDiv = discussCard.querySelector('div:last-child');
        let thirdInnerDiv = secondInnerDiv.querySelector('div:last-child');
        let fourthInnerDiv = thirdInnerDiv.querySelector('svg:last-child');
        let parentOfFourthInnerDiv = fourthInnerDiv.parentElement;
        // console.log(parentOfFourthInnerDiv.classList);

        let isRed = false;
        parentOfFourthInnerDiv.addEventListener('click', () => {
            if (isRed === true) {
                parentOfFourthInnerDiv.classList.remove('bg-red-400');
                parentOfFourthInnerDiv.classList.add('bg-[#10B981]');
                isRed = false;
            }
            else {
                parentOfFourthInnerDiv.classList.add('bg-red-400');
                parentOfFourthInnerDiv.classList.remove('bg-[#10B981]');
                isRed = true;
            }
        });
    });
}

//mark as read button functionality
// const loadDiscussTitleViews = async () => {
//     const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
//     const data = await res.json();
//     const discussTitles = data;
//     showTitlesViews(discussTitles);

// }

// const showTitlesViews = (discussTitles) => {
//     const readCounter = document.getElementById('read-counter');
//     discussTitles.posts.forEach(title => {
//         console.log(title);
//     })
// }
// loadDiscussTitleViews();


//latest post 
const loadLatestPostData = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    const latestPostArray = data;
    displayLatestPosts(latestPostArray)
    // console.log(latestPostArray);
}

//show latest post
const displayLatestPosts = (latestPostArray) => {
    const latestPostContainer = document.getElementById('latest-posts-container');

    latestPostArray.forEach(latest => {
        // latestPostContainer.classList = 'flex flex-col lg:flex-row justify-between gap-6';
        latestPostContainer.classList = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';

        const latestPostCard = document.createElement('div');
        latestPostCard.innerHTML = `
        <div class="border border-[#12132D26] p-6 rounded-3xl">
            <img class="rounded-3xl" src="${latest.
                cover_image}" alt="latest-post">
            <div class="mt-6 mb-4 flex gap-2 text-[#12132D99]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                <h4>${latest.author.posted_date ? latest.author.posted_date : 'No Publish Date'}</h4>
            </div>
            <h2 class="text-lg font-extrabold text-[#12132D] pb-3">${latest.title}</h2>
            <p class="text-[#12132D99] pb-4">${latest.description}</p>
            <div class="flex gap-4 items-center">
                <div class="w-[10%]">
                    <img class="rounded-full" src="${latest.profile_image}" alt="post-user"></div>
                <div class="w-[90%]">
                    <h3 class="text-base font-bold text-[#12132D]">Cameron Williamson</h3>
                    <p class="text-sm text-[#12132D99]">ROR Developer</p>
                </div>
            </div>
        </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    });
}

loadAllPostData();
loadLatestPostData();


