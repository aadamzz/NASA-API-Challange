export const fetchBackgroundImage = async imgId => {
	try {
		const response = await fetch(`https://images-api.nasa.gov/asset/${imgId}`)
		const data = await response.json();
		const imageSrc = data.collection.items[0].href;
		section__a.style.backgroundImage = 'url(' + imageSrc + ')';
	} catch (error) {
		console.log(error)
	}
}

export const showScrollArrow = () => {
	const arrowContainer = document.querySelector('#scroll-container');
	arrowContainer.classList.remove("loadScroll")
}

export const hideScrollArrow = () => {
	const arrowContainer = document.querySelector('#scroll-container');
	arrowContainer.classList.add("loadScroll");
}

export const showLoadMore = () => {
	const imgButton = document.querySelector('#loadImg-button');
	imgButton.classList.remove("button-visibility");
}

export const hideShowMore = () => {
	const imgButton = document.querySelector('#loadImg-button');
	imgButton.classList.add("button-visibility");
}

export const setLoader = form => {
	const loader = document.createElement("div");
	loader.classList.add('loader');
	form.append(loader);
}

export const removeLoader = form => {
	const loader = document.querySelector('.loader');
	form.removeChild(loader);
}

export const loadMoreImages = images => {
	const loadMoreButton = document.querySelector('#loadImg-button');
	const images_list = document.querySelector('.images-list');
	let imgLoader = 6;

	loadMoreButton.addEventListener('click', () => {
		const gallery_length = document.querySelectorAll('.image-size').length;
		gallery_length >= images.length && hideShowMore();

		for (let i = imgLoader; i < imgLoader + 6; i++) {
			const li = document.createElement("li");
			const li_cloned = li.cloneNode(true);
			li_cloned.classList.add("image-container")
			li_cloned.innerHTML = `
                <img class="image-size" src="${images[i].links[0].href}">      
            `;
			images_list.append(li_cloned);
		}
		imgLoader += 6;
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
	})
}
