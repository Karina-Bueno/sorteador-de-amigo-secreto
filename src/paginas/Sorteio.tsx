import { useState } from "react";
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes";
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio";
import Card from "../componentes/card";

const Sorteio = () => {

	const participantes = useListaDeParticipantes();
	const [participanteDaVez, setParticipanteDaVez] = useState('');
	const [amigoSecreto, setAmigoSecreto] = useState('');

	const resultado = useResultadoSorteio();

	const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault();
		if (resultado.has(participanteDaVez)) {
			setAmigoSecreto(resultado.get(participanteDaVez)!)
		}
	};

	const handleChange = (evento: React.ChangeEvent<HTMLSelectElement>) => {
		setParticipanteDaVez(evento.target.value);
	};

	return (
		<Card>
			<section className="sorteio">
				<h2>Quem vai tirar o papelzinho?</h2>
				<form onSubmit={sortear}>
					<select
						required
						name="participanteDaVez"
						id="participanteDaVez"
						placeholder="Selecione o seu nome"
						value={participanteDaVez}
						onChange={handleChange}
					>
						<option>Selecione seu nome</option>
						{participantes.map(participante => (
							<option key={participante}>
								{participante}
							</option>
						))}
					</select>
					<button className="botao-sortear">
						Sortear
					</button>
				</form>
				{amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
				<footer>
					<img src='/images/aviao.png' className='aviao' alt='Um desenho de um aviao de papel' />
				</footer>
			</section>
		</Card>
	)
}

export default Sorteio;