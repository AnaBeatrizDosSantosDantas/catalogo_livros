import { useEffect, useState } from "react";
import "./App.css";

/* Definição da interface para o objeto Livro */
interface Livro {
    _id: string;
    titulo: string;
    autor: string;
    isbn: string;
    paginas: number;
    ano: number;
    valor: number;
}

/* Componente principal da aplicação */
function App() {
    /* Estado para armazenar a lista de livros */
    const [livros, setLivros] = useState<Livro[]>([]);
    /* Estado para armazenar o número total de páginas */
    const [pageTotal, setPageTotal] = useState(0);
    /* Estado para armazenar a quantidade total de livros */
    const [amount, setAmount] = useState(0);
    /* Estado para armazenar a página atual */
    const [page, setPage] = useState(1);

    /* Efeito para buscar os livros e a quantidade total ao montar a página ou mudar de página */
    useEffect(() => {
        async function fetchData() {
            await getAmount();
            getLivros(page);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    /* Função para buscar os livros de uma determinada página */
    async function getLivros(page: number) {
        try {
            const response = await fetch(
                `http://localhost:3001/livros/${page}`
            );
            if (response.ok) {
                const data = await response.json();
                setLivros(data);
            } else {
                setLivros([]);
            }
        } catch (error) {
            console.error("Erro ao buscar livros:", error);
        }
    }

    /* Função para buscar a quantidade total de livros */
    async function getAmount() {
        try {
            const response = await fetch(`http://localhost:3001/len`);
            if (response.ok) {
                const data = await response.json();
                setAmount(data.amount);
                countPages(data.amount);
            } else {
                setAmount(0);
            }
        } catch (error) {
            console.error("Erro ao contar documentos:", error);
        }
    }

    /* Função para calcular o número total de páginas */
    function countPages(amount: number) {
        const numberOfPages = Math.ceil(amount / 10);
        setPageTotal(numberOfPages);
    }

    /* Função para lidar com a mudança de página */
    function handlePage(value: number) {
        setPage(value);
    }

    /* Função para renderizar os números de página */
    function renderPageNumbers() {
        const totalPagesToShow = Math.min(pageTotal, 7);
        const pageNumbers = [];
        const startPage = Math.max(1, page - Math.floor(totalPagesToShow / 2));
        const endPage = Math.min(pageTotal, startPage + totalPagesToShow - 1);

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                /* Botão para cada número de página */
                <button
                    key={i}
                    onClick={() => handlePage(i)}
                    style={{ backgroundColor: i === page ? "#fda2e2" : "" }}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    }

    /* Renderização do componente */
    return (
        <div className="App">
            <h1>Catálogo de livros</h1>
            <div className="App-table">
                <table>
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Autor</th>
                            <th>ISBN</th>
                            <th>Páginas</th>
                            <th>Ano</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapeamento da lista de livros */}
                        {livros.map((livro: Livro) => (
                            <tr key={livro._id}>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.isbn}</td>
                                <td>{livro.paginas}</td>
                                <td>{livro.ano}</td>
                                <td>R$ {livro.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Paginação */}
            <div className="App-pagination">
                {pageTotal > 0 && (
                    <div>
                        Exibindo de {(page - 1) * 10 + 1} até{" "}
                        {page * 10 > amount ? amount : page * 10} de {amount} livros
                    </div>
                )}
                {/* Botões de navegação */}
                <button
                    className="test"
                    disabled={page <= 1}
                    onClick={() => setPage(1)}
                >
                    {"<<"}
                </button>
                <button
                    className="test"
                    disabled={page <= 1}
                    onClick={() => setPage(page - 1)}
                >
                    {"<"}
                </button>
                {renderPageNumbers()}
                <button
                    className="test"
                    disabled={page >= pageTotal}
                    onClick={() => setPage(page + 1)}
                >
                    {">"}
                </button>
                <button
                    className="test"
                    disabled={page >= pageTotal}
                    onClick={() => setPage(pageTotal)}
                >
                    {">>"}
                </button>
            </div>
        </div>
    );
}

export default App;
