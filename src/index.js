import './styles/main.scss';
import {
    errorBox,
    bgImageId,
    search_input,
    form,
    search_button,
    images_list
} from './globalVariables';

import {
    fetchBackgroundImage,
    showScrollArrow,
    showLoadMore,
    setLoader,
    removeLoader,
    loadMoreImages,
    hideScrollArrow,
    hideShowMore,
} from './functions';

document.body.style.overflow = "hidden";
fetchBackgroundImage(bgImageId);

const fetchImages = async thisButton => {
    errorBox.querySelectorAll("*").forEach(errors => errors.remove())
    setLoader(form)

    try {
        const response = await fetch(`https://images-api.nasa.gov/search?q=${search_input.value}`)
        const data = await response.json()

        search_input.value = "";
        images_list.textContent = "";

        document.body.style.overflow = "visible";
        showScrollArrow();
        showLoadMore();

        const images = data.collection.items;

        for (let i = 0; i < 6; i++) {
            const li = document.createElement("li");
            const li_cloned = li.cloneNode(true);
            li_cloned.classList.add("image-container")
            li_cloned.innerHTML = `
                <img class="image-size" src="${images[i].links[0].href}">      
            `;
            images_list.append(li_cloned);
        }

        const image_container = document.querySelectorAll('.image-size');
        image_container.forEach(photo => {
            photo.addEventListener('click', event => {
                let imageSrc = event.target.getAttribute('src');

                const increased_photo_container = document.createElement('div');
                increased_photo_container.classList.add('increased_photo_container');
                images_list.append(increased_photo_container);

                const increased_photo = document.createElement('img');
                increased_photo.src = imageSrc;
                increased_photo_container.append(increased_photo);

                const exitButton = document.createElement('button');
                increased_photo_container.append(exitButton);

                exitButton.addEventListener('click', () => {
                    increased_photo_container.remove();
                    exitButton.removeEventListener('click', () => { })
                })
            })
        })

        loadMoreImages(images)
        removeLoader(form);
        thisButton.disabled = false;
    } catch (error) {
        console.log(error)
        if (error) {
            hideScrollArrow();
            hideShowMore();
            document.body.style.overflow = "hidden";
            removeLoader(form);
            thisButton.disabled = false;
            const error = document.createElement('li');
            error.classList.add('error')
            error.innerText = "No search. Please check spelling."
            errorBox.append(error);
            return
        }
    }
}

form.addEventListener('submit', event => event.preventDefault())
search_button.addEventListener('click', event => {
    const this_button = event.target;
    event.target.disabled = true;
    fetchImages(this_button)
})
