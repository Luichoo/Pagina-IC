const past = [];
function display(event) {
	let input_image = document.getElementById("input_image");
	let predbtn = document.getElementById("predict_button");
	input_image.src = URL.createObjectURL(event.target.files[0]);
	input_image.style.visibility = "visible";
	
	predbtn.disabled = false;
	//console.log(event.target.files[0])
	//console.log(input_image.name)

	let d = document.querySelector(".path");
	let text = document.getElementById("text");

	
	d.href = input_image.src;
	text.style.visibility = "visible";
	text.style.display= "block"
}


//Mostrar a que animal(clase) pertenece la imagen subida
// https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/async_function

async function predict_animal() {
	let input = document.getElementById("input_image");

	// Apoyo: Repetir el preprocesamiento realizado en el cuaderno
	// https://js.tensorflow.org/api/latest/#image.resizeNearestNeighbor
	let imageproc = tf.browser
		.fromPixels(input)
		.resizeNearestNeighbor([224, 224])
		.expandDims(0)
		.div(255.0);
	let alist = document.getElementById("animal_list");
	console.log("Finalización del preprocesamiento de la imagen");

	const model = await tf.loadLayersModel("tensorflowjs-model2/model.json");
	pred = model.predict(imageproc);
	pred.print();
	console.log("Finalización de predicción");

	const changes = () => {
		let j = 0;
		for (let i = 0; i < alist.childNodes.length; i++) {
			var span = alist.childNodes[i].childNodes[3];
			if (span != undefined) {
				span.innerHTML = (pred.dataSync()[j] * 100).toFixed(2) + "%";
				j += 1;
			}
			//console.log("ola",span)
		}
	};
	changes();

	if (past.length > 0) {
		alist.childNodes[past[0]].style.backgroundColor = "white";
		past.pop();
	}

	//Declaración del arreglo con las clases de nuestro modelo
	animals = [
		"Canguro",
		"Estrella",
		"gato",
		"Lechuza",
		"Luciérnaga",
		"Pavo Real",
		"Pez Vela",
		"Rinoceronte",
		"Totrtuga",
		"Venado",
	];
	//Determinar cúal elemento del arreglo tiene mayor valor para asignarle a esa clase la salida final
	pred.data().then((data) => {
		console.log(data);

		max_val = -1;
		max_val_index = -1;
		for (let i = 0; i < data.length; i++) {
			if (data[i] > max_val) {
				max_val = data[i];
				max_val_index = i;
			}
		}
		ANIMAL_DETECTADO = animals[max_val_index];
		//if alist.childNodes[max_val_index]

		switch (max_val_index) {
			case 0:
				max_val_index = 1;

				break;
			case 1:
				max_val_index = 3;

				break;
			case 2:
				max_val_index = 5;

				break;
			case 3:
				max_val_index = 7;
				break;
			case 4:
				max_val_index = 9;

				break;
			case 5:
				max_val_index = 11;

				break;
			case 6:
				max_val_index = 13;

				break;
			case 7:
				max_val_index = 15;

				break;
			case 8:
				max_val_index = 17;

				break;
			case 9:
				max_val_index = 19;

				break;
			default:
				break;
		}
		//console.log(alist);
		alist.childNodes[max_val_index].style.backgroundColor = "green";
		past.push(max_val_index);
		//console.log(past)
		console.log(alist.childNodes[max_val_index]);
		//alist.childNodes[max_val_index].style.backgroundColor = "green"
		//document.getElementById("output_text").innerHTML = "<p>El animal detectado y su probabilidad corresponden a</p><p>Animal detectado: " + ANIMAL_DETECTADO + " ( " + (max_val*100).toFixed(2) + "% probabilidad )</p>"
	});
}
