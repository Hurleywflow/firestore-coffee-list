// get element for output data
const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');
// create element and render cafe output
function renderCafe(doc) {
	const li = document.createElement('li');
	const name = document.createElement('span');
	const city = document.createElement('snap');
	const cross = document.createElement('div');
	// get id, name and city from firebase
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	cross.textContent = 'x';
	// append those of this li
	li.appendChild(name);
	li.appendChild(city);
	li.appendChild(cross);
	// append those to the ul
	cafeList.appendChild(li);
	// deleting database from firebase
	cross.addEventListener('click', (e) => {
		e.stopPropagation();
		const id = e.target.parentElement.getAttribute('data-id');
		db.collection('cafes').doc(id).delete();
	});
}
// get database from html config, have been connected with firebase. use method get() to get data inside cafes collection and this is asynchronic function
// db.collection('cafes')
// 	.orderBy('name')
// 	.get()
// 	.then((snapshot) => {
// 		// snapshot is list of database have been collected in firebase represent
// 		snapshot.docs.forEach((doc) => {
// 			renderCafe(doc);
// 		});
// 	});
// saving data to form UI
form.addEventListener('submit', (e) => {
	e.preventDefault();
	db.collection('cafes').add({
		name: form.name.value,
		city: form.city.value,
	});
	form.reset();
});

// realTime listener onSnapshot function
db.collection('cafes')
	.orderBy('city')
	.onSnapshot((snapshot) => {
		const changes = snapshot.docChanges();
		changes.forEach((change) => {
			if (change.type == 'added') {
				renderCafe(change.doc);
			} else if (change.type == 'removed') {
				const li = cafeList.querySelector(`[data-id=${change.doc.id}]`);
				cafeList.removeChild(li);
			}
		});
	});
