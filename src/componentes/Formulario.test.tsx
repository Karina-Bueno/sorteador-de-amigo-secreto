//jest
import { fireEvent, render, screen } from "@testing-library/react"
import Formulario from "./Formulario"
import { RecoilRoot } from "recoil"
import { act } from "react-dom/test-utils"

describe('O Comportamento do Formulario.tsx', () => {
	test('Quando o input está vazio, novos participantes não podem ser adicionados', () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>)
		//encontrar no DOM o input
		const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
		//encontrar o botão
		const botao = screen.getByRole('button')
		//garantir que o input esteja no documentario
		expect(input).toBeInTheDocument()
		//garantir que o botão esteja desabilitado
		expect(botao).toBeDisabled()
	})
	
	test('Adicionar um participante caso exista um nome preenchido', () => {
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>)
		//encontrar no DOM o input
		const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
		//encontrar o botão
		const botao = screen.getByRole('button')
		//inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		})
	
		//clicar no botão de submeter
		fireEvent.click(botao)
		//garantir que o input esteja com o foco ativo
		expect(input).toHaveFocus()
		//garantir que o input não tenha um valor
		expect(input).toHaveValue("")
	})
	
	test('A mensagem de erro deve sumir após os timers', () => {
		jest.useFakeTimers()
		render(
			<RecoilRoot>
				<Formulario />
			</RecoilRoot>)
		//encontrar no DOM o input
		const input = screen.getByPlaceholderText('Insira os nomes dos participantes')
		//encontrar o botão
		const botao = screen.getByRole('button')
		//inserir um valor no input
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		})
		fireEvent.click(botao)
		fireEvent.change(input, {
			target: {
				value: 'Ana Catarina'
			}
		})
		fireEvent.click(botao)
	
		let mensagemErro = screen.queryByRole('alert')
		expect(mensagemErro).toBeInTheDocument()
		//espera N segundos
		act(() => {
			jest.runAllTimers()
		}); 
	
		mensagemErro = screen.queryByRole('alert')
		expect(mensagemErro).toBeNull()
	})
})


