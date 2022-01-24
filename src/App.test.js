// .test ou .spec é convenção do time
import React from 'react';
import App, { calcularNovoSaldo } from './App';
import { fireEvent, render, screen, act } from '@testing-library/react';


describe('Componente principal', () => {
    describe("Quando abro o app do banco", () => {
        it("o nome é exibido", () => { 
            render ( <App />)
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
    
        it("o saldo é exibido", () => {
            render ( <App />)
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
        it("o botão de realizar transação é exibido", () => {
            render (<App />)
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })

    describe("Quando eu realizo uma transação", () => {
        it("que é um saque, o valor vai diminuir", () => {
            const valores = {
                transacao: 'saque',
                valor: 50
            }
            
            const novoSaldo = calcularNovoSaldo(valores, 150);
            
            expect(novoSaldo).toBe(100)
        })
        it("que é um depósito, o valor vai aumentar", () => {
            const valores = {
                transacao: 'deposito',
                valor: 50
            }
            
            const novoSaldo = calcularNovoSaldo(valores, 100);
            
            expect(novoSaldo).toBe(150)
        })
        it("que é um saque maior que meu saldo, o valor ficará negativo", () => {
            const valores = {
                transacao: 'saque',
                valor: 100
            }

            const novoSaldo = calcularNovoSaldo(valores, 50);

            expect(novoSaldo).toBeLessThan(0);
        })

        it("que é um saque, a transição deve ser realizada", async() => {
           await act(async () => {
                render(<App />)
                
                const saldo = screen.getByText("R$ 1000");
                const transacao = screen.getByLabelText("Saque");
                const valor = screen.getByTestId('valor');
                const botaoTransacao = screen.getByText("Realizar operação");
                expect(saldo.textContent).toBe('R$ 1000')
    
                await fireEvent.click(transacao, { target: {value: 'saque'}})
                await fireEvent.change(valor, {target: {value: 10}})
                await fireEvent.click(botaoTransacao)
    
                expect(saldo.textContent).toBe('R$ 990')
            })
        })

        it("que é um depósito, a transição deve ser realizada", async () => {
            await act(async () => {
                const {
                    getByText, 
                    getByTestId, 
                    getAllByTestId,
                    getByLabelText
                } = render(<App />)
                
                const saldo = getByTestId("saldo-conta");
                const transacao = getAllByTestId("transacao");
                const valor = getByTestId('valor');
                const botaoTransacao = getByText("Realizar operação");
                expect(saldo.textContent).toBe('R$ 1000')
    
                await fireEvent.click(transacao[0], { target: {value: 'deposito'}})
                await fireEvent.change(valor, {target: {value: 10}})
                await fireEvent.click(botaoTransacao)
    
                expect(saldo.textContent).toBe('R$ 1010')
            })
        })


    })

})