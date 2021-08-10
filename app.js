// get element for output data
const cafeList = document.querySelector('#cafe-list');
// create element and render cafe output
function renderCafe(doc) {
	const li = document.createElement('li');
	const name = document.createElement('span');
	const city = document.createElement('snap');
	// get id, name and city from firebase
	li.setAttribute('data-id', doc.id);
	name.textContent = doc.data().name;
	city.textContent = doc.data().city;
	// append those of this it li
	li.appendChild(name);
	li.appendChild(city);
	// append those to the ul
	cafeList.appendChild(li);
}
// get database from html config, have been connected with firebase. use method get() to get data inside cafes collection and this is asynchronic function
db.collection('cafes')
	.get()
	.then((snapshot) => {
		// snapshot is list of database have been collected in firebase represent
		snapshot.docs.forEach((doc) => {
			renderCafe(doc);
		});
	});
