import { useRef, useState } from "react";
import { useAdicionarParticipante } from "../state/hook/useAdicionarParticipante";
import { useMensagemDeErro } from "../state/hook/useMensagemDeErro";
import './Formulario.css'
import Card from "./card";

const Formulario = () => {

	const [nome, setNome] = useState('');

	const inputRef = useRef<HTMLInputElement>(null)

	const adicionarNaLista = useAdicionarParticipante()

	const mensagemDeErro = useMensagemDeErro()

	const adicionarParticipante = (evento: React.FormEvent<HTMLFormElement>) => {
		evento.preventDefault()
		adicionarNaLista(nome)
		setNome('')
		inputRef.current?.focus()
	}

	return (
		<Card>
			<form className="form" onSubmit={adicionarParticipante}>
				<h2 className="vamos-comecar">Vamos Começar</h2>
				<div className="grupo-input-btn">
					<input
						ref={inputRef}
						value={nome}
						onChange={evento => setNome(evento.target.value)}
						type="text"
						placeholder="Insira os nomes dos participantes"
					/>
					<button disabled={!nome}>Adicionar</button>
				</div>
				{mensagemDeErro && <p className="alerta-erro" role="alert">{mensagemDeErro}</p>}
			</form>
		</Card>

	)
}

export default Formulario;