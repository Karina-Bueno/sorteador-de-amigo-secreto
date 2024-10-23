import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import Sorteio from "./Sorteio"
import { useResultadoSorteio } from "../state/hook/useResultadoSorteio"

jest.mock('../state/hook/useListaDeParticipantes', () => ({
		useListaDeParticipantes: jest.fn()
}))
jest.mock('../state/hook/useResultadoSorteio', () => ({
		useResultadoSorteio: jest.fn()
}))

describe('Na pagina de sorteio', () => {
	const participantes = [
		'Ana',
		'Catarina',
		'Jorel'
	]

	const resultado = new Map([
		['Ana', 'Jorel'],
		['Jorel', 'Catarina'],
		['Catarina', 'Ana']
	])

	beforeEach(() => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
		(useResultadoSorteio as jest.Mock).mockReturnValue(resultado);
	})
	
	test('Todos os participantes podem exibir o seu amigo secreto', () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		)
		const opcoes = screen.queryAllByRole('option')
		expect(opcoes).toHaveLength(participantes.length + 1)// pq já vem uma option por padrão
	})
	test('O amigo secreto é exibido quando solicitado', () => {
		render(
			<RecoilRoot>
				<Sorteio />
			</RecoilRoot>
		)
		const select = screen.getByPlaceholderText('Selecione o seu nome');

		fireEvent.change(select, {
			target: {
				value: participantes[0]
			}
		})

		const botao = screen.getByRole('button')
		fireEvent.click(botao)

		const amigoSecreto = screen.getByRole('alert')

		expect(amigoSecreto).toBeInTheDocument()
	})
})