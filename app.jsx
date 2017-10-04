// Modelo
class Model {
	constructor() {
		this.items = [];
		this.text = "";
		this.callback = null
	}

	subscribe(render) {
		this.callback = render;
	}

	notify() {
		this.callback();
	}
	agregaLista(text) {
		this.items.push({
		    id: Utils.uuid(),
		    text: text,
		    completo: false
		});
        	this.text.value = "";
		this.notify();

	}
	eliminarItems(lista) {
		this.items = this.items.filter(item => item !== lista);
		this.notify();
	}
	activo(e) {
		if (this.items[e.target.name].completo !== e.target.checked) {
			this.items[e.target.name].completo = e.target.checked
		}
		this.notify();

	}
}

//Vista
const Application = ({ model }) => {
	const creaLista = model.items.map((item, index) => {
		return (
			<li key={item.id} className={item.completo === true ? 'responded' : ''}>
				{item.text}
				<label>Comfirmed
					<input type="checkbox" name={index} onChange={e => { model.activo(e) }} />
				</label>
				<button onClick={() => model.eliminarItems(item)}>remove</button>
			</li>
		)
	});

	return (
		<div>
			<div className="wrapper">
				<header>
					<h1>RSVP</h1>
					<p> Registration App </p>
					<form id="registrar"
						onSubmit={e => {
							e.preventDefault();
							model.agregaLista(model.text);
						}}>
						<input
							type="text"
							name="name"
							placeholder="Invite Someone"
							onChange={e => (model.text = e.target.value)} />
						<button
							type="submit"
							name="submit"
							value="submit">Submit</button>
					</form>
				</header>
				<div className="main">
					<h2>Invitees</h2>
					<ul id="invitedList">{creaLista} </ul>
				</div>
			</div>
		</div>
	)
}
// Controlador
let model = new Model();
let counter = 1;
let render = () => {
	console.log('render times: ', counter++);
	ReactDOM.render(
		<Application model={model} />,
		document.getElementById('container')
	);
};

model.subscribe(render);
render();

