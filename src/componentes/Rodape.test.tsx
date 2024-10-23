import { fireEvent, render, screen} from "@testing-library/react"
import { RecoilRoot } from "recoil"
import Rodape from "./Rodape"
import { useListaDeParticipantes } from "../state/hook/useListaDeParticipantes"
import { useNavigate } from "react-router-dom"
import { useSorteador } from "../state/hook/useSorteador"

jest.mock('../state/hook/useListaDeParticipantes', () => {
	return {
		useListaDeParticipantes: jest.fn()
	}
})

const mockNavegacao = jest.fn()
const mockSorteio = jest.fn()

jest.mock('../state/hook/useSorteador', () => {
	return {
		useSorteador: () => mockSorteio
	}
})

jest.mock('react-router-dom', () => {
	return {
		useNavigate: () => mockNavegacao
	}
})

describe('Onde não existe participantes suficientes', () => {
	beforeEach(() => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue([])
	})
	test('A brincadeira não pode ser iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>)

		const botao = screen.getByRole('button')
		expect(botao).toBeDisabled()
	})
})

describe('Quando existem participantes suficientes', () => {
	beforeEach(() => {
		(useListaDeParticipantes as jest.Mock).mockReturnValue(['Ana', 'Catarina', 'José'])
	})
	test('A brincadeira pode ser iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>)
		const botao = screen.getByRole('button')
		expect(botao).not.toBeDisabled()
	})
	test('A brincadeira foi iniciada', () => {
		render(
			<RecoilRoot>
				<Rodape />
			</RecoilRoot>)
		const botao = screen.getByRole('button')
		fireEvent.click(botao)

		expect(mockNavegacao).toHaveBeenCalledTimes(1)
		expect(mockNavegacao).toHaveBeenCalledWith('/sorteio')
		expect(mockSorteio).toHaveBeenCalledTimes(1)
	})
})