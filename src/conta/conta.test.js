import Conta from "./Conta"
import { fireEvent, render, screen, act } from '@testing-library/react';
import React from 'react';

describe("Componente de conta", () => {
    it("Exibir o saldo da conta com formatação monetária", () => {
        render (<Conta saldo={1000}/>)
        const saldo = screen.getByTestId("saldo-conta")
        expect(saldo.textContent).toBe("R$ 1000")
    })

    it("Chama a função de realizar transação quando o botão é clicado", () => {
        //função mockada que não faz nada
        const funcaoRealizarTransacao = jest.fn()
        
        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao}/>)
    
        fireEvent.click(screen.getByText("Realizar operação"));

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    })
})