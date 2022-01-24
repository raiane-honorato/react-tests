import React from 'react'
import { render, screen } from '@testing-library/react'

import api from "./api"
import App from './App'

//mock do módulo de api
jest.mock("./api")

describe("Requisições para API", () => {
    it("Exibir lista de transações através da API", async () => {
        api.listaTransacoes.mockResolvedValue ([
            {
                "valor": "10",
                "transacao": "saque",
                "data": "10/08/2020",
                "id": 1
              },
              {
                "transacao": "deposito",
                "valor": "20",
                "data": "26/09/2020",
                "id": 2
              }
        ]);

        render(<App />)

        //findBy retorna uma promise. Como a requisição da api dentro do App é assíncrona, o elemento da transação não está renderizado de cara. Asim, é preciso usar findBy e await para prosseguir com o código.
        expect(await screen.findByText('saque')).toBeInTheDocument();

        expect(screen.getByTestId('transacoes').children.length).toBe(2);

    })
})